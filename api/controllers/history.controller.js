// dependencies
var express = require('express');
var _ = require('lodash');

var History = require('../models/history.model');

module.exports = {
    all: _getAll,
    delete: _deleteAll
};

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
                res.status(500).json({ error: err});
            }
            res.status(200).json({ status: 'History cleaned' });
        });
}
