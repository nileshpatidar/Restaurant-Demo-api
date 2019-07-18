var RestorantModel = require('./../db/model/ResturantModel');
var ProductsModel = require('./../db/model/ProductsModel');
const validation = require('../services/loginvalidation')
var Joi = require('joi');
const crudController = require('./commonfunction/crud')


const addresturant = (req, res) => {
    try {
        let data = JSON.parse(req.body.data)
        if (req.file) {
            data.restorant_image = req.file.path
        }
        var valid = { email: data.email, ContactNo: data.ContactNo, resturant_name: data.resturant_name, login_type: req.headers.login_type }
        if (req.headers.login_type === 'Dboy') return res.status(403).send({ message: 'UnAuthorise To Use This Api' })
        valid = Joi.validate(valid, validation.addresturant)
        if (valid.error) {
            return res.status(422).send({ status: false, error: valid.error.details })
        }
        data.userid = req.isAuth
        crudController.addData(RestorantModel, data).then(result => {
            return res.status(200).send({ message: 'Successfully added', result: result })
        }).catch(error => {
            return res.status(500).send({ message: error })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error })
    }
}
const getAllRestorant = (req, res) => {
    try {
        const query = { userid: req.isAuth }
        crudController.getAll(RestorantModel, query).then(result => {
            if (!result) return res.status(404).send({ message: "No Record Found" })
            return res.status(200).send({ result: result })
        }).catch(error => {
            return res.status(500).send({ message: error })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error })
    }

}
const getRestorantWithCity = (req, res) => {
    try {
        RestorantModel.aggregate([
            { $match: { "address.city": req.query.city } }]).then(result => {
                if (!result) return res.status(404).send({ message: "No Record Found" })
                return res.status(200).send({ result: result })
            }).catch(error => {
                return res.status(500).send({ message: error })
            })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error })
    }

}
const addProducts = (req, res) => {
    try {
        let data = JSON.parse(req.body.data)
        if (!req.file) {
            data.ProductImage = null
        } else {
            data.ProductImage = req.file.path
        }
        var valid = { ProductName: data.ProductName, isveg: data.isveg, restorant_id: data.restorant_id }
        valid = Joi.validate(valid, validation.addProducts)
        if (valid.error) {
            return res.status(422).send({ status: false, error: valid.error.details })
        }
        data.userid = req.isAuth
        if (data.id) {
            ProductsModel.findByIdAndUpdate(data.id, data, { upsert: true, new: true }).then(result => {
                return res.status(200).send({ message: 'Successfully update', result: result })
            }).catch(error => {
                return res.status(500).send({ message: error })
            })
        } else {
            crudController.addData(ProductsModel, data).then(result => {
                return res.status(200).send({ message: 'Successfully added', result: result })
            }).catch(error => {
                return res.status(500).send({ message: error })
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error })
    }
}
const getAllProductsOfResturant = (req, res) => {
    try {
        const query = { restorant_id: req.params.id }
        crudController.getAll(ProductsModel, query).then(result => {
            if (!result) return res.status(404).send({ message: "No Record Found" })
            return res.status(200).send({ result: result })
        }).catch(error => {
            return res.status(500).send({ message: error })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error })
    }

}
const AllProductsForUser = (req, res) => {
    try {
        if (!req.headers.role) return res.status(422).send({ message: "ROLE is Require" })
        if (req.headers.role === 'User') {
            ProductsModel.find().then(result => {
                if (!result) return res.status(404).send({ message: "No Record Found" })
                return res.status(200).send({ result: result })
            }).catch(error => {
                return res.status(500).send({ message: error })
            })
        } else {
            return res.status(403).send({ message: 'UnAuthorise To Use This Api' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error })
    }

}
AllProductsForUser




module.exports.addResturant = addresturant;
module.exports.getRestorant = getAllRestorant;
module.exports.getRestorantWithCity = getRestorantWithCity;
module.exports.addProducts = addProducts;
module.exports.getAllProductsOfResturant = getAllProductsOfResturant;
module.exports.AllProductsForUser = AllProductsForUser;

