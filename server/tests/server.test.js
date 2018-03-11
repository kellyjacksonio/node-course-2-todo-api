const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {Todo} = require('../../models/todo');
const {ObjectID} = require('mongodb');

const todos = [{
    text: "first test todo",
    _id: new ObjectID()
}, {
    text: "second test todo",
    completed: true,
    completedAt: 123,
    _id: new ObjectID()
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400) // we set this in the server.js file
            .expect((res) => {
                expect(res.body.name).toBe('ValidationError');
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return a todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
        .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexID}`)
            .expect(404)
        .end(done);
    });

    it('should return a 404 for non-objectIDs', (done) => {
        var notAnID = 123;
        request(app)
            .get(`/todos/${notAnID}`)
            .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexID = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
            })
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.findById(hexID).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((err) => done(err));
        });
    });

    it('should return 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
        .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        var notAnID = 123;
        request(app)
            .delete(`/todos/${notAnID}`)
            .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        //grab id of first item
        var hexID = todos[0]._id.toHexString();
        var text = 'blah';
        //update text, set completed to true
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
        .end(done);
    });
    

    it('should clear completedAt when todo is not completed', (done) => {
        //grab id of second item
        var hexID = todos[1]._id.toHexString();
        var text = 'blahbalbjiodfj';
        
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();            
            })
        .end(done);
        // 200
        //text is changed ,completed is false, completedAt is null .toNotExist
    });
});