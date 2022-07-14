const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    story:{
        type: File,
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

module.exports = mongoose.model('story', storySchema);