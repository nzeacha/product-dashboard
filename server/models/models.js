/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var transaction = require('orm-transaction');

var Model = function (db, models, next) {
    db.use(transaction);
    models.database = db;
    
    models.csm = {
        modelName: "csm",
        entity: db.define("csm", { 
                date: {type:"date", key:true},    
                product_code : {type:"number", key:true},
                autorenew : Number,
                segment : String,
                payment_mode : String,
                subscriptions : Number,
                subscribers : Number,
                ma : Number,
                da86 : Number,
                total_amount : Number
            }, {
                methods: {
                    fullName: function () {
                        return 'csm ['+this.id+']';
                    }
                }
            })
    };
    
    models.product = {
        modelName: "products",
        entity: db.define("products", { 
                date: {type:"date", key:true},    
                product_code : {type:"number", key:true},
                sum_subscriptions : Number,
                sum_total_amount : Number
            }, {
                methods: {
                    fullName: function () {
                        return 'products ['+this.id+']';
                    }
                }
            })
    };
    
    next();
};


module.exports = Model;