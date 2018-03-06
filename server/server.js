const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {User} = require('../models/user');
const {Todo} = require('../models/todo');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('bic');
});

app.post('/todos', (req, res) => {
    console.log(req.body);
});

app.listen(3000, () => {
    console.log('listening!');
});
