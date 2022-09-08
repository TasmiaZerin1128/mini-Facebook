const router = require('express').Router();
const story = require('../model/story');
const crypto = require('crypto');
const Minio = require('minio');
const fs = require('fs');
const server = require('../server');


exports.postStory = (async (req, res) => {

    console.log('hello from post story');

    const minioClient = minio();

    minioClient.makeBucket('minifb', 'us-east-1', function(err) {
        if (err) return console.log(err)

        console.log('Bucket created successfully');
    });

    var uuidName = crypto.randomUUID() + '.png';

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

exports.storyInd = ((req, res) =>{
    try {
        let data;

        minioClient = minio();

        minioClient.getObject('minifb', req.params.id, (err, objStream) => {

            console.log('DHUKSEE');
            if(err) {
               
                return res.status(404).send({ message: "Image not found" });
            } 
            //console.log("req is " + req.params.id);
            objStream.on('data', (chunk) => {
                data = !data ? new Buffer(chunk) : Buffer.concat([data, chunk]);
            });
            objStream.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            });
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error at fetching image" });
    }
});

//chocolate

function minio() {

    return new Minio.Client({
        endPoint: 'storyobjectdb',
        port: 9000,
        useSSL: false,
        accessKey: 'minioadmin',
        secretKey: 'minioadmin'
        // accessKey: process.env.ACCESS_KEY,
        // secretKey: process.env.SECRET_KEY
    });
}
