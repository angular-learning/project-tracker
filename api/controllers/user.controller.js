var express = require('express');
var passport = require('passport');
var User = require('../models/user.model');

module.exports = {
    register: _register,
    login: _login,
    logout: _logout,
    status: _status
};

function _register(req, res) {
    User.register(new User({ login: req.body.login }),
        req.body.password, function (err, account) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
}

function _login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!'
            });
        });
    })(req, res, next);
}

function _logout(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
}

function _status(req, res) {
    res.status(200).json({
        status: 'You are not logged in' 
    });
}