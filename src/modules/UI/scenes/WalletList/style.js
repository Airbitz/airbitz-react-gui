import {
  StyleSheet,
  Platform
} from 'react-native'
import platform from '../../../../theme/variables/platform.js'
import THEME from '../../../../theme/variables/airbitz'

export const styles = {
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  totalBalanceBox: { // one
    height: 111,
    justifyContent: 'center'
  },
  totalBalanceWrap: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: THEME.COLORS.TRANSPARENT
  },
  totalBalanceHeader: {
    flex: 2,
    justifyContent: 'flex-end',
    backgroundColor: THEME.COLORS.TRANSPARENT
  },
  totalBalanceText: {
    fontSize: 18,
    color: THEME.COLORS.PRIMARY
  },
  currentBalanceBoxDollarsWrap: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.TRANSPARENT
  },
  currentBalanceBoxDollars: {
    color: THEME.COLORS.PRIMARY,
    fontSize: 44
  },
  currentBalanceBoxBits: {
    color: THEME.COLORS.WHITE,
    justifyContent: 'space-around',
    flex: 1
  },
  // bottom major portion of screen
  walletsBox: { // one
    flex: 1
  },
  walletsBoxHeaderWrap: {
    paddingLeft: 12,
    paddingRight: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50
  },
  walletsBoxHeaderTextWrap: {
    paddingVertical: 12
  },
  leftArea: {
    flexDirection: 'row'
  },
  walletIcon: {
    backgroundColor: THEME.COLORS.TRANSPARENT,
    fontSize: 22
  },
  walletsBoxHeaderText: {
    fontSize: 18,
    color: THEME.COLORS.WHITE,
    backgroundColor: THEME.COLORS.TRANSPARENT,
    marginLeft: 16
  },
  donePlusContainer: {
    minWidth: 48,
    height: 50
  },
  plusContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  doneContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  walletsBoxDoneTextWrap: {
    paddingVertical: 12
  },
  walletsBoxDoneText: {
    fontSize: 18,
    color: THEME.COLORS.WHITE,
    backgroundColor: THEME.COLORS.TRANSPARENT,
    top: 0,
    left: 0
  },
  walletsBoxHeaderAddWallet: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    height: '100%',
    paddingVertical: 12
  },
  dropdownIcon: {
    textAlignVertical: 'center',
    alignSelf: 'center',
    backgroundColor: THEME.COLORS.TRANSPARENT
  },
  archiveBoxHeaderWrap: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: THEME.COLORS.GRAY_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50
  },
  archiveBoxHeaderTextWrap: {

  },
  archiveIcon: {
    backgroundColor: THEME.COLORS.TRANSPARENT,
    fontSize: 28
  },
  archiveBoxHeaderText: {
    fontSize: 18,
    backgroundColor: THEME.COLORS.TRANSPARENT,
    color: THEME.COLORS.WHITE,
    marginLeft: 14
  },
  archiveBoxHeaderDropdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sortableWalletList: {
    flexDirection: 'column',
    alignContent: 'stretch'
  },
  listsContainer: {
    flex: 1
  },
  sortableList: {
    flex: 1,
    position: 'absolute',
    height: platform.usableHeight - 130 - 50,
  },
  sortableWalletListRow: {
    width: platform.deviceWidth,
    height: 50,
    backgroundColor: THEME.COLORS.WHITE,
    padding: 16,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: THEME.COLORS.WHITE
  },
  fullList: {
    flex: 1,
    position: 'absolute',
    height: platform.usableHeight - 130 - 50,
  },
  rowContainer: {
    padding: 6,
    paddingLeft: 16,
    marginRight: 4,
    flexDirection: 'row',
    backgroundColor: THEME.COLORS.WHITE
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row'
  },
  rowNameTextWrap: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 5
  },
  rowNameText: {
    fontSize: 18,
    color: THEME.COLORS.GRAY_1
  },
  rowBalanceTextWrap: {
    justifyContent: 'center'
  },
  rowBalanceAmountText: {
    fontSize: 16,
    color: THEME.COLORS.GRAY_1,
    textAlign: 'right'
  },
  rowBalanceDenominationText: {
    fontSize: 14,
    color: THEME.COLORS.GRAY_1,
    textAlign: 'right'
  },
  rowDotsWrap: {
    flexDirection: 'row',
    width: 46
  },
  rowDragArea: {
    paddingLeft: 16,
    justifyContent: 'center',
    marginRight: 14
  },
  rowDragIcon: {
    position: 'relative',
    top: 16
  },
  menuTrigger: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 14,
    paddingRight: 10
  },
  // beginning of options component
  menuOption: {
    borderBottomColor: THEME.COLORS.GRAY_4,
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  menuOptionItem: {
    flexDirection: 'row'
  },
  optionText: {
    color: THEME.COLORS.GRAY_1,
    fontSize: 18
  },
  editIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center'
  },
  trashIcon: {
    marginRight: 13,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center'
  },
  archive: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center'
  },
  nameInputWrap: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    marginTop: 0,
    marginBottom: 0,
    borderBottomColor: THEME.COLORS.GRAY_4,
    borderBottomWidth: (Platform.OS === 'ios')
      ? 1
      : 0
  },
  nameInput: {
    height: (Platform.OS === 'ios')
      ? 26
      : 46,
    textAlign: 'center',
    fontSize: 20,
    color: THEME.COLORS.GRAY_1
  },
  emptyBottom: {
    flex: 1
  },
  subHeaderSyntax: {
    color: THEME.COLORS.GRAY_1,
    textAlign: 'center',
    fontSize: 14
  },
  // buttons
  buttonsWrap: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  stylizedButton: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 3
  },
  stylizedButtonTextWrap: {},
  stylizedButtonText: {
    color: THEME.COLORS.WHITE,
    fontSize: 16
  },
  cancelButtonWrap: {
    backgroundColor: THEME.COLORS.GRAY_2,
    alignSelf: 'flex-start'
  },
  cancelButton: {
    color: THEME.COLORS.SECONDARY
  },
  doneButtonWrap: {
    backgroundColor: THEME.COLORS.PRIMARY,
    alignSelf: 'flex-end',
    marginLeft: 4
  },
  doneButton: {
    color: THEME.COLORS.PRIMARY
  },
  // beginning of token rows //
  tokenRowContainer: {
    padding: 16,
    paddingLeft: 30,
    paddingRight: 44,
    backgroundColor: THEME.COLORS.GRAY_4,
    borderBottomWidth: 1,
    borderColor: THEME.COLORS.GRAY_3
  },
  tokenRowContent: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  tokenRowNameTextWrap: {
    justifyContent: 'center'
  },
  tokenRowText: {
    fontSize: 16,
    color: THEME.COLORS.GRAY_1
  },
  // end of token rows //,,

  activeOpacity: {
    opacity: THEME.OPACITY.ACTIVE
  },
  walletRowUnderlay: {
    color: THEME.COLORS.GRAY_3
  },
  tokenRowUnderlay: {
    color: THEME.COLORS.GRAY_3
  },
  emptyRow: {
    height: 50,
    backgroundColor: THEME.COLORS.WHITE,
    padding: 16,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: THEME.COLORS.GRAY_4
  },
  emptyRowUnderlay: {
    color: THEME.COLORS.GRAY_3
  }
}

export default StyleSheet.create(styles)
