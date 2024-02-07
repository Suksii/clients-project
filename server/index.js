const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'practicedb'
}
);

let currentUser = null;

app.post('/register', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    const values = [username, email, password];

    db.query(sql, values, (err, result) => {
        if(err) {
            return res.send({err: err});
        }
        else {
            res.send({result, message: 'User successfully registered!'});

        }
    });
})

app.post('/check-email', (req, res) => {
    const checkEmail = req.body.email;

    const sql = 'SELECT COUNT(*) as count FROM users WHERE email= ?';
    const values = [checkEmail];

    db.query(sql, values, (err, result) => {
        if(err) {
            return res.send({err: err});
        }
        const emailExists = result[0].count > 0;
        return res.send({exists: emailExists})
    })
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(sql, [email, password], (err, result) => {
        if(err) {
            res.send({err: err});
        }
        if(result.length > 0) {
            currentUser = result[0];
            const token = jwt.sign({ userId: currentUser.id, email: currentUser.email}, 'MY_SECRET_KEY', {expiresIn: '1h'});
            res.send({token: token, user: currentUser});
        }
        else {
            res.send({message: 'Wrong email/password combination!'});
        }
    });
})
app.get('/current-user', (req, res) =>{
    return res.send(currentUser)
})

app.post('/add-client', (req, res) => {
    const clientName = req.body.clientName;
    const clientPhone = req.body.clientPhone;
    const clientEmail = req.body.clientEmail;
    const clientAge = req.body.clientAge;

    const sql = 'INSERT INTO clients (client_name, client_phone, client_email, client_age) VALUES (?, ?, ?, ?)';

    const values = [clientName, clientPhone, clientEmail, clientAge];

    db.query(sql, values, (err, result) => {
        if(err){
            return res.send({err: err});
        }
        else {
            res.send({result, message: 'Client successfully added!'});
        }
    })
})

app.get('/clients', (req, res) => {
    const sql = 'SELECT * FROM clients';

    db.query(sql, (err, result) => {
        if(err) {
            return res.send({err: err});
        }
        else {
            res.send(result);
        }
    })
})

app.delete('/delete-client/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM clients WHERE client_id = ?';
    db.query(sql, id, (err, result) => {
        if(err) {
            return res.send({err: err});
        }
    })
})

app.get('/api/get/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM clients WHERE client_id = ?';
    db.query(sql, id, (err, result) => {
        if(err) {
            return res.send({err: err});
        }
        else {
            res.send(result);
        }
    })
})

app.put('/api/put/:id', (req, res) => {
    const {id} = req.params;
    const {clientName, clientPhone, clientEmail, clientAge} = req.body;
    const sql = 'UPDATE clients SET client_name = ?, client_phone = ?, client_email = ?, client_age = ? WHERE client_id = ?';

    const values = [clientName, clientPhone, clientEmail, clientAge, id];

    db.query(sql, values, (err, result) => {
        if(err) {
            return res.send({err: err});
        }
        else {
            res.send({result, message: 'Client successfully updated!'});
        }
    })
})


