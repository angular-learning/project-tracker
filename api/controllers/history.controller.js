// dependencies
var express = require('express');
var _ = require('lodash');

var History = require('./models/history.model');

// exports
module.exports = function () {
    var router = express.Router();

    router.get('/history', _getAll);
    router.delete('/history', _deleteAll);
    return router;
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
                return res.send(err);
            }
        });
}
