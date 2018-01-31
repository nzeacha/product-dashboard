/*
 GoCtrl
 */
pDashboard.controller('mymtnController', function ($scope, toaster, $uibModal, HU, Bundle) {

    $scope.Working = function () {
        return $scope.bundle1Working || $scope.bundle2Working || $scope.bundle3Working || $scope.bundle4Working
                || $scope.bundle9Working || $scope.bundlesmsWorking || $scope.smscWorking || $scope.smscbyWorking || $scope.gprsWorking;
    };

    $scope.subTitleOptions = {
        style: {
            color: "red"
        }
    };
    $scope.rangePicker = {date: {startDate: moment().subtract(30, 'days'), endDate: moment().subtract(1, 'days')}};

    $scope.rangeOptions = {
        locale: {
            format: 'MM/DD/YYYY'
        },
        minDate: moment().subtract(120, 'days'),
        maxDate: moment().subtract(1, 'days'),
        dateLimit: {days: 60},
        ranges: {
            'Last 7 Days': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
            'Last 30 Days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
            'This Month': [moment().startOf('month'), moment().subtract(1, 'days')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        eventHandlers: {
            'apply.daterangepicker': function (ev, picker) {
                //console.log(ev, picker);
                $scope.getData(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));
            }
        }
    };
    
    $scope.chartPicker = {date: {startDate: moment().subtract(30, 'days'), endDate: moment().subtract(1, 'days')}};

    $scope.chartOptions = {
        locale: {
            format: 'MM/DD/YYYY'
        },
        minDate: moment().subtract(120, 'days'),
        maxDate: moment().subtract(1, 'days'),
        dateLimit: {days: 60},
        ranges: {
            'Last 7 Days': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
            'Last 30 Days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
            'This Month': [moment().startOf('month'), moment().subtract(1, 'days')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        eventHandlers: {
            'apply.daterangepicker': function (ev, picker) {
                //console.log(ev, picker);
            }
        }
    };
    $scope.charts = new Array(5);

    $scope.getData = function (startDate, endDate) {
        // Go 1000
        $scope.bundle1Working = true;
        Bundle.getMymtn(startDate, endDate).then(function (result) {
            $scope.bundle1Working = false;
            var series = [];
            var bestseries = [];
            
            var chart = Highcharts.chart('mymtnAll', {
                chart: {
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'MyMTN trends'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: [{
                    min: 0,
                    title: {
                        text: null
                    },
                    stackLabels:{
                        enabled: true
                    }
                },{
                    min: -1,
                    title: {
                        text: null
                    },
                    opposite: true
                }],
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: false,
                            style: {
                                fontWeight: 'normal'
                            }
                        },
                        enableMouseTracking: true
                    }
                },
                legend: {
                    enabled: true
                },
                series: [{
                        type: 'column',
                        name: 'Download',
                        data: result.map(function (o) {
                            return o.download;
                        })
                    },{
                        type: 'column',
                        name: 'New Users',
                        data: result.map(function (o) {
                            return o.new_users;
                        })
                    },{
                        type: 'column',
                        name: 'Acive Users',
                        data: result.map(function (o) {
                            return o.active_users;
                        })
                    },{
                        type: 'spline',
                        name: 'DOD Download',
                        yAxis: 1,
                        data: result.map(function (o) {
                            return o.dod_download;
                        })
                    },{
                        type: 'spline',
                        name: 'DOD New Users',
                        yAxis: 1,
                        data: result.map(function (o) {
                            return o.dod_new_users;
                        })
                    },{
                        type: 'spline',
                        name: 'DOD Active Users',
                        yAxis: 1,
                        data: result.map(function (o) {
                            return o.dod_active_users;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'MyMTN Trends',
                    buttons: {
                        commentButton: {
                            symbol: 'circle',
                            symbolStrokeWidth: 5,
                            _titleKey: 'commentButtonTitle',
                            symbolStroke: 'grey',
                            symbolFill: 'white',
                            title: 'New comment',
                            onclick: function () {
                                $scope.addComment(chart, 0);
                            }
                        }
                    }
                }
            });
            $scope.charts[0] = chart;
            
            
            //console.log(chart.series[0].data);
        }, function (error) {
            $scope.bundle1Working = false;
            toaster.error('Error on HU1 - ' + error.status, error.data.message);
        });
        
        
    };



    $scope.getData($scope.rangePicker.date.startDate.format('YYYY-MM-DD'), $scope.rangePicker.date.endDate.format('YYYY-MM-DD'));

    $scope.addComment = function (chart, $index) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'ModalChartComment.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.comment = (chart.subtitle && chart.subtitle.textStr) || '';

                $scope.saveComment = function () {
                    if ($scope.comment) {
                        chart.setSubtitle({text: $scope.comment});
                        $scope.charts[$index].subtitle.text = $scope.comment;
                        $scope.cancel();
                    } else {
                        toaster.warning('No comment to add');
                        chart.setSubtitle({text: ''});
                        if ($scope.charts[$index].subtitle)
                            $scope.charts[$index].subtitle.text = '';
                        $scope.cancel();
                    }
                };

                $scope.cancel = function () {
                    $uibModalInstance.close();
                };
            },
            scope: $scope
        });
    };

    $scope.export = function () {
        var type = 'application/pdf';
        var c = $scope.charts.map(function (o) {
            if (o) {
                o.userOptions.subtitle = {style: o.userOptions.subtitle.style, text: o.subtitle && o.subtitle.text};
            }
            return  o && o.userOptions;
        });
//        console.log(c);
        var sd = $scope.rangePicker.date.startDate.format('YYYY-MM-DD');
        var ed = $scope.rangePicker.date.endDate.format('YYYY-MM-DD');
        $scope.exporting = true;
        HU.export({themeOptions: Highcharts.theme, charts: c, startDate: sd, endDate: ed}).then(function (data) {
            $scope.exporting = false;
            var url = URL.createObjectURL(new Blob([data], {type: type}));
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            var d = angular.copy($scope.rangePicker.date.endDate);
            a.download = 'MTN_Wanda_report_' + d.add(1, 'days').format('YYYYMMDD') + '.pdf';
            a.target = '_blank';
            a.click();
        }, function (error) {
            $scope.exporting = false;
            toaster.error('Error on exporting - ' + error.status, error.data.message);
        });
    };
});