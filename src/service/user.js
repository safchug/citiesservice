var getDb = require('../models');

module.exports = {
    async saveUser(obj) {
        db = await getDb();
        return db.collection('users').insertOne(obj);
    },

    async getUserWithLogin(login) {
        db = await getDb();
        return db.collection('users').findOne({login: login});
    },

    async getUserWithId(id) {
        db = await getDb();
        return db.collection('users').findOne({id: id});
    },
}