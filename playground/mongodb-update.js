// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').findOneAndUpdate(
        { _id: new ObjectID('5a9c765a6afd96bf9264f354') }, 
        { $set: { age: 3 }}, 
        { returnOriginal: false })
    .then((result) => {
        console.log(result);
    }, (err) => {
        console.log(err);
    });


    db.close();
});