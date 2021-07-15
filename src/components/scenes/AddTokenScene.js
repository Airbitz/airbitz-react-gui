// @flow

import * as React from 'react'
import { Alert, ScrollView, TextInput } from 'react-native'

import { MAX_TOKEN_CODE_CHARACTERS } from '../../constants/WalletAndCurrencyConstants'
import s from '../../locales/strings.js'
import type { CustomTokenInfo, GuiWallet } from '../../types/types'
import { useEffect, useRef, useState } from '../../util/hooks'
import { decimalPlacesToDenomination } from '../../util/utils'
import { SceneWrapper } from '../common/SceneWrapper'
// import { MismatchTokenParamsModal } from '../modals/MismatchTokenParamsModal'
// import { Airship } from '../services/AirshipInstance'
import { type Theme, cacheStyles, useTheme } from '../services/ThemeContext'
import { EdgeTextFieldOutlined } from '../themed/EdgeOutlinedField'
import { SceneHeader } from '../themed/SceneHeader'

export type AddTokenOwnProps = {
  walletId: string,
  addTokenPending: boolean,
  currentCustomTokens?: CustomTokenInfo[],
  wallet: GuiWallet,
  onAddToken: (currencyCode: string) => void
}

export type AddTokenDispatchProps = {
  addNewToken: (walletId: string, currencyName: string, currencyCode: string, contractAddress: string, denomination: string, type: string) => void
}

export type AddTokenStateProps = {
  addTokenPending: boolean,
  wallet: GuiWallet,
  addTokenPending: boolean
}

type ReturnKeyType = 'next' | 'done'

type AddTokenProps = AddTokenOwnProps & AddTokenStateProps & AddTokenDispatchProps

