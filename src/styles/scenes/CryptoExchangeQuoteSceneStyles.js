// @flow

import { scale } from '../../lib/scaling'
import THEME from '../../theme/variables/airbitz'
import * as Styles from '../indexStyles'

const CryptoExchangeQuoteSceneStyles = {
  scene: Styles.SceneContainer,
  gradient: {
    height: THEME.SPACER.HEADER
  },
  topRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  centerRow: {
    flex: 2,
    alignItems: 'center'
  },
  bottomRow: {
    flex: 1,
    padding: '5%'
  },
  slideContainer: {
    height: scale(35)
  },
  logoImage: {
    width: '80%',
    resizeMode: 'contain'
  },
  confirmText: {
    color: THEME.COLORS.WHITE,
    fontSize: 14,
    paddingTop: scale(10),
    paddingBottom: scale(10),
    width: '100%',
    textAlign: 'center'
  },
  quoteDetailContainer: {
    container: {
      width: '90%',
      borderRadius: 3
    },
    containerCollapsed: {
      width: '100%',
      height: scale(65),
      backgroundColor: THEME.COLORS.OPACITY_WHITE,
      borderRadius: 3
    },
    containerExpanded: {
      width: '100%',
      height: scale(110),
      backgroundColor: THEME.COLORS.OPACITY_WHITE,
      borderRadius: 3
    },
    headlineText: {
      color: THEME.COLORS.WHITE,
      fontSize: scale(14),
      paddingTop: scale(10),
      paddingBottom: scale(10)
    },
    minerFeeText: {
      color: THEME.COLORS.WHITE,
      fontSize: scale(14),
      paddingTop: scale(10),
      paddingBottom: scale(10)
    },
    minerFeeRightText: {
      color: THEME.COLORS.WHITE,
      fontSize: scale(14),
      paddingTop: scale(10),
      paddingBottom: scale(10),
      alignSelf: 'flex-end'
    },
    currencyNameText: {
      color: THEME.COLORS.WHITE,
      fontSize: scale(16),
      paddingTop: scale(10),
      paddingLeft: scale(10)
    },
    cryptoAmountText: {
      color: THEME.COLORS.WHITE,
      fontSize: scale(16),
      paddingTop: scale(10),
      paddingRight: scale(10)
    },
    walletNameText: {
      color: THEME.COLORS.WHITE,
      fontSize: scale(16),
      paddingLeft: 10
    },
    fiatAmountText: {
      color: THEME.COLORS.WHITE,
      fontSize: scale(16),
      paddingRight: 10
    },
    topRow: {
      height: scale(65),
      flexDirection: 'row'
    },
    bottomRow: {
      height: scale(45),
      paddingRight: 10,
      paddingLeft: 10
    },
    bottomContentBox: {
      borderTopWidth: 1,
      flexDirection: 'row',
      borderColor: THEME.COLORS.WHITE
    },
    bottomContentBoxLeft: {
      flex: 1
    },
    bottomContentBoxRight: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    walletInfoContainer: {
      flex: 5,
      alignItems: 'flex-start'
    },
    amountInfoContainer: {
      flex: 4,
      alignItems: 'flex-end'
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: scale(10),
      paddingLeft: 5
    },
    iconContainer: {
      position: 'relative',
      height: scale(29),
      width: scale(29),
      backgroundColor: THEME.COLORS.OPACITY_WHITE,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    currencyIcon: {
      height: scale(25),
      width: scale(25),
      resizeMode: 'contain'
    },
    altCurrencyText: {
      color: THEME.COLORS.WHITE,
      fontSize: scale(14)
    }
  }
}

export { CryptoExchangeQuoteSceneStyles }
