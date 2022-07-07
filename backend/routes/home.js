const router = require('express').Router();
const status = require('../model/status');
const verify = require('./verifyToken');
const homeController = require('../controllers/homeController');

router.get('/status',verify, (req,res) =>{
    res.json({
        posts:{
            title: "Testing",
            description: "I love you"
        }
    });
});

router.post('/status', homeController.postStatus);

module.exports = router;