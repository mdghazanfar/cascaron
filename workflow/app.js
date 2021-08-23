
require('rootpath')();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const os = require('os');
const fs = require('fs');
const util = require('util');
const app = express();
const cors = require('cors');

// // view engine setup
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({
//     limit: '50mb',
//     extended: true,
//     parameterLimit: 50000
// }));
// app.enable('trust proxy');
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname+'/../','front-bone/templates/')));
app.use(express.static(path.join(__dirname+'/../','front-bone/css/')));
app.use(express.static(path.join(__dirname+'/../','front-bone/icons/')));
app.use(express.static(path.join(__dirname+'/../','front-bone/images/')));

console.log("__dirname: ", path.join(__dirname + '/../front-bone/'))


app.use(function(req, res, next) {
    var oneof = false;
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if (req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if (oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


/**
 * @ROUTING
 */
// const adminRoutes = require('routes/v1/route');
// app.use('/', adminRoutes);
// app.use('/api/v1', adminRoutes);

/**
 * END ROUTING
 */

app.get("/", function(req, res) {

    res.sendFile('index.html')

});


app.get("/templates/Industries_Services/Industries.html", function(req, res) {

    res.sendFile('Industries.html')
    

});


global.hostname = os.hostname();
console.log(global.hostname);
app.listen('8080', '0.0.0.0')
module.exports = app;