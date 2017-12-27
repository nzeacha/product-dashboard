/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function ReportService($q, $http) {
    var service = {};

    service.getSubBpReports = function (sub_bp_id) {
        var d = $q.defer();
        var url = '/sub_bp/'+sub_bp_id+'/report';
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
    
    service.getReports = function (type) {
        var d = $q.defer();
        var url = '/reports/'+type;
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
    
    service.get = function (id) {
        var d = $q.defer();
        var url = '/reports/'+id;
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
    }
    
    service.delete = function (report) {
        var d = $q.defer();
        var url = '/reports/'+report.id;
        $http({
            method: 'DELETE',
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
        var url = '/reports/'+(report.id?report.id:"");
        $http({
            method: report.id?'PUT':'POST',
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
        .factory('Report', ['$q', '$http', ReportService]);