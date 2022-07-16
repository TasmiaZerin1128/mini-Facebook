const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Minio = require('minio');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { static } = require('express');

//Import routes
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');

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

app.use('/api', authRoute);
app.use('/api/home', homeRoute);


app.listen(3000,()=> console.log('Up and running'));

const minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY
});

if(minioClient){
    console.log('minIO connected');
}

module.exports = { minioClient };


