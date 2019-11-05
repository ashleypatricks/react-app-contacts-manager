import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  // STATE //
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jermaine Brown',
        email: 'jermaine@live.co.uk',
        phone: '555-555-5555',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Johnathan Kaonga',
        email: 'jk@live.co.uk',
        phone: '444-444-4444',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Martyn Morrison',
        email: 'martyn@live.co.uk',
        phone: '333-333-3333',
        type: 'professional'
      }
    ]
  };

  // SET THE REDUCER //
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ACTIONS //

  /**
   * Add Contact
   */

  /**
   * Delete Contact
   */

  /**
   * Set Current Contact
   */

  /**
   * Clear Current Contact
   */

  /**
   * Update Contact
   */

  /**
   * Filter Contacts
   */

  /**
   * Clear Filter
   */

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
