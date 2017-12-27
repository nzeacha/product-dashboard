/*
 HUCtrl
 */
pDashboard.controller('huController', function ($scope, toaster, $uibModal, HU) {

    $scope.Working = function () {
        return $scope.hu1Working || $scope.hu2Working || $scope.hu3Working || $scope.hu4Working
                || $scope.hu9Working || $scope.husmsWorking || $scope.smscWorking || $scope.smscbyWorking || $scope.gprsWorking;
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
    $scope.charts = new Array(5);

    $scope.getData = function (startDate, endDate) {
        // HU1
        $scope.hu1Working = true;
        HU.getHU1(startDate, endDate).then(function (result) {
            $scope.hu1Working = false;

            var chart = Highcharts.chart('hu1', {
                chart: {
                    type: 'line',
                    height: 300
                },
                title: {
                    text: 'HU1 - Subscribers whose total MOC is greater than 200 calls in a day'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.M_DATE));
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
                        name: 'Subscribers',
                        data: result.map(function (o) {
                            return o.MSISDN;
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
                                $scope.addComment(chart, 0);
                            }
                        }
                    }
                }
            });
            $scope.charts[0] = chart;
        }, function (error) {
            $scope.hu1Working = false;
            toaster.error('Error on HU1 - ' + error.status, error.data.message);
        });

        // Cash in
        $scope.hu2Working = true;
        HU.getHU2(startDate, endDate).then(function (result) {
            $scope.hu2Working = false;

            var chart = Highcharts.chart('hu2', {
                chart: {
                    type: 'line',
                    height: 300
                },
                title: {
                    text: 'HU2 - Subscribers whose cumulative call duration is greater than 10 hours within a day'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.M_DATE));
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
                        name: 'Subscribers',
                        data: result.map(function (o) {
                            return o.MSISDN;
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
                                $scope.addComment(chart, 1);
                            }
                        }
                    }
                }
            });
            $scope.charts[1] = chart;
        }, function (error) {
            $scope.hu2Working = false;
            toaster.error('Error on HU2 - ' + error.status, error.data.message);
        });

        // HU3
        $scope.hu3Working = true;
        HU.getHU3(startDate, endDate).then(function (result) {
            $scope.hu3Working = false;

            var chart = Highcharts.chart('hu3', {
                chart: {
                    type: 'line',
                    height: 300
                },
                title: {
                    text: 'HU3 - Subscribers whose a single call duration is greater than 2h30min within a day'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.M_DATE));
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
                        name: 'Subscribers',
                        data: result.map(function (o) {
                            return o.MSISDN;
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
                                $scope.addComment(chart, 2);
                            }
                        }
                    }
                }
            });
            $scope.charts[2] = chart;
        }, function (error) {
            $scope.hu3Working = false;
            toaster.error('Error on HU3 - ' + error.status, error.data.message);
        });

        // HU4
        $scope.hu4Working = true;
        HU.getHU4(startDate, endDate).then(function (result) {
            $scope.hu4Working = false;

            var chart = Highcharts.chart('hu4', {
                chart: {
                    type: 'line',
                    height: 300
                },
                title: {
                    text: 'HU4 - Subscribers whose total international MOC is greater than 50 calls within a day'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.M_DATE));
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
                        name: 'Subscribers',
                        data: result.map(function (o) {
                            return o.MSISDN;
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
                                $scope.addComment(chart, 3);
                            }
                        }
                    }
                }
            });
            $scope.charts[3] = chart;
        }, function (error) {
            $scope.hu4Working = false;
            toaster.error('Error on HU4 - ' + error.status, error.data.message);
        });

        // HU9
        $scope.hu9Working = true;
        HU.getHU9(startDate, endDate).then(function (result) {
            $scope.hu9Working = false;

            var chart = Highcharts.chart('hu9', {
                chart: {
                    type: 'line',
                    height: 300
                },
                title: {
                    text: 'HU9 - Subscribers whose a single international call duration is greater than 1h30min within a day'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.M_DATE));
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
                        name: 'Subscribers',
                        data: result.map(function (o) {
                            return o.MSISDN;
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
                                $scope.addComment(chart, 4);
                            }
                        }
                    }
                }
            });
            $scope.charts[4] = chart;
        }, function (error) {
            $scope.hu9Working = false;
            toaster.error('Error on HU9 - ' + error.status, error.data.message);
        });

        // HU SMS
        $scope.husmsWorking = true;
        HU.getHUSms(startDate, endDate).then(function (result) {
            $scope.husmsWorking = false;

            var chart = Highcharts.chart('husms', {
                chart: {
                    type: 'line',
                    height: 300
                },
                title: {
                    text: 'HU SMS - Subscribers whose total MOSMS is greater than 1,000 SMS within a day'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.M_DATE));
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
                        name: 'Subscribers',
                        data: result.map(function (o) {
                            return o.MSISDN;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'HU SMS',
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
            $scope.husmsWorking = false;
            toaster.error('Error on HU SMS - ' + error.status, error.data.message);
        });

        $scope.smscWorking = true;
        HU.getSMSC(startDate, endDate).then(function (result) {
            $scope.smscWorking = false;

            var chart = Highcharts.chart('smsc', {
                chart: {
                    type: 'line',
                    height: 300
                },
                title: {
                    text: 'Total number of SMS sent'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.M_DATE));
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
                                fontSize: '10px',
                                fontWeight: 'normal'
                            },
                            formatter: function () {
                                return (parseFloat(this.y / 1000000).toFixed(2)).toLocaleString() + ' M';
                            }
                        },
                        enableMouseTracking: true
                    }
                },
                series: [{
                        name: 'Total SMS',
                        data: result.map(function (o) {
                            return o.SMS;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'SMS',
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
            $scope.smscWorking = false;
            toaster.error('Error on total SMS sent - ' + error.status, error.data.message);
        });

        $scope.smscbyWorking = true;
        HU.getSMSCByPass(startDate, endDate).then(function (result) {
            $scope.smscbyWorking = false;

            var chart = Highcharts.chart('smscby', {
                chart: {
                    type: 'line',
                    height: 300
                },
                title: {
                    text: 'Total number of SMS sent from other operators MSISDN through MTNC SMSCs'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.M_DATE));
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
                        name: 'SMS',
                        data: result.map(function (o) {
                            return o.SMS;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'SMSC Bypass',
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
            $scope.smscbyWorking = false;
            toaster.error('Error on total SMS bypass - ' + error.status, error.data.message);
        });

        $scope.gprsWorking = true;
        HU.getHUGprs(startDate, endDate).then(function (result) {
            $scope.gprsWorking = false;

            var chart = Highcharts.chart('gprs', {
                chart: {
                    type: 'line',
                    height: 300
                },
                title: {
                    text: 'HU GPRS - Subscribers whose total data usage is greater than 15 GB within a day'
                },
                subtitle: $scope.subTitleOptions,
                xAxis: {
                    categories: result.map(function (o) {
                        return d3.time.format('%d-%b-%y')(new Date(o.M_DATE));
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
                        name: 'Subscribers',
                        data: result.map(function (o) {
                            return o.MSISDN;
                        })
                    }
                ],
                exporting: {
                    sourceWidth: 1280,
                    filename: 'GPRS Usage',
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
            $scope.gprsWorking = false;
            toaster.error('Error on HU GPRS - ' + error.status, error.data.message);
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