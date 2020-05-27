// @flow

import { bns } from 'biggystring'
import type { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js/src/types/types'
import React, { Component } from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Actions } from 'react-native-router-flux'

import fioRequestsIcon from '../../assets/images/fio/SendModule_FioAddress.png'
import editIcon from '../../assets/images/transaction_details_icon.png'
import * as Constants from '../../constants/indexConstants'
import { intl } from '../../locales/intl'
import s from '../../locales/strings.js'
import { addToFioAddressCache } from '../../modules/FioAddress/util.js'
import type { ExchangedFlipInputAmounts } from '../../modules/UI/components/FlipInput/ExchangedFlipInput2'
import Text from '../../modules/UI/components/FormattedText/FormattedText.ui.js'
import THEME from '../../theme/variables/airbitz'
import type { GuiCurrencyInfo } from '../../types/types'
import { SceneWrapper } from '../common/SceneWrapper'
import { SimpleInputModal } from '../modals/SimpleInputModal.js'
import { Airship, showError, showToast } from '../services/AirshipInstance'

export type FioRequestConfirmationProps = {
  exchangeSecondaryToPrimaryRatio: number,
  publicAddress: string,
  loading: boolean,
  chainCode: string,
  primaryCurrencyInfo: GuiCurrencyInfo,
  secondaryCurrencyInfo: GuiCurrencyInfo,
  fioWallets: EdgeCurrencyWallet[],
  account: EdgeAccount,
  isConnected: boolean
}

export type FioRequestConfirmationDispatchProps = {
  refreshReceiveAddressRequest: (walletId: string) => void,
  onSelectWallet: (walletId: string, currencyCode: string) => void
}

type NavigationProps = {
  amounts: ExchangedFlipInputAmounts,
  fioModalData: {
    fioAddress: string,
    memo: string
  }
}

type Props = FioRequestConfirmationProps & FioRequestConfirmationDispatchProps & NavigationProps

type LocalState = {
  loading: boolean,
  selectedFioAddress: string,
  walletAddresses: { fioAddress: string, fioWallet: EdgeCurrencyWallet }[],
  memo: string
}

