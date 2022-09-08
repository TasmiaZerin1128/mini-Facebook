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
dotenv.config();


//connect to DB
mongoose.connect(process.env.DB_CONNECT_LOCAL, { useNewUrlParser: true },(err, client) => {
    if (err) {
        return console.log('Cannot connect '+ err);
    }
    console.log('Connected to DB')
}
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




