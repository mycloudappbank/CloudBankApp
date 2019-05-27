var mongoose = require('mongoose');

//user
module.exports = mongoose.model('User', {
    username: {
        type: String,
        default: ''
    },

    password: {
        type: String,
        default: ''
    },

    balance: {
        type:Number,
        default: 0
    },

    savings:{
        type:Number,
        default:''
    },

    withdrawal:{
        type:Number,
        default:''
    }
});
