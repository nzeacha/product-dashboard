/*
 VoiceCtrl
 */
pDashboard.controller('voiceController', function ($scope, toaster, $uibModal, HU, Bundle) {

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
    $scope.charts = new Array(10);

    $scope.getData = function (startDate, endDate) {
        
        // All
        $scope.voiceallWorking = true;
        Bundle.getManyBundle(900200,900209, startDate, endDate).then(function (result) {
            $scope.voiceallWorking = false;
//            console.log(result);
            var series = [];
            for(var product in result){
                series.push({
                    name: Bundle.getBundleName(product),
                    data: result[product].map(function(o){return o.sum_total_amount;})
                });
            }
            var chart = Highcharts.chart('voiceall', {
                chart: {
                    type: 'column',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'MTN Voice Bundles - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result[900200].map(function (o) {
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
                    enabled: true
                },
                series: series,
                exporting: {
                    sourceWidth: 1280,
                    filename: 'VoiceAll',
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
        }, function (error) {
            $scope.voiceallWorking = false;
            toaster.error('Error on VoiceAll - ' + error.status, error.data.message);
        });
        
        // Day 100
        $scope.bundle1Working = true;
        Bundle.getBundle1("900200", startDate, endDate).then(function (result) {
            $scope.bundle1Working = false;

            var chart = Highcharts.chart('bundle1', {
                chart: {
                    type: 'line',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: Bundle.getBundleName(result[0].product_code) + ' - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
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
                    enabled: false
                },
                series: [{
                        name: 'Revenue',
                        data: result.map(function (o) {
                            return o.sum_total_amount;
                        })
                    }
                ],
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
                                $scope.addComment(chart, 1);
                            }
                        }
                    }
                }
            });
            $scope.charts[1] = chart;
        }, function (error) {
            $scope.bundle1Working = false;
            toaster.error('Error on HU1 - ' + error.status, error.data.message);
        });
        
        
        //Day 250
        $scope.voice3Working = true;
        Bundle.getBundle1("900201", startDate, endDate).then(function (result) {
            $scope.voice3Working = false;

            var chart = Highcharts.chart('voice3', {
                chart: {
                    type: 'line',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: Bundle.getBundleName(result[0].product_code) + ' - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
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
                    enabled: false
                },
                series: [{
                        name: 'Revenue',
                        data: result.map(function (o) {
                            return o.sum_total_amount;
                        })
                    }
                ],
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
                                $scope.addComment(chart, 2);
                            }
                        }
                    }
                }
            });
            $scope.charts[2] = chart;
        }, function (error) {
            $scope.voice3Working = false;
            toaster.error('Error on HU1 - ' + error.status, error.data.message);
        });

        // Day 500
        $scope.bundle2Working = true;
        Bundle.getBundle1("900202", startDate, endDate).then(function (result) {
            $scope.bundle2Working = false;
            
//            console.log(result);

            var chart = Highcharts.chart('bundle2', {
                chart: {
                    type: 'line',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: Bundle.getBundleName(result[0].product_code) + ' - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
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
                series: [{
                        name: 'Revenue',
                        data: result.map(function (o) {
                            return o.sum_total_amount;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'HU2',
                    buttons: {
                        commentButton: {
                            symbol: 'circle',
                            symbolStrokeWidth: 5,
                            _titleKey: 'commentButtonTitle',
                            symbolStroke: 'grey',
                            symbolFill: 'white',
                            title: 'New comment',
                            onclick: function () {
                                $scope.addComment(chart, 3);
                            }
                        }
                    }
                }
            });
            $scope.charts[3] = chart;
        }, function (error) {
            $scope.bundle2Working = false;
            toaster.error('Error on HU2 - ' + error.status, error.data.message);
        });

        // Week 300
        $scope.bundle3Working = true;
        Bundle.getBundle1( "900203", startDate, endDate).then(function (result) {
            $scope.bundle3Working = false;

            var chart = Highcharts.chart('bundle3', {
                chart: {
                    type: 'line',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: Bundle.getBundleName(result[0].product_code) + ' - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
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
                series: [{
                        name: 'Revenue',
                        data: result.map(function (o) {
                            return o.sum_total_amount;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'HU3',
                    buttons: {
                        commentButton: {
                            symbol: 'circle',
                            symbolStrokeWidth: 5,
                            _titleKey: 'commentButtonTitle',
                            symbolStroke: 'grey',
                            symbolFill: 'white',
                            title: 'New comment',
                            onclick: function () {
                                $scope.addComment(chart, 4);
                            }
                        }
                    }
                }
            });
            $scope.charts[4] = chart;
        }, function (error) {
            $scope.bundle3Working = false;
            toaster.error('Error on HU3 - ' + error.status, error.data.message);
        });

        // Week 1000
        $scope.bundle4Working = true;
        Bundle.getBundle1("900204", startDate, endDate).then(function (result) {
            $scope.bundle4Working = false;

            var chart = Highcharts.chart('bundle4', {
                chart: {
                    type: 'line',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: Bundle.getBundleName(result[0].product_code) + ' - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
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
                series: [{
                        name: 'Revenue',
                        data: result.map(function (o) {
                            return o.sum_total_amount;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'HU4',
                    buttons: {
                        commentButton: {
                            symbol: 'circle',
                            symbolStrokeWidth: 5,
                            _titleKey: 'commentButtonTitle',
                            symbolStroke: 'grey',
                            symbolFill: 'white',
                            title: 'New comment',
                            onclick: function () {
                                $scope.addComment(chart, 5);
                            }
                        }
                    }
                }
            });
            $scope.charts[5] = chart;
        }, function (error) {
            $scope.bundle4Working = false;
            toaster.error('Error on HU4 - ' + error.status, error.data.message);
        });

        // Week 2500
        $scope.bundle9Working = true;
        Bundle.getBundle1("900205", startDate, endDate).then(function (result) {
            $scope.bundle9Working = false;

            var chart = Highcharts.chart('bundle9', {
                chart: {
                    type: 'line',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: Bundle.getBundleName(result[0].product_code) + ' - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
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
                series: [{
                        name: 'Revenue',
                        data: result.map(function (o) {
                            return o.sum_total_amount;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'HU9',
                    buttons: {
                        commentButton: {
                            symbol: 'circle',
                            symbolStrokeWidth: 5,
                            _titleKey: 'commentButtonTitle',
                            symbolStroke: 'grey',
                            symbolFill: 'white',
                            title: 'New comment',
                            onclick: function () {
                                $scope.addComment(chart, 6);
                            }
                        }
                    }
                }
            });
            $scope.charts[6] = chart;
        }, function (error) {
            $scope.bundle9Working = false;
            toaster.error('Error on HU9 - ' + error.status, error.data.message);
        });
        
        // Month 600
        $scope.voice35Working = false;
        Bundle.getBundle1("900206", startDate, endDate).then(function (result) {
            $scope.voice35Working = false;

            var chart = Highcharts.chart('voice35', {
                chart: {
                    type: 'line',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: Bundle.getBundleName(result[0].product_code) + ' - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
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
                series: [{
                        name: 'Revenue',
                        data: result.map(function (o) {
                            return o.sum_total_amount;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'HU9',
                    buttons: {
                        commentButton: {
                            symbol: 'circle',
                            symbolStrokeWidth: 5,
                            _titleKey: 'commentButtonTitle',
                            symbolStroke: 'grey',
                            symbolFill: 'white',
                            title: 'New comment',
                            onclick: function () {
                                $scope.addComment(chart, 7);
                            }
                        }
                    }
                }
            });
            $scope.charts[7] = chart;
        }, function (error) {
            $scope.voice35Working = false;
            toaster.error('Error on HU9 - ' + error.status, error.data.message);
        });
 

        // Month 2000
        $scope.voice7Working = true;
        Bundle.getBundle1("900207", startDate, endDate).then(function (result) {
            $scope.voice7Working = false;

            var chart = Highcharts.chart('voice7', {
                chart: {
                    type: 'line',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: Bundle.getBundleName(result[0].product_code) + ' - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
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
                series: [{
                        name: 'Revenue',
                        data: result.map(function (o) {
                            return o.sum_total_amount;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'HU9',
                    buttons: {
                        commentButton: {
                            symbol: 'circle',
                            symbolStrokeWidth: 5,
                            _titleKey: 'commentButtonTitle',
                            symbolStroke: 'grey',
                            symbolFill: 'white',
                            title: 'New comment',
                            onclick: function () {
                                $scope.addComment(chart, 8);
                            }
                        }
                    }
                }
            });
            $scope.charts[8] = chart;
        }, function (error) {
            $scope.voice7Working = false;
            toaster.error('Error on HU9 - ' + error.status, error.data.message);
        });
        
        // Month 4000
        $scope.voice8Working = false;
        Bundle.getBundle1("900208", startDate, endDate).then(function (result) {
            $scope.voice8Working = false;

            var chart = Highcharts.chart('voice8', {
                chart: {
                    type: 'line',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: Bundle.getBundleName(result[0].product_code) + ' - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
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
                series: [{
                        name: 'Revenue',
                        data: result.map(function (o) {
                            return o.sum_total_amount;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'HU9',
                    buttons: {
                        commentButton: {
                            symbol: 'circle',
                            symbolStrokeWidth: 5,
                            _titleKey: 'commentButtonTitle',
                            symbolStroke: 'grey',
                            symbolFill: 'white',
                            title: 'New comment',
                            onclick: function () {
                                $scope.addComment(chart, 9);
                            }
                        }
                    }
                }
            });
            $scope.charts[9] = chart;
        }, function (error) {
            $scope.voice8Working = false;
            toaster.error('Error on HU9 - ' + error.status, error.data.message);
        });
        
        //Month 12000
        $scope.voice9Working = false;
        Bundle.getBundle1("900209", startDate, endDate).then(function (result) {
            $scope.voice9Working = false;

            var chart = Highcharts.chart('voice9', {
                chart: {
                    type: 'line',
                    height: 300
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: Bundle.getBundleName(result[0].product_code) + ' - Revenue'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.date));
                    })
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
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
                series: [{
                        name: 'Revenue',
                        data: result.map(function (o) {
                            return o.sum_total_amount;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'HU9',
                    buttons: {
                        commentButton: {
                            symbol: 'circle',
                            symbolStrokeWidth: 5,
                            _titleKey: 'commentButtonTitle',
                            symbolStroke: 'grey',
                            symbolFill: 'white',
                            title: 'New comment',
                            onclick: function () {
                                $scope.addComment(chart, 10);
                            }
                        }
                    }
                }
            });
            $scope.charts[10] = chart;
        }, function (error) {
            $scope.voice9Working = false;
            toaster.error('Error on HU9 - ' + error.status, error.data.message);
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