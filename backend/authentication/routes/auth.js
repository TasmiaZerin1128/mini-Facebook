const router = require('express').Router();
const authController = require('../controllers/authController');


router.post('/authenticate/register', authController.getRegistered);

router.post('/authenticate/login', authController.getLoggedIn);

router.get('/authenticate/user-profile/:_id', authController.getUserProfile);

router.get('/authenticate/users', authController.getAllUsers);

module.exports = router;