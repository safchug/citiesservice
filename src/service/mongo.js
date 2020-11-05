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
    }
}