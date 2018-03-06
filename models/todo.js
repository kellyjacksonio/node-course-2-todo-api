const mongoose = require('mongoose');

var TodoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number
    }
});

var Todo = mongoose.model('Todo', TodoSchema);

// var newTodo = new Todo({
//     text: 'be a bic'
// });

// newTodo.save().then((result) => {
//     console.log(`saved todo: ${JSON.stringify(result, undefined, 2)}`);
// }, (err) => {
//     console.log(err);
// });

module.exports = {Todo};