// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import SafeAreaView from '../../components/SafeAreaView'

import Gradient from '../../components/Gradient/Gradient.ui'
import RadioButton from './components/RadioButton.ui'
import CustomFees from './components/CustomFees/CustomFeesConnector.js'

import * as FEE from '../../../../constants/FeeConstants'
import s from '../../../../locales/strings.js'

import styles from './style'

const HIGH_FEE_TEXT = s.strings.mining_fee_high_label_choice
const STANDARD_FEE_TEXT = s.strings.mining_fee_standard_label_choice
const LOW_FEE_TEXT = s.strings.mining_fee_low_label_choice

type Props = {
  feeSetting: string,
  onSubmit: (feeSetting: string) => Promise<void>
}
type State = {
  feeSetting: string
}
export class ChangeMiningFee extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      feeSetting: props.feeSetting
    }
  }

  componentWillUnmount () {
    this.props.onSubmit(this.state.feeSetting)
  }

  handlePress = (feeSetting: string, cb: any) => {
    return this.setState({ feeSetting }, cb)
  }

  render () {
    const { feeSetting } = this.state

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Gradient style={styles.gradient} />

          <View style={styles.content}>
            <View style={styles.row}>
              <RadioButton value={FEE.HIGH_FEE} label={HIGH_FEE_TEXT} onPress={this.handlePress} isSelected={FEE.HIGH_FEE === feeSetting} />
            </View>

            <View style={styles.row}>
              <RadioButton value={FEE.STANDARD_FEE} label={STANDARD_FEE_TEXT} onPress={this.handlePress} isSelected={FEE.STANDARD_FEE === feeSetting} />
            </View>

            <View style={styles.row}>
              <RadioButton value={FEE.LOW_FEE} label={LOW_FEE_TEXT} onPress={this.handlePress} isSelected={FEE.LOW_FEE === feeSetting} />
            </View>
            <CustomFees handlePress={this.handlePress} />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default ChangeMiningFee
