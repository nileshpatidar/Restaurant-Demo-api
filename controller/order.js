var RestorantModel = require('./../db/model/ResturantModel');
var ProductsModel = require('./../db/model/ProductsModel');
var OrderModel = require('./../db/model/OrderDetailsModel');
const validation = require('../services/loginvalidation')
var Joi = require('joi');
const crudController = require('./commonfunction/crud')


const placeOrder = (req, res) => {
    try {
        const { restaurant_id, Product_id } = req.body;
        var valid = { restaurant_id: restaurant_id, role: req.headers.role, Product_id: Product_id }
        if (req.headers.role === 'Dboy') return res.status(403).send({ message: 'UnAuthorise To Use This Api' })
        valid = Joi.validate(valid, validation.placeorder)
        if (valid.error) {
            return res.status(422).send({ status: false, error: valid.error.details })
        }
        req.body.userid = req.isAuth
        crudController.addData(OrderModel, req.body).then(result => {
            return res.status(200).send({ message: 'Successfully added', result: result._id })
        }).catch(error => {
            return res.status(500).send({ message: error })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error })
    }
}
const UpdateOrderStatus = (req, res) => {
    try {
        if (!req.body.orderid) return res.status(422).send({ message: 'ORDERID is Require' })
        if (!req.body.status) return res.status(422).send({ message: 'status is Require' })
        OrderModel.findByIdAndUpdate(req.body.orderid, { status: req.body.status }, { new: true }).then(result => {
            console.log(result);
            if (!result) return res.status(400).send({ message: 'Not Updated Try again' })
            return res.status(200).send({ message: 'Successfully update' })
        }).catch(error => {
            return res.status(500).send({ message: error })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error })
    }
}

const MyOrderListForResturant = (req, res) => {
    try {
        if (!req.params.id) return res.status(422).send({ message: 'Params Restaurant id Is Require' })
        crudController.getAll(OrderModel, { restaurant_id: req.params.id }).then(result => {
            if (result.length === 0) return res.status(404).send({ message: 'No Record Found' })
            return res.status(200).send({ result: result })
        }).catch(error => {
            return res.status(500).send({ message: error })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error })
    }
}
const UserOrdersList = (req, res) => {
    try {
        OrderModel.find({ userid: req.isAuth }).populate("restaurant_id", 'resturant_name').populate('Product_id', 'ProductName').select({ userid: 0 }).then(result => {
            if (result.length === 0) return res.status(404).send({ message: 'No Record Found' })
            return res.status(200).send({ result: result })
        }).catch(error => {
            return res.status(500).send({ message: error })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error })
    }
}


module.exports.placeorder = placeOrder
module.exports.UpdateOrderStatus = UpdateOrderStatus
module.exports.MyOrderList = MyOrderListForResturant
module.exports.UserOrdersList = UserOrdersList

