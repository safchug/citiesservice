
module.exports = function(err, req, res, next) {
    console.log('I cought an error');
    console.log(err);
    if (err.code === 400) {
        res.status(400).json({message: 'bad request'});
    } else if (err.code === 401) {
        res.status(401);
        if(err.message.includes('user')) {
            res.json({message: 'This user doesnt exist'});
        } else {
            res.json({message: 'The password doesnt match'});
        }
    } else  if(err === 'taken') {
        res.status(409).json({message: 'This user already exists'});
    } else if(err.code === 403) {
        res.status(403).json({message: 'Action is forbiten'});
    } else {
        res.status(500).json({message: 'Something went wrong!'});
    }
}