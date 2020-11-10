const Joi = require('joi');

const userSchema = {
    registration: Joi.object({
        name: Joi.string().required(),
        login: Joi.string().required(),
        password: Joi.string().required(),
        mail: Joi.string().required(),
        birthday: Joi.string().required(),
    }),
    login: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required()}
        )

}

module.exports = userSchema;