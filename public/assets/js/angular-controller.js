/*
 ----------------------------
 APPS CONTROLLER TABLE
 <!-- ======== GLOBAL SCRIPT SETTING ======== -->
 */


var blue = '#348fe2',
        blueLight = '#5da5e8',
        blueDark = '#1993E4',
        aqua = '#49b6d6',
        aquaLight = '#6dc5de',
        aquaDark = '#3a92ab',
        green = '#00acac',
        greenLight = '#33bdbd',
        greenDark = '#008a8a',
        orange = '#f59c1a',
        orangeLight = '#f7b048',
        orangeDark = '#c47d15',
        dark = '#2d353c',
        grey = '#b6c2c9',
        purple = '#727cb6',
        purpleLight = '#8e96c5',
        purpleDark = '#5b6392',
        red = '#ff5b57';


/* -------------------------------
 1.0 CONTROLLER - App
 ------------------------------- */
pDashboard.controller('appController', ['$rootScope', '$scope', function ($rootScope, $scope) {
        $scope.$on('$includeContentLoaded', function () {
            handleSlimScroll();
        });
        $scope.$on('$viewContentLoaded', function () {
        });
        $scope.$on('$stateChangeStart', function () {
            // reset layout setting
            $rootScope.setting.layout.pageSidebarMinified = false;
            $rootScope.setting.layout.pageFixedFooter = false;
            $rootScope.setting.layout.pageRightSidebar = false;
            $rootScope.setting.layout.pageTwoSidebar = false;
            $rootScope.setting.layout.pageTopMenu = true;
            $rootScope.setting.layout.pageWithoutSidebar = true;
            $rootScope.setting.layout.pageBoxedLayout = false;
            $rootScope.setting.layout.pageContentFullHeight = false;
            $rootScope.setting.layout.pageContentFullWidth = false;
            $rootScope.setting.layout.paceTop = false;
            $rootScope.setting.layout.pageLanguageBar = false;
            $rootScope.setting.layout.pageSidebarTransparent = false;
            $rootScope.setting.layout.pageWideSidebar = false;
            $rootScope.setting.layout.pageLightSidebar = false;
            $rootScope.setting.layout.pageFooter = false;
            $rootScope.setting.layout.pageMegaMenu = false;
            $rootScope.setting.layout.pageWithoutHeader = false;
            $rootScope.setting.layout.pageBgWhite = false;
            $rootScope.setting.layout.pageContentInverseMode = false;

            App.scrollTop();
            $('.pace .pace-progress').addClass('hide');
            $('.pace').removeClass('pace-inactive');
        });
        $scope.$on('$stateChangeSuccess', function () {
            Pace.restart();
            App.initPageLoad();
            App.initSidebarSelection();
            App.initSidebarMobileSelection();
            setTimeout(function () {
                App.initLocalStorage();
                App.initComponent();
            }, 0);
        });
        $scope.$on('$stateNotFound', function () {
            Pace.stop();
        });
        $scope.$on('$stateChangeError', function () {
            Pace.stop();
        });
    }]);



/* -------------------------------
 2.0 CONTROLLER - Sidebar
 ------------------------------- */
pDashboard.controller('sidebarController', function ($scope, $rootScope, $state) {
    App.initSidebar();
});

/* -------------------------------
 4.0 CONTROLLER - Header
 ------------------------------- */
pDashboard.controller('headerController', function ($scope, $uibModal, $window, toaster, Auth) {
    $scope.signout = function () {
        Auth.signout().then(function () {
            $window.location.reload();
        }, function (error) {
            toaster.error('Error ' + error.status, error.data.message);
        });
    };

    $scope.editProfile = function () {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'ModalProfile.html',
            controller: function ($scope, $rootScope, $uibModalInstance) {
                $scope.user = angular.copy($rootScope.user);
                $scope.upload = function ($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event) {
                    var reader = new window.FileReader();
                    if ($file)
                        reader.readAsDataURL($file);
                    reader.onloadend = function () {
                        $scope.user.picture = reader.result;
                    };
                };
                $scope.cancel = function () {
                    $uibModalInstance.close();
                };
                $scope.removePicture = function () {
                    $scope.user.picture = null;
                };
                $scope.save = function () {
                    $scope.pWorking = true;
                    Auth.update($scope.user).then(function (user) {
                        $scope.pWorking = false;
                        $rootScope.user.name = user.name;
                        $rootScope.user.picture = user.picture;
                        toaster.success('Profile successfully updated');
                        $scope.cancel();
                    }, function (error) {
                        $scope.pWorking = false;
                        toaster.error('Error ' + error.status, error.data.message);
                    });
                };
            }
        });
    };
});



