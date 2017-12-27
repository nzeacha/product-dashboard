/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function HUService($q, $http) {

    var service = {};

    service.export = function (charts) {
        var d = $q.defer();
        var url = '/hu/export-all';
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

    service.getHU1 = function (sd, ed) {
        var d = $q.defer();
        var url = '/hu/1';
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

    service.getHU2 = function (sd, ed) {
        var d = $q.defer();
        var url = '/hu/2';
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

    service.getHU3 = function (sd, ed) {
        var d = $q.defer();
        var url = '/hu/3';
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

    service.getHU4 = function (sd, ed) {
        var d = $q.defer();
        var url = '/hu/4';
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

    service.getHU9 = function (sd, ed) {
        var d = $q.defer();
        var url = '/hu/9';
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

    service.getHUSms = function (sd, ed) {
        var d = $q.defer();
        var url = '/hu/sms';
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
        var url = '/hu/smsc';
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
        var url = '/hu/smsc-bypass';
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
    
    service.getHUGprs = function (sd, ed) {
        var d = $q.defer();
        var url = '/hu/gprs';
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
        .factory('HU', ['$q', '$http', HUService]);