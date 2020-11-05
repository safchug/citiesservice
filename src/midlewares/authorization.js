const jwt = require('../utils/token');
const mongo = require('../service/mongo');

module.exports = async (req, res, next) => {
    try {
        console.log('authorization');
        let userId = jwt.verifyToken(req);
        req.user = await mongo.Manager.getUserWithId(userId);
        next();
    } catch (err) {
        console.log(err);
        res.status(404);
        res.json({message: 'access is forbiten'});
    }
}