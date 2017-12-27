/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function SimboxService($q, $http) {

    var service = {};

    service.export = function (data) {
        var d = $q.defer();
        var url = '/simbox/export-all/';
        $http({
            method: 'POST',
            url: url,
            responseType: 'arraybuffer',
            data: data
        }).then(function (response) {
            d.resolve(response.data);
        },
                function (error) {
                    d.reject(error);
                });
        return d.promise;
    };

    service.getAvgSimboxPerDay = function () {
        var d = $q.defer();
        var url = '/simbox/avg-per-day';
        $http({
            method: 'GET',
            url: url
        }).then(function (response) {
            d.resolve(response.data);
        },
                function (error) {
                    d.reject(error);
                });
        return d.promise;
    };

    service.getInternationalMinutes = function (startDate, endDate) {
        var d = $q.defer();
        var url = '/simbox/int-min';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: startDate,
                ed: endDate
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getInternationalAndSimboxMinutes = function (startDate, endDate) {
        var d = $q.defer();
        var url = '/simbox/int-simbox-min';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: startDate,
                ed: endDate
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOnnetVsOffnet = function (startDate, endDate) {
        var d = $q.defer();
        var url = '/simbox/onnetvsoffnet';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: startDate,
                ed: endDate
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOffnet = function (startDate, endDate) {
        var d = $q.defer();
        var url = '/simbox/offnet';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: startDate,
                ed: endDate
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOffnetMinutes = function (startDate, endDate) {
        var d = $q.defer();
        var url = '/simbox/offnet-minutes';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: startDate,
                ed: endDate
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getMtd = function () {
        var d = $q.defer();
        var url = '/simbox/mtd';
        $http({
            method: 'GET',
            url: url
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getMonthlyAvgMinutes = function () {
        var d = $q.defer();
        var url = '/simbox/monthly-avg-min';
        $http({
            method: 'GET',
            url: url
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getDailyIncoming3Weeks = function (startDate, endDate) {
        var d = $q.defer();
        var url = '/simbox/daily-incoming-3weeks';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: startDate,
                ed: endDate
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOnnetSimboxSusp = function (startDate, endDate) {
        var d = $q.defer();
        var url = '/simbox/onnet-susp';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: startDate,
                ed: endDate
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getMOUOfSimbox = function (startDate, endDate) {
        var d = $q.defer();
        var url = '/simbox/mou';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: startDate,
                ed: endDate
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getMTNC = function (startDate, endDate) {
        var d = $q.defer();
        var url = '/simbox/mtnc';
        $http({
            method: 'POST',
            url: url,
            data: {
                sd: startDate,
                ed: endDate
            }
        }).then(function (response) {
            d.resolve(response.data);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getVsPartners = function () {
        var d = $q.defer();
        var url = '/simbox/vspartners';
        $http({
            method: 'GET',
            url: url
        }).then(function (response) {
            d.resolve(response.data);
        },
                function (error) {
                    d.reject(error);
                });
        return d.promise;
    };

    service.save = function (report) {
        var d = $q.defer();
        var url = '/reports/' + (report.id ? report.id : "");
        $http({
            method: report.id ? 'PUT' : 'POST',
            url: url,
            data: report
        }).then(function (response) {
            d.resolve(response.data);
        },
                function (error) {
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
        .factory('Simbox', ['$q', '$http', SimboxService]);