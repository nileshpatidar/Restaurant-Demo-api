const mongoose = require('./../../dbconnection/config'),
    Schema = mongoose.Schema;
const Product = new Schema({
    restorant_id: {
        type: Schema.Types.ObjectId,
        ref: "Resturants"
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    ProductName: {
        type: String
    },
    isveg: {
        type: Boolean
    },
    ProductImage: {
        type: String
    },
    address: {
        landmark: String,
        city: String,
        state: String,
        zipcode: Number
    },
    status: {
        type: String,
        default: "Active"
    }
},
    {
        timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' }
    });


module.exports = mongoose.model('Products', Product);