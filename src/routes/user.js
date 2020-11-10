const express = require('express');
const bodyParser = require('body-parser');
const User = require("../models/User");
const jwt = require('../utils/token');

const router = express.Router();
const urlencoded = bodyParser.urlencoded({extended: true});

router.post('/registration', urlencoded, async (req, res, next) => {
    try {
        let {name, login, password, mail, birthday} = req.body;

        if (!name ||    !login || !password) {
            res.json({message: 'Pass all nessesary info'});
        }

        let user = new User(name, login, mail, birthday);

        await user.hashPass(password);
        await user.save();
    } catch (err) {
        next(err);
    }
});

router.post('/login', urlencoded, async (req, res, next) => {
    try {
        let {login, password} = req.body;

        if (!login || !password) {
            res.json({message: 'Pass your credentials'});
        }

        let user = await User.getUserIfExist(login);
        if (user) {
            let isVerified = await User.verifyPass(password, user.hash);
            if (isVerified) {
                let accessToken = jwt.createAccessToken(user.id);
                res.json(accessToken);
            } else {
                res.json({message: 'the passwords don`t match'});
            }
        } else {
            res.json({message: 'This user doesnt exist'});
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;