/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function AuthService($q, $http, $rootScope) {
    var service = {};

    service.signin = function (user) {
        var d = $q.defer();
        var url = '/auth/signin';
        $http({
            method: 'POST',
            url: url,
            data: user
        }).then(function (response) {
            d.resolve(response.data);
        },
                function (error) {
                    d.reject(error);
                });
        return d.promise;
    };

    service.me = function (force) {
        var d = $q.defer();
        var url = '/auth/me';
        if (force || !$rootScope.user) {
            $http({
                method: 'GET',
                url: url
            }).then(function (response) {
                $rootScope.user = response.data;
                d.resolve(response.data);
            },
                    function (error) {
                        d.reject(error);
                    });
        } else {
            d.resolve($rootScope.user);
        }
        return d.promise;
    };

    service.update = function (user) {
        var d = $q.defer();
        var url = '/auth/me';
        $http({
            method: 'PUT',
            url: url,
            data: user
        }).then(function (response) {
            d.resolve(response.data);
        },
        function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.signout = function () {
        var d = $q.defer();
        var url = '/auth/signout';
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
        .factory('Auth', ['$q', '$http', '$rootScope', AuthService]);