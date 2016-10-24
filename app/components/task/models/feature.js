var mongoose = require('mongoose');

module.exports = mongoose.model('Feature', {
    name: String,
    description: String,
    modifiedAt: Date,
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
