/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @class Routes
 */

var Auth = require('../controllers/auth');
var upload = require('../controllers/upload');
var Define = require('../config/define');
var Connection = require('../config/connection');
var HU = require('../controllers/hu');
var path = require('path');
var XLSX = require('xlsx');
var orm = require('orm');
var auth, simbox, hu;

class Personne {
    
    constructor(date, product_code, autorenew, segment, payment_mode,
        subscriptions, subscribers, ma, da86, total_amount) {
            
        this.date = date;
        this.product_code = product_code;
        this.autorenew = autorenew;
        this.segment = segment;
        this.payment_mode = payment_mode;
        this.subscriptions = subscriptions;
        this.subscribers = subscribers;
        this.ma = ma;
        this.da86 = da86;
        this.total_amount = total_amount
    }
    
    getDate() {
        return this.date;
    }
    
    getProductCode() {
        return this.product_code;
    }
    
    getSegment() {
        return this.segment;
    }
        
    getSubscriptions() {
        return this.subscriptions;
    }
    
    getTotalAmount() {
        return this.total_amount;
    }
}

class Mymtn {
    
    constructor(date, download, uninstall, new_users, active_users,
        total_users, dod_download, dod_new_users, dod_active_users) {
            
        this.date = date;
        this.download = download;
        this.uninstall = uninstall;
        this.new_users = new_users;
        this.active_users = active_users;
        this.total_users = total_users;
        this.dod_download = dod_download;
        this.dod_new_users = dod_new_users;
        this.dod_active_users = dod_active_users
    }
    
}
/**
 * @constructor
 * @param {App} router entry point app
 */
