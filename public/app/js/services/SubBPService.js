/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function SubBPService($q, $http) {
    var service = {};

    service.getSubBP = function (bp_id) {
        var d = $q.defer();
        var url = '/bp/'+bp_id+'/sub_bp';
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
    
    service.save = function (sub_bp) {
        var d = $q.defer();
        var url = '/sub_bp/';
        $http({
            method: sub_bp.new?'POST':'PUT',
            url: url,
            data: sub_bp
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
        var url = '/sub_bp/'+id;
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

    return service;
}

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
angular
        .module('pDashboard')
        .factory('SubBP', ['$q', '$http', SubBPService]);