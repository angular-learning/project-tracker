var mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
    name: String,
    description: String,
    features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }],
    createdAt: Date,
    modifiedAt: Date,
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});