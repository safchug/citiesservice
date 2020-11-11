const Joi = require('joi');

const userSchema = {
    registration: Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        mail: Joi.string().required(),
        birthday: Joi.string().required(),
    }),
    login: Joi.object({
        mail: Joi.string().required(),
        password: Joi.string().required()}
        )

}

module.exports = userSchema;