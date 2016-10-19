// dependencies
var express = require('express');
var _ = require('lodash');

var User = require('./models/user');

// exports
module.exports = function () {
    var router = express.Router();

    router.get('/user', _getAll);    
    router.post('/user', _create);
    router.get('/user/:id', _getOne);
    router.post('/user/:id', _update);
    router.delete('/user/:id', _delete);
    
    return router;
};

function _getOne(req, res) {
    User
        .findById(req.params.id)
        .exec(function (err, user) {
            if (err) {
                return res.send(err);
            }

            var userModel = { _id: user.id };
            res.json(_.pick(user, ['id', 'name']));
        });
}

function _getAll(req, res) {
    User
        .find()
        .exec(function (err, users) {
            if (err) {
                return res.send(err);
            }

            res.json(users.map(function (user) {
                return _.pick(user, ['id', 'name']);
            }));
        });
}

function _update(req, res) {
    var modifiedAt = new Date();
    User.update({
        _id: req.params.id
    }, {
        $set: {
            name: req.body.name,
            displayName: req.body.displayName,
            modifiedAt: modifiedAt
        }
    }, function (err, user) {
        if (err)
            return res.send(err);

        res.json({ id: req.params.id });
    });
}

function _create(req, res) {
    var createdAt = new Date();
    User.create({
        name: req.body.name,
        displayName: req.body.displayName,
        createdAt: createdAt              
    }, function (err, user) {
        if (err) {
            return res.send(err);
        }

        res.json(_.pick(user, ['id', 'name']));
    });
}

function _delete(req, res) {
    user.remove({
        _id: req.params.id
    }, function (err, user) {
        if (err) {
            return res.send(err);
        }

        res.json({ id: req.params.id });
    });
}
