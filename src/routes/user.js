const User = require("../models/User");

exports.registration = (req, res) => {
    let {name, login, password} = req.body;
    let user = new User(name, login);
    user.hashPass(password).then(()=> user.save())
        .then(result => res.json({message: 'you`ve been registred'}))
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
    res.json({message: 'you logined'});
}