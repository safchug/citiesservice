require('dotenv/config');

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://mongo:27017/"
var dbname = "citiesService";

var db;

module.exports = async () => {
    if(db) {
        return db;
    }

    const client = await MongoClient.connect(uri)
    db = client.db(dbname);
    return db;
}
