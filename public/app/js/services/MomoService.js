/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function MomoService($q, $http) {

    var service = {};

    service.export = function (charts) {
        var d = $q.defer();
        var url = '/momo/export-all/';
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

    service.getCashOut = function (sd, ed) {
        var d = $q.defer();
        var url = '/momo/cash-out';
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

    service.getCashIn = function (sd, ed) {
        var d = $q.defer();
        var url = '/momo/cash-in';
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

    service.getVoucherSent = function (sd, ed) {
        var d = $q.defer();
        var url = '/momo/voucher-sent';
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

    service.getCashInMonthly = function (sd, ed) {
        var d = $q.defer();
        var url = '/momo/cash-in-monthly';
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

    service.getCashOutMonthly = function (sd, ed) {
        var d = $q.defer();
        var url = '/momo/cash-out-monthly';
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

    service.getBetweenSimSwap = function (sd, ed) {
        var d = $q.defer();
        var url = '/momo/swap';
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

    service.getDepositWeekly = function (sd, ed) {
        var d = $q.defer();
        var url = '/momo/deposit-weekly';
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
        .factory('Momo', ['$q', '$http', MomoService]);