/* -------------------------------
 5.0 CONTROLLER - Top Menu
 ------------------------------- */
pDashboard.controller('topMenuController', function ($scope, $rootScope, $state) {
    setTimeout(function () {
        App.initTopMenu();
    }, 0);
});



/* -------------------------------
 6.0 CONTROLLER - Page Loader
 ------------------------------- */
pDashboard.controller('pageLoaderController', function ($scope, $rootScope, $state) {
    App.initPageLoad();
});



/* -------------------------------
 7.0 CONTROLLER - Theme Panel
 ------------------------------- */
pDashboard.controller('themePanelController', function ($scope, $rootScope, $state) {
    App.initThemePanel();
});


/* -------------------------------
 9.0 CONTROLLER - Dashboard
 ------------------------------- */
pDashboard.controller('dashboardController', function ($scope, toaster, Dashboard) {
    $scope.sum = function (obj) {
        var sum = 0;
        for (var el in obj) {
            if (obj.hasOwnProperty(el)) {
                sum += parseFloat(obj[el]);
            }
        }
        return sum;
    };

    angular.element(document).ready(function () {
        $scope.working = true;
        Dashboard.getInfos().then(function (infos) {
            $scope.infos = infos;
        }, function (error) {
            toaster.error('Error ' + error.status, error.data.message);
        });
    });
});


/* -------------------------------
 41.0 CONTROLLER - Page with Footer
 ------------------------------- */
pDashboard.controller('pageWithFooterController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageFooter = true;
});



/* -------------------------------
 42.0 CONTROLLER - Page without Sidebar
 ------------------------------- */
pDashboard.controller('pageWithoutSidebarController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageWithoutSidebar = true;
});



/* -------------------------------
 43.0 CONTROLLER - Page with Right Sidebar
 ------------------------------- */
pDashboard.controller('pageWithRightSidebarController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageRightSidebar = true;
});



/* -------------------------------
 44.0 CONTROLLER - Page with Minified Sidebar
 ------------------------------- */
pDashboard.controller('pageWithMinifiedSidebarController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageSidebarMinified = true;
});



/* -------------------------------
 45.0 CONTROLLER - Page with Two Sidebar
 ------------------------------- */
pDashboard.controller('pageWithTwoSidebarController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageTwoSidebar = true;
});



/* -------------------------------
 46.0 CONTROLLER - Full Height Content
 ------------------------------- */
pDashboard.controller('pageFullHeightContentController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageContentFullHeight = true;
    $rootScope.setting.layout.pageContentFullWidth = true;
});



/* -------------------------------
 47.0 CONTROLLER - Page with Wide Sidebar
 ------------------------------- */
pDashboard.controller('pageWithWideSidebarController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageWideSidebar = true;
});



/* -------------------------------
 48.0 CONTROLLER - Page with Light Sidebar
 ------------------------------- */
pDashboard.controller('pageWithLightSidebarController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageLightSidebar = true;
});


/* -------------------------------
 49.0 CONTROLLER - Page with Mega Menu
 ------------------------------- */
pDashboard.controller('pageWithMegaMenuController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageMegaMenu = true;
});



/* -------------------------------
 50.0 CONTROLLER - Page with Top Menu
 ------------------------------- */
pDashboard.controller('pageWithTopMenuController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageTopMenu = true;
    $rootScope.setting.layout.pageWithoutSidebar = true;
});



/* -------------------------------
 51.0 CONTROLLER - Page with Boxed Layout
 ------------------------------- */
pDashboard.controller('pageWithBoxedLayoutController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageBoxedLayout = true;
});



/* -------------------------------
 52.0 CONTROLLER - Page with Mixed Menu
 ------------------------------- */
pDashboard.controller('pageWithMixedMenuController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageTopMenu = true;
});



/* -------------------------------
 53.0 CONTROLLER - Page Boxed Layout with Mixed Menu
 ------------------------------- */
pDashboard.controller('pageBoxedLayoutWithMixedMenuController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageBoxedLayout = true;
    $rootScope.setting.layout.pageTopMenu = true;
});



/* -------------------------------
 54.0 CONTROLLER - Page with Transparent Sidebar
 ------------------------------- */
pDashboard.controller('pageWithTransparentSidebarController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageSidebarTransparent = true;
});




/* -------------------------------
 56.0 CONTROLLER - Coming Soon
 ------------------------------- */
