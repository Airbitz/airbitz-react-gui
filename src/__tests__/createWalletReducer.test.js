// @flow

/* globals test expect */

import { createWallet as createWalletReducer } from '../reducers/scenes/CreateWalletReducer.js'

const dummyAction = { type: 'DUMMY_ACTION_PLEASE_IGNORE' }

test('initialState', () => {
  const expected = {
    isCreatingWallet: false,
    walletAccountActivationPaymentInfo: {
      paymentAddress: '',
      nativeAmount: '',
      currencyCode: '',
      exchangeAmount: '',
      expirationDate: 0
    },
    isCheckingHandleAvailability: false,
    isHandleAvailable: false,
    handleActivationInfo: {
      supportedCurrencies: {},
      activationCost: ''
    }
  }
  const actual = createWalletReducer(undefined, dummyAction)

  expect(actual).toEqual(expected)
})
