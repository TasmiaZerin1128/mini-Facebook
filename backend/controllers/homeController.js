const router = require('express').Router();
const status = require('../model/status');
const story = require('../model/story');
const verify = require('../routes/verifyToken');
const crypto = require('crypto');
const Minio = require('minio');
const fs = require('fs');
const server = require('../server');
const authController = require('../controllers/authController');


exports.postStatus = (async (req, res) => {
    //Create a new post
    const newPost = new status({
        name: req.body.name,
        content: req.body.content,
        time: req.body.time,
        userID: req.body.userID,
    });
    try {
        const savedPost = await newPost.save();
        res.send({ post: newPost.content });
    } catch (err) {
        res.status(400).send({ Fail: 'Cannot post the content' });
    }
});

exports.getStatus = (async (req, res) => {

    try {
        userID = authController.loggedInUser.name;
        const allStatus = await status.find({ name: { $ne: userID } }).sort({ "time": -1 }).limit(10);        // -1 means descending  $ne for not equal to;
        res.send(allStatus);
    } catch (err) {
        res.status(400).send({ Fail: 'Statuses not found' });
    }

});

exports.postStory = (async (req, res) => {

    const minioClient = minio();

    //PutObject(bucketName, objectName, stream, size, metaData[, callback])

    var uuidName = crypto.randomUUID();

    var metaData = {
        'Content-Type': 'image'
    }

    try {
        console.log(JSON.stringify(req.body));
        minioClient.fPutObject('minifb', uuidName, req.file.path, metaData, function (err, etag) {
            if (err) return console.log(err)
            console.log('File uploaded successfully. ' + uuidName)
            // Delete example_file.txt
            fs.unlink(req.file.path, (err => {
                if (err) console.log(err);
                else {
                    console.log("\nDeleted file");
                }
            }));
        });

        //Create a new story
        const newStory = new story({
            name: req.body.name,
            storyUUID: uuidName,
            userID: req.body.userID,
        });
        try {
            const savedStory = await newStory.save();
            res.send({ story: 'Uploaded Successfully' });
        } catch (err) {
            res.status(400).send(err);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});


exports.getStory = (async (req, res) => {
    try {
        const allStory = await story.find().sort({ "time": -1 }).limit(10);       // -1 means descending
        res.send(allStory);
    } catch (err) {
        res.status(400).send({ Fail: 'Image not found' });
    }
});

function minio() {
    return new Minio.Client({
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        accessKey: process.env.ACCESS_KEY,
        secretKey: process.env.SECRET_KEY
    });
}
