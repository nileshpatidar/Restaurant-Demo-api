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
    addresturant: Joi.object().keys({
        email: Joi.string().required(),
        resturant_name: Joi.string().required(),
        ContactNo: Joi.number().required(),
        login_type: Joi.string().required(),
    }),
    addProducts: Joi.object().keys({
        ProductName: Joi.string().required(),
        isveg: Joi.boolean().required(),
        restorant_id: Joi.string().required(),
    }),
    placeorder: Joi.object().keys({
        restaurant_id: Joi.string().required(),
        Product_id: Joi.string().required(),
        role: Joi.string().required(),
    }),
}
module.exports = auth;