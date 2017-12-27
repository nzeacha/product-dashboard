/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global __dirname */

var bunyan = require('bunyan');
var path = require('path');

var filePath = path.dirname(__dirname)+path.sep+'logs'+path.sep+'product-dashboard.log';
var log = bunyan.createLogger({
  name: 'product-dashboard',
  src: true,
  streams: [
    {
        type: 'rotating-file',
        level: 'info',
        path: filePath,
        period: '1d',   // daily rotation
        count: 30     
    }
  ]
});
  
module.exports = log;
