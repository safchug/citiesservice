const mongo = require('../service/mongo');
const {uid} = require('uid/secure');
const {fetchExistedData} = require('../utils/validation');

exports.citiesByQuery = (req, res) => {
    res.json({message: 'cities is going to be provided'});
}

exports.getCityById = (req, res) => {
    res.json({message: 'city id'});
}

exports.addCity = async (req, res) => {
    try {
        let {name, location, population, area, found} = req.body;

        //a liitle validation
        if (!name) {
            res.json({message: 'name is required'});
        } else if (!location) {
            res.json({message: 'location is required'});
        } else if (!population) {
            res.json({message: 'population is required'});
        }

        let cityId = await mongo.Manager.countCities();

        let city = {id: cityId + 1, name, location, population,
            area, found, userId: req.user.id};

        await mongo.Manager.insertCity(city);
        console.log('add City');
        res.json({message: 'The city has been added'});
    } catch (err) {
        res.json({message: 'something went wrong!'});
    }
}

exports.updateCity = async (req, res) => {
    try {
        let {name, location, population, area, found} = req.body;
        let id = req.params.id;
        let updatedFildes = fetchExistedData(req.body);
        let user = req.user;

        let city = await mongo.Manager.getCityWithId(id);
        if (city.userId === user.id) {
            mongo.Manager.updateCityWithId(id, updatedFildes)
                .then(result => {
                    if(result.result.n !== 0) {
                        res.json({message: `city ${id} has been updated`})
                    } else {
                        res.json({message: `the city with id: ${id} dosn't exist`});
                    }
                }).catch(err => console.log(err));
        } else {
            res.json({message: "you can not do this"});
        }

    } catch (err) {
        console.log(err);
    }
}

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;

        let city = await mongo.Manager.getCityWithId(id);
        let user = req.user;

        if(city.userId === user.id) {
            await mongo.Manager.removeCityWithId(id);
            res.json({message: `city ${id} has been removed`});
        } else {
            res.json({message: 'You can`t do this'});
        }
    } catch (err) {
        console.log(err);
    }
}