import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { CLEAR_CURRENT } from '../../context/types';

const ContactForm = () => {
  // Grab the ContactForm context
  const contactContext = useContext(ContactContext);

  // Take out some state and functions from the context
  const { addContact, current, clearCurrent, updateContact } = contactContext;

  // The state of the form which is changed when we start typing
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  // This hook is run when the component loads for the 1st time and also when 'createContext' or 'current' values change.
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  // grab some values from the contact state
  const { name, email, phone, type } = contact;

  /**
   * On Change
   */
  const onChange = e =>
    setContact({
      ...contact,
      [e.target.name]: e.target.value // Key-value pair of [element_name_attribute_value] : element_value
    });

  /**
   * On Submit
   */
  const onSubmit = e => {
    e.preventDefault();

    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    clearAll();
  };

  /**
   * Clear All
   */
  const clearAll = () => {
    clearCurrent();
  };

  /**
   * Return
   */
  return (
    <form onSubmit={onSubmit}>
      <h2 style={{ textAlign: 'center' }} className='text-primary'>
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
