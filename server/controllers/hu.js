/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var fonts = {
    Roboto: {
        normal: './fonts/Roboto-Regular.ttf',
        bold: './fonts/Roboto-Medium.ttf',
        italics: './fonts/Roboto-Italic.ttf',
        bolditalics: './fonts/Roboto-Italic.ttf'
    }
};
var Define = require('../config/define');
var Queries = require('../config/queries');
var logger = require('../config/logger');
var radb = require('../config/radb');
var oracledb = require('oracledb');
var dateformat = require('dateformat');
var utils = require('../util/utils');
var path = require('path');
var XLSX = require('xlsx');
var exporter = require('highcharts-export-server');
var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

/**
 * @class Controller
 * @param {req} req request
 * @constructor
 */
var HU = function (req) {
    this.models = req.models;
};

HU.prototype.getHU1 = function (data, callback) {
    var self = this;
    try {
        var pool = radb.getPool();
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error("An error occured when getting connection pool: ", err);
                callback(Define.STATUS_BAD_REQUEST, err);
            } else {
                connection.execute(Queries.HU1, {sd: new Date(data.sd), ed: new Date(data.ed)}, {outFormat: oracledb.OBJECT}, function (err, res) {
                    if (err) {
                        logger.error("An error occured on querying HU1 : ", err);
                        console.log(err);
                        callback(Define.STATUS_BAD_REQUEST, err);
                    } else {
                        self.checkLackingDates(res.rows, 'M_DATE', ['MSISDN'], data.sd, data.ed, function () {
                            callback(Define.STATUS_OK, res.rows);
                        });
                    }
                    connection.close();
                });
            }
        });
    } catch (err) {
        logger.error("Error while finding HU1", err);
        callback(Define.STATUS_BAD_REQUEST, err);
    }
};

HU.prototype.getHU2 = function (data, callback) {
    var self = this;
    try {
        var pool = radb.getPool();
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error("An error occured when getting connection pool: ", err);
                callback(Define.STATUS_BAD_REQUEST, err);
            } else {
                connection.execute(Queries.HU2, {sd: new Date(data.sd), ed: new Date(data.ed)}, {outFormat: oracledb.OBJECT}, function (err, res) {
                    if (err) {
                        logger.error("An error occured on querying HU2 : ", err);
                        console.log(err);
                        callback(Define.STATUS_BAD_REQUEST, err);
                    } else {
                        self.checkLackingDates(res.rows, 'M_DATE', ['MSISDN'], data.sd, data.ed, function () {
                            callback(Define.STATUS_OK, res.rows);
                        });
                    }
                    connection.close();
                });
            }
        });
    } catch (err) {
        logger.error("Error while finding HU2", err);
        callback(Define.STATUS_BAD_REQUEST, err);
    }
};

HU.prototype.getHU3 = function (data, callback) {
    var self = this;
    try {
        var pool = radb.getPool();
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error("An error occured when getting connection pool: ", err);
                callback(Define.STATUS_BAD_REQUEST, err);
            } else {
                connection.execute(Queries.HU3, {sd: new Date(data.sd), ed: new Date(data.ed)}, {outFormat: oracledb.OBJECT}, function (err, res) {
                    if (err) {
                        logger.error("An error occured on querying HU3 : ", err);
                        console.log(err);
                        callback(Define.STATUS_BAD_REQUEST, err);
                    } else {
                        self.checkLackingDates(res.rows, 'M_DATE', ['MSISDN'], data.sd, data.ed, function () {
                            callback(Define.STATUS_OK, res.rows);
                        });
                    }
                    connection.close();
                });
            }
        });
    } catch (err) {
        logger.error("Error while finding HU3", err);
        callback(Define.STATUS_BAD_REQUEST, err);
    }
};

HU.prototype.getHU4 = function (data, callback) {
    var self = this;
    try {
        var pool = radb.getPool();
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error("An error occured when getting connection pool: ", err);
                callback(Define.STATUS_BAD_REQUEST, err);
            } else {
                connection.execute(Queries.HU4, {sd: new Date(data.sd), ed: new Date(data.ed)}, {outFormat: oracledb.OBJECT}, function (err, res) {
                    if (err) {
                        logger.error("An error occured on querying HU4 : ", err);
                        console.log(err);
                        callback(Define.STATUS_BAD_REQUEST, err);
                    } else {
                        self.checkLackingDates(res.rows, 'M_DATE', ['MSISDN'], data.sd, data.ed, function () {
                            callback(Define.STATUS_OK, res.rows);
                        });
                    }
                    connection.close();
                });
            }
        });
    } catch (err) {
        logger.error("Error while finding HU4 ", err);
        callback(Define.STATUS_BAD_REQUEST, err);
    }
};

