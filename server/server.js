const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
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
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos,
        code: 'ya ha ha'});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.send('Invalid todo ID');
    }
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.send('This todo does not exist!');
        }
        res.send(todo.text);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('listening!');
});

module.exports = {app};