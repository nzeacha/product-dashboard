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
var path = require('path');
var XLSX = require('xlsx');
var auth, simbox, hu;
/**
 * @constructor
 * @param {App} router entry point app
 */
var Routes = function (router) {
    router.all('*', function (req, res, next) {
        auth = new Auth(req);
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
    router.get('/bics/import', function (req, res) {
        var p = path.resolve('./reports/bics/20170721 Voice QoS and Volume CMR.xls');
        var workbook = XLSX.readFile(p);
        var inboundWorksheet = workbook.Sheets['Inbound'];
        var outboundWorksheet = workbook.Sheets['Outbound'];
        var inboundCell = "I67";
        var outboundCell = "D16";
        console.log(inboundWorksheet[inboundCell].v);
        console.log(outboundWorksheet[outboundCell].v);
        res.status(200).json(p);
    });

    
    
    router.post('/hu/export-all/', function (req, res) {
        if (auth.assertLoggedIn(req, res)) {
            var data = req.body;
            hu.generateReportPdf(data, res);
        }
    });

    //----------------------
    router.get('*', function (req, res) {
        res.sendFile('./index.html', {root: path.join(__dirname, '../../public')});
    });
};
module.exports = Routes;