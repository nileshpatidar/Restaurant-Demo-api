const mongoose = require('mongoose')
mongoose.Promise = mongoose.Promise
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false }).then(res => console.log('connected mongodb done')).catch(err => console.log('error in mongodb : ', err))
//****************on live uncomment this and put your key pasword in .env file */
// mongoose.connect(process.env.MONGODB_URI, {
//     auth: {
//         user: process.env.MONGO_USER,
//         password: process.env.MONGO_PWD
//     }
// }, { useNewUrlParser: true, useFindAndModify: false })
// const db = mongoose.connection;
// db.on('error', console.log.bind(console, 'connection error'));
// db.once('open', () => {
//     console.log('\nSuccessfully connected to Mongo!\n');
// });

module.exports = mongoose