// dependencies
var express = require('express');
var _ = require('lodash');

var History = require('../models/history.model');

module.exports = {
    all: _getAll,
    delete: _deleteAll,
    create: _create
};

function _create(req, res) {
    History.create({
        description: req.body.description,
        modifiedAt: new Date()
    }, function (err, item) {
        if (err) { return res.send(err); }

        res.status(204).json(_.pick(item, ['id', 'description']));
    });
}

function _getAll(req, res) {
    History
        .find()
        .exec(function (err, historyItems) {
            if (err) {
                return res.send(err);
            }

            res.json(historyItems.map(function (history) {
                return _.pick(history, ['id', 'description']);
            }));
        });
}

function _deleteAll(req, res) {
    History
        .remove({}, function (err, historyItems) {
            if (err) {
                res.send(err);
            }
            res.status(200).json({ status: 'History cleaned' });
        });
}
