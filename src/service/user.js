var getDb = require('../models');

module.exports = {
    async saveUser(obj) {
        db = await getDb();
        return db.collection('users').insertOne(obj);
    },

    async getUserWithMail(mail) {
        db = await getDb();
        return db.collection('users').findOne({mail: mail});
    },

    async getUserWithId(id) {
        db = await getDb();
        return db.collection('users').findOne({id: id});
    },
}