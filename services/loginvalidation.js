var Joi = require('joi');
var auth = {
    register: Joi.object().keys({
        password: Joi.string().required(),
        email: Joi.string().required(),
        ContactNo: Joi.number().required(),
        Name: Joi.string().required(),
        role: Joi.string().required()
    }),
    verification: Joi.object().keys({
        email: Joi.string().required(),
        role: Joi.string().required(),
        verification_code: Joi.number().required(),
    }),
    resend_verification: Joi.object().keys({
        email: Joi.string().required(),
        role: Joi.string().required(),
    }),
    login: Joi.object().keys({
        email: Joi.string().required(),
        role: Joi.string().required(),
        password: Joi.string().required(),
    }),

}
module.exports = auth;