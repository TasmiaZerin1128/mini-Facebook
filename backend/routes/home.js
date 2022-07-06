const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/',verify, (req,res) =>{
    res.json({
        posts:{
            title: "Testing",
            description: "I love you"
        }
    });
});

router.post('/post', async (req,res) =>{
    //Create a new post
    const newPost = new post({
        _id: req.body._id,
        name: req.body.name,
        content: req.body.content,
        time: req.body.time
    });
    try{
        const savedUser = await newuser.save();
        res.send({user: newuser._id});
    } catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;