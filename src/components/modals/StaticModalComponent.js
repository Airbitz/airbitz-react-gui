// @flow

import React, { Component } from 'react'
import { StaticModalStyle } from '../../styles/indexStyles.js'
// import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { View, TouchableOpacity, Text } from 'react-native'
import { Icon } from '../../modules/UI/components/Icon/Icon.ui'
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient'
import THEME from '../../theme/variables/airbitz'
import * as Constants from '../../constants/indexConstants.js'

type Props = {
  modalDismissTimerSeconds: number,
  body: string,
  cancel(): void
}
class StaticModalComponent extends Component<Props> {
  componentDidMount () {
    if (this.props.modalDismissTimerSeconds) {
      setTimeout(() => {
        this.props.cancel()
      }, this.props.modalDismissTimerSeconds * 1000)
    }
  }
  render () {
    const styles = StaticModalStyle
    return <Modal
      style={styles.container}
      animationType={'slide'}
      transparent
      visible
    >
      <TouchableOpacity style={styles.touchOut}
        onPress={this.props.cancel}>
        <View style={styles.modalBox}>
          <LinearGradient
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              THEME.COLORS.GRADIENT.DARK,
              THEME.COLORS.GRADIENT.LIGHT
            ]}
          >
          <Icon style={styles.icon}
            name={Constants.CHECK_CIRCLE}
            size={styles.iconSize}
            type={Constants.SIMPLE_ICONS} />
          </LinearGradient>
          <View style={styles.bottom}>
            <View style={styles.bodyRow} >
              <Text>{this.props.body}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  }
}

export { StaticModalComponent }
