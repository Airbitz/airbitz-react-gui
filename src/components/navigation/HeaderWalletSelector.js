// @flow

import * as React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import { selectWalletFromModal } from '../../actions/WalletActions.js'
import { type WalletListResult, WalletListModal } from '../../components/modals/WalletListModal.js'
import { type Theme, type ThemeProps, cacheStyles, withTheme } from '../../components/services/ThemeContext.js'
import { EdgeText } from '../../components/themed/EdgeText.js'
import s from '../../locales/strings.js'
import type { Dispatch, RootState } from '../../types/reduxTypes.js'
import { ArrowDownTextIconButton } from '../common/ArrowDownTextIconButton.js'
import { Airship } from '../services/AirshipInstance.js'

type OwnProps = {
  showWalletNameOnly?: boolean
}

type StateProps = {
  selectedWalletName: string | null,
  selectedWalletCurrencyCode: string
}

type DispatchProps = {
  onSelectWallet(string, string): void
}

type Props = OwnProps & StateProps & DispatchProps & ThemeProps

class HeaderWalletSelectorComponent extends React.PureComponent<Props> {
  handlePress = () => {
    Airship.show(bridge => <WalletListModal bridge={bridge} headerTitle={s.strings.select_wallet} />).then(({ walletId, currencyCode }: WalletListResult) => {
      if (walletId && currencyCode) {
        this.props.onSelectWallet(walletId, currencyCode)
      }
    })
  }

  renderTitle = () => {
    const styles = getStyles(this.props.theme)
    if (this.props.selectedWalletName) {
      return (
        <EdgeText>
          {this.props.selectedWalletName + ': '}
          <EdgeText style={styles.boldText}>{this.props.selectedWalletCurrencyCode}</EdgeText>
        </EdgeText>
      )
    } else {
      return <EdgeText>{s.strings.loading}</EdgeText>
    }
  }

  render() {
    const { showWalletNameOnly, theme } = this.props
    const styles = getStyles(theme)
    return (
      <View style={styles.container}>
        {showWalletNameOnly ? this.renderTitle() : <ArrowDownTextIconButton onPress={this.handlePress} title={this.renderTitle()} />}
      </View>
    )
  }
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.rem(1.5)
  },
  boldText: {
    fontFamily: theme.fontFaceBold
  }
}))

export const HeaderWalletSelector = connect(
  (state: RootState): StateProps => {
    const walletId = state.ui.wallets.selectedWalletId
    const selectedWallet = state.ui.wallets.byId[walletId]

    return {
      selectedWalletName: selectedWallet ? selectedWallet.name : null,
      selectedWalletCurrencyCode: state.ui.wallets.selectedCurrencyCode
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    onSelectWallet: (walletId: string, currencyCode: string) => dispatch(selectWalletFromModal(walletId, currencyCode))
  })
)(withTheme(HeaderWalletSelectorComponent))
