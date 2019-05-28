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

    temp:{
        type:Number,
        default:balance
    },
    
    savings:{
        type:Number,
        default:0
    },

    withdrawal:{
        type:Number,
        default:0
    }
});

