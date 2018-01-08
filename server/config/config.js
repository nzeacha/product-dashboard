/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function db() {
    var db = {};
    db.host = "127.0.0.1";
    db.user = "root";
    db.port = 3306;
    db.password = "q";
    db.database = "product_dashboard";
//    db.database = "elenta";
    db.connectionLimit  = "200";
    db.pool = "?pool=true";
    return db;
}

function dbUrl() {
    var database = db();
    return "mysql://"+database.user+":"+database.password+"@"+database.host+"/"+database.database+database.pool;
}

function app() {
    var app = {};
    app.host = "localhost";
    app.port = 9080;
    app.staticDir = './public/';
    return app;
}


// Functions which will be available to external callers
module.exports.db = db();
module.exports.app = app();
module.exports.dbUrl = dbUrl();
