// @flow

import { showError } from '../components/services/AirshipInstance.js'
import * as CORE_SELECTORS from '../modules/Core/selectors.js'
import * as UI_SELECTORS from '../modules/UI/selectors.js'
import type { Dispatch, GetState } from '../types/reduxTypes.js'

export const updateReceiveAddress = (walletId: string, currencyCode: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const wallet = CORE_SELECTORS.getWallet(state, walletId)

  wallet
    .getReceiveAddress({ currencyCode })
    .then(receiveAddress => {
      dispatch({
        type: 'UPDATE_RECEIVE_ADDRESS_SUCCESS',
        data: { receiveAddress }
      })
    })
    .catch(showError)
}

export const saveReceiveAddress = (receiveAddress: Object) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const selectedWalletId = UI_SELECTORS.getSelectedWalletId(state)
  const selectedCurrencyCode = UI_SELECTORS.getSelectedCurrencyCode(state)
  const wallet = CORE_SELECTORS.getWallet(state, selectedWalletId)

  wallet
    .saveReceiveAddress(receiveAddress)
    .then(() => dispatch(updateReceiveAddress(selectedWalletId, selectedCurrencyCode)))
    .catch(showError)
}
