const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        minLength: 1,
        required: true,
        trim: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};