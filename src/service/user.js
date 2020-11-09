var db = require('../models');

module.exports = {
    async saveUser(obj) {
        db = await db();
        return db.collection('users').insertOne(obj);
    },

    async getUserWithLogin(login) {
        db = await db();
        return db.collection('users').findOne({login: login});
    },

    async getUserWithId(id) {
        db = await db();
        return db.collection('users').findOne({id: id});
    },
}