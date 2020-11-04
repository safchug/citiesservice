var bcrypt = require('bcryptjs');
var mongo = require('../service/mongo');
var uid = require('uid/secure');

class User {
    constructor(name, login) {
        this.id = uid.uid(16);
        this.name = name;
        this.login = login;
    }

    static createUser(obj) {

        var newUser = new User();
        for(let key in obj)  {
            newUser[key] = obj[key];
        }

        return newUser;
    }

    hashPass(pass) {
        return bcrypt.genSalt(8)
            .then(result => bcrypt.hash(pass, result))
            .then(hash=> this.hash = hash)
            .catch(err => console.log(err));
    }

    async save() {
        //validation
        let isTaken = await mongo.Manager.isLoginTaken(this.login);
        if(isTaken) return Promise.reject('taken');

        return mongo.Manager.saveUser(this);
    }

    static verifyPass(pass, hash) {
        return bcrypt.compare(pass, hash);
    }
}


module.exports = User;