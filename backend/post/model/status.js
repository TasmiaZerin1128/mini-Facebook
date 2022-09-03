const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    time:{
        type: Date,
        default: Date.now,
        required: true
    },
    userID:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('status', statusSchema);