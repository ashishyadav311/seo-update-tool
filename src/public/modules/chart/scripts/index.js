"use strict";
define(['modules/chart/scripts/services/globalConfigService',
    'services/loggerService',
    'highcharts',
    'highcharts-more',
    'highcharts-no-data',
    'highcharts3d'
], function() {
    Box.Application.addModule('chart', function(context) {
        var chartsDefaultConfig = context.getService('config'),
            logger = context.getService('Logger'),
            chartConfigMap = {
                line: chartsDefaultConfig.getLineConfig,
                spline: chartsDefaultConfig.getSplineConfig,
                column: chartsDefaultConfig.getColumnConfig,
                pie: chartsDefaultConfig.getPieConfig,
                areaspline: chartsDefaultConfig.getAreaSplineConfig
            },
            makeChart = function(xAxis, yAxis, title, subtitle, id, inverted, extraconfig, type) {
                if (title && !$.isPlainObject(title)) {
                    title = {
                        text: title
                    };
                }
                if (subtitle && !$.isPlainObject(subtitle)) {
                    subtitle = {
                        text: subtitle
                    };
                }
                inverted = inverted ? true : false;
                this.config = {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    title: title,
                    subtitle: subtitle,
                    chart: {
                        renderTo: id,
                        type: type,
                        inverted: inverted
                    }
                };
                if (!$.isPlainObject(extraconfig)) {
                    extraconfig = {};
                }
                $.extend(true, this.config, chartConfigMap[type](), extraconfig);
                var chart = new Highcharts.Chart(this.config);
                chart.hideNoData();
                if (!this.config.series) {
                    chart.showLoading();
                }
                $('#' + id).on('transitionend webkitTransitionEnd', function() {

                    var height = $("#" + id).height();
                    var width = $("#" + id).width();
                    chart.setSize(width, height, true);
                });

                $('#' + id).on('resize', function() {
                    console.log("reszieing ..");
                });
                return chart;
            };

        function _calculateDeletionIndex(seriesData, name) {
            for (let i = 0, length = seriesData.length; i < length; i++) {
                if (seriesData[i].name == name) {
                    return i;
                }
            }
        }

        return {
            init: function() {
                var config = context.getConfig(),
                    id = context.getElement();
                this.chart = makeChart.call(this, config.xAxis, config.yAxis, config.title, config.subtitle, id.id, config.inverted, config.extraconfig, config.type);
                context.broadcast('moduleLoaded', {
                    name: 'chart',
                    id: id.id
                });
            },
            messages: ['chartDataLoaded', 'chartDataAdded', 'chartDataDeleted'],
            onmessage: function(name, data) {
                var element = context.getElement();
                var c = this.getChartRefrence();
                switch (name) {
                    case 'chartDataLoaded':
                        if (data && data.id === element.id) {
                            c.hideLoading();
                            while (c.series.length > 0) {
                                c.series[0].remove(true);
                            }
                            $.each(data.series, function(itemNo, item) {
                                c.addSeries(item, false);
                            });
                            if (data.xPlotBand) {
                                c.xAxis[0].addPlotBand(data.xPlotBand);
                            }
                            if (data.yPlotBand) {
                                c.yAxis[0].addPlotBand(data.yPlotBand);
                            }
                            c.redraw();
                            
                            if (c.series.length) {
                                c.hideNoData();
                            }
                        }
                        break;
                    case 'chartDataAdded':
                        logger.info('chart added name = ' + data.name);
                        c.hideLoading();
                        if(data.data.length){
                            c.addSeries(data, false);
                            c.hideNoData();
                        }
                        c.redraw();
                        break;
                    case 'chartDataDeleted':
                        logger.info('chart deleted name = ' + data.name);
                        let deleteIndex = _calculateDeletionIndex(c.series, data.name);
                        c.series[deleteIndex].remove(true);
                        c.redraw();
                }
            },
            getChartRefrence: function() {
                return this.chart;
            }
            
        };

    });
});
