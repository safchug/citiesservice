require('dotenv/config');

var MongoClient = require('mongodb').MongoClient;

const password = process.env.db_conection_password;
const user = process.env.db_conection_user;
const auth = process.env.auth_source;

//var uri = `mongodb://${user}:${password}@127.0.0.1:27017/?authSource=${auth}`;
var uri = "mongodb://localhost:27017/"
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
