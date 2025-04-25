const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const contacts = [
  { id: 1, type: 'Person', name: 'John Doe', labels: ['friend'], relationships: [] },
  { id: 2, type: 'Company', name: 'Acme Corp', labels: ['customer'], relationships: [] },
];

app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
  const newContact = { ...req.body, id: contacts.length + 1 };
  contacts.push(newContact);
  res.json(newContact);
});

app.put('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contactIndex = contacts.findIndex(c => c.id === id);
  if (contactIndex > -1) {
    contacts[contactIndex] = { ...req.body, id };
    res.json({ ...req.body, id });
  } else {
    res.status(404).send('Contact not found');
  }
});

app.delete('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contactIndex = contacts.findIndex(c => c.id === id);
  if (contactIndex > -1) {
    contacts.splice(contactIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Contact not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});