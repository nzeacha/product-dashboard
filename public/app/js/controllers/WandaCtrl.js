/*
 GoCtrl
 */
pDashboard.controller('wandaController', function ($scope, toaster, $uibModal, HU, Bundle) {

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
        Bundle.getManyBundle(900050,900103, startDate, endDate).then(function (result) {
            $scope.bundle1Working = false;
            var series = [];
            var bestseries = [];
            for(var product in result){
                series.push({
                    name: Bundle.getBundleName(product),
                    data: result[product].map(function(o){return o.sum_total_amount;})
                });
                bestseries.push({
                    name: Bundle.getBundleName(product),
                    data: result[product].map(function(o){return o.sum_total_amount;}),
                    visible:  product==900055
                });
            }
            var chart = Highcharts.chart('wandaAll', {
                chart: {
                    type: 'column',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'MTN Wanda bundles - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result[900050].map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    },
                    stackLabels:{
                        enabled: true
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
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
                    enabled: false
                },
                series: series,
                exporting: {
                    sourceWidth: 1280,
                    filename: 'HU1',
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
            
            chart = Highcharts.chart('bundle1', {
                chart: {
                    type: 'line',
                    height: 500
                },
                colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', 
                        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
                credits: {
                    enabled: false
                },
                title: {
                    text: 'MTN Wanda bundles - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result[900050].map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    },
                    stackLabels:{
                        enabled: true
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true,
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
                series: bestseries,
                exporting: {
                    sourceWidth: 1280,
                    filename: 'Wanda - Revenue',
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
            $scope.charts[1] = chart;
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
            a.download = 'Voice_SMS_Data_HU_report_' + d.add(1, 'days').format('YYYYMMDD') + '.pdf';
            a.target = '_blank';
            a.click();
        }, function (error) {
            $scope.exporting = false;
            toaster.error('Error on exporting - ' + error.status, error.data.message);
        });
    };
});