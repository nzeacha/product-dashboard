/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function DashboardService($q, $http) {
    var service = {};

    service.getInfos = function () {
        var d = $q.defer();
        var url = '/dashboard/infos';
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
        .factory('Dashboard', ['$q', '$http', DashboardService]);