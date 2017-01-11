// dependencies
var express = require('express');
var _ = require('lodash');

var Group = require('./models/group');

// exports
module.exports = function () {
    var router = express.Router();

    router.get('/group', _getAll);    
    router.post('/group', _create);
    router.get('/group/:id', _getOne);
    router.post('/group/:id', _update);
    router.delete('/group/:id', _delete);
    
    return router;
};

function _getOne(req, res) {
    Group
        .findById(req.params.id)
        .exec(function (err, group) {
            if (err) {
                return res.send(err);
            }

            var groupModel = { _id: group.id };
            res.json(_.pick(group, ['id', 'name']));
        });
}

function _getAll(req, res) {
    Group
        .find()
        .exec(function (err, groups) {
            if (err) {
                return res.send(err);
            }

            res.json(groups.map(function (group) {
                return _.pick(group, ['id', 'name']);
            }));
        });
}

function _update(req, res) {
    var modifiedAt = new Date();
    Group.update({
        _id: req.params.id
    }, {
        $set: {
            name: req.body.name
        }
    }, function (err, group) {
        if (err)
            return res.send(err);

        res.json({ id: req.params.id });
    });
}

function _create(req, res) {
    var createdAt = new Date();
    Group.create({
        name: req.body.name  
    }, function (err, group) {
        if (err) {
            return res.send(err);
        }

        res.json(_.pick(group, ['id', 'name']));
    });
}

function _delete(req, res) {
    Group.remove({
        _id: req.params.id
    }, function (err, group) {
        if (err) {
            return res.send(err);
        }

        res.json({ id: req.params.id });
    });
}
