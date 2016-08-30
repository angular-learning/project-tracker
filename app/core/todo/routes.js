// dependencies
var express = require('express');
var Todo = require('./models/todo');

// exports
module.exports = function () {
    var router = express.Router();

    router.get('/todo', _getAll);
    router.post('/todo', _create);
    router.delete('/todo/:id', _delete);
    router.post('/todo/:id', _update);

    return router;
};

// private functions

function _getAll(req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            return res.send(err);
        }

        res.json(todos.map(function (todo) {
            return {
                id: todo._id,
                done: todo.done,
                text: todo.text
            };
        }));
    });
}

function _update(req, res) {
    Todo.update({
        _id: req.body.id
    }, {
        $set: {
            text: req.body.text,
            done: req.body.done
        }
        }, function (err, todo) {
        if (err)
            return res.send(err);

        res.json({ id: todo._id });
    });
}

function _create(req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err) {
            return res.send(err);
        }

        res.json({
            done: todo.done,
            text: todo.text,
            id: todo._id
        });
    });
}

function _delete(req, res) {
    Todo.remove({
        _id: req.params.id
    }, function (err, todo) {
        if (err)
            return res.send(err);

        res.json({ id: req.params.id });
    });
}