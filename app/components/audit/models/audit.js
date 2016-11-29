var mongoose = require('mongoose');

module.exports = mongoose.model('Audit', {    
    description: String,
    modifiedAt: Date,
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
