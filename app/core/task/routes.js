// dependencies
var express = require('express');
var _ = require('lodash');

var Task = require('./models/task');
var Feature = require('./models/feature');

// exports
module.exports = function () {
    var router = express.Router();

    router.get('/task/:id', _getOne);
    router.get('/task', _getAll);
    router.post('/task', _create);
    router.delete('/task/:id', _delete);
    // router.post('/task/:id', _update);

    return router;
};

function _getOne(req, res) {
    Task
        .findById(req.params.id)
        .populate('features')
        // .populate('createdBy')
        .exec(function (err, task) {
            if (err) {
                return res.send(err);
            }

            var taskModel = { _id: task.id };
            res.json(_.extend(taskModel, _.pick(task, ['name', 'description', 'features'])));
        });
}

function _getAll(req, res) {
    Task
        .find()
        // .populate('features')
        // .populate('createdBy')
        .exec(function (err, tasks) {
            if (err) {
                return res.send(err);
            }

            res.json(tasks.map(function (task) {
                return _.pick(task, ['name']);
            }));
        });
}

function _update(req, res) {
    Task.update({
        _id: req.params.id
    }, {
        $set: {
            name: req.body.name,
            done: req.body.done
        }
    }, function (err, todo) {
        if (err)
            return res.send(err);

        res.json({ id: todo._id });
    });
}

function _create(req, res) {
    var createdAt = new Date();
    Task.create({
        name: req.body.name,
        description: req.body.description,
        createdAt: createdAt,
        modifiedAt: createdAt
    }, function (err, task) {
        if (err) {
            return res.send(err);
        }

        res.json({ id: task._id });
    });
}

function _delete(req, res) {
    Task.remove({
        _id: req.params.id
    }, function (err, todo) {
        if (err) {
            return res.send(err);
        }

        res.json({ id: req.params.id });
    });
}