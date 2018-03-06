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

var newUser = new User({
    email: 'kellyjackson.2015@gbic.com'
});

newUser.save().then((result) => {
    console.log('Welcome,', result);
}, (err) => {
    console.log(err);
});

module.exports = {User};