/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function ControlService($q, $http) {
    var service = {};
    
    service.save = function (control) {
        var d = $q.defer();
        var url = '/controls/';
        $http({
            method: control.new?'POST':'PUT',
            url: url,
            data: control
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
        .factory('Control', ['$q', '$http', ControlService]);