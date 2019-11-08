import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  // Initialise ContactContext
  const contactContext = useContext(ContactContext);

  // Destructure the methods & state from the context
  const { filterContacts, clearFilter, filtered } = contactContext;

  // useRef is to reeference DOM objects - we won't create a piece of state for the input of the filter we will use a ref instead. It's an alternative that you can use when you play with simple forms etc. We will make the initial value to be an empty string.
  const text = useRef('');

  /**
   * Use Effect
   */
  useEffect(() => {
    // Ensure that if there is no filtered contacts present then reset the ref to an empty string. This is important so that text is not left inside the ref from a previous search.
    if (filtered == null) {
      text.current.value = '';
    }
  }, []);

  /**
   * On Change
   */
  const onChange = e => {
    if (text.current.value !== '') {
      console.log(text.current.value);
      // text.current.value is the current value of the text reference
      filterContacts(e.target.value); // e for 'event' target value is the value of the text field
    } else {
      clearFilter();
    }
  };

  /**
   * Return
   */
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
