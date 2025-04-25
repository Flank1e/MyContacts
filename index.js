const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3012;

app.use(bodyParser.json());

// Mock user data (replace with a database in a real application)
const users = [{ id: 1, username: 'user', password: 'password' }];
let contacts = [];

// Load contacts from file
try {
    const data = fs.readFileSync('contacts.json', 'utf8');
    contacts = JSON.parse(data);
} catch (err) {
    console.error('Error reading contacts.json:', err);
}

// Save contacts to file
const saveContacts = () => {
    fs.writeFileSync('contacts.json', JSON.stringify(contacts), 'utf8');
};

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Get all contacts
app.get('/contacts', (req, res) => {
    res.json(contacts);
});

// Add a new contact
app.post('/contacts', (req, res) => {
    const newContact = req.body;
    contacts.push(newContact);
    saveContacts();
    res.status(201).json({ message: 'Contact added successfully' });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});