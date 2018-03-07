const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

var validID = '5a9f0356c5f105db7f994ebd';
var invalidID = '5a9f0356c5f105db7f994ebe';
var validUserID = '5a9e1d96d5ead9d086125bed';
var invalidUserID = '5a9e1d96d5ead9d086125bee';
var notAnID = '123';

if(!ObjectID.isValid(notAnID)) {
    console.log('ID not valid');
}

Todo.find({
    _id: validID
}).then((todos) => {
    console.log('Find all that match:', todos);
}, (err) => {
    console.log('ID does not exist');
});

Todo.findOne({
    _id: invalidID
}).then((todo) => {
    if(!todo) {
        return console.log('ID not found');
    }
    console.log('FIND ONE ONLY:', todo);
}).catch((err) => console.log(err));

Todo.findById(notAnID).then((todos) => {
    console.log('Todos', todos);
}).catch((err) => console.log(err.message));

User.findById(invalidUserID).then((user) => {
    if(!user) {
        return console.log('user doesn\'t exist');
    }
    console.log(user);
}).catch((err) => console.log(err.message));