// @flow

import type { EdgeCurrencyWallet } from 'edge-core-js'
import _ from 'lodash'

import type { Dispatch, GetState } from '../../../types/reduxTypes.js'
import { getReceiveAddresses } from '../../../util/utils.js'
import * as SETTINGS_SELECTORS from '../../Settings/selectors'
import * as CORE_SELECTORS from '../selectors'

export const updateWalletsRequest = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const loginStatus = SETTINGS_SELECTORS.getLoginStatus(state)
  if (!loginStatus) {
    dispatch({
      type: 'LOGGED_OUT'
    })
  }

  const account = CORE_SELECTORS.getAccount(state)
  const { activeWalletIds, archivedWalletIds, currencyWallets } = account

  getReceiveAddresses(currencyWallets).then(receiveAddresses => {
    const plugins: Object = getState().ui.settings.plugins
    const allCurrencyInfos = plugins.allCurrencyInfos
    const allSupportedParentCurrencies = allCurrencyInfos.map(info => info.currencyCode)
    for (const walletId: string of Object.keys(currencyWallets)) {
      const edgeWallet: EdgeCurrencyWallet = currencyWallets[walletId]
      if (edgeWallet.type === 'wallet:ethereum') {
        if (state.ui.wallets && state.ui.wallets.byId && state.ui.wallets.byId[walletId]) {
          const enabledTokens = state.ui.wallets.byId[walletId].enabledTokens
          const customTokens = state.ui.settings.customTokens
          const enabledNotHiddenTokens = enabledTokens.filter(token => {
            let isVisible = true // assume we will enable token
            if (allSupportedParentCurrencies.includes(token)) {
              return false
            }
            const tokenIndex = _.findIndex(customTokens, item => item.currencyCode === token)
            // if token is not supposed to be visible, not point in enabling it
            if (tokenIndex > -1 && customTokens[tokenIndex].isVisible === false) isVisible = false
            return isVisible
          })
          edgeWallet.enableTokens(enabledNotHiddenTokens)
        }
      }
    }

    dispatch({
      type: 'CORE/WALLETS/UPDATE_WALLETS',
      data: {
        activeWalletIds,
        archivedWalletIds,
        currencyWallets,
        receiveAddresses
      }
    })
  })
}
