const mongoose = require('./../../dbconnection/config'),
    Schema = mongoose.Schema;
const Resturant = new Schema({
    email: String,
    // superadmin_id: {
    //     type: String,
    //     require: true
    // },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    resturant_name: {
        type: String
    },
    contact_number: {
        type: Number
    },
    restorant_image: {
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


module.exports = mongoose.model('Resturants', Resturant);