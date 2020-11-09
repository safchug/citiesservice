const expres = require('express');
const citiesService = require('../service/cities');
const authorization = require('../midlewares/authorization');
const {uid} = require('uid/secure');
const {fetchExistedData, isUpdateRequestPassedData} = require('../utils/validation');

const router = expres.Router();

router.get('/cities', async(req, res, next) => {
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

});
router.get('/cities/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let city = await citiesService.getCityWithId(id);
        let user = await citiesService.getUserWithId(city.userId);
        let respose = {};
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
        res.json({message: 'something went wrong'});
    }
});

router.post('/cities' , authorization, async (req, res) => {
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

        let cityId = await citiesService.countCities();

        let city = {id: cityId + 1, name, location, population,
            area, found, userId: req.user.id};

        await citiesService.insertCity(city);
        console.log('add City');
        res.json({message: 'The city has been added'});
    } catch (err) {
        res.json({message: 'something went wrong!'});
    }
});

router.put('/cities/:id', authorization, async (req, res) => {
    try {
        let {name, location, population, area, found} = req.body;
        let id = req.params.id;

        if (!isUpdateRequestPassedData(req.body)) throw new Error('You didnt pass any data');
        let updatedFildes = fetchExistedData(req.body);

        let user = req.user;
        if(!user) {throw new Error('You are not logined')}

            let affectedCities = await citiesService
                .updateCityWithIdAndUserId(id, updatedFildes, user.id);
        if(affectedCities.result.nModified > 0 ) {
            res.json({message: `The city ${id} has been updated`});
        } else {
            res.json({message: "you can not do this"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: err.message});
    }
});

router.delete('/cities/:id' , authorization, async (req, res) => {
    try {
        let id = req.params.id;
        let user = req.user;

        let removedCities = await citiesService.removeCityWithId(id, user.id);
        if(removedCities.deletedCount > 0) {
            res.json({message: `city ${id} has been removed`});
        } else {
            res.json({message: 'You can`t do this'});
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;