const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

// Todo.remove({}).then((res) => {
//     console.log(res);
// })

// Todo.findOneAndRemove({
//     text: ''
// }).then((res) => {
//     console.log(res);
// });

Todo.findByIdAndRemove('5aa4560ad7b90c53340aea25').then((todo) => {
    console.log(todo);
});