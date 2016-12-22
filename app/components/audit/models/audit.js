var mongoose = require('mongoose');

module.exports = mongoose.model('History', {    
    description: String,
    modifiedAt: Date,
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
