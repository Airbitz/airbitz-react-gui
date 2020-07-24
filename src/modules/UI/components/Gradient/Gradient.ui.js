// @flow

import type { Node } from 'react'
import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { type ThemeProps, withTheme } from '../../../../theme/ThemeContext.js'
import { getObjectDiff } from '../../../../util/utils'

const UPPER_LEFT = { x: 0, y: 0 }
const UPPER_RIGHT = { x: 1, y: 0 }

export type OwnProps = {
  children?: Node,
  reverse?: boolean,
  style?: StyleSheet.Styles
}
type Props = OwnProps & ThemeProps

class GradientComponent extends PureComponent<Props> {
  shouldComponentUpdate(nextProps: Props) {
    const diffElement = getObjectDiff(this.props, nextProps, { style: true, children: true })
    return !!diffElement
  }

  render() {
    const { children, reverse, theme, style } = this.props
    const colors = [theme.background1, theme.background2]
    const reverseColors = [theme.background2, theme.background1]
    return (
      <LinearGradient style={style} start={UPPER_LEFT} end={UPPER_RIGHT} colors={reverse ? reverseColors : colors}>
        {children}
      </LinearGradient>
    )
  }
}

export const Gradient = withTheme(GradientComponent)
export default Gradient
