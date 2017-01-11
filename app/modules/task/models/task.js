var mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
    title: String,
    isDone: Boolean,
    description: String,
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timeline: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, timestamp: Date }],
    features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }],
    createdAt: Date,
    modifiedAt: Date,
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    access: [{ groupId: String, canEdit: Boolean}]
});
