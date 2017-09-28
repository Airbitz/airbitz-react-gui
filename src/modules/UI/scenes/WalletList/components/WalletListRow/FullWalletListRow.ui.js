import React, {Component} from 'react'
import strings from '../../../../../../locales/default'
import {sprintf} from 'sprintf-js'
import {bns} from 'biggystring'
import {
  View,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import styles from '../../style.js'
import T from '../../../../components/FormattedText'
import RowOptions from './WalletListRowOptions.ui'
import WalletListTokenRow from './WalletListTokenRowConnector.js'
import {border as b, cutOffText, truncateDecimals} from '../../../../../utils.js'
import {selectWallet} from '../../../../Wallets/action.js'
import * as SETTINGS_SELECTORS from '../../../../Settings/selectors'
import platform from '../../../../../../theme/variables/platform.js'

export const findDenominationSymbol = (denoms, value) => {
  for (const v of denoms) {
    if (v.name === value) {
      return v.symbol
    }
  }
}


class FullWalletRow extends Component {
  render () {
    return (
      <View>
        {this.props.data.item.id ? (
          <FullWalletListRowConnect data={this.props.data} />
        ) : (
          <FullListRowEmptyData />
        )}
      </View>
    )
  }
}

export default FullWalletRow

class FullWalletListRow extends Component {

  _onPressSelectWallet = (walletId, currencyCode) => {
    this.props.selectWallet(walletId, currencyCode)
    Actions.transactionList({params: 'walletList'})
  }

  render () {
    const {data} = this.props
    let walletData = data.item
    let currencyCode = walletData.currencyCode
    let denomination = this.props.displayDenomination
    let multiplier = denomination.multiplier
    let id = walletData.id
    let name = walletData.name || sprintf(strings.enUS['string_no_name'])
    let symbol = denomination.symbol
    return (
      <View style={[{width: platform.deviceWidth}, b()]}>
          <View>
            <TouchableHighlight
              style={[styles.rowContainer]}
              underlayColor={'#eee'}
              {...this.props.sortHandlers}
              onPress={() => this._onPressSelectWallet(id, currencyCode)}
            >
              <View style={[styles.rowContent]}>
                <View style={[styles.rowNameTextWrap]}>
                  <T style={[styles.rowNameText]} numberOfLines={1}>{cutOffText(name, 34)}</T>
                </View>
                <View style={[styles.rowBalanceTextWrap]}>
                  <T style={[styles.rowBalanceAmountText]}>
                    {truncateDecimals(bns.divf(walletData.primaryNativeBalance, multiplier).toString(), 6)}
                  </T>
                  <T style={[styles.rowBalanceDenominationText]}>{walletData.currencyCode} ({symbol || ''})</T>
                </View>
                <RowOptions sortableMode={this.props.sortableMode} executeWalletRowOption={walletData.executeWalletRowOption} walletKey={id} archived={walletData.archived} />
              </View>
            </TouchableHighlight>
            {this.renderTokenRow(id, walletData.nativeBalances, this.props.active)}
          </View>
      </View>
    )
  }

  renderTokenRow = (parentId, metaTokenBalances) => {
    let tokens = []
    for (let property in metaTokenBalances) {
      if (property !== this.props.data.item.currencyCode) {
        tokens.push(
          <WalletListTokenRow parentId={parentId}
            currencyCode={property} key={property} balance={metaTokenBalances[property]} active={this.props.active} />)
      }
    }
    return tokens
  }
}

const mapStateToProps = (state, ownProps) => {
  const displayDenomination = SETTINGS_SELECTORS.getDisplayDenomination(state, ownProps.data.item.currencyCode)
  const exchangeDenomination = SETTINGS_SELECTORS.getExchangeDenomination(state, ownProps.data.item.currencyCode)
  return {
    displayDenomination,
    exchangeDenomination
  }
}
const mapDispatchToProps = (dispatch) => ({
  selectWallet: (walletId, currencyCode) => dispatch(selectWallet(walletId, currencyCode))
})

export const FullWalletListRowConnect =  connect(mapStateToProps, mapDispatchToProps)(FullWalletListRow)

class FullListRowEmptyData extends Component {
  render () {
    return (
      <TouchableHighlight
        style={[styles.rowContainer], {height: 50, backgroundColor: 'white', padding: 16, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#EEE'}}
        underlayColor={'#eee'}
        {...this.props.sortHandlers}
      >
        <View style={[styles.rowContent]}>
          <View style={[styles.rowNameTextWrap]}>
            <ActivityIndicator style={{height: 18, width: 18}}/>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}