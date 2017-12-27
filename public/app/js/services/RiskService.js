/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function RiskService($q, $http) {
    var service = {};

    service.getSubBpRisks = function (sub_bp_id) {
        var d = $q.defer();
        var url = '/sub_bp/'+sub_bp_id+'/risk';
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
        var url = '/risk/'+id;
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

    service.save = function (risk) {
        var d = $q.defer();
        var url = '/risks/';
        $http({
            method: risk.new?'POST':'PUT',
            url: url,
            data: risk
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
        .factory('Risk', ['$q', '$http', RiskService]);