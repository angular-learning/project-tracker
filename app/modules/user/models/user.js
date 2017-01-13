// user model
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({    
    login: String,
    password: String,
    displayName: String,
    createdAt: Date
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);