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

module.exports = {Todo};