pDashboard.controller('comingSoonController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageWithoutHeader = true;
    $rootScope.setting.layout.pageBgWhite = true;
    $rootScope.setting.layout.paceTop = true;

    angular.element(document).ready(function () {
        var newYear = new Date();
        newYear = new Date(newYear.getFullYear(), 6, 7, 17, 0);
        $('#timer').countdown({until: newYear});
    });
});



/* -------------------------------
 57.0 CONTROLLER - 404 Error
 ------------------------------- */
pDashboard.controller('errorController', function ($scope, $rootScope, $state) {
    $rootScope.setting.layout.pageWithoutHeader = true;
    $rootScope.setting.layout.paceTop = true;
});


/* -------------------------------
 59.0 CONTROLLER - Login V2
 ------------------------------- */
pDashboard.controller('loginController', function ($scope, $rootScope, $state, toaster, Auth) {
    $rootScope.setting.layout.pageWithoutHeader = true;
    $rootScope.setting.layout.paceTop = true;
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.working = false;

    $scope.submitForm = function () {
        $scope.working = true;
        Auth.signin($scope.user).then(function (user) {
            $scope.working = false;
            if (user.is_super_admin || user.is_unit_admin) {
                $state.go('app.dashboard.v2');
            } else {
                $state.go('app.in.bp');
            }
        }, function (error) {
            $scope.working = false;
            toaster.error('Error ' + error.status, error.data.message);
        });
    };

    angular.element(document).ready(function () {
        $('[data-click="change-bg"]').click(function (e) {
            e.preventDefault();
            var targetImage = '[data-id="login-cover-image"]';
            var targetImageSrc = $(this).find('img').attr('src');
            var targetImageHtml = '<img src="' + targetImageSrc + '" data-id="login-cover-image" />';

            $('.login-cover-image').prepend(targetImageHtml);
            $(targetImage).not('[src="' + targetImageSrc + '"]').fadeOut('slow', function () {
                $(this).remove();
            });
            $('[data-click="change-bg"]').closest('li').removeClass('active');
            $(this).closest('li').addClass('active');
        });
    });
});

pDashboard.controller('bpController', function ($scope, $uibModal, toaster, BP) {
    $scope.bps = [];
    BP.getAll().then(function (bps) {
        $scope.bps = bps;
    }, function (error) {
        toaster.error('Error ' + error.status, error.data.message);
    });

    $scope.open = function (bp) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'ModalBP.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.bp = bp || {id: '', name: '', 'new': true};
                $scope.save = function () {
                    $scope.dWorking = true;
                    BP.save($scope.bp).then(function (bp) {
                        $scope.dWorking = false;
                        $scope.bps.push(bp);
                        toaster.success('Successfully saved');
                        $scope.cancel();
                    }, function (error) {
                        $scope.dWorking = false;
                        toaster.error('Error ' + error.status, error.data.message);
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.close();
                };
            },
            scope: $scope
        });
    };
});

pDashboard.controller('bpDetailController', function ($scope, $stateParams, $uibModal, toaster, BP, SubBP) {
    $scope.sub_bps = [];
    BP.get($stateParams.id).then(function (bp) {
        $scope.bp = bp;
    }, function (error) {
        toaster.error('Error ' + error.status, error.data.message);
    });
    SubBP.getSubBP($stateParams.id).then(function (bps) {
        $scope.sub_bps = bps;
    }, function (error) {
        toaster.error('Error ' + error.status, error.data.message);
    });

    $scope.open = function (sub_bp) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'ModalSubBP.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.sub_bp = sub_bp || {id: '', name: '', 'new': true, business_process_id: $scope.bp.id};
                $scope.save = function () {
                    $scope.dWorking = true;
                    SubBP.save($scope.sub_bp).then(function (sub_bp) {
                        $scope.dWorking = false;
                        $scope.sub_bps.push(sub_bp);
                        toaster.success('Successfully saved');
                        $scope.cancel();
                    }, function (error) {
                        $scope.dWorking = false;
                        toaster.error('Error ' + error.status, error.data.message);
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.close();
                };
            },
            scope: $scope
        });
    };
});

