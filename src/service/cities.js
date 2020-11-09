var db = require('../models');

module.exports = {

    async insertCity(obj) {
        db = await db();
        return db.collection('cities').insertOne(obj);
    },

    async countCities() {
        db = await db();
        return db.collection('cities').count();
    },

    async updateCityWithId(id, updatedFields, userId) {
        db = await db();
        let query = {id: Number.parseInt(id), userId};
        console.log('query', query);
        let newValues = {$set: {...updatedFields}};
        console.log(newValues);
        return db.collection('cities').updateOne(query, newValues);
    },

    async removeCityWithId(id) {
        db = await db();
        let query = {id: Number.parseInt(id)};

        return db.collection('cities').deleteOne(query);
    },

    async getCityWithId(id) {
        db = await db();
        let query = {id: Number.parseInt(id)};
        console.log(query);
        return db.collection('cities').findOne(query);
    }
    ,

    async getCitiesWithQuery(reqQuery) {
        db = await db();
        let query = {name: reqQuery};
        return db.collection('cities').find(query).toArray();
    },

    async getAllCities() {
        db = await db();
        return db.collection('cities').find({}).toArray();
    }
}
