/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Utils = function () {
    
};

Utils.prototype.sum = function(items, prop){
    return items.reduce( function(a, b){
        return a + b[prop];
    }, 0);
};

module.exports = new Utils();