var mongoose = require('mongoose');

module.exports = mongoose.model('Group', {
    name: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
