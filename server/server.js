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
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.send(err);
    });
});

app.listen(3000, () => {
    console.log('listening!');
});

module.exports = {app};