pDashboard.controller('subBpDetailController', function ($rootScope, $scope, $stateParams, $uibModal, toaster, SubBP, Risk, Unit, Control) {
    $scope.risks = [];
    $scope.controls = {};

    if ($rootScope.user.is_super_admin) {
        Unit.getAll().then(function (units) {
            $scope.units = units;
        }, function (error) {
            toaster.error('Error ' + error.status, error.data.message);
        });
    }

    SubBP.get($stateParams.id).then(function (sub_bp) {
        $scope.sub_bp = sub_bp;
    }, function (error) {
        toaster.error('Error ' + error.status, error.data.message);
    });

    Risk.getSubBpRisks($stateParams.id).then(function (risks) {
        $scope.risks = risks;
    }, function (error) {
        toaster.error('Error ' + error.status, error.data.message);
    });

    $scope.showControl = function (risk, control) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'ModalControl.html',
            size: 'lg',
            controller: function ($scope, $uibModalInstance) {
                $scope.risk = risk;
                $scope.control = control;

                $scope.close = function () {
                    $uibModalInstance.close();
                };
            }
        });
    };

    $scope.openRisk = function (risk) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'ModalRisk.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.risk = risk || {id: '', name: '', 'new': true, sub_business_process_id: $scope.sub_bp.id};
                $scope.save = function () {
                    $scope.dWorking = true;
                    Risk.save($scope.risk).then(function (risk) {
                        $scope.dWorking = false;
                        risk.controls = [];
                        $scope.risks.push(risk);
                        toaster.success('Risk successfully saved');
                        $scope.cancel();
                    }, function (error) {
                        $scope.dWorking = false;
                        toaster.error('Error ' + error.status, error.data.message);
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.close();
                };
            },
            scope: $scope
        });
    };

    $scope.openControl = function (risk, control) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'ModalSaveControl.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.risk = risk;
                $scope.control = control || {
                    interconnect: 0,
                    prepaid: 0,
                    postpaid: 0,
                    roaming: 0,
                    vas_and_content: 0,
                    wholesale: 0,
                    converged: 0,
                    hybrid: 0,
                    risk_id: risk.id,
                    'new': true
                };
                $scope.saveControl = function () {
                    $scope.dWorking = true;
                    Control.save($scope.control).then(function (control) {
                        $scope.dWorking = false;
                        $scope.risk.controls.push(control);
                        toaster.success('Control successfully saved');
                        $scope.cancel();
                    }, function (error) {
                        $scope.dWorking = false;
                        toaster.error('Error ' + error.status, error.data.message);
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.close();
                };
            },
            scope: $scope
        });
    };
});

pDashboard.controller('subBpReportController', function ($scope, $stateParams, $timeout, toaster, SubBP, Report) {
    var sub_bp_id = $stateParams.id;
    SubBP.get(sub_bp_id).then(function (sub_bp) {
        $scope.sub_bp = sub_bp;
        $timeout(function () {
            $('.table').trigger('footable_redraw');
        });
    }, function (error) {
        toaster.error('Error ' + error.status, error.data.message);
    });
    $scope.type = 0;
    $scope.report_month = new Date();

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.dateOptions = {
        startingDay: 1,
        minMode: 'month'
    };

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.rangePicker = {date: {startDate: null, endDate: null}};

    $scope.rangeOptions = {
        locale: {
            format: 'M/D/YYYY'
        }
    };

    $scope.search = function () {
        switch ($scope.type) {
            case 0:
                if (!$scope.report_month) {
                    toaster.info('You must select a month');
                    return;
                }
                break;
            default:
                if (!$scope.rangePicker.date.startDate || !$scope.rangePicker.date.endDate) {
                    toaster.info('You must select a date range');
                    return;
                }
                break;
        }
    };

    var init = function () {
        $scope.working = true;
        Report.getSubBpReports(sub_bp_id).then(function (reports) {
            $scope.working = false;
            $scope.reports = reports;
        }, function (error) {
            $scope.working = false;
            toaster.error('Error ' + error.status, error.data.message);
        });
    };

    init();
});