var Routes = function (router) {
    
    
    router.all('*', function (req, res, next) {
        
        auth = new Auth(req);
        hu = new HU(req);
        next();
    });
        // Auth
    router.post('/auth/signin', function (req, res) {
        
        var user = req.body;
        
        auth.signin(user, function (status, json) {
            
            if (status === Define.STATUS_OK) {
                req.session.user = json;
            }
            
            res.status(status).json(json);
        });
    });
    
    router.get('/auth/signout', function (req, res) {
        
        if (auth.assertLoggedIn(req, res)) {
        delete req.session.user;
                res.status(Define.STATUS_OK).json({});
        }
        });
    router.get('/auth/me', function (req, res) {
        if (auth.assertLoggedIn(req, res)) {
        res.status(Define.STATUS_OK).json(req.session.user);
        }
        });
    router.put('/auth/me', function (req, res) {
        if (auth.assertLoggedIn(req, res)) {
        var user = req.body;
                auth.update(req.session.user, user, function (statut, response) {
                if (statut === Define.STATUS_OK) {
                req.session.user = response;
                }
                res.status(statut).json(response);
                });
        }
        });
        // Bics
    router.post('/bics/import', function (req, res) {
        if (auth.assertLoggedIn(req, res)) {
        upload(req, res, function (err) {
        if (err) {
        console.log(err);
                res.status(Define.STATUS_BAD_REQUEST).json(err);
                return;
        } else {
        var f = req.file;
                simbox.insertBicsEntry(f, function (statut, result) {
                res.status(statut).json(result);
                });
        }
        });
        }
        });
        
    router.post('/hu/1', function (req, res) {
        var p = path.resolve('./reports/Cloud Subscription Manager Subscriptions.xlsx');
        var workbook = XLSX.readFile(p);
        var inboundWorksheet = workbook.Sheets['Sheet1'];
        var outboundWorksheet = workbook.Sheets['Outbound'];
        var inboundCell = "A3";
        var outboundCell = "D16";
        console.log(inboundWorksheet[inboundCell].v);
//        console.log(outboundWorksheet[outboundCell].v);

        var sheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[sheetName];
        
        console.log(worksheet['!ref']);
        var range = XLSX.utils.decode_range(worksheet['!ref']);
        var range_end = range.e;
        console.log(range);
        
        var personnes = [];
        var tab = [];
//        for (var j = 3; j < range.e.r; j++){
//        Connection.init();
//        Connection.connect(function(err, connection) {
            for (var j = 3; j < range.e.r; j++){
    //        console.log(j);
                for (var k = 0; k <= range.e.c; k++){

//        console.log(worksheet[XLSX.utils.encode_cell({r:j, c:k})].v);
                    tab[k] = worksheet[XLSX.utils.encode_cell({r:j, c:k})].v;
                }

                var p = new Personne(tab[0], tab[1], tab[2], tab[3], tab[4], tab[5], tab[6], tab[7], tab[8], tab[9]);
                personnes.push(p);
//                console.log(p);
            
                // Use the connection
//                var query = connection.query('INSERT INTO CSM SET ?', p, function (error, results, fields) {
//
////                    console.log(results[0].notes);
//                // And done with the connection.
////                    console.log(j);
//                            // Handle error after the release.
//                    if (error) throw error;
//                            // Don't use the connection here, it has been returned to the pool.
//                    });
//                    
//                console.log(query.sql);
            
            }
            
            var csm = req.models.csm.entity;
            
//            console.log("Importation Start:");
//            csm.create(personnes, function(error, result){
////                var query = connection.query('insert into products select date, product_code,SUM(subscriptions), SUM(total_amount) from CSM group by date, product_code', function (error, results, fields) {
////                    if (error) throw error;
////                            // Don't use the connection here, it has been returned to the pool.
////                });
//                console.log("Importation Completed:");
//                
//            });
            
//            csm.aggregate(["date","product_code"],{}).sum("subscriptions").sum("total_amount").groupBy("date", "product_code").get(function(error, results){
//                    var product = req.models.product.entity;
//                    product.create(results, function(error, result){
//                        console.log(error, "AGGREGATION COMPLETE");
//                    });
////                    console.log(error, results);
//                });
//            connection.release();
//         });

        var i = 0;
                for (z in worksheet) {
        if (z <= "A4"){
//                console.log(z);
//                console.log(worksheet[z].v);
        }
        if (z[0] === '!')
                continue;
                if (i > 9)
                tab[i % 10] = worksheet[z].v;
//                console.log(tab[i % 5]);
                i++;
                if (i % 10 == 0 && i > 10)
                personnes.push(new Personne(tab[0], tab[1], tab[2], tab[3], tab[4]));
//                console.log(tab[0]);
        }
        res.status(200).json(p);
        });
        
        
        
    router.post('/bundle/:code', function (req, res){
        var code = req.params.code;
        var dates = req.body;
        var product = req.models.product.entity;

        var sd = new Date(dates.sd);
        console.log(sd);
        sd.setDate(sd.getDate()-1);
        console.log(sd);

        product.find({product_code:code, date:orm.between(sd, new Date(dates.ed))}, function(error, results){

           res.status(200).json(results); 
        });
//            product.find({product_code:code}, function(error, results){
//               res.status(200).json(results); 
//            });
    });

    router.post('/manybundle/', function (req, res){

        var data = req.body;
        var product = req.models.product.entity;

        var sd = new Date(data.sd);
        sd.setDate(sd.getDate()-1);

        product.find({product_code:orm.between(data.code1, data.code2), date:orm.between(sd, new Date(data.ed))}, function(error, results){
            var tab = {};
            for(var i = data.code1; i<= data.code2; i++){
               tab[i] = results.filter(function(o){return o.product_code === i;});
               if(tab[i].length === 0) delete tab[i];
           }
           res.status(200).json(tab); 
        });
//            product.find({product_code:code}, function(error, results){
//               res.status(200).json(results); 
//            });
    });
        
        

    router.post('/import/csm', function(req, res){
        upload(req, res, function(error){

        if (error){
            console.log(error);
            res.status(400).json(error);
        } else {
            var f = req.file;
            var filepath = path.resolve(f.destination + '/' + f.filename);
            var workbook = XLSX.readFile(filepath);
            var sheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[sheetName];
            var range = XLSX.utils.decode_range(worksheet['!ref']);
            var personnes = [];
            var tab = [];
            var j = 3;

            if (f.filename.endsWith('.csv')) j=1;
            
            for (j; j < range.e.r; j++){
                for (var k = 0; k <= range.e.c; k++){
                    if(worksheet[XLSX.utils.encode_cell({r:j, c:k})]){
                        tab[k] = worksheet[XLSX.utils.encode_cell({r:j, c:k})].v;
                    }
                }

                var p = new Personne(tab[0], tab[1], tab[2], tab[3], tab[4], tab[5], tab[6], tab[7], tab[8], tab[9]);
                personnes.push(p);
            }
            var csm = req.models.csm.entity;
//            csm.remove
            csm.find({}).remove(function(err){
            console.log(err);
            console.log("Importation Start:");
            csm.create(personnes, function(error, result){

                csm.aggregate(["date", "product_code"], {}).sum("subscriptions").sum("total_amount").groupBy("date", "product_code").get(function(error, results){
                    var product = req.models.product.entity;
                    console.log(results.length);
                    for(var i = 0; i<results.length ; i++){
                        (function(i){
                            product.create(results[i], function(error, result){

                                console.log(i,error);
                               if (i===results.length-1) {

                                   console.log(f.filename + "AGGREGATION COMPLETE");
                                   res.status(200).json(result);
                               }
                           });
                        })(i);

                    }

                });
            });  
        });

    }


    });
    });

    router.post('/import/mymtn', function(req, res){
        upload(req, res, function(error){

        if (error){
            console.log(error);
            res.status(400).json(error);
        } else {
            var f = req.file;
            var filepath = path.resolve(f.destination + '/' + f.filename);
            var workbook = XLSX.readFile(filepath);
            var sheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[sheetName];
            var range = XLSX.utils.decode_range(worksheet['!ref']);
            var mymtns = [];
            var tab = [];
            var j = 1;
            
            for (j; j < range.e.r; j++){
                for (var k = 0; k <= 8; k++){
                    if(worksheet[XLSX.utils.encode_cell({r:j, c:k})]){
                        tab[k] = worksheet[XLSX.utils.encode_cell({r:j, c:k})].v;
                    }
                }
                //console.log(tab[6]);
                var p = new Mymtn(new Date((tab[0] - (25567+2))*86400*1000), tab[1], tab[2], tab[3], tab[4], tab[5], tab[6], tab[7], tab[8]);
                
                mymtns.push(p);
                tab = [];
            }
            var mymtn = req.models.mymtn.entity;
//            csm.remove
            mymtn.find({}).remove(function(err){
                console.log(err);
                console.log("Importation Start:");
                mymtn.create(mymtns, function(error, result){
                    console.log(error);
                    console.log("importation finish");
                });  
            });

    }


    });
    });    
        
        router.post('/report/export-all/', function (req, res) {
//        if (auth.assertLoggedIn(req, res)) {
        var data = req.body;
                hu.generateReportPdf(data, res);
//        }
        });
        //----------------------
        router.get('*', function (req, res) {
        res.sendFile('./index.html', {root: path.join(__dirname, '../../public')});
        });
};
        module.exports = Routes;