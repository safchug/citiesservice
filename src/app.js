const express = require('express');

const errorHandler = require('./midlewares/errorhandler');
const userRouter = require('./routes/user');
const citiesRouter = require('./routes/cities');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/api', userRouter);
app.use('/api', citiesRouter);

app.use(errorHandler);

module.exports = app;