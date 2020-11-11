const Joi = require('joi');

const citiesSchema = {
    paramId: Joi.object({ id: Joi.number().min(1).required()}),
    registration: Joi.object({
        name: Joi.string().required(),
        login: Joi.string().required(),
        mail: Joi.string().required(),
        birhday: Joi.string().required(),
    }),
    addCity: Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        population: Joi.string().required(),
        area: Joi.string().required(),
        found: Joi.string().required()
    }),
    updateCity: Joi.object({
        name: Joi.string(),
        location: Joi.string(),
        population: Joi.string(),
        area: Joi.string(),
        found: Joi.string()
    }).min(1)

}

module.exports = citiesSchema;