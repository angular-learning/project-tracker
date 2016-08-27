// dependencies

var express = require('express');
var Todo = require('./models/todo');

// exports
module.exports = function () {
    var router = express.Router();

    router.get('/todo', _getAll);
    router.post('/todo', _create);
    router.delete('/todo/:id', _delete);

    return router;
};

// private functions

function _getAll(req, res) {
    Todo.find({ done: false }, function (err, todos) {
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
    Todo.update({
        _id: req.params.id
    }, { $set: { done: true } }, function (err, todo) {
        if (err) {
            return res.send(err);
        }

        res.json({ id: req.params.id });
    });
}