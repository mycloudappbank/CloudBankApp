var mongoose = require('mongoose');

//user
module.exports = mongoose.model('User', {
    user_name: {
        type: String,
        default: ''
    },

    password: {
        type: String,
        default: ''
    },

    balance: {
        type: Number,
        default: 0
    }
});
