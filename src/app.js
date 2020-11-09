const express = require('express');
const config = require('../config');
const db = require('./models');
const authorization = require('./midlewares/authorization');
const errorHandler = require('./midlewares/errorhandler');

const userRouter = require('./routes/user');
const citiesRouter = require('./routes/cities');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', userRouter);
app.use('/api', citiesRouter);

app.use(errorHandler);

module.exports = app;