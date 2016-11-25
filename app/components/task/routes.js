// dependencies
var express = require('express');
var _ = require('lodash');

var Task = require('./models/task');
var Audit = require('../audit/models/audit');
var Feature = require('./models/feature');

// exports
module.exports = function () {
    var router = express.Router();

    router.get('/task', _getAll);
    router.post('/task', _create);
    router.get('/task/:id', _getOne);
    router.post('/task/:id', _update);
    router.delete('/task/:id', _delete);

    return router;
};

function _getOne(req, res) {
    Task
        .findById(req.params.id)
        //.populate('features')
        // .populate('createdBy')
        .exec(function (err, task) {
            if (err) {
                return res.send(err);
            }

            var taskModel = { _id: task.id };
            res.json(_.pick(task, ['id', 'title', 'isDone']));
        });
}

function _getAll(req, res) {
    Task
        .find()
        .sort({ createdAt: 1 })
        // .populate('features')
        // .populate('createdBy')
        .exec(function (err, tasks) {
            if (err) {
                return res.send(err);
            }

            res.json(tasks.map(function (task) {
                return _.pick(task, ['id', 'title', 'isDone']);
            }));
        });
}

function _update(req, res) {
    var modifiedAt = new Date();

    Task.update({
        _id: req.params.id
    }, {
            $set: {
                title: req.body.title,
                isDone: req.body.isDone,
                description: req.body.description,
                modifiedAt: modifiedAt
            }
        }, function (err, task) {
            if (err)
                return res.send(err);

            _writeAuditMessage('Task ' + req.body.title + ' was updated', modifiedAt);
            res.json({ id: req.params.id });
        });
}

function _create(req, res) {
    var createdAt = new Date();
    Task.create({
        title: req.body.title,
        isDone: false,
        description: req.body.description,
        createdAt: createdAt,
        modifiedAt: createdAt
    }, function (err, task) {
        if (err) {
            return res.send(err);
        }

        _writeAuditMessage('Task ' + req.body.title + ' was created', createdAt);
        res.json(_.pick(task, ['id', 'title', 'isDone', 'description', 'features']));
    });
}

function _delete(req, res) {
    var deletedAt = new Date();
    _writeAuditMessage('Tryig to delete task ' + req.params.id);
    Task.remove({
        _id: req.params.id
    }, function (err, task) {
        if (err) {
            _writeAuditMessage('Error deleting task ' + req.params.id + ': ' + err);
            return res.send(err);
        }

        _writeAuditMessage('Task ' + req.params.id + ' was deleted', deletedAt);
        res.json({ id: req.params.id });
    });
}

function _writeAuditMessage(message, timestamp) {
    Audit.create({
        description: message,
        modifiedAt: timestamp
    });
}
