const router = require('express').Router();
const status = require('../model/status');
const verify = require('../routes/verifyToken');

exports.postStatus = (async (req,res) =>{
    //Create a new post
    const newPost = new status({
        name: req.body.name,
        content: req.body.content,
        date: req.body.time,
    });
    try{
        const savedPost = await newPost.save();
        res.send({post: newPost.content});
    } catch(err){
        res.status(400).send({Fail:'Cannot post the content'});
    }
});