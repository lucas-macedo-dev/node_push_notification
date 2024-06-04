const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const admin = require('firebase-admin');

const app = express();
const port = 3000;

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'your_pass',
  database: 'push_notification'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/firebase-messaging-sw.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/firebase-messaging-sw.js'));
});

app.post('/save-token', (req, res) => {
  const token = req.body.token;
  const querySelect = 'SELECT * FROM tokens WHERE token = ?';
  const queryInsert = 'INSERT INTO tokens (token) VALUES (?)';

  db.query(querySelect, [token], (err, results) => {
    if (err) {
      return res.status(500).send('Failed to check token');
    }
    if (results.length > 0) {
      return res.status(200).send('Token already exists');
    } else {
      db.query(queryInsert, [token], (err, result) => {
        if (err) {
          return res.status(500).send('Failed to save token');
        }
        res.sendStatus(200);
      });
    }
  });
});

app.get('/tokens', (req, res) => {
  const query = 'SELECT * FROM tokens';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Failed to fetch tokens');
    }
    res.json(results);
  });
});

app.post('/send-notification', (req, res) => {
  const { title, body, token } = req.body;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
      res.send('Notification sent successfully');
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      res.status(500).send('Notification failed');
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
