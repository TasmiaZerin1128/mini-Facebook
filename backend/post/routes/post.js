const express = require('express');
const app = express();
const router = require('express').Router();
const status = require('../model/status');
const multer = require("multer");
const postController = require('../controllers/postController');

router.post('/post', postController.postStatus);

router.get('/post/:_id', postController.getStatus);

module.exports = router;