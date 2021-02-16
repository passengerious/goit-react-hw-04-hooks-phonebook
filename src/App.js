import { useState, useEffect } from "react";
import shortid from "shortid";
import "./App.css";
import ContactList from "./components/ContactList/ContactList.jsx";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import Filter from "./components/Filter/Filter.jsx";
import Container from './components/Container/Container'

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(data);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (!contacts.find((contact) => contact.name === name)) {
      setContacts((prevContacts) => [contact, ...prevContacts]);
    } else {
      alert(`${name} is already in the list`);
    }
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <div>
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
    </Container>

    <Container>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </Container> 
    </div>
  );
}
