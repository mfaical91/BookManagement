const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuration de la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book_management',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});

// Routes
app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/books', (req, res) => {
    const { title, text } = req.body;
    db.query('INSERT INTO books (title, text) VALUES (?, ?)', [title, text], (err, results) => {
        if (err) throw err;
        res.send({ message: 'Livre ajouté', id: results.insertId });
    });
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM books WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.send({ message: 'Livre supprimé' });
    });
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
