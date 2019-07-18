const mongoose = require('./../../dbconnection/config'),
    Schema = mongoose.Schema;
var md5 = require('md5');
const Users = new Schema({
    Name: String,
    email: String,
    password: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    verification_code: {
        type: String
    },
    ContactNo: {
        type: Number
    },
    profile_image: {
        type: String
    },
    secretKey: String,
    role: {
        type: String,
        enum: ['User', 'Admin', 'SuperAdmin', 'Dboy']
    },
    status: {
        type: String,
        default: "Active"
    }
},
    {
        timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' }
    });
Users.pre('save', async function () {
    if (this.password) {
        this.password = md5(this.password)
    }
})
Users.pre('update', async function () {
    const modifiedFields = this.getUpdate().$set.password;
    if (modifiedFields) {
        this.getUpdate().$set.password = md5(modifiedFields)
    }
    this.updated_date = new Date()
})

module.exports = mongoose.model('User', Users);