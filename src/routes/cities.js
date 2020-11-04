exports.citiesByQuery = (req, res) => {
    res.json({message: 'cities is going to be provided'});
}

exports.getCityById = (req, res) => {
    res.json({message: 'city id'});
}

exports.addCity = (req, res) => {
    res.json({message: 'city has been added'});
}

exports.updateCity = (req, res) => {
    res.json({message: 'city has been updated'});
}

exports.delete = (req, res) => {
    res.json({message: 'city has been removed'});
}