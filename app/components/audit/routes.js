// dependencies
var express = require('express');
var _ = require('lodash');

var History = require('./models/audit');

// exports
module.exports = function () {
    var router = express.Router();

    router.get('/audit', _getAll);
    router.delete('/audit', _deleteAll);
    return router;
};

function _getAll(req, res) {
    History
        .find()
        .exec(function (err, auditItems) {
            if (err) {
                return res.send(err);
            }

            res.json(auditItems.map(function (audit) {
                return _.pick(audit, ['id', 'description']);
            }));
        });
}

function _deleteAll(req, res) {
    History
        .remove({}, function (err, auditItems) {
            if (err) {
                return res.send(err);
            }
        });
}