HU.prototype.getHU9 = function (data, callback) {
    var self = this;
    try {
        var pool = radb.getPool();
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error("An error occured when getting connection pool: ", err);
                callback(Define.STATUS_BAD_REQUEST, err);
            } else {
                connection.execute(Queries.HU9, {sd: new Date(data.sd), ed: new Date(data.ed)}, {outFormat: oracledb.OBJECT}, function (err, res) {
                    if (err) {
                        logger.error("An error occured on querying HU9 : ", err);
                        console.log(err);
                        callback(Define.STATUS_BAD_REQUEST, err);
                    } else {
                        self.checkLackingDates(res.rows, 'M_DATE', ['MSISDN'], data.sd, data.ed, function () {
                            callback(Define.STATUS_OK, res.rows);
                        });
                    }
                    connection.close();
                });
            }
        });
    } catch (err) {
        logger.error("Error while finding HU9 ", err);
        callback(Define.STATUS_BAD_REQUEST, err);
    }
};

HU.prototype.getHUSMS = function (data, callback) {
    var self = this;
    try {
        var pool = radb.getPool();
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error("An error occured when getting connection pool: ", err);
                callback(Define.STATUS_BAD_REQUEST, err);
            } else {
                connection.execute(Queries.HUSMS, {sd: new Date(data.sd), ed: new Date(data.ed)}, {outFormat: oracledb.OBJECT}, function (err, res) {
                    if (err) {
                        logger.error("An error occured on querying SMS : ", err);
                        console.log(err);
                        callback(Define.STATUS_BAD_REQUEST, err);
                    } else {
                        self.checkLackingDates(res.rows, 'M_DATE', ['MSISDN'], data.sd, data.ed, function () {
                            callback(Define.STATUS_OK, res.rows);
                        });
                    }
                    connection.close();
                });
            }
        });
    } catch (err) {
        logger.error("Error while finding SMS ", err);
        callback(Define.STATUS_BAD_REQUEST, err);
    }
};

HU.prototype.getSMSC = function (data, callback) {
    var self = this;
    try {
        var pool = radb.getPool();
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error("An error occured when getting connection pool: ", err);
                callback(Define.STATUS_BAD_REQUEST, err);
            } else {
                connection.execute(Queries.SMSC, {sd: new Date(data.sd), ed: new Date(data.ed)}, {outFormat: oracledb.OBJECT}, function (err, res) {
                    if (err) {
                        logger.error("An error occured on querying total SMS : ", err);
                        console.log(err);
                        callback(Define.STATUS_BAD_REQUEST, err);
                    } else {
                        self.checkLackingDates(res.rows, 'M_DATE', ['SMS'], data.sd, data.ed, function () {
                            callback(Define.STATUS_OK, res.rows);
                        });
                    }
                    connection.close();
                });
            }
        });
    } catch (err) {
        logger.error("Error while finding total SMS ", err);
        callback(Define.STATUS_BAD_REQUEST, err);
    }
};

HU.prototype.getSMSCByPass = function (data, callback) {
    var self = this;
    try {
        var pool = radb.getPool();
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error("An error occured when getting connection pool: ", err);
                callback(Define.STATUS_BAD_REQUEST, err);
            } else {
                connection.execute(Queries.SMSCBYPASS, {sd: new Date(data.sd), ed: new Date(data.ed)}, {outFormat: oracledb.OBJECT}, function (err, res) {
                    if (err) {
                        logger.error("An error occured on querying smsc bypass : ", err);
                        console.log(err);
                        callback(Define.STATUS_BAD_REQUEST, err);
                    } else {
                        self.checkLackingDates(res.rows, 'M_DATE', ['SMS'], data.sd, data.ed, function () {
                            callback(Define.STATUS_OK, res.rows);
                        });
                    }
                    connection.close();
                });
            }
        });
    } catch (err) {
        logger.error("Error while finding smsc bypass ", err);
        callback(Define.STATUS_BAD_REQUEST, err);
    }
};

HU.prototype.getGPRS = function (data, callback) {
    var self = this;
    try {
        var pool = radb.getPool();
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error("An error occured when getting connection pool: ", err);
                callback(Define.STATUS_BAD_REQUEST, err);
            } else {
                connection.execute(Queries.HUGPRS, {sd: new Date(data.sd), ed: new Date(data.ed)}, {outFormat: oracledb.OBJECT}, function (err, res) {
                    if (err) {
                        logger.error("An error occured on querying hu gprs: ", err);
                        console.log(err);
                        callback(Define.STATUS_BAD_REQUEST, err);
                    } else {
                        self.checkLackingDates(res.rows, 'M_DATE', ['MSISDN'], data.sd, data.ed, function () {
                            callback(Define.STATUS_OK, res.rows);
                        });
                    }
                    connection.close();
                });
            }
        });
    } catch (err) {
        logger.error("Error while finding hu gprs ", err);
        callback(Define.STATUS_BAD_REQUEST, err);
    }
};

