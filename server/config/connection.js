/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mysql = require("mysql");
var config = require("./config");

function Connection() {
    this.pool = null;
    
    this.init = function() {
        this.pool = mysql.createPool(config.db);
    };
    
    this.connect = function(callback) {
        this.pool.getConnection(function(err, connection) {
            callback(err, connection);
        });
    };
}

module.exports = new Connection();