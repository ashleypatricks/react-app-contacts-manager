import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  // Initialise contact context
  const contactContext = useContext(ContactContext);

  // Destructure some state from the contacts context
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem contact={contact} key={contact.id}></ContactItem>
          ))
        : contacts.map(contact => (
            <ContactItem contact={contact} key={contact.id}></ContactItem>
          ))}
    </Fragment>
  );
};

export default Contacts;
