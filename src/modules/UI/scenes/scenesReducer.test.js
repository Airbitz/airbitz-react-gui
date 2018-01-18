/* globals test expect */

import { scenes as scenesReducer } from './reducer.js'

test('initialState',
() => {
  const expected = {
    'ABAlert': {
      'syntax': {},
      'view': false
    },
    'controlPanel': {
      'selectedUser': null,
      'usersView': false
    },
    'createWallet': {
      'isCreatingWallet': false
    },
    'dimensions': {
      'keyboardHeight': 0
    },
    'editToken': {
      'deleteCustomTokenProcessing': false,
      'deleteTokenModalVisible': false,
      'editCustomTokenProcessing': false
    },
    'exchangeRate': {
      'exchangeRates': {}
    },
    'helpModal': false,
    'request': {
      'inputCurrencySelected': 'fiat',
      'receiveAddress': {
        'amountSatoshi': 0,
        'metadata': {
          'amountFiat': 0,
          'bizId': null,
          'category': '',
          'miscJson': '',
          'notes': '',
          'payeeName': ''
        },
        'publicAddress': ''
      }
    },
    'scan': {
      'addressModalVisible': false,
      'recipientAddress': '',
      'scanEnabled': false,
      'scanToWalletListModalVisibility': false,
      'selectedWalletListModalVisibility': false,
      'torchEnabled': false
    },
    'sendConfirmation': {
      'displayAmount': undefined,
      'draftStatus': 'under',
      'error': null,
      'feeSatoshi': 0,
      'feeSetting': 'standard',
      'inputCurrencySelected': 'fiat',
      'isKeyboardVisible': false,
      'isPinEnabled': false,
      'isSliderLocked': false,
      'label': '',
      'maxSatoshi': 0,
      'parsedUri': {
        'nativeAmount': '',
        'publicAddress': ''
      },
      'pending': false,
      'publicAddress': '',
      'transaction': null
    },
    'sideMenu': {
      'view': false
    },
    'transactionAlert': {
      'abcTransaction': '',
      'displayAlert': false
    },
    'transactionDetails': {
      'subcategories': []
    },
    'transactionList': {
      'contactsList': [],
      'searchVisible': false,
      'transactions': [],
      'transactionsWalletListModalVisibility': false,
      'updatingBalance': true
    },
    'walletList': {
      'deleteWalletModalVisible': false,
      'getSeedWalletModalVisible': false,
      'privateSeedUnlocked': false,
      'renameWalletInput': '',
      'renameWalletModalVisible': false,
      'resyncWalletModalVisible': false,
      'splitWalletModalVisible': false,
      'walletArchivesVisible': false,
      'walletId': '',
      'walletName': ''
    },
    'walletListModal': {
      'walletListModalVisible': false
    },
    'walletTransferList': {
      'walletListModalVisible': false,
      'walletTransferList': []
    }
  }
  const actual = scenesReducer(undefined, {})

  expect(actual).toEqual(expected)
})
