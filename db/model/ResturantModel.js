const mongoose = require('./../../dbconnection/config'),
    Schema = mongoose.Schema;
var md5 = require('md5');
const Users = new Schema({
    resturant_email: String,
    resturant_name: {
        type: String
    },
    contact_number: {
        type: Number
    },
    restorant_image: {
        type: String
    },
    status: {
        type: String,
        default: "Active"
    }
},
    {
        timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' }
    });


module.exports = mongoose.model('User', Users);