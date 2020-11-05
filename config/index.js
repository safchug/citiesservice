const defaultConfig = require('./default.config.json');

module.exports = (property) => {
    return defaultConfig[property];
}