HU.prototype.exportReports = function (data, callback) {
    exporter.initPool();
    var charts = data.charts.filter(function (o) {
        return o !== null;
    });
    var c = new Array(charts.length);
    var e;
    var j = 0;
    for (var i = 0, l = charts.length; i < l; i++) {
        (function (i) {
            if (charts[i] !== null) {
                var d = {};
                d.type = 'png';
                d.scale = 3;
                d.themeOptions = data.themeOptions;
                charts[i].exporting.sourceWidth = (!charts[i].exporting.sourceWidth || charts[i].exporting.sourceWidth < 1280 ? 1280 : charts[i].exporting.sourceWidth);
                charts[i].exporting.sourceHeight = (!charts[i].exporting.sourceHeight || charts[i].exporting.sourceHeight < 360 ? 360 : charts[i].exporting.sourceHeight);
                d.options = charts[i];
                exporter.export(d, function (err, res) {
                    if (err) {
                        e = err;
                    } else {
                        c[i] = {categories: charts[i].xAxis.categories, series: charts[i].series, width: charts[i].exporting.sourceWidth || 640, height: charts[i].exporting.sourceHeight || 360, data: res.data};
                    }
                    if (++j === l) {
                        exporter.killPool();
                        if (e)
                            callback(Define.STATUS_BAD_REQUEST, e);
                        else
                            callback(Define.STATUS_OK, c);
                    }
                });
            } else if (++j === l) {
                exporter.killPool();
                if (e)
                    callback(Define.STATUS_BAD_REQUEST, e);
                else
                    callback(Define.STATUS_OK, c);
            }
        })(i);
    }
};

HU.prototype.generateReportPdf = function (data, res) {
    var doc = {compression: false, pageSize: 'A4', pageOrientation: 'landscape', pageMargins: [5, 5], content: [],
        styles: {
            tableHeader: {
                bold: true
            },
            centerme: {
                alignment: 'center'
            },
            rightme :{
                alignment: 'right'
            },
            rightmebold :{
                alignment: 'right',
                bold: true
            },
            table: {
                fontSize: 12
            },
            tableHeaderMini: {
                bold: true,
                fontSize: 5
            },
            tableMini: {
                fontSize: 7
            },
            title:{
                fontSize: 30,
                //bold: true,
                alignment: 'center'
            }
        }
    };
    var self = this;
    self.exportReports(data, function (statut, result) {
        if (statut === Define.STATUS_BAD_REQUEST) {
            res.status(statut).json(result);
            return;
        } else {
            doc.content.push({
                image: './public/app/image/landpage.PNG',
                width: 840,
                style: 'centerme'
            });
            doc.content.push({
                text: 'VOICE, SMS AND DATA HIGH USAGE REPORT \n '+ dateformat(new Date(data.startDate), 'dd mmm yyyy') + ' - ' + dateformat(new Date(data.endDate), 'dd mmm yyyy'),
                margin: [0, 25, 0, 0],
                style: 'title'
            });
            for (var i = 0, l = result.length; i < l; i++) {
                (function (i) {
                    var d = {
                        image: new Buffer(result[i].data, 'base64'),
                        width: 800,
                        height: 280,
                        style: 'centerme'
                    };

                    doc.content.push(d);
                    
                    if (i === l - 1) {
                        var pdf = printer.createPdfKitDocument(doc);
                        pdf.pipe(res);
                        pdf.end();
                    }
                })(i);
            }
        }
    });
};

HU.prototype.checkLackingDates = function (data, field, fieldsToInsert, startDate, endDate, callback) {
    var start = new Date(startDate);
    var end = new Date(endDate);
//    console.log(start, end);
    var t = data.map(function (obj) {
        return obj[field];
    });
    while (start <= end) {
        var aux = dateformat(start, "yyyy-mm-dd");
        if (t.indexOf(aux) === -1) {
            var o = {};
            for(var i = 0, l = fieldsToInsert.length; i<l; i++){
                o[fieldsToInsert[i]] = 0;
            }
            o[field] = aux;
            data.push(o);
        }
        var newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);
    }
    data.sort(function (a, b) {
        return (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0);
    });
    callback();
};


module.exports = HU;