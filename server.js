const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let inbox = {};

app.post('/api/generate', (req, res) => {
    const id = Math.random().toString(36).substring(7);
    inbox[id] = [];
    setTimeout(() => { delete inbox[id]; }, 600000); // Email hapus otomatis dlm 10 menit
    res.json({ email: `${id}@temp.com`, id: id });
});

app.get('/api/inbox/:id', (req, res) => {
    res.json(inbox[req.params.id] || []);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Temporal running on port ${PORT}`);
});
