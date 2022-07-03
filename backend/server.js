const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

//Import routes
const authRoute = require('./routes/auth');

dotenv.config();


//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },() => 
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

app.listen(3000,()=> console.log('Up and running'));
