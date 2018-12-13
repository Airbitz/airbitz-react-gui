// @flow

import type { EdgeCurrencyWallet } from 'edge-core-js'
import React, { Component } from 'react'
import { ActivityIndicator, Image, ScrollView, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { sprintf } from 'sprintf-js'

import eosLogo from '../../assets/images/currencies/fa_logo_eos.png'
import steemLogo from '../../assets/images/currencies/fa_logo_steem.png'
import * as Constants from '../../constants/indexConstants'
import s from '../../locales/strings.js'
import { PrimaryButton } from '../../modules/UI/components/Buttons/index'
import Text from '../../modules/UI/components/FormattedText'
import Gradient from '../../modules/UI/components/Gradient/Gradient.ui'
import SafeAreaView from '../../modules/UI/components/SafeAreaView/index'
import WalletListModal from '../../modules/UI/components/WalletListModal/WalletListModalConnector.js'
import styles from '../../styles/scenes/CreateWalletStyle.js'
import type { GuiFiatType, GuiWallet, GuiWalletType } from '../../types.js'
import { fixFiatCurrencyCode } from '../../util/utils.js'

const logos = {
  eos: eosLogo,
  steem: steemLogo
}

export type AccountPaymentParams = {
  accountCurrencyCode: string,
  accountName: string,
  paymentCurrencyCode: string
}

export type CreateWalletAccountSelectStateProps = {
  wallets: { [string]: GuiWallet },
  paymentCurrencyCode: string,
  paymentAddress: string,
  exchangeAmount: string,
  nativeAmount: string,
  expirationDate: string,
  supportedCurrencies: { [string]: boolean },
  activationCost: string,
  isCreatingWallet: boolean,
  paymentDenominationSymbol: string
}

type CreateWalletAccountSelectOwnProps = {
  selectedFiat: GuiFiatType,
  selectedWalletType: GuiWalletType,
  accountName: string
}

export type CreateWalletAccountSelectDispatchProps = {
  createAccountBasedWallet: (string, string, string, boolean, boolean) => any,
  fetchAccountActivationInfo: string => void,
  createAccountTransaction: (string, string, string) => void,
  fetchWalletAccountActivationPaymentInfo: AccountPaymentParams => void
}

type Props = CreateWalletAccountSelectOwnProps & CreateWalletAccountSelectDispatchProps & CreateWalletAccountSelectStateProps

type State = {
  walletName: string,
  walletId: string,
  isModalVisible: boolean,
  error: string,
  createdWallet: Promise<EdgeCurrencyWallet>
}

export class CreateWalletAccountSelect extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    const { selectedFiat, selectedWalletType, createAccountBasedWallet, accountName } = props
    const createdWallet = createAccountBasedWallet(accountName, selectedWalletType.value, fixFiatCurrencyCode(selectedFiat.value), false, true)
    this.state = {
      isModalVisible: false,
      error: '',
      walletId: '',
      walletName: '',
      createdWallet
    }
    const currencyCode = props.selectedWalletType.currencyCode
    props.fetchAccountActivationInfo(currencyCode)
  }

  onBack = () => {
    Actions.pop()
  }

  onPressSelect = () => {
    this.setState({
      isModalVisible: true
    })
  }

  onPressSubmit = async () => {
    const { createAccountTransaction, accountName } = this.props
    const { walletId } = this.state
    const createdWallet = await this.state.createdWallet
    const createdWalletId = createdWallet.id
    // will grab data from state in actions
    createAccountTransaction(createdWalletId, accountName, walletId)
  }

  onSelectWallet = async (walletId: string, paymentCurrencyCode: string) => {
    const { wallets, accountName, selectedWalletType, fetchWalletAccountActivationPaymentInfo } = this.props
    const paymentWallet = wallets[walletId]
    const walletName = paymentWallet.name
    this.setState({
      isModalVisible: false,
      walletId,
      walletName
    })
    const paymentInfo: AccountPaymentParams = {
      accountCurrencyCode: selectedWalletType.currencyCode,
      accountName,
      paymentCurrencyCode
    }
    await this.state.createdWallet
    fetchWalletAccountActivationPaymentInfo(paymentInfo)
  }

  renderSelectWallet = () => {
    const { activationCost, selectedWalletType } = this.props
    const currencyCode = selectedWalletType.currencyCode
    return (
      <View style={styles.selectPaymentLower}>
        <View style={styles.buttons}>
          <PrimaryButton style={[styles.next]} onPress={this.onPressSelect}>
            <PrimaryButton.Text>{s.strings.create_wallet_account_select_wallet}</PrimaryButton.Text>
          </PrimaryButton>
        </View>
        <View style={styles.paymentArea}>
          <Text style={styles.paymentLeft}>{s.strings.create_wallet_account_amount_due}</Text>
          <Text style={styles.paymentRight}>
            {activationCost} {currencyCode}
          </Text>
        </View>
      </View>
    )
  }

  renderPaymentReview = () => {
    const {
      wallets,
      paymentCurrencyCode,
      accountName,
      isCreatingWallet,
      exchangeAmount,
      selectedWalletType,
      selectedFiat,
      activationCost,
      paymentDenominationSymbol
    } = this.props
    const { walletId } = this.state
    const wallet = wallets[walletId]
    const { name, symbolImageDarkMono } = wallet

    return (
      <View>
        <View style={styles.selectPaymentLower}>
          <View style={styles.accountReviewWalletNameArea}>
            <Text style={styles.accountReviewWalletNameText}>
              {name}:{paymentCurrencyCode}
            </Text>
          </View>
          <View style={styles.paymentAndIconArea}>
            <View style={styles.paymentLeftIconWrap}>
              {symbolImageDarkMono && <Image style={styles.paymentLeftIcon} source={{ uri: symbolImageDarkMono }} resizeMode="cover" />}
            </View>
            <View style={styles.paymentArea}>
              <Text style={styles.paymentLeft}>
                {paymentDenominationSymbol} {exchangeAmount} {paymentCurrencyCode}
              </Text>
              <Text style={styles.paymentRight}>
                {activationCost} {selectedWalletType.currencyCode}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.accountReviewInfoArea}>
          <Text style={styles.accountReviewInfoText}>
            {s.strings.create_wallet_account_payment_source} {name}
          </Text>
          <Text style={styles.accountReviewInfoText}>
            {s.strings.create_wallet_crypto_type_label} {paymentCurrencyCode}
          </Text>
          <Text style={styles.accountReviewInfoText}>
            {s.strings.create_wallet_fiat_type_label} {selectedFiat.label}
          </Text>
          <Text style={styles.accountReviewInfoText}>
            {s.strings.create_wallet_name_label} {accountName}
          </Text>
        </View>
        <View style={styles.accountReviewConfirmArea}>
          <Text style={styles.accountReviewConfirmText}>{s.strings.create_wallet_account_confirm}</Text>
        </View>
        <View style={styles.confirmButtonArea}>
          <PrimaryButton disabled={isCreatingWallet} style={[styles.confirmButton]} onPress={this.onPressSubmit}>
            <PrimaryButton.Text>{isCreatingWallet ? <ActivityIndicator /> : s.strings.submit}</PrimaryButton.Text>
          </PrimaryButton>
        </View>
      </View>
    )
  }

  render () {
    const { supportedCurrencies, selectedWalletType, activationCost } = this.props
    const instructionSyntax = sprintf(s.strings.create_wallet_account_select_instructions, `${activationCost} ${selectedWalletType.currencyCode}`)
    const confirmMessageSyntax = sprintf(s.strings.create_wallet_account_make_payment, selectedWalletType.currencyCode)
    // only included supported types of payment in WalletListModal
    const supportedCurrenciesList = []
    for (const currency in supportedCurrencies) {
      if (supportedCurrencies[currency]) {
        supportedCurrenciesList.push(currency)
      }
    }
    return (
      <SafeAreaView>
        <View style={styles.scene}>
          <Gradient style={styles.gradient} />
          <ScrollView>
            <View style={styles.view}>
              <Image source={logos['eos']} style={styles.currencyLogo} resizeMode={'cover'} />
              <View style={styles.createWalletPromptArea}>
                <Text style={styles.instructionalText}>{this.state.walletId ? confirmMessageSyntax : instructionSyntax}</Text>
              </View>
            </View>
            {this.state.walletId ? this.renderPaymentReview() : this.renderSelectWallet()}
          </ScrollView>
          {this.state.isModalVisible && (
            <WalletListModal
              topDisplacement={Constants.TRANSACTIONLIST_WALLET_DIALOG_TOP}
              type={Constants.FROM}
              onSelectWallet={this.onSelectWallet}
              includedCurrencyCodes={supportedCurrenciesList}
            />
          )}
        </View>
      </SafeAreaView>
    )
  }
}
