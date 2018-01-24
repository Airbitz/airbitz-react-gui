/* globals test expect */

import { uiReducer } from './reducer.js'

test('initialState', () => {
  const expected = {
    'contacts': {
      'contactList': []
    },
    'errorAlert': {
      'displayAlert': false,
      'message': ''
    },
    'request': {
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
    'scenes': {
      'ABAlert': {
        'syntax': {},
        'view': false},
      'controlPanel': {
        'selectedUser': null,
        'usersView': false},
      'createWallet': {
        'isCreatingWallet': false},
      'dimensions': {
        'keyboardHeight': 0},
      'editToken': {
        'deleteCustomTokenProcessing': false,
        'deleteTokenModalVisible': false,
        'editCustomTokenProcessing': false},
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
        'torchEnabled': false},
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
        'transaction': null},
      'sideMenu': {
        'view': false},
      'transactionAlert': {
        'abcTransaction': '',
        'displayAlert': false},
      'transactionDetails': {
        'subcategories': []
      },
      'transactionList': {
        'contactsList': [],
        'searchVisible': false,
        'transactions': [],
        'transactionsWalletListModalVisibility': false,
        'updatingBalance': true},
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
        'walletListModalVisible': false},
      'walletTransferList': {
        'walletListModalVisible': false,
        'walletTransferList': []
      }
    },
    'settings': {
      'BCH': {
        'denomination': '100000000'
      },
      'BTC': {
        'denomination': '100000000'
      },
      'DASH': {
        'denomination': '100000000'
      },
      'ETH': {
        'denomination': '1000000000000000000'
      },
      'LTC': {
        'denomination': '100000000'
      },
      'REP': {
        'denomination': '1000000000000000000'
      },
      'WINGS': {
        'denomination': '1000000000000000000'
      },
      'autoLogoutTimeInSeconds': 3600,
      'bluetoothMode': false,
      'changesLocked': true,
      'customTokens': [],
      'defaultFiat': 'USD',
      'isOtpEnabled': false,
      'isTouchEnabled': false,
      'isTouchSupported': false,
      'loginStatus': null,
      'merchantMode': false,
      'otpKey': null,
      'otpMode': false,
      'pinMode': false,
      'plugins': {
        'arrayPlugins': [],
        'supportedWalletTypes': []
      }
    },
    'transactionAlert': {
      'abcTransaction': '',
      'displayAlert': false},
    'wallets': {
      'activeWalletIds': [],
      'addTokenPending': false,
      'archivedWalletIds': [],
      'byId': {},
      'manageTokensPending': false,
      'selectedCurrencyCode': '',
      'selectedWalletId': ''
    }
  }
  const actual = uiReducer(undefined, {})

  expect(actual).toEqual(expected)
})
