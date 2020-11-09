var getDb = require('../models');

module.exports = {

    async insertCity(obj) {
        db = await getDb();
        return db.collection('cities').insertOne(obj);
    },

    async countCities() {
        db = await getDb();
        return db.collection('cities').count();
    },

    async updateCityWithIdAndUserId(id, updatedFields, userId) {
        db = await getDb();
        let query = {id: Number.parseInt(id), userId};
        let newValues = {$set: {...updatedFields}};
        console.log(newValues);
        return db.collection('cities').updateOne(query, newValues);
    },

    async removeCityWithId(id, userId) {
        db = await getDb();
        let query = {id: Number.parseInt(id), userId};

        return db.collection('cities').deleteOne(query);
    },

    async getCityWithId(id) {
        db = await getDb();
        let query = {id: Number.parseInt(id)};
        console.log(query);
        return db.collection('cities').findOne(query);
    }
    ,

    async getCitiesWithQuery(reqQuery) {
        db = await getDb();
        let query = {name: reqQuery};
        return db.collection('cities').find(query).toArray();
    },

    async getAllCities() {
        db = await getDb();
        return db.collection('cities').find({}).toArray();
    }
}
