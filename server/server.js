const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const {User} = require('../models/user');
const {Todo} = require('../models/todo');

const app = express();
const port = process.env.PORT || 3000;

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
        return res.status(404).send('Invalid todo ID');
    }
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send('This todo does not exist!');
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send(err);
    });
});

// remove todos
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid todo ID');
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send('This todo does not exist!');
        }
        res.status(200).send({todo});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});

module.exports = {app};