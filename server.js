const express = require('express');
let bodyParser = require('body-parser');
let app = express();
const fs = require('fs')
const router = require('./routes/index')


//will take port automatically by running environment ( dev, production )
const port = process.env.PORT ? process.env.PORT : 4334
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, key, id");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//main routing
app.use('/', router)

app.listen(port, () => { console.log(`server running on ${port}`) })