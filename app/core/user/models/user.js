var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name: String,
    displayName: String,
    createdAt: Date
});