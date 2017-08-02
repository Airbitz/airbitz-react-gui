import React, { Component } from 'react'
import {
  View,
  TextInput
} from 'react-native'
import {TertiaryButton} from '../../../components/Buttons'
import styles from '../style.js'

export class AddressInput extends Component { // this component is for the input area of the Recipient Address Modal
  render () {
    return (
      <View>
        <View style={[styles.addressInputWrap]}>
          <TextInput style={[styles.addressInput]}
            value={this.props.uri}
            onChangeText={this.props.onChangeText}
            autoCapitalize={'none'}
            autoFocus
            placeholder={this.props.copyMessage}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this.props.onSubmit} />
        </View>
        {this.props.copyMessage &&
          <View style={styles.pasteButtonRow}>
            <TertiaryButton text={this.props.copyMessage}
              ellipsizeMode={'middle'}
              onPressFunction={this.props.onPaste}
              numberOfLines={1} />
          </View>
        }
      </View>
    )
  }
}
