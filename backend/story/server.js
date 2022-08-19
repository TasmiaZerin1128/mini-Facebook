const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Minio = require('minio');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { static } = require('express');

//Import routes
const storyRoute = require('./routes/story');

dotenv.config();


//connect to DB
mongoose.connect(process.env.DB_CONNECT_LOCAL, { useNewUrlParser: true },() => 
    console.log('Connected to DB')
);

//Middlewares
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: true }));

//Route Middlewares

app.use('/api/home', storyRoute);


app.listen(5000,()=> console.log('Up and running'));


