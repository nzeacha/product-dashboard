/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function BundleService($q, $http) {

    var service = {};
    
    var mapBundleName = [];
    // Voice Bundles
    mapBundleName[900200] = "Voice Day 100";
    mapBundleName[900201] = "Voice Day 250";
    mapBundleName[900202] = "Voice Day 500";
    mapBundleName[900203] = "Voice Week 300";
    mapBundleName[900204] = "Voice Week 1000";
    mapBundleName[900205] = "Voice Week 2500";
    mapBundleName[900206] = "Voice Month 600";
    mapBundleName[900207] = "Voice Month 2000";
    mapBundleName[900208] = "Voice Month 4000";
    mapBundleName[900209] = "Voice Month 12000";
    mapBundleName[900210] = "Voice Month 26000";
    // Go Bundles
    mapBundleName[20800] = "Go 5000";
    mapBundleName[20801] = "Go 20000";
    mapBundleName[20802] = "Go 35000";
    mapBundleName[20804] = "Go 10000";
    mapBundleName[20805] = "Go 15000";
    mapBundleName[20806] = "Go 1000";
    mapBundleName[20807] = "Go 3000";
    // MTN Wanda Day
    mapBundleName[900050] = "Day 25";
    mapBundleName[900051] = "Day 39";
    mapBundleName[900052] = "Day 69";
    mapBundleName[900053] = "Day 99";
    mapBundleName[900054] = "Day 149";
    mapBundleName[900055] = "Day 199";
    mapBundleName[900056] = "Day 249";
    mapBundleName[900057] = "Day 299";
    mapBundleName[900058] = "Day 349";
    mapBundleName[900059] = "Day 399";
    mapBundleName[900060] = "Day 499";
    mapBundleName[900061] = "Day 599";
    mapBundleName[900062] = "Day 699";
    mapBundleName[900063] = "Day 799";
    mapBundleName[900064] = "Day 999";
    mapBundleName[900065] = "Day 1299";
    mapBundleName[900066] = "Day 1499";
    mapBundleName[900067] = "Day 1999";
    // MTN Wanda Week
    mapBundleName[900068] = "Week 99";
    mapBundleName[900069] = "Week 199";
    mapBundleName[900070] = "Week 299";
    mapBundleName[900071] = "Week 499";
    mapBundleName[900072] = "Week 799";
    mapBundleName[900073] = "Week 999";
    mapBundleName[900074] = "Week 1499";
    mapBundleName[900075] = "Week 1999";
    mapBundleName[900076] = "Week 2499";
    mapBundleName[900077] = "Week 2999";
    mapBundleName[900078] = "Week 3999";
    mapBundleName[900079] = "Week 4999";
    mapBundleName[900080] = "Week 6999";
    mapBundleName[900081] = "Week 9999";
    mapBundleName[900082] = "Week 14900";
    mapBundleName[900083] = "Week 19900";
    mapBundleName[900084] = "Week 24900";
    mapBundleName[900085] = "Week 29900";
    // MTN Wanda Month
    mapBundleName[900086] = "Month 199";
    mapBundleName[900087] = "Month 399";
    mapBundleName[900088] = "Month 599";
    mapBundleName[900089] = "Month 999";
    mapBundleName[900090] = "Month 1999";
    mapBundleName[900091] = "Month 2999";
    mapBundleName[900092] = "Month 3999";
    mapBundleName[900093] = "Month 4999";
    mapBundleName[900094] = "Month 6999";
    mapBundleName[900095] = "Month 9999";
    mapBundleName[900096] = "Month 14900";
    mapBundleName[900097] = "Month 19900";
    mapBundleName[900098] = "Month 24900";
    mapBundleName[900099] = "Month 29900";
    mapBundleName[900100] = "Month 39900";
    mapBundleName[900101] = "Month 49900";
    mapBundleName[900102] = "Month 99900";
    mapBundleName[900103] = "Month 199900";
    
    
    service.getBundleName = function (productCode){
        return mapBundleName[productCode];
    };

    service.export = function (charts) {
        var d = $q.defer();
        var url = '/bundle/export-all';
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

    service.getBundle1 = function (code, sd, ed) {
        var d = $q.defer();
        var url = '/bundle/' + code;
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

    service.getManyBundle = function (code1,code2,sd, ed) {
        var d = $q.defer();
        var url = '/manybundle/';
        $http({
            method: 'POST',
            url: url,
            data: {
                code1: code1,
                code2: code2,
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

    service.getMymtn = function (sd, ed) {
        var d = $q.defer();
        var url = '/mymtn/';
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
    
    service.getBundle3 = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/3';
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

    service.getBundle4 = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/4';
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

    service.getBundle9 = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/9';
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

    service.getBundleSms = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/sms';
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
        var url = '/bundle/smsc';
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
        var url = '/bundle/smsc-bypass';
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
    
    service.getBundleGprs = function (sd, ed) {
        var d = $q.defer();
        var url = '/bundle/gprs';
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
        .factory('Bundle', ['$q', '$http', BundleService]);