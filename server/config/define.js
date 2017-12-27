/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * @constructor
 */
var Define = function () {
    
};

// Status of response
Define.prototype.STATUS_OK = 200;
Define.prototype.CODE_OK = 0;
Define.prototype.CODE_NON_OK = 1;
Define.prototype.STATUS_BAD_REQUEST = 400;
Define.prototype.STATUS_NOT_FOUND = 404;
Define.prototype.STATUS_NOT_ALLOWED = 405;
Define.prototype.STATUS_NOT_ACCEPTABLE= 406;
Define.prototype.STATUS_SERVER_ERROR = 500;

Define.prototype.FORMAT_DATE = "yyyy-mm-dd HH:MM:ss";

//---------------------
// Functions which will be available to external callers
module.exports = new Define();