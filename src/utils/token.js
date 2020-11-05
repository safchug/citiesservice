const jwt = require('jsonwebtoken');
const config = require('../../config')

const createAccessToken = userId => {
    return jwt.sign({userId}, config('access_token_secret'), {
        expiresIn: '7d'});
}

const verifyToken = req => {
    const authorization = req.headers['authorization'];
    if (!authorization) throw new Error('You need to login.');
    // Based on 'Bearer ksfljrewori384328289398432'
    const token = authorization.split(' ')[1];
    const { userId } = jwt.verify(token, config('access_token_secret'));
    return userId;
};

module.exports.createAccessToken = createAccessToken;
module.exports.verifyToken = verifyToken;