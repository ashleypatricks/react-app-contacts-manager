import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
  // STATE -- Hard Coded Contacts were in use until we hooked up the state with the backend:

  /*
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
    type: 'personal'
  }
  */

  const initialState = {
    contacts: null,
    current: null, // The current contact being updated
    filtered: null, // The current contacts being filtered
    error: null
  };

  // SET THE REDUCER //
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ACTIONS //

  /**
   * Get Contacts
   */
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');

      dispatch({ type: GET_CONTACTS, payload: res.data }); // The user's contact
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.serverMessage });
    }
  };

  /**
   * Add Contact
   */
  const addContact = async contact => {
    // Only used uuid to create a unique id for the hardcoded contacts before we hookd up the backend. So this is no longer needed. Mongo DB creates it's own ID's.
    // contact.id = uuid.v4();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      } // No need to set the token here as it is sent globally depending on what token is in the local storage.
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data }); // Send the server response to the dispatch
      console.log(res.data);
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.serverMessage });
    }
  };

  /**
   * Delete Contact
   */
  const deleteContact = async id => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.serverMessage });
    }
  };

  /**
   * Update Contact
   */
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      console.log(res.data.result);

      dispatch({ type: UPDATE_CONTACT, payload: res.data.result });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.serverMessage });
    }
  };

  /**
   * Clear Contacts
   */
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  /**
   * Set Current Contact
   */
  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  /**
   * Clear Current Contact
   */
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  /**
   * Filter Contacts
   */
  const filterContacts = queryText => {
    dispatch({ type: FILTER_CONTACTS, payload: queryText });
  };

  /**
   * Clear Filter
   */
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  /**
   * Return
   */
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
