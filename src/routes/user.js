const User = require("../models/User");
const jwt = require('../utils/token');

exports.registration = (req, res) => {
    let {name, login, password} = req.body;
    let user = new User(name, login);
    user.hashPass(password).then(()=> user.save())
        .then(() => res.json({message: 'you`ve been registred'}))
        .catch(err=> {
            console.log(err);
            if(err === 'taken') {
                res.json({message: 'this login is already taken!'});
            } else {
                res.json({message: 'something went wrong!'});
            }
        });
}

exports.login = (req, res) => {
    let {login, password} = req.body;

    User.getUserIfExist(login)
        .then(user=> {
            if(user) {
                User.verifyPass(password, user.hash)
                    .then(isVerified => {
                        if(isVerified) {
                            let accessToken = jwt.createAccessToken(user.id);
                            res.json(accessToken);
                        } else {
                            res.json({message: 'the passwords don`t match'});
                        }
                    });
            } else {
                res.json({message: 'this user doesn`t exist'});
            }
        })
        .catch(err=> console.log(err));
}