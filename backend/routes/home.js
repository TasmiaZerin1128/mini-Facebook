const router = require('express').Router();
const status = require('../model/status');
const verify = require('./verifyToken');
const homeController = require('../controllers/homeController');

router.post('/status', homeController.postStatus);

router.get('/status', homeController.getStatuses);

module.exports = router;