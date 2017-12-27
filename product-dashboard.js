/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');                    // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override');
var uuid = require('uuid');
var session = require('express-session');
var MemoryStore = session.MemoryStore;
var mysql = require("mysql");
var config = require("./server/config/config");
var connection = require("./server/config/connection");
var logger = require("./server/config/logger");
var orm = require('orm');
var models = require('./server/models/models');


var sessionMiddleware = session({
    genid: function (req) {
        return uuid.v4(); // use UUIDs for session IDs
    },
    cookie: {path: '/', httpOnly: true, secure: false, maxAge: 2592000000}, //3$
    name: 'product-dashboard.sid',
    secret: 'product-dashboard',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore()
});


var app = express();
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '10mb'}));                                     // parse application/json
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(sessionMiddleware);
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(orm.express(config.dbUrl, {
    define: models
}));
// Routes ==========================================
require('./server/routes/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(config.app.port);
console.log("App listening on port " + config.app.port);
logger.info("App listening on port " + config.app.port);