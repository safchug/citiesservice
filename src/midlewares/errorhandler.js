
module.exports = function(err, req, res, next) {
    console.log('I cought an error');
    if(err === 'taken') {
        res.status = 403;
        res.json({message: 'This user already exists'});
    }
    console.log(err);
    res.status = 500;
    res.json({message: 'Something went wrong!'});
}