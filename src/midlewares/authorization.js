const jwt = require('../utils/token');
const userService = require('../service/user');

module.exports = async (req, res, next) => {
    try {
        console.log('authorization');
        let userId = jwt.verifyToken(req);
        req.user = await userService.getUserWithId(userId);
        next();
    } catch (err) {
        console.log(err);
        res.status(404);
        res.json({message: 'access is forbiten'});
    }
}