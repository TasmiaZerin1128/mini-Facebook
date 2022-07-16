const express = require('express');
const app = express();
const router = require('express').Router();
const status = require('../model/status');
const verify = require('./verifyToken');
const multer = require("multer");
const homeController = require('../controllers/homeController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

router.post('/status', homeController.postStatus);

router.get('/status', homeController.getStatus);

router.post('/story', upload.single("files"), homeController.postStory); //upload.single('story'),

router.get('/story', homeController.getStory);

module.exports = router;