/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function BundleService($q, $http) {

    var service = {};
    
    var mapBundleName = [];
    // Voice Bundles
    mapBundleName[900200] = "Voice Day 100";
    mapBundleName[900201] = "Voice Day 250";
    mapBundleName[900202] = "Voice Day 500";
    mapBundleName[900203] = "Voice Week 300";
    mapBundleName[900204] = "Voice Week 1000";
    mapBundleName[900205] = "Voice Week 2500";
    mapBundleName[900206] = "Voice Month 600";
    mapBundleName[900207] = "Voice Month 2000";
    mapBundleName[900208] = "Voice Month 4000";
    mapBundleName[900209] = "Voice Month 12000";
    mapBundleName[900210] = "Voice Month 26000";
    // Go Bundles
    mapBundleName[20800] = "Go 5000";
    mapBundleName[20801] = "Go 20000";
    mapBundleName[20802] = "Go 35000";
    mapBundleName[20804] = "Go 10000";
    mapBundleName[20805] = "Go 15000";
    mapBundleName[20806] = "Go 1000";
    mapBundleName[20807] = "Go 3000";
    
    service.getBundleName = function (productCode){
        return mapBundleName[productCode];
    };

    service.export = function (charts) {
        var d = $q.defer();
        var url = '/bundle/export-all';
        $http({
            method: 'POST',
            url: url,
            responseType: 'arraybuffer',
            data: charts
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getBundle1 = function (code, sd, ed) {
        var d = $q.defer();
        var url = '/bundle/' + code;
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: sd,
                ed: ed
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getManyBundle = function (code1,code2,sd, ed) {
        var d = $q.defer();
        var url = '/manybundle/';
        $http({
            method: 'POST',
            url: url,
            data: {
                code1: code1,
                code2: code2,
                sd: sd,
                ed: ed
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getBundle3 = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/3';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: sd,
                ed: ed
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getBundle4 = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/4';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: sd,
                ed: ed
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getBundle9 = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/9';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: sd,
                ed: ed
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getBundleSms = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/sms';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: sd,
                ed: ed
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getSMSC = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/smsc';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: sd,
                ed: ed
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };
    
    service.getSMSCByPass = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/smsc-bypass';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: sd,
                ed: ed
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };
    
    service.getBundleGprs = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/gprs';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: sd,
                ed: ed
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    return service;
}

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
angular
        .module('pDashboard')
        .factory('Bundle', ['$q', '$http', BundleService]);