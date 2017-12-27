/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function BPService($q, $http) {
    var service = {};

    service.getAll = function () {
        var d = $q.defer();
        var url = '/bp/';
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
        var url = '/bp/'+id;
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
    
    service.save = function (bp) {
        var d = $q.defer();
        var url = '/bp/';
        $http({
            method: bp.new?'POST':'PUT',
            url: url,
            data: bp
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
        .factory('BP', ['$q', '$http', BPService]);