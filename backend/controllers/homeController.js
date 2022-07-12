const router = require('express').Router();
const status = require('../model/status');
const verify = require('../routes/verifyToken');

exports.postStatus = (async (req,res) =>{
    //Create a new post
    const newPost = new status({
        name: req.body.name,
        content: req.body.content,
        time: req.body.time,
        userID: req.body.userID,
    });
    try{
        const savedPost = await newPost.save();
        res.send({post: newPost.content});
    } catch(err){
        res.status(400).send({Fail:'Cannot post the content'});
    }
});

exports.getStatuses = (async (req,res) =>{
    try{
        const allStatus = await status.find().sort({"time":-1}).limit(10);        // -1 means descending
        res.send(allStatus);
    } catch(err){
        res.status(400).send({Fail: 'Statuses not found'});
    }
    
    
});