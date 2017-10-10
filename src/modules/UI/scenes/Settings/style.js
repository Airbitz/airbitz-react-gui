import {StyleSheet} from 'react-native'
import THEME from '../../../../theme/variables/airbitz'

export default StyleSheet.create({
  listStyle: {
    height: 100
  },
  unlockRow: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50
  },
  accountBoxHeaderTextWrap: {

  },
  leftArea: {
    flexDirection: 'row'
  },
  userIcon: {
    backgroundColor: THEME.COLORS.TRANSPARENT,
    fontSize: 22
  },
  accountBoxHeaderText: {
    fontSize: 18,
    color: THEME.COLORS.WHITE,
    backgroundColor: THEME.COLORS.TRANSPARENT,
    marginLeft: 16
  },
  dropdownIcon: {
    textAlignVertical: 'center',
    alignSelf: 'center',
    height: 24,
    fontSize: 24,
    backgroundColor: THEME.COLORS.TRANSPARENT
  },
  optionsIcon: {
    backgroundColor: THEME.COLORS.TRANSPARENT,
    fontSize: 22
  },

    // //// Beginning of Settings Row ///////
  settingsRowContainer: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY_2,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'space-around'
  },
  settingsRowTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  settingsRowLeftContainer: {
    justifyContent: 'center'
  },
  settingsRowRightContainer: {
    justifyContent: 'center'
  },
  settingsRowLeftText: {
    color: THEME.COLORS.GRAY_1,
    fontSize: 16
  },
  settingsRowRightArrow: {
    color: THEME.COLORS.GRAY_1
  },
  modalRightText: {
    color: THEME.COLORS.SECONDARY,
    fontWeight: 'bold'
  },
  routeRowRightText: {
    color: THEME.COLORS.SECONDARY,
    fontWeight: 'bold'
  },

    // /////// End of Settings Row /////////

  debugArea: {
    padding: 20,
    flex: 1
  },

  emptyBottom: {
    height: 51,
    flex: 1
  },

    // //////// Start of Currency Settings//////
  bitcoinSettings: {
    flex: 1
  },

  headerRow: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50
  },
  headerTextWrap: {
    height: 10
  },
  headerText: {
    fontSize: 18,
    color: THEME.COLORS.WHITE,
    backgroundColor: THEME.COLORS.TRANSPARENT,
    marginLeft: 16
  },
  headerIcon: {
    backgroundColor: THEME.COLORS.TRANSPARENT,
    fontSize: 22
  }

    // //////// End of Currency Settings//////

})