export class FioRequestConfirmationComponent extends Component<Props, LocalState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      loading: false,
      selectedFioAddress: '',
      walletAddresses: [],
      memo: ''
    }
  }

  async componentDidMount() {
    if (this.props.fioWallets) {
      const walletAddresses = []
      for (const fioWallet: EdgeCurrencyWallet of this.props.fioWallets) {
        try {
          const fioAddresses: string[] = await fioWallet.otherMethods.getFioAddressNames()
          if (fioAddresses.length > 0) {
            for (const fioAddress of fioAddresses) {
              walletAddresses.push({ fioAddress, fioWallet })
            }
          }
        } catch (e) {
          continue
        }
      }

      this.setState({
        walletAddresses,
        selectedFioAddress: walletAddresses[0].fioAddress
      })
    }
  }

  onNextPress = async () => {
    const { walletAddresses, selectedFioAddress } = this.state
    const walletAddress = walletAddresses.find(({ fioAddress }) => fioAddress === selectedFioAddress)

    if (walletAddress) {
      const { fioWallet } = walletAddress
      const val = bns.div(this.props.amounts.nativeAmount, this.props.primaryCurrencyInfo.exchangeDenomination.multiplier, 18)
      try {
        if (!this.props.isConnected) {
          showError(s.strings.fio_network_alert_text)
          return
        }
        // checking fee
        this.setState({ loading: true })
        try {
          const getFeeRes = await fioWallet.otherMethods.fioAction('getFee', { endPoint: 'new_funds_request', fioAddress: this.state.selectedFioAddress })
          if (getFeeRes.fee) return showError(s.strings.fio_no_bundled_err_msg)
        } catch (e) {
          this.setState({ loading: false })
          return showError(s.strings.fio_get_fee_err_msg)
        }
        // send fio request
        await fioWallet.otherMethods.fioAction('requestFunds', {
          payerFioAddress: this.props.fioModalData.fioAddress,
          payeeFioAddress: this.state.selectedFioAddress,
          payeeTokenPublicAddress: this.props.publicAddress,
          amount: val,
          tokenCode: this.props.primaryCurrencyInfo.exchangeCurrencyCode,
          chainCode: this.props.chainCode || this.props.primaryCurrencyInfo.exchangeCurrencyCode,
          memo: this.state.memo,
          maxFee: 0
        })
        this.setState({ loading: false })
        showToast(s.strings.fio_request_ok_body)
        addToFioAddressCache(this.props.account, [this.props.fioModalData.fioAddress])
        Actions.popTo(Constants.TRANSACTION_LIST)
      } catch (error) {
        this.setState({ loading: false })
        showError(`${s.strings.fio_request_error_header}. ${error.json ? JSON.stringify(error.json.fields[0].error) : ''}`)
      }
    } else {
      showError(s.strings.fio_wallet_missing_for_fio_address)
    }
  }

  fiatAmount = (amount: string): string => {
    const fiatPerCrypto = this.props.exchangeSecondaryToPrimaryRatio
    return intl.formatNumber(fiatPerCrypto * parseFloat(amount), { toFixed: 2 }) || '0'
  }

  handleFioWalletChange = (something: string, index: number): void => {
    this.setState({ selectedFioAddress: this.state.walletAddresses[index].fioAddress })
  }

  labelFromItem = (item: { fioAddress: string }): string => {
    return item.fioAddress
  }

  openFioAddressFromModal = () => null
  openFioAddressToModal = () => null

  openMemoModal = async () => {
    const memo = await Airship.show(bridge => (
      <SimpleInputModal
        bridge={bridge}
        icon={<Image style={iconStyles} source={fioRequestsIcon} />}
        title={s.strings.fio_confirm_request_input_title_memo}
        inputLabel={s.strings.fio_confirm_request_memo}
        inputValue={this.state.memo}
      />
    ))

    if (memo.length > 64) return showError(s.strings.send_fio_request_error_memo_inline)
    if (memo && !/^[\x20-\x7E]*$/.test(memo)) return showError(s.strings.send_fio_request_error_memo_invalid_character)
    this.setState({ memo })
  }

  render() {
    const { primaryCurrencyInfo, secondaryCurrencyInfo } = this.props
    const { memo } = this.state
    if (!primaryCurrencyInfo || !secondaryCurrencyInfo) return null
    let cryptoAmount, exchangeAmount
    try {
      cryptoAmount = bns.div(this.props.amounts.nativeAmount, primaryCurrencyInfo.displayDenomination.multiplier, 18)
      exchangeAmount = bns.div(this.props.amounts.nativeAmount, primaryCurrencyInfo.exchangeDenomination.multiplier, 18)
    } catch (e) {
      return null
    }
    const fiatAmount = this.fiatAmount(exchangeAmount)
    const cryptoName = primaryCurrencyInfo.displayDenomination.name
    const fiatName = secondaryCurrencyInfo.displayDenomination.name

    return (
      <SceneWrapper>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.openFioAddressFromModal}>
            <View style={styles.tileContainer}>
              <Image style={styles.tileIcon} source={editIcon} />
              <Text style={styles.tileTextHeader}>{s.strings.fio_confirm_request_from}</Text>
              <Text style={styles.tileTextBody}>{this.props.fioModalData.fioAddress}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.openFioAddressToModal}>
            <View style={styles.tileContainer}>
              <Image style={styles.tileIcon} source={editIcon} />
              <Text style={styles.tileTextHeader}>{s.strings.fio_confirm_request_to}</Text>
              <Text style={styles.tileTextBody}>{this.props.fioModalData.fioAddress}</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.tileContainer}>
            <Text style={styles.tileTextHeader}>{s.strings.fio_confirm_request_amount}</Text>
            <Text style={styles.tileTextBody}>{`${cryptoAmount} ${cryptoName} (${fiatAmount} ${fiatName})`}</Text>
          </View>
          <TouchableWithoutFeedback onPress={this.openMemoModal}>
            <View style={styles.tileContainer}>
              <Image style={styles.tileIcon} source={editIcon} />
              <Text style={styles.tileTextHeader}>{s.strings.fio_confirm_request_memo}</Text>
              <Text style={styles.tileTextBody}>{memo}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => null}>
            <View style={styles.nextButton}>
              <Text style={styles.buttonText}>{s.strings.string_next_capitalized}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SceneWrapper>
    )
  }
}

const { rem } = THEME
const tileStyles = {
  width: '100%',
  backgroundColor: THEME.COLORS.WHITE,
  borderBottomWidth: 1,
  borderBottomColor: THEME.COLORS.GRAY_3,
  padding: rem(0.5)
}
const iconStyles = {
  size: rem(2),
  color: THEME.COLORS.SECONDARY
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: THEME.COLORS.GRAY_4,
    alignItems: 'center'
  },
  tileContainer: {
    ...tileStyles
  },
  tileTextHeader: {
    color: THEME.COLORS.SECONDARY,
    fontSize: rem(0.75),
    margin: rem(0.25)
  },
  tileTextBody: {
    color: THEME.COLORS.GRAY_5,
    fontSize: rem(1),
    margin: rem(0.25)
  },
  tileIcon: {
    position: 'absolute',
    width: rem(0.75),
    height: rem(0.75),
    top: 10,
    right: 10
  },
  nextButton: {
    backgroundColor: THEME.COLORS.SECONDARY,
    marginTop: rem(1),
    borderRadius: rem(1.5),
    width: '80%',
    height: rem(3),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: THEME.COLORS.WHITE,
    fontSize: rem(1.25)
  }
})
