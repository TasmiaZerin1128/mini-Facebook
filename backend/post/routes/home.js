const express = require('express');
const app = express();
const router = require('express').Router();
const status = require('../model/status');
const multer = require("multer");
const homeController = require('../controllers/homeController');

router.post('/status', homeController.postStatus);

router.get('/status', homeController.getStatus);

module.exports = router;