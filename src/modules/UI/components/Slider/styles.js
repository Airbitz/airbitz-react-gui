// @flow

import { StyleSheet } from 'react-native'

import { scale } from '../../../../lib/scaling'
import THEME from '../../../../theme/variables/airbitz'
import { PLATFORM } from '../../../../theme/variables/platform.js'

const debug = {
  borderWidth: 1,
  borderColor: 'red'
}

export const rawStyles = {
  container: {},
  slider: {
    backgroundColor: THEME.COLORS.OPACITY_WHITE,
    overflow: 'hidden',
    borderRadius: 26,
    height: scale(52)
  },
  thumb: {
    width: scale(52),
    height: scale(52),
    position: 'absolute',
    backgroundColor: THEME.COLORS.ACCENT_MINT,
    borderRadius: scale(52)
  },
  textOverlay: {
    backgroundColor: THEME.COLORS.TRANSPARENT,
    fontSize: PLATFORM.deviceWidth >= 320 ? scale(13) : scale(16),
    position: 'absolute',
    color: THEME.COLORS.WHITE,
    alignSelf: 'center',
    top: PLATFORM.deviceWidth >= 320 ? scale(19) : scale(16)
  },
  debug
}

export const styles = StyleSheet.create(rawStyles)

export default styles
