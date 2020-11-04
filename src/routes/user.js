const User = require("../models/User");

exports.registration = (req, res) => {
    console.log('I was here');
    let {name, login, password} = req.body;
    let user = new User(name, login);
    user.hashPass(password).then(hash=> user.save())
        .then(result => res.json({message: 'you`ve been registred'}))
        .catch(err=> console.log(err));
}

exports.login = (req, res) => {
    res.json({message: 'you logined'});
}