// ************************************************************
// * 2 - Книга контактів
// * refactoring for hooks - two components (App and ContactForm)

import React, { Fragment, useEffect, useState } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Header } from 'common/styledCommon';
import localStorageApi from 'common/localStorageApi';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  //@Mounting contacts are retrieved from local storage
  useEffect(() => {
    const cont = localStorageApi.getContacts();
    if (cont.length) {
      setContacts(cont);
    }
  }, []);

  //@contacts change save to local storage
  useEffect(() => localStorageApi.saveContacts(contacts), [contacts]);

  const deleteContact = id =>
    setContacts(prev => prev.filter(contact => contact.id !== id));

  const addContact = newContact => {
    if (
      contacts.find(
        contact =>
          contact.name.toLocaleLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      window.alert(`Error! ${newContact.name} is already in the contacts`);
      setFilter(newContact.name.toLowerCase());
      return false;
    }

    setContacts(contacts => [newContact, ...contacts]);
    setFilter('');
    return true;
  };

  const getFilteredContacts = () =>
    !filter
      ? contacts
      : contacts.filter(contact => contact.name.toLowerCase().includes(filter));

  return (
    <Fragment>
      <Header>Phonebook</Header>
      <ContactForm addContact={addContact} />
      <Header as="h2">Contacts</Header>
      <Filter
        value={filter}
        onChange={({ target: { value } }) => {
          setFilter(value.toLowerCase());
        }}
      />
      {contacts && (
        <ContactList
          contacts={getFilteredContacts()}
          deleteContact={deleteContact}
        />
      )}
    </Fragment>
  );
};

export default App;
