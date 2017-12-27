/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var transaction = require('orm-transaction');

var Model = function (db, models, next) {
    db.use(transaction);
    models.database = db;
    
    models.rafm_business_process = {
        modelName: "BusinessProcess",
        entity: db.define("rafm_business_process", { 
                id: String,    
                name: String
            }, {
                methods: {
                    fullName: function () {
                        return 'BusinessProcess ['+this.id+']';
                    }
                }
            })
    };
    
    next();
};


module.exports = Model;