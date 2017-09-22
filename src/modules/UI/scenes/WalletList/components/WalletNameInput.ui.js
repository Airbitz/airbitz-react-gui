// @flow
import React, {Component} from 'react'
import {TextInput, View} from 'react-native'
import styles from '../style'

export default class WalletNameInput extends Component<$FlowFixMeProps> {
  _onNameInputChange = (input) => {
    // be aware that walletListRowOptions.ui.js also initially dispatches this action
    this.props.updateRenameWalletInput(input)
  }

  render () {
    return (
      <View style={[styles.nameInputWrap]}>
        <TextInput style={[styles.nameInput]}
          onChangeText={this._onNameInputChange}
          defaultValue={this.props.currentWalletBeingRenamed} autoFocus />
      </View>
    )
  }
}
