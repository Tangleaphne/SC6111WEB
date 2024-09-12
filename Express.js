const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const app = express();
const port = 3000;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.post('/register', (req, res) => {
/*  const username = req.body.username;
    const password = req.body.password; 

    const hashedPassword = password; */
    console.log('Register endpoint hit');
    const {username, password} = req.body;
    const sql = 'INSERT INTO users1 (username, password) VALUES (?, ?)';
    
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            res.status(500).send('Error: User registration failed');
        } else {
            res.send('Registration successful');
        }
    });
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const sql = 'SELECT * FROM users1 WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
        
});
/*    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error('Database insert error:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Registration successful');
        }
    });    */


app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
});
