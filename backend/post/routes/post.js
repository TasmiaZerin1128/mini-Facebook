const express = require('express');
const app = express();
const router = require('express').Router();
const status = require('../model/status');
const multer = require("multer");
const postController = require('../controllers/postController');

router.post('/status', postController.postStatus);

router.get('/status', postController.getStatus);

module.exports = router;