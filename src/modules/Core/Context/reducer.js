// @flow

import { type DiskletFolder } from 'disklet'
import type { EdgeContext } from 'edge-core-js'
import { type Reducer } from 'redux'

import { type Action } from '../../../types/reduxTypes.js'

export type ContextState = {
  context: EdgeContext | Object,
  folder: DiskletFolder | Object,
  nextUsername: string
}

const initialState = {
  context: {},
  folder: {},
  nextUsername: ''
}

export const context: Reducer<ContextState, Action> = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'CORE/CONTEXT/ADD_CONTEXT': {
      if (!action.data) throw new Error('Invalid action')
      const context: EdgeContext = action.data.context
      const folder: DiskletFolder = action.data.folder
      return {
        ...state,
        context,
        folder
      }
    }

    case 'DEEP_LINK_RECEIVED':
    case 'LOGOUT': {
      if (!action.data) throw new TypeError('Invalid action')
      const { username } = action.data
      return {
        ...state,
        nextUsername: username || ''
      }
    }

    default:
      return state
  }
}