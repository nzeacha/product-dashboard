/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Define = require('../config/define');
var logger = require('../config/logger');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
var orm = require('orm');
var csv = require('fast-csv');
var fs = require('fs');
var path = require('path');

/**
 * @class Controller
 * @param {req} req request
 * @constructor
 */
var Controller = function (req) {
    this.models = req.models;
};

module.exports = Controller;