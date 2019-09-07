// @flow

import type { EdgeAccount } from 'edge-core-js'
import { Platform } from 'react-native'
import Locale from 'react-native-locale'
import PushNotification from 'react-native-push-notification'
import { Actions } from 'react-native-router-flux'
import { sprintf } from 'sprintf-js'

import { getEnabledTokens } from '../../actions/WalletActions.js'
import { showError } from '../../components/services/AirshipInstance.js'
import * as Constants from '../../constants/indexConstants'
import s from '../../locales/strings.js'
import type { Dispatch, GetState } from '../../types/reduxTypes.js'
import { runWithTimeout } from '../../util/utils.js'
import {
  CORE_DEFAULTS,
  LOCAL_ACCOUNT_DEFAULTS,
  LOCAL_ACCOUNT_TYPES,
  PASSWORD_RECOVERY_REMINDERS_SHOWN,
  SYNCED_ACCOUNT_DEFAULTS,
  SYNCED_ACCOUNT_TYPES,
  getCoreSettings,
  getLocalSettings,
  getSyncedSettings,
  setLocalSettings,
  setSyncedSettings
} from '../Core/Account/settings.js'
// Login/action.js
import * as CORE_SELECTORS from '../Core/selectors'
import { updateWalletsRequest } from '../Core/Wallets/action.js'

const localeInfo = Locale.constants() // should likely be moved to login system and inserted into Redux

const createDefaultWallets = async (account: EdgeAccount, defaultFiat: string, dispatch: Dispatch) => {
  const ethWalletName = s.strings.string_first_ethereum_wallet_name
  const btcWalletName = s.strings.string_first_bitcoin_wallet_name
  const bchWalletName = s.strings.string_first_bitcoincash_wallet_name
  const ethWalletType = Constants.ETHEREUM_WALLET
  const btcWalletType = Constants.BITCOIN_WALLET
  const bchWalletType = Constants.BITCOINCASH_WALLET
  const fiatCurrencyCode = 'iso:' + defaultFiat

  let edgeWallet
  const timeoutErr = new Error(s.strings.error_creating_wallets)
  timeoutErr.name = 'Error Creating Wallets'
  if (global.currencyCode) {
    let walletType, walletName
    // We got installed via a currencyCode referral. Only create one wallet of that type
    for (const pluginName in account.currencyConfig) {
      const { currencyInfo } = account.currencyConfig[pluginName]
      if (currencyInfo.currencyCode.toLowerCase() === global.currencyCode.toLowerCase()) {
        walletType = currencyInfo.walletType
        walletName = sprintf(s.strings.my_crypto_wallet_name, currencyInfo.displayName)
        global.startMoment && global.startMoment('INIT_ACCOUNT_CREATE_ONE_WALLET')
        edgeWallet = await runWithTimeout(account.createCurrencyWallet(walletType, { name: walletName, fiatCurrencyCode }), 20000, timeoutErr)
        global.firebase && global.firebase.analytics().logEvent(`Signup_Wallets_Created`)
        global.endMoment && global.endMoment('INIT_ACCOUNT_CREATE_ONE_WALLET')
      }
    }
  }
  if (!edgeWallet) {
    global.startMoment && global.startMoment('INIT_ACCOUNT_CREATE_WALLETS')
    edgeWallet = await runWithTimeout(account.createCurrencyWallet(btcWalletType, { name: btcWalletName, fiatCurrencyCode }), 20000, timeoutErr)
    dispatch({ type: 'UI/WALLETS/SELECT_WALLET', data: { currencyCode: edgeWallet.currencyInfo.currencyCode, walletId: edgeWallet.id } })
    await runWithTimeout(account.createCurrencyWallet(bchWalletType, { name: bchWalletName, fiatCurrencyCode }), 20000, timeoutErr)
    await runWithTimeout(account.createCurrencyWallet(ethWalletType, { name: ethWalletName, fiatCurrencyCode }), 20000, timeoutErr)
    // const p = []
    // p.push(account.createCurrencyWallet(btcWalletType, { name: btcWalletName, fiatCurrencyCode }))
    // p.push(account.createCurrencyWallet(bchWalletType, { name: bchWalletName, fiatCurrencyCode }))
    // p.push(account.createCurrencyWallet(ethWalletType, { name: ethWalletName, fiatCurrencyCode }))
    // const results = await runWithTimeout(20000, Promise.all(p))
    // edgeWallet = results[0]
    global.firebase && global.firebase.analytics().logEvent(`Signup_Wallets_Created`)
    global.endMoment && global.endMoment('INIT_ACCOUNT_CREATE_WALLETS')
  }
  return edgeWallet
}

const getFirstActiveWalletInfo = (account: EdgeAccount, currencyCodes: { [string]: string }) => {
  const walletId = account.activeWalletIds[0]
  const walletKey = account.allKeys.find(key => key.id === walletId)
  if (!walletKey) {
    throw new Error('Cannot find a walletInfo for the active wallet')
  }
  const currencyCode = currencyCodes[walletKey.type]
  return {
    walletId,
    currencyCode
  }
}

