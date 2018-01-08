/*
 * Config
 */

var pDashboard = angular.module('pDashboard', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngFileUpload'
]);

var checkLoggedOutAdmin = function ($q, $timeout, $location, $rootScope, Auth) {
    var deferred = $q.defer();
    if ($rootScope.user && $rootScope.user.is_super_admin) {
        deferred.resolve();
    } else {
        Auth.me().then(function (user) {
            $rootScope.user = user;
            if (user.is_super_admin || user.is_unit_admin)
                $timeout(deferred.resolve());
            else {
                $timeout(deferred.reject());
                $location.url('/forbidden');
            }
        }, function (error) {
            $timeout(deferred.reject());
            $location.url('/login');
        });
    }
};

var checkLoggedOut = function ($q, $timeout, $location, $rootScope, Auth) {
    var deferred = $q.defer();
    if ($rootScope.user) {
        deferred.resolve();
    } else {
        Auth.me().then(function (user) {
            $rootScope.user = user;
            $timeout(deferred.resolve());
        }, function (error) {
            $timeout(deferred.reject());
            $location.url('/login');
        });
    }
};

var checkLoggedIn = function ($q, $timeout, $state, $location, $rootScope, Auth) {
    var deferred = $q.defer();
    if ($rootScope.user) {
        $timeout(deferred.reject());
        $state.go($state.current.name);
    } else {
        Auth.me().then(function (user) {
            $rootScope.user = user;
            $timeout(deferred.reject());
            if (user.is_super_admin || user.is_unit_admin) {
                $state.go('app.dashboard.v2');
            } else {
                $state.go('app.in.bp');
            }
        }, function (error) {
            $timeout(deferred.resolve());
        });
    }
};

