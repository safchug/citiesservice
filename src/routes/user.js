const express = require('express');
const bodyParser = require('body-parser');
const User = require("../models/User");
const jwt = require('../utils/token');
const validation = require('../midlewares/validation');
const userSchema = require('../schemas/userSchemas');
const authorization = require('../midlewares/authorization');

const router = express.Router();
const urlencoded = bodyParser.urlencoded({extended: true});

router.post('/registration',
    urlencoded,
    bodyParser.json(),
    validation(userSchema.registration, 'body'),
    rerist);

router.post('/login', bodyParser.json(), urlencoded,
    validation(userSchema.login, 'body'),
    login);

router.post('/auth', authorization, auth);

async function rerist(req, res, next)  {
    try {
        let {name, password, mail, birthday} = req.body;

        let user = new User(name, mail, birthday);

        await user.hashPass(password);
        await user.save();
        res.json('The user has been registred');
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        let {mail, password} = req.body;

        let user = await User.getUserIfExist(mail);
        if (user) {
            let isVerified = await User.verifyPass(password, user.hash);
            if (isVerified) {
                let accessToken = jwt.createAccessToken(user.id);
                res.json({accessToken, user});
            } else {
                let myErr = new Error('The passwords don`t match');
                myErr.code = 401;
                throw myErr;
            }
        } else {
            let myErr = new Error('This user doesnt exist');
            myErr.code = 401;
            throw myErr;
        }
    } catch (err) {
        next(err);
    }
}

function auth(req, res, next) {
    try {
        if(req.user) {
            let {id, name} = req.user;
            res.json({id, name});
        }
    } catch (err) {
        next(err);
    }
}

module.exports = router;