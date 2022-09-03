const router = require('express').Router();
const story = require('../model/story');
const crypto = require('crypto');
const Minio = require('minio');
const fs = require('fs');
const server = require('../server');


exports.postStory = (async (req, res) => {

    const minioClient = minio();

    //PutObject(bucketName, objectName, stream, size, metaData[, callback])

    var uuidName = crypto.randomUUID();

    var bucketname = 'minifb';

    var metaData = {
        'Content-Type': 'image'
    }

    try {
        console.log(JSON.stringify(req.body));
        minioClient.fPutObject(bucketname, uuidName, req.file.path, metaData, function (err, etag) {
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
