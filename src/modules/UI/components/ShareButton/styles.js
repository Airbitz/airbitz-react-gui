import {StyleSheet} from 'react-native'
import THEME from '../../../../theme/variables/airbitz'

export default StyleSheet.create({
  shareButton: {
    flex: 1,
    backgroundColor: THEME.COLORS.TRANSPARENT,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingVertical: 7    ,
    flexDirection: 'row'
  },
  outerView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    flex: 1,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 2
  },
  text: {
    fontSize: 17,
    color: 'rgba(255,255,255,1)'
  }
})
