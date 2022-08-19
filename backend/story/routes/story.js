const express = require('express');
const app = express();
const router = require('express').Router();
const multer = require("multer");
const storyController = require('../controllers/storyController');

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

router.post('/story', upload.single("files"), storyController.postStory); //upload.single('story'),

router.get('/story', storyController.getStory);

module.exports = router;