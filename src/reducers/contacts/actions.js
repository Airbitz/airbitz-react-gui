// @flow

import type { GuiContact } from '../../types'

export const PREFIX = 'CONTACTS/'
export const LOAD_CONTACTS_START = PREFIX + 'LOAD_CONTACTS_START'
export const LOAD_CONTACTS = PREFIX + 'LOAD_CONTACTS'

export const loadContactsStart = () => ({
  type: LOAD_CONTACTS_START
})

export const loadContacts = (contacts: Array<GuiContact>) => ({
  type: LOAD_CONTACTS,
  data: { contacts }
})
