const Joi = require('joi');

const validation = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        const valid = error == null;
        if (valid) { next(); }
        else {
            const { details } = error;
            console.log('error', error)
            //console.log('details', details);
            const message = details.map(i => i.message).join(',')
            console.log("error", message);
            res.status(400).json({ message })
        }
    }
}
module.exports = validation;