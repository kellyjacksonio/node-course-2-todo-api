// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').find({
        _id: new ObjectID('5a9da8cfd7b90c53340ab464')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('unable to fetch todos', err);
    });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('unable to fetch todos', err);
    });

    db.collection('Todos').find({completed: true}).count().then((count) => {
        console.log(count);
    }, (err) => {
        if(err) {
            return console.log('Unable to fetch count', err);
        }
    });
    // db.close();
});