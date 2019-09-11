const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const userRoutes = require('./api/routes/user');
const uniRoutes = require('./api/routes/university');


mongoose.connect('mongodb+srv://jlo:' + process.env.MONGO_ATLAS_PW + '@unidb-imig3.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
});






app.use(morgan('dev'));
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(bodyParser.json());

//cors handeling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origins,X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });
//handling routes

app.use('/user',userRoutes);

app.use('/university',uniRoutes);

//handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error
      }
    });
  });
  
  module.exports = app;