pDashboard.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/app/go-bundle');

        $stateProvider
                .state('app', {
                    url: '/app',
                    templateUrl: 'template/app.html',
                    abstract: true,
                    resolve: {
//                        loggedin: checkLoggedOut,
                        service: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    {
                                        name: 'toaster',
                                        files: [
                                            'assets/plugins/angularjs/toastr/toastr.min.js',
                                            'assets/css/plugins/toastr/toastr.min.css'
                                        ]
                                    }
                                ]);
                            }]
                    }
                })
                .state('app.dashboard', {
                    url: '/',
                    template: '<div ui-view></div>',
                    abstract: true,
                    resolve: {
                        //loggedin: checkLoggedOutAdmin
                    }
                })
                .state('app.dashboard.v2', {
                    url: 'dashboard',
                    templateUrl: 'views/dashboard.html',
                    data: {pageTitle: 'Dashboard'},
                    resolve: {
                        service: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'assets/plugins/gritter/css/jquery.gritter.css',
                                        'assets/plugins/gritter/js/jquery.gritter.js'
                                    ]
                                });
                            }]
                    }
                })
                .state('app.in', {
                    url: '/',
                    template: '<div ui-view></div>',
                    abstract: true,
                    resolve: {
//                        loggedin: checkLoggedOut,
                        service: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    {
                                        serie: true,
                                        files: [
                                            'assets/plugins/gritter/css/jquery.gritter.css',
                                            'assets/plugins/gritter/js/jquery.gritter.js'
                                        ]
                                    },
                                    {
                                        name: 'toaster',
                                        files: [
                                            'assets/plugins/angularjs/toastr/toastr.min.js',
                                            'assets/css/plugins/toastr/toastr.min.css'
                                        ]
                                    },
                                    {
                                        name: 'ui.select',
                                        files: [
                                            'assets/plugins/angularjs/ui-select/select.min.js',
                                            'assets/css/plugins/ui-select/select.min.css'
                                        ]
                                    }
                                ]);
                            }]
                    }
                })
                .state('app.in.mtnwanda', {
                    url: 'mtnwanda',
                    data: {pageTitle: 'MTN Wanda'},
                    templateUrl: 'views/mtn_wanda.html',
                    resolve: {
                        service: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(
                                        [
                                            {
                                                name: 'daterangepicker',
                                                serie: true,
                                                files: [
                                                    'assets/plugins/moment/moment.min.js',
                                                    'assets/plugins/angularjs/daterangepicker/daterangepicker.js',
                                                    'assets/plugins/angularjs/daterangepicker/angular-daterangepicker.js',
                                                    'assets/css/plugins/daterangepicker/daterangepicker-bs3.css'
                                                ]
                                            },
                                            {
                                                name: 'datePicker',
                                                files: [
                                                    'assets/plugins/angularjs/datepicker/angular-datepicker.min.js',
                                                    'assets/css/plugins/datepicker/angular-datepicker.min.css'
                                                ]
                                            },
                                            {
                                                name: 'ui.select',
                                                files: [
                                                    'assets/plugins/angularjs/ui-select/select.min.js',
                                                    'assets/css/plugins/ui-select/select.min.css'
                                                ]
                                            },
                                            {
                                                name: 'nvd3',
                                                serie: true,
                                                files: [
                                                    'assets/plugins/angularjs/nvd3/d3.min.js',
                                                    'assets/plugins/angularjs/nvd3/nv.d3.min.js',
                                                    'assets/plugins/angularjs/nvd3/angular-nvd3.min.js',
                                                    'assets/css/plugins/nvd3/nv.d3.min.css'
                                                ]
                                            },
                                            {
                                                serie: true,
                                                files: [
                                                    'assets/plugins/angularjs/highcharts/highcharts.js',
                                                    'assets/plugins/angularjs/highcharts/exporting.js',
                                                    'assets/plugins/angularjs/highcharts/offline-exporting.js',
                                                    'assets/plugins/angularjs/highcharts/multi-export.js',
                                                    'assets/plugins/angularjs/highcharts/theme.js',
                                                    'assets/plugins/angularjs/highcharts/annotations.js',
                                                            //'assets/css/plugins/highcharts/highcharts.css'
                                                ]
                                            }
                                        ]
                                        );
                            }]
                    }
                })
                .state('app.in.goBundle', {
                    url: 'go-bundle',
                    data: {pageTitle: 'Go Bundles'},
                    templateUrl: 'views/go_bundles.html',
                    resolve: {
                        service: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(
                                        [
                                            {
                                                name: 'daterangepicker',
                                                serie: true,
                                                files: [
                                                    'assets/plugins/moment/moment.min.js',
                                                    'assets/plugins/angularjs/daterangepicker/daterangepicker.js',
                                                    'assets/plugins/angularjs/daterangepicker/angular-daterangepicker.js',
                                                    'assets/css/plugins/daterangepicker/daterangepicker-bs3.css'
                                                ]
                                            },
                                            {
                                                name: 'datePicker',
                                                files: [
                                                    'assets/plugins/angularjs/datepicker/angular-datepicker.min.js',
                                                    'assets/css/plugins/datepicker/angular-datepicker.min.css'
                                                ]
                                            },
                                            {
                                                name: 'ui.select',
                                                files: [
                                                    'assets/plugins/angularjs/ui-select/select.min.js',
                                                    'assets/css/plugins/ui-select/select.min.css'
                                                ]
                                            },
                                            {
                                                name: 'nvd3',
                                                serie: true,
                                                files: [
                                                    'assets/plugins/angularjs/nvd3/d3.min.js',
                                                    'assets/plugins/angularjs/nvd3/nv.d3.min.js',
                                                    'assets/plugins/angularjs/nvd3/angular-nvd3.min.js',
                                                    'assets/css/plugins/nvd3/nv.d3.min.css'
                                                ]
                                            },
                                            {
                                                serie: true,
                                                files: [
                                                    'assets/plugins/angularjs/highcharts/highcharts.js',
                                                    'assets/plugins/angularjs/highcharts/exporting.js',
                                                    'assets/plugins/angularjs/highcharts/offline-exporting.js',
                                                    'assets/plugins/angularjs/highcharts/multi-export.js',
                                                    'assets/plugins/angularjs/highcharts/theme.js',
                                                    'assets/plugins/angularjs/highcharts/annotations.js',
                                                            //'assets/css/plugins/highcharts/highcharts.css'
                                                ]
                                            }
                                        ]
                                        );
                            }]
                    }
                })
                .state('app.in.import', {
                    url: 'import-file',
                    data: {pageTitle: 'Import'},
                    templateUrl: 'views/import.html',
                    resolve: {
                        service: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'ngDropzone',
                                    serie: true,
                                    files: [
                                        'assets/plugins/angularjs/dropzone/dropzone.js',
                                        'assets/plugins/angularjs/dropzone/angular-dropzone.js',
                                        'assets/css/plugins/dropzone/basic.css',
                                        'assets/css/plugins/dropzone/dropzone.css'
                                    ]
                                });
                            }]
                    }
                })
                .state('comingSoon', {
                    url: '/coming-soon',
                    data: {pageTitle: 'Coming Soon'},
                    templateUrl: 'views/extra/extra_coming_soon.html',
                    resolve: {
                        service: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [
                                        'assets/plugins/jquery.countdown/jquery.countdown.css',
                                        'assets/plugins/jquery.countdown/jquery.plugin.js',
                                        'assets/plugins/jquery.countdown/jquery.countdown.js'
                                    ]
                                });
                            }]
                    }
                })
                .state('error', {
                    url: '/error',
                    data: {pageTitle: '404 Error'},
                    templateUrl: 'views/extra/extra_404_error.html'
                })

                .state('forbidden', {
                    url: '/forbidden',
                    data: {pageTitle: 'Access Forbidden'},
                    templateUrl: 'views/extra/extra_405_error.html'
                })
                .state('member', {
                    url: '/',
                    template: '<div ui-view></div>',
                    abstract: true
                })
                .state('member.login', {
                    url: 'login',
                    data: {pageTitle: 'Login'},
                    templateUrl: 'views/auth/login.html',
                    resolve: {
                        loggedin: checkLoggedIn,
                        service: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(
                                        {
                                            name: 'toaster',
                                            files: [
                                                'assets/plugins/angularjs/toastr/toastr.min.js',
                                                'assets/css/plugins/toastr/toastr.min.css'
                                            ]
                                        });
                            }]
                    }
                });
    }]);

pDashboard.run(['$rootScope', '$state', 'setting', function ($rootScope, $state, setting) {
        $rootScope.$state = $state;
        $rootScope.setting = setting;
    }]);