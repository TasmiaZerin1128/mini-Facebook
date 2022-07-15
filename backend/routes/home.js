const router = require('express').Router();
const status = require('../model/status');
const verify = require('./verifyToken');
const homeController = require('../controllers/homeController');

router.post('/status', homeController.postStatus);

router.get('/status', homeController.getStatus);

router.post('/story', homeController.postStory);

router.get('/story', homeController.getStory);

module.exports = router;