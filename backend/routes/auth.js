const router = require('express').Router();
const user = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation}  = require('../validation');

router.post('/register', async (req,res)=>{

    //Validate first
    const {error} = registerValidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    //Check if already exists
    const emailExists = await user.findOne({email:req.body.email});
    if(emailExists) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);


    //Create a new user
    const newuser = new user({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        dob: req.body.dob
    });
    try{
        const savedUser = await newuser.save();
        res.send({user: newuser._id});
    } catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res)=>{
    //Validate first
    const {error} = loginValidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    //Check if already exists
    const loginUser = await user.findOne({email:req.body.email});
    if(!loginUser) return res.status(400).json('Email or password is wrong!');
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, loginUser.password);
    if(!validPass) return res.status(400).json('Invalid Password!');


    //Create and assign json web token
    const token = jwt.sign({_id: loginUser._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).json(token);

    // res.send({Success: 'Logged In!'});
})
module.exports = router;