export const AddToken = ({ addTokenPending, currentCustomTokens = [], wallet, walletId, addNewToken, onAddToken }: AddTokenProps) => {
  const styles = getStyles(useTheme())
  const [currencyCode, setCurrencyCode] = useState<string>('')
  const [currencyName, setCurrencyName] = useState<string>('')
  const [contractAddress, setContractAddress] = useState<string>('')
  const [decimalPlaces, setDecimalPlaces] = useState<string>('')

  const [currencyCodeReturnKeyType, setCurrencyCodeReturnKeyType] = useState<ReturnKeyType>('next')
  const [currencyNameReturnKeyType, setCurrencyNameReturnKeyType] = useState<ReturnKeyType>('next')
  const [contractAddressReturnKeyType, setContractAddressReturnKeyType] = useState<ReturnKeyType>('next')
  const [decimalPlacesReturnKeyType, setDecimalPlacesReturnKeyType] = useState<ReturnKeyType>('next')

  const currencyCodeInputRef = useRef<TextInput>(null)
  const currencyNameInputRef = useRef<TextInput>(null)
  const contractAddressInputRef = useRef<TextInput>(null)
  const decimalPlacesInputRef = useRef<TextInput>(null)

  const handleChangeContractAddress = (input: string) => {
    setContractAddress(input.trim())
  }

  const handleSubmit = () => {
    const currentCustomTokenIndex = currentCustomTokens.findIndex(item => item.currencyCode === currencyCode)
    const metaTokensIndex = wallet.metaTokens.findIndex(item => item.currencyCode === currencyCode)

    // if token is hard-coded into wallets of this type
    if (metaTokensIndex >= 0) Alert.alert(s.strings.manage_tokens_duplicate_currency_code)

    // if that token already exists and is visible (ie not deleted)
    if (currentCustomTokenIndex >= 0 && currentCustomTokens[currentCustomTokenIndex].isVisible !== false) {
      Alert.alert(s.strings.manage_tokens_duplicate_currency_code)
    } else if (currencyName && currencyCode && decimalPlaces && contractAddress) {
      const denomination = decimalPlacesToDenomination(decimalPlaces)

      // TODO: Wait until autocomplete API will be available
      // if (isNotExist) {
      //   const isConfirm = await Airship.show(bridge => (
      //     <MismatchTokenParamsModal bridge={bridge} />
      //   ))

      //   if (!isConfirm) return
      // }

      addNewToken(walletId, currencyName, currencyCode, contractAddress, denomination, wallet.type)
      onAddToken(currencyCode)
    } else {
      Alert.alert(s.strings.addtoken_invalid_information)
    }
  }

  const handleSubmitEditing = async () => {
    const data = [currencyCode, currencyName, contractAddress, decimalPlaces]
    const inputRefs = [currencyCodeInputRef, currencyNameInputRef, contractAddressInputRef, decimalPlacesInputRef]
    const dataEmptyIndex = data.findIndex(item => item === '')

    if (dataEmptyIndex === -1) {
      handleSubmit()
    } else {
      inputRefs[dataEmptyIndex].current.focus()
    }
  }

  useEffect(() => {
    const data = [currencyCode, currencyName, contractAddress, decimalPlaces]
    const returnKeyTypeSetters = [setCurrencyCodeReturnKeyType, setCurrencyNameReturnKeyType, setContractAddressReturnKeyType, setDecimalPlacesReturnKeyType]
    let dataEmptyIndex = -1
    let dataEmptyCount = 0

    for (let index = 0; index < data.length; index++) {
      if (data[index] === '') {
        dataEmptyCount += 1

        if (dataEmptyCount === 1) dataEmptyIndex = index
      }
    }

    for (let index = 0; index < data.length; index++) {
      returnKeyTypeSetters[index](dataEmptyCount === 0 || (index === dataEmptyIndex && dataEmptyCount === 1) ? 'done' : 'next')
    }
  }, [
    currencyCode,
    currencyName,
    contractAddress,
    decimalPlaces,
    setCurrencyCodeReturnKeyType,
    setCurrencyNameReturnKeyType,
    setContractAddressReturnKeyType,
    setDecimalPlacesReturnKeyType
  ])

  return (
    <SceneWrapper avoidKeyboard background="theme">
      <SceneHeader title={s.strings.title_add_token} style={styles.header} bold />
      <ScrollView style={styles.container}>
        <EdgeTextFieldOutlined
          ref={currencyCodeInputRef}
          autoFocus
          showSearchIcon={false}
          onChangeText={setCurrencyCode}
          value={currencyCode}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType={currencyCodeReturnKeyType}
          label={s.strings.addtoken_currency_code_input_text}
          marginRem={[0.5, 0.6, 1]}
          hideSearchIcon
          maxLength={MAX_TOKEN_CODE_CHARACTERS}
          onSubmitEditing={handleSubmitEditing}
        />
        <EdgeTextFieldOutlined
          ref={currencyNameInputRef}
          showSearchIcon={false}
          onChangeText={setCurrencyName}
          value={currencyName}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType={currencyNameReturnKeyType}
          label={s.strings.addtoken_name_input_text}
          marginRem={[0.5, 0.6, 1]}
          hideSearchIcon
          onSubmitEditing={handleSubmitEditing}
        />
        <EdgeTextFieldOutlined
          ref={contractAddressInputRef}
          showSearchIcon={false}
          onChangeText={handleChangeContractAddress}
          value={contractAddress}
          autoCorrect={false}
          returnKeyType={contractAddressReturnKeyType}
          label={s.strings.addtoken_contract_address_input_text}
          marginRem={[0.5, 0.6, 1]}
          hideSearchIcon
          onSubmitEditing={handleSubmitEditing}
        />
        <EdgeTextFieldOutlined
          ref={decimalPlacesInputRef}
          showSearchIcon={false}
          onChangeText={setDecimalPlaces}
          value={decimalPlaces}
          autoCorrect={false}
          returnKeyType={decimalPlacesReturnKeyType}
          label={s.strings.addtoken_denomination_input_text}
          marginRem={[0.5, 0.6, 0]}
          hideSearchIcon
          keyboardType="numeric"
          onSubmitEditing={handleSubmitEditing}
        />
      </ScrollView>
    </SceneWrapper>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.rem(1)
  },
  header: {
    marginBottom: 0
  }
}))
