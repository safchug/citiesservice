const express = require('express');
const config = require('../config');
const db = require('./service/mongo');
const authorization = require('./midlewares/authorization');

//Starting a connection to mongo
db();

const user = require('./routes/user');
const cities = require('./routes/cities');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(authorization);

app.post('/registration', user.registration);
app.post('/login', user.login);

app.get('/cities', cities.citiesByQuery);
app.get('/cities/:id', cities.getCityById);
app.post('/cities', cities.addCity);
app.put('/cities/:id', cities.updateCity);
app.delete('/cities/:id', cities.delete);


module.exports = app;