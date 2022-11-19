import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./filter/Filter";
import ContactList from "./ContactList/ContactList";
import { v4 as uuidv4 } from "uuid";

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) || [ 
         { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
         { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
         { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
         { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },]
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify([...contacts]));
  }, [contacts]);

  const checkExistAndAdd = (newContact) => {
    contacts.some(
      (contact) =>
        contact.name.toLocaleLowerCase() ===
          newContact.name.toLocaleLowerCase() ||
        contacts.some((contact) => contact.number === newContact.number)
    )
      ? alert(
          `Conact ${newContact.name} or number ${newContact.number} is alredy exist`
        )
      : setContacts([...contacts, { ...newContact, id: uuidv4() }]);
  };

  const handleFilter = (e) => {
    setFilter(e.currentTarget.value);
  };
  const filteredContacts = () =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div
      style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      fontSize: 20,
      color: '#010101',
      padding: '20px 10px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm checkExist={checkExistAndAdd} />

      <h2>Contacts</h2>
      <Filter inputValue={filter} handleFilter={handleFilter} />
      <ContactList contacts={filteredContacts()} handleDelete={handleDelete} />
    </div>
  );
}

export default App;