export const initializeAccount = (account: EdgeAccount, touchIdInfo: Object) => async (dispatch: Dispatch, getState: GetState) => {
  const currencyPlugins = []
  const currencyCodes = {}

  for (const pluginName in account.currencyConfig) {
    const { currencyInfo } = account.currencyConfig[pluginName]
    const { currencyCode } = currencyInfo
    currencyCodes[currencyInfo.walletType] = currencyCode
    currencyPlugins.push({ pluginName, currencyInfo })
  }
  dispatch({ type: 'ACCOUNT/LOGGED_IN', data: { account, currencyPlugins } })

  account.activeWalletIds.length < 1 ? Actions[Constants.ONBOARDING]() : Actions[Constants.EDGE]()

  const walletInfos = account.allKeys
  const filteredWalletInfos = walletInfos.map(({ keys, id, ...info }) => info)
  console.log('Wallet Infos:', filteredWalletInfos)

  const state = getState()
  const context = CORE_SELECTORS.getContext(state)
  if (Platform.OS === Constants.IOS) {
    PushNotification.configure({
      onNotification: notification => {
        console.log('NOTIFICATION:', notification)
      }
    })
  }
  let accountInitObject = {
    account: account,
    touchIdInfo: touchIdInfo,
    walletId: '',
    currencyCode: '',
    currencyPlugins,
    otpInfo: { enabled: account.otpKey != null, otpKey: account.otpKey, otpResetPending: false },
    autoLogoutTimeInSeconds: 3600,
    bluetoothMode: false,
    pinLoginEnabled: false,
    pinMode: false,
    otpMode: false,
    countryCode: '',
    customTokens: [],
    defaultFiat: '',
    defaultIsoFiat: '',
    merchantMode: '',
    denominationKeys: [],
    customTokensSettings: [],
    activeWalletIds: [],
    archivedWalletIds: [],
    passwordReminder: {},
    isAccountBalanceVisible: false,
    isWalletFiatBalanceVisible: false,
    spendingLimits: {},
    passwordRecoveryRemindersShown: PASSWORD_RECOVERY_REMINDERS_SHOWN
  }
  try {
    let newAccount = false
    let defaultFiat = Constants.USD_FIAT
    if (account.activeWalletIds.length < 1) {
      if (localeInfo.currencyCode && typeof localeInfo.currencyCode === 'string' && localeInfo.currencyCode.length >= 3) {
        defaultFiat = localeInfo.currencyCode
      }

      newAccount = true
    } else if (!state.core.deepLinking.deepLinkPending) {
      // We have a wallet
      const { walletId, currencyCode } = getFirstActiveWalletInfo(account, currencyCodes)
      accountInitObject.walletId = walletId
      accountInitObject.currencyCode = currencyCode
    }
    const activeWalletIds = account.activeWalletIds
    dispatch({
      type: 'INSERT_WALLET_IDS_FOR_PROGRESS',
      data: { activeWalletIds }
    })
    const archivedWalletIds = account.archivedWalletIds

    accountInitObject.activeWalletIds = activeWalletIds
    accountInitObject.archivedWalletIds = archivedWalletIds

    const allSupportedParentCurrencies = currencyPlugins.map(plugin => plugin.currencyInfo.currencyCode)

    const loadedSyncedSettings = await getSyncedSettings(account)
    const syncedSettings = { ...loadedSyncedSettings } // will prevent mergeSettings trying to find prop of undefined
    const mergedSyncedSettings = mergeSettings(syncedSettings, SYNCED_ACCOUNT_DEFAULTS, SYNCED_ACCOUNT_TYPES, account)
    if (mergedSyncedSettings.isOverwriteNeeded) {
      setSyncedSettings(account, { ...mergedSyncedSettings.finalSettings })
    }
    accountInitObject = { ...accountInitObject, ...mergedSyncedSettings.finalSettings }

    if (accountInitObject.customTokens) {
      accountInitObject.customTokens.forEach(token => {
        if (allSupportedParentCurrencies.find(item => item === token.currencyCode)) {
          console.log('Not allowing custom token, ', token.currencyCode, ' to be saved since existing parent currency')
        } else {
          accountInitObject.customTokensSettings.push(token)
          // this second dispatch will be redundant if we set 'denomination' property upon customToken creation
          accountInitObject.denominationKeys.push({ currencyCode: token.currencyCode, denominationKey: token.multiplier })
        }
      })
    }
    for (const key in accountInitObject) {
      if (accountInitObject[key]) {
        // avoid trying to look at property 'denomination' of undefined
        const typeofDenomination = typeof accountInitObject[key].denomination
        if (typeofDenomination === 'string') {
          accountInitObject.denominationKeys.push({ currencyCode: key, denominationKey: accountInitObject[key].denomination })
        }
      }
    }
    const loadedLocalSettings = await getLocalSettings(account)
    const localSettings = { ...loadedLocalSettings }
    const mergedLocalSettings = mergeSettings(localSettings, LOCAL_ACCOUNT_DEFAULTS, LOCAL_ACCOUNT_TYPES)
    if (mergedLocalSettings.isOverwriteNeeded) {
      setLocalSettings(account, { ...mergedSyncedSettings.finalSettings })
    }
    accountInitObject = { ...accountInitObject, ...mergedLocalSettings.finalSettings }

    accountInitObject.pinLoginEnabled = await context.pinLoginEnabled(account.username)

    if (newAccount) {
      accountInitObject.defaultFiat = defaultFiat
      accountInitObject.defaultIsoFiat = 'iso:' + defaultFiat
    }

    const coreSettings = await getCoreSettings(account)
    const coreDefaults = CORE_DEFAULTS
    const coreFinal = { ...coreDefaults, ...coreSettings }
    accountInitObject.pinMode = coreFinal.pinMode
    accountInitObject.otpMode = coreFinal.otpMode

    dispatch({
      type: 'ACCOUNT_INIT_COMPLETE',
      data: { ...accountInitObject }
    })
    if (newAccount) {
      await createDefaultWallets(account, defaultFiat, dispatch)
    }
    dispatch(updateWalletsRequest())
    activeWalletIds.forEach(walletId => {
      dispatch(getEnabledTokens(walletId))
    })
  } catch (error) {
    showError(error)
  }
}

