const mongoose = require('./../../dbconnection/config'),
    Schema = mongoose.Schema;
const OrderSchema = new Schema({
    restaurant_id: {
        type: Schema.Types.ObjectId,
        ref: "Resturants"
    },

    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    Product_id: {
        type: Schema.Types.ObjectId,
        ref: "Products"
    },
    Quantity: Number,
    address: {
        landmark: String,
        city: String,
        state: String,
        zipcode: Number
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Preparing', 'Deliverd'],
        default: 'Pending'
    }
},
    {
        timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' }
    });


module.exports = mongoose.model('Orders', OrderSchema);