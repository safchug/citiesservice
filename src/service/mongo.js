var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbname = "citiesService";

var db;


module.exports = () => {
    MongoClient.connect(url).then((client)=>{
        db = client.db(dbname);
    });
}

module.exports.Manager = {
    saveUser(obj) {
        return db.collection('users').insertOne(obj);
    },
    getUserWithLogin(login) {
        return db.collection('users').findOne({login: login});
    },

    getUserWithId(id) {
        return db.collection('users').findOne({id: id});
    },

    insertCity(obj) {
        return db.collection('cities').insertOne(obj);
    },

    countCities() {
        return db.collection('cities').count();
    },

    updateCityWithId(id, updatedFields, userId) {
        let query = {id: Number.parseInt(id), userId};
        console.log('query', query);
        let newValues = {$set: {...updatedFields}};
        console.log(newValues);
        return db.collection('cities').updateOne(query, newValues);
    },

    removeCityWithId(id) {
        let query = {id: Number.parseInt(id)};

        return db.collection('cities').deleteOne(query);
    },

    getCityWithId(id) {
        let query = {id: Number.parseInt(id)};
        console.log(query);
        return db.collection('cities').findOne(query);
    },

    getCitiesWithQuery(reqQuery) {
        let query = {name: reqQuery};
        return db.collection('cities')
            .find(query, {projection: {id: 1, name: 2,
                    population: 3, area: 4, found: 5, location: 6}}).toArray();
    },

    getAllCities() {
        return db.collection('cities').find({}).toArray();
    }
}