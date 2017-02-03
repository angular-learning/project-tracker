// dependencies
var express = require('express');
var _ = require('lodash');

var Task = require('../models/task.model');
var History = require('../models/history.model');
var Feature = require('../models/feature.model');

module.exports = {
    all: _getAll,
    create: _create,
    one: _getOne,
    update: _update,
    delete: _delete
};

function _getOne(req, res) {
    Task
        .findById(req.swagger.params.id.value)
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
                return _.pick(task, ['id', 'title', 'isDone', 'createdAt']);
            }));
        });
}

function _update(req, res) {
    var modifiedAt = new Date();

    Task.update({
        _id: req.swagger.params.id.value
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

            _writeHistoryMessage('Task ' + req.body.title + ' was updated', modifiedAt);
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

        _writeHistoryMessage('Task ' + req.body.title + ' was created', createdAt);
        res.json(_.pick(task, ['id', 'title', 'isDone', 'description', 'features']));
    });
}

function _delete(req, res) {
    var deletedAt = new Date();
    var id = req.swagger.params.id.value;
    _writeHistoryMessage('Tryig to delete task ' + id);
    Task.remove({
        _id: id
    }, function (err, task) {
        if (err) {
            _writeHistoryMessage('Error deleting task ' + id + ': ' + err);
            return res.send(err);
        }

        _writeHistoryMessage('Task ' + id + ' was deleted', deletedAt);
        res.json({ id: id });
    });
}

function _writeHistoryMessage(message, timestamp) {
    History.create({
        description: message,
        modifiedAt: timestamp
    });
}
