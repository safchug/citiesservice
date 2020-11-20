const expres = require('express');
const bodyParser = require('body-parser');
const citiesService = require('../service/cities');
const userService = require('../service/user');

const authorization = require('../midlewares/authorization');
const {uid} = require('uid/secure');
const {fetchExistedData, isUpdateRequestPassedData} = require('../utils/validation');
const validation = require('../midlewares/validation');
const sitiesSchema = require('../schemas/citiesSchemas');

const router = expres.Router();
const urlencoded = bodyParser.urlencoded({extended: true});

router.get('/cities', getCityWithQuery);

router.get('/cities/:id',
    validation(sitiesSchema.paramId, 'params'),
    getCityWithId
);

router.post('/cities' ,
    bodyParser.json(),
    urlencoded , authorization,
    validation(sitiesSchema.addCity, 'body'),
    addCity
);

router.put('/cities/:id',
    validation(sitiesSchema.paramId, 'params'),
    bodyParser.json(),
    urlencoded,
    validation(sitiesSchema.updateCity, 'body'),
    authorization,
    updateSity
);

router.delete('/cities/:id' ,
    validation(sitiesSchema.paramId, 'params'),
    authorization,
    deleteCity
);

async function getCityWithQuery(req, res, next)  {
    try {
        let name = req.query.query;
        if(name) {
            let citiesList = await citiesService.getCitiesWithQuery(name);

            if(citiesList.length === 0) {
                res.json({message: 'There is no match'});
            } else {
                for(let city of citiesList) {
                    delete city._id;
                }

                res.json(citiesList);
            }
        } else {
            let allCitiesList = await citiesService.getAllCities();
            for(let city of allCitiesList) {
                delete city._id;
            }

            res.json(allCitiesList);
        }
    } catch (err) {
        next(err);
    }

}

async function getCityWithId (req, res, next)  {

    try {
        let id = req.params.id;
        let city = await citiesService.getCityWithId(id);
        if(!city) {
            let myErr = new Error('bad reques');
            myErr.code = 400;
            throw myErr;
        }
        let user = await userService.getUserWithId(city.userId);
        let respose = {};
        respose.id = city.id;
        respose.name = city.name;
        respose.location = city.location;
        respose.population = city.population;
        respose.area = city.area;
        respose.found = city.found;
        respose.user = {};
        respose.user.name = user.name;
        respose.user.mail = user.mail;
        respose.user.birthday = user.birhday;
        res.json(respose);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function addCity(req, res, next) {
    try {
        let {name, location, population, area, found} = req.body;

        let cityId = await citiesService.getTheLastId();

        let city = {id: cityId + 1, name, location, population,
            area, found, userId: req.user.id};

        await citiesService.insertCity(city);
        console.log('add City');
        res.json({message: 'The city has been added'});
    } catch (err) {
       next(err);
    }
}

async function updateSity(req, res, next) {

    try {
        let {name, location, population, area, found} = req.body;
        let id = req.params.id;

        let updatedFildes = fetchExistedData(req.body);

        let user = req.user;

        let affectedCities = await citiesService
            .updateCityWithIdAndUserId(id, updatedFildes, user.id);
        if(affectedCities.result.nModified > 0 ) {
            res.json({message: `The city ${id} has been updated`});
        } else {
            let myErr = new Error('None of cities was updated');
            myErr.code = 403;
            throw myErr;
        }
    } catch (err) {
        next(err);
    }
}

async function deleteCity(req, res, next) {
    try {
        let id = req.params.id;
        let user = req.user;

        let removedCities = await citiesService.removeCityWithId(id, user.id);
        if(removedCities.deletedCount > 0) {
            res.json({message: `city ${id} has been removed`});
        } else {
            let myErr = new Error('None of cities was removed');
            myErr.code = 403;
            throw myErr;
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = router;