var bcrypt = require('bcryptjs');
var userService = require('../service/user');
var {uid} = require('uid/secure');

class User {
    constructor(name, mail, birthday) {
        this.id = uid(16);
        this.name = name;
        this.mail = mail;
        this.birthday = birthday;
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
        let user = await User.getUserIfExist(this.mail);
        if(user) return Promise.reject('taken');

        return userService.saveUser(this);
    }

    static getUserIfExist(mail) {
        return userService.getUserWithMail(mail);
    }

    static verifyPass(pass, hash) {
        return bcrypt.compare(pass, hash);
    }
}

module.exports = User;