pDashboard.controller('reportsController', function ($scope, $state, $uibModal, $timeout, toaster, BP, SubBP, Risk, Report) {
    var init = function () {
        $scope.working = true;
        var type = $state.current.name.indexOf('my_reports') !== -1 ? 'me' : 'unit';
        Report.getReports(type).then(function (reports) {
            $scope.working = false;
            $scope.reports = reports;
            $timeout(function () {
                $('.table').trigger('footable_redraw');
            });
        }, function (error) {
            $scope.working = false;
            toaster.error('Error ' + error.status, error.data.message);
        });

        BP.getAll().then(function (bps) {
            $scope.bps = bps;
        }, function (error) {
            toaster.error('Error ' + error.status, error.data.message);
        });

        $scope.open = function (report, index) {
            $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                scope: $scope,
                templateUrl: 'ModalNewReport.html',
                controller: function ($scope, $rootScope, $uibModalInstance) {
                    if (report) {
                        $scope.report = angular.copy(report);
                    } else if (!$scope.report) {
                        $scope.report = {
                            validated: $rootScope.user.is_unit_admin ? 1 : 0
                        };
                    }

                    $scope.rangePicker = {date: {startDate: moment().startOf('day'), endDate: moment().startOf('day')}};

                    $scope.rangeOptions = {
                        locale: {
                            format: 'M/D/YYYY'
                        }
                    };
                    
                    $scope.dzAddedFile = function (file) {
                        //console.log(file, $scope.dropzone.files);
                    };

                    $scope.dzSuccess = function (file, report) {
                        $scope.report.name = file.name;
                        $scope.report.filename = report.filename;
                        $scope.new_uploaded = true;
                        $scope.$apply();
                    };

                    $scope.dzError = function (file, errorMessage) {
                        toaster.error('Error ', errorMessage);
                    };

                    $scope.dropzoneConfig = {
                        parallelUploads: 1,
                        maxFileSize: 1,
                        url: 'reports/upload',
                        maxFiles: 1,
                        acceptedFiles: "application/pdf, .doc, .docx, .xls, .xlsx",
                        paramName: 'reportFile'
                    };

                    $scope.onBPSelected = function ($item, $model) {
                        if ($scope.selectedBPId !== $item.id) {
                            SubBP.getSubBP($item.id).then(function (bps) {
                                $scope.sub_bps = bps;
                                $scope.selectedBPId = $item.id;
                                $scope.risks = [];
                                $scope.controls = [];
                                $scope.report.control_id = null;
                                $scope.report.sub_business_process_id = null;
                                $scope.report.risk_id = null;
                            }, function (error) {
                                toaster.error('Error ' + error.status, error.data.message);
                            });
                        }
                    };

                    $scope.onSubBPSelected = function ($item, $model) {
                        if ($scope.selectedSubBPId !== $item.id) {
                            Risk.getSubBpRisks($item.id).then(function (risks) {
                                $scope.risks = risks;
                                $scope.selectedSubBPId = $item.id;
                                $scope.controls = [];
                                $scope.report.control_id = null;
                                $scope.report.risk_id = null;
                            }, function (error) {
                                toaster.error('Error ' + error.status, error.data.message);
                            });
                        }
                    };

                    $scope.onRiskSelected = function ($item, $model) {
                        if ($scope.selectedControlId !== $item.id) {
                            $scope.controls = $item.controls;
                            $scope.report.control_id = $item.controls[0].id;
                            $scope.selectedControlId = $item.id;
                        }
                    };

                    $scope.save = function () {
                        if (!$scope.report.id)
                            $scope.report.period = $scope.rangePicker.date.startDate.format('l') === $scope.rangePicker.date.endDate.format('l') ?
                                    $scope.rangePicker.date.startDate.format('l') : $scope.rangePicker.date.startDate.format('l') + ' - ' + $scope.rangePicker.date.endDate.format('l');
//                        console.log($scope.report);
                        $scope.sWorking = true;
                        Report.save($scope.report).then(function (report) {
                            $scope.sWorking = false;
                            toaster.success('Success', 'Report successfully saved');
                            if (!$scope.report.id) {
                                $scope.reports.unshift(report);
                            } else {
                                $scope.reports[index] = report;
                            }
                            $timeout(function () {
                                $('.table').trigger('footable_redraw');
                                $scope.dropzone.removeAllFiles(true);
                                $scope.report.name = null;
                                $scope.report.filename = null;
                            });
                            //$scope.cancel();
                        }, function (error) {
                            $scope.sWorking = false;
                            toaster.error('Error ' + error.status, error.data.message);
                        });
                    };
                    $scope.cancel = function () {
                        $scope.report = null;
                        $uibModalInstance.close();
                    };
                }
            });
        };

        $scope.remove = function (report, index) {
            $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                scope: $scope,
                templateUrl: 'ModalDeleteReport.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.report = angular.copy(report);

                    $scope.delete = function () {
                        $scope.dWorking = true;
                        Report.delete($scope.report).then(function () {
                            $scope.dWorking = false;
                            toaster.success('Success', 'Report deleted');
                            $scope.cancel();
                            $scope.reports.splice(index, 1);
                            $timeout(function () {
                                $('.table').trigger('footable_redraw');
                            });
                        }, function (error) {
                            $scope.dWorking = false;
                            toaster.error('Error ' + error.status, error.data.message);
                        });
                    };
                    $scope.cancel = function () {
                        $scope.report = null;
                        $uibModalInstance.close();
                    };
                }
            });
        };
    };

    init();
});
