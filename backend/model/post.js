const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },
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
        required: true
    }
});

module.exports = mongoose.model('post', userSchema);