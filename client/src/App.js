import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/contacts')
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  return (
    <div className="App">
      <h1>My Contacts</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} ({contact.type})
            <button onClick={async () => {
              await fetch(`/api/contacts/${contact.id}`, {
                method: 'DELETE',
              });
              setContacts(contacts.filter(c => c.id !== contact.id));
            }}>
              Delete
            </button>
            <button onClick={() => {
                setContacts(contacts.map(c => {
                  if (c.id === contact.id) {
                    return { ...c, isEditing: true };
                  }
                  return c;
                }));
              }}>
                Edit
              </button>
              {contact.isEditing ? (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const name = e.target.name.value;
                  const type = e.target.type.value;
                  const updatedContact = { ...contact, name, type, isEditing: false };

                  const response = await fetch(`/api/contacts/${contact.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedContact),
                  });

                  const data = await response.json();
                  setContacts(contacts.map(c => {
                    if (c.id === contact.id) {
                      return data;
                    }
                    return c;
                  }));
                }}>
                  <label>
                    Name:
                    <input type="text" name="name" defaultValue={contact.name} />
                  </label>
                  <label>
                    Type:
                    <select name="type" defaultValue={contact.type}>
                      <option value="Person">Person</option>
                      <option value="Company">Company</option>
                      <option value="Group">Group</option>
                    </select>
                  </label>
                  <button type="submit">Update</button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      <h2>Add Contact</h2>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const type = e.target.type.value;
        const newContact = { name, type };

        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newContact),
        });

        const data = await response.json();
        setContacts([...contacts, data]);

        e.target.reset();
      }}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Type:
          <select name="type">
            <option value="Person">Person</option>
            <option value="Company">Company</option>
            <option value="Group">Group</option>
          </select>
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