export const mergeSettings = (
  loadedSettings: Object,
  defaults: Object,
  types: Object,
  account?: Object
): { finalSettings: Object, isOverwriteNeeded: boolean, isDefaultTypeIncorrect: boolean } => {
  const finalSettings = {}
  // begin process for repairing damaged settings data
  let isOverwriteNeeded = false
  let isDefaultTypeIncorrect = false
  for (const key in defaults) {
    // if the type of the setting default does not meet the enforced type
    const defaultSettingType = typeof defaults[key]
    if (defaultSettingType !== types[key]) {
      isDefaultTypeIncorrect = true
      console.error('MismatchedDefaultSettingType key: ', key, ' with defaultSettingType: ', defaultSettingType, ' and necessary type: ', types[key])
    }

    // if the type of the loaded setting does not meet the enforced type
    // eslint-disable-next-line valid-typeof
    const loadedSettingType = typeof loadedSettings[key]
    if (loadedSettingType !== types[key]) {
      isOverwriteNeeded = true
      console.warn(
        'Settings overwrite was needed for: ',
        key,
        ' with loaded value: ',
        loadedSettings[key],
        ', but needed type: ',
        types[key],
        ' so replace with: ',
        defaults[key]
      )
      // change that erroneous value to something that works (default)
      finalSettings[key] = defaults[key]
    } else {
      finalSettings[key] = loadedSettings[key]
    }

    if (account && loadedSettings[key] != null) {
      const currencyName = Constants.CURRENCY_PLUGIN_NAMES[key]
      const doesHaveDenominations = loadedSettings[key].denominations
      const doesHavePlugin = account.currencyConfig[currencyName]
      // if there are settings for this key
      // and currency (not token) and has a plugin name
      if (loadedSettings && loadedSettings[key] && (doesHaveDenominations || doesHavePlugin) && currencyName) {
        // for each currency info (each native currency)
        const pluginDenominations = account.currencyConfig[currencyName].currencyInfo.denominations // get denominations for that plugin
        const settingDenominationIndex = pluginDenominations.findIndex(pluginDenom => pluginDenom.multiplier === loadedSettings[key].denomination) // find settings denom in plugin denoms
        if (loadedSettings[key].multiplier !== pluginDenominations[0].multiplier) finalSettings[key].multiplier = pluginDenominations[0].multiplier
        if (loadedSettings[key].denominations && loadedSettings[key].denominations[0].multiplier !== pluginDenominations[0].multiplier) {
          finalSettings[key].denominations = pluginDenominations
        }
        if (settingDenominationIndex === -1) {
          // setting denomination is not present in plugin (and on wallet)
          finalSettings[key].denomination = pluginDenominations[0].multiplier // grab the first denom multiplier from plugin
          console.warn(`${key} denomination ${loadedSettings[key].denomination} invalid, overwriting with plugin denom`)
          isOverwriteNeeded = true // make sure synced settings get overwritten
        }
      }
    }
  }

  return {
    finalSettings,
    isOverwriteNeeded,
    isDefaultTypeIncorrect
  }
}

export const logoutRequest = (username?: string) => (dispatch: Dispatch, getState: GetState) => {
  Actions.popTo(Constants.LOGIN, { username })
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  dispatch({ type: 'LOGOUT', data: { username } })
  account.logout()
}

export const deepLinkLogout = (backupKey: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  const username = account.username
  Actions.popTo(Constants.LOGIN, { username })
  dispatch({ type: 'DEEP_LINK_RECEIVED', data: backupKey })
  // dispatch(logout('deepLinkReceived'))
  if (!account) {
    account.logout()
  }
}
