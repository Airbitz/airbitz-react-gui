import {
  StyleSheet,
  Platform
} from 'react-native'
import {colors as c, opacity as activeOpacity} from '../../../../theme/variables/airbitz.js'
import platform from '../../../../theme/variables/platform.js'

export default StyleSheet.create({
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
    backgroundColor: 'transparent'
  },
  totalBalanceHeader: {
    flex: 2,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  totalBalanceText: {
    fontSize: 18,
    color: c.primary
  },
  currentBalanceBoxDollarsWrap: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  currentBalanceBoxDollars: {
    color: c.primary,
    fontSize: 44
  },
  currentBalanceBoxBits: {
    color: 'white',
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
    backgroundColor: 'transparent',
    fontSize: 22
  },
  walletsBoxHeaderText: {
    fontSize: 18,
    color: 'white',
    backgroundColor: 'transparent',
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
    color: 'white',
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent'
  },
  archiveBoxHeaderWrap: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#BBB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50
  },
  archiveBoxHeaderTextWrap: {

  },
  archiveIcon: {
    backgroundColor: 'transparent',
    fontSize: 28
  },
  archiveBoxHeaderText: {
    fontSize: 18,
    backgroundColor: 'transparent',
    color: 'white',
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#EEE'
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
    color: c.gray1
  },
  rowBalanceTextWrap: {
    justifyContent: 'center'
  },
  rowBalanceAmountText: {
    fontSize: 16,
    color: c.gray1,
    textAlign: 'right'
  },
  rowBalanceDenominationText: {
    fontSize: 14,
    color: c.gray1,
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
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  menuOptionItem: {
    flexDirection: 'row'
  },
  optionText: {
    color: c.gray1,
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
    borderBottomColor: '#dddddd',
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
    color: c.gray1
  },
  emptyBottom: {
    flex: 1
  },
  subHeaderSyntax: {
    color: c.gray1,
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
    color: 'white',
    fontSize: 16
  },
  cancelButtonWrap: {
    backgroundColor: c.gray2,
    alignSelf: 'flex-start'
  },
  cancelButton: {
    color: '#3c76cd'
  },
  doneButtonWrap: {
    backgroundColor: '#4977BB',
    alignSelf: 'flex-end',
    marginLeft: 4
  },
  doneButton: {
    color: '#3c76cd'
  },
  // beginning of token rows //
  tokenRowContainer: {
    padding: 16,
    paddingLeft: 30,
    paddingRight: 44,
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderColor: '#EEE'
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
    color: c.gray1
  },
  // end of token rows //,,

  activeOpacity: {
    opacity: activeOpacity.opacity
  }
})
