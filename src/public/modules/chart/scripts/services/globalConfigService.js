define(['services/utils'], function(utils) {
    Box.Application.addService('config', function(application) {
        "use strict";

        var HighchartConfig = new Object();
        HighchartConfig.DefaultConfig = new Object();
        HighchartConfig.CONFIG = new Object();
        HighchartConfig.CONFIG.global = new Object();
        HighchartConfig.CONFIG.lang = new Object();
        HighchartConfig.CONFIG.colors = new Object();
        HighchartConfig.CONFIG.credits = new Object();
        HighchartConfig.CONFIG.exporting = new Object();
        HighchartConfig.CONFIG.label = new Object();
        HighchartConfig.CONFIG.legend = new Object();
        HighchartConfig.CONFIG.loading = new Object();
        HighchartConfig.CONFIG.noData = new Object();
        HighchartConfig.CONFIG.subtitle = new Object();
        HighchartConfig.CONFIG.title = new Object();
        HighchartConfig.CONFIG.xAxis = new Object();
        HighchartConfig.CONFIG.tooltip = new Object();

        HighchartConfig.setGlobalConfig = function(config, replace) {
            if (config && Object.keys(config).length > 0) {
                if (!replace) {
                    Highcharts.setOptions($.extend(true, config, HighchartConfig.CONFIG));
                } else {
                    Highcharts.setOptions(config);
                }
            }
        };
        HighchartConfig.DefaultConfig.global = function() {
            var obj = {
                VMLRadialGradientURL: 'http://code.highcharts.com/{version}/gfx/vml-radial-gradient.png', // Path to the pattern image required by VML browsers in order to draw radial gradients.
                canvasToolsURL: 'http://code.highcharts.com/{version}/modules/canvas-tools.js', // The URL to the additional file to lazy load for Android 2.x devices. These devices don't support SVG, so we download a helper file that contains canvg, its dependecy rbcolor, and our own CanVG Renderer class.
                timezoneOffset: 0, // The timezone offset in minutes
                useUTC: false // Whether to use UTC time for axis scaling, tickmark placement and time display in Highcharts.dateFormat.
            };
            return obj;
        };
        HighchartConfig.DefaultConfig.lang = function() {
            var obj = {
                contextButtonTitle: 'Export Chart', // Exporting module menu. The tooltip title for the context menu holding print and export menu items.
                decimalPoint: '.', // The default decimal point used in the Highcharts.numberFormat method unless otherwise specified in the function arguments.
                downloadJPEG: 'Download JPEG image', // Exporting module only. The text for the JPEG download menu item.
                downloadPDF: 'Download PDF document', // Exporting module only. The text for the PDF download menu item.
                downloadSVG: 'Download SVG vector image', // Exporting module only. The text for the SVG download menu item.
                drillUpText: 'Back to {series.name}', // The text for the button that appears when drilling down, linking back to the parent series.
                loading: 'Loading...', // The loading text that appears when the chart is set into the loading state following a call to chart.showLoading.
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // An array containing the months names. Corresponds to the %B format in Highcharts.dateFormat().
                noData: 'No Data Available...',//'No data to display', // The text to display when the chart contains no data. Requires the no-data module, see noData.
                numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'], // Metric prefixes used to shorten high numbers in axis labels. Replacing any of the positions with null causes the full number to be written.
                printChart: 'Print chart', // Exporting module only. The text for the menu item to print the chart.
                resetZoom: 'Reset zoom', // The text for the label appearing when a chart is zoomed.
                resetZoomTitle: 'Reset zoom level 1:1', // The tooltip title for the label appearing when a chart is zoomed.
                shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // An array containing the months names in abbreviated form. Corresponds to the %b format in Highcharts.dateFormat().
                thousandsSep: ',', // The default thousands separator used in the Highcharts.numberFormat method unless otherwise specified in the function arguments.
                weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] // An array containing the weekday names.
            }
            return obj;
        };
        HighchartConfig.DefaultConfig.credit = function() {
            var obj = {
                enabled: false, // Whether to show the credits text.
                href: 'https://www.proptiger.com', // The URL for the credits label.
                position: {
                    align: 'right',
                    x: -10,
                    verticalAlign: 'bottom',
                    y: -5
                }, // Position configuration for the credtis label.
                style: {
                    cursor: 'pointer',
                    color: '#909090',
                    fontSize: '10px'
                }, // CSS styles for the credits label.
                text: 'PropTiger.com.' // The text for the credits label.
            }
            return obj;
        };
        HighchartConfig.DefaultConfig.labels = function() {
            var obj = {
                items: {
                    html: null, // Inner HTML or text for the label.
                    style: {
                        left: '100px',
                        top: '100px'
                    } // CSS styles for each label.
                },
                style: {
                    color: '#3E576F'
                } // Shared CSS styles for all labels.
            };
            return obj;
        };
        HighchartConfig.DefaultConfig.colors = function() {
            var obj = ['#523D5C', '#F25427', '#E2BC95', '#20AEAE', '#4F6088', '#F6BD79', '#B74233', '#FEA33C', '#EB2385'];
            return obj;
        };
        HighchartConfig.DefaultConfig.legends = function() {
            var obj = {
                align: 'center', // The horizontal alignment of the legend box within the chart area. Valid values are "left", "center" and "right".
                backgroundColor: null, // The background color of the legend, filling the rounded corner border.
                borderColor: '#909090', // The color of the drawn border around the legend.
                borderRadius: 0, // The border corner radius of the legend.
                borderWidth: 0, // The width of the drawn border around the legend.
                enabled: true, // Enable or disable the legend.
                floating: false, // When the legend is floating, the plot area ignores it and is allowed to be placed below it.
                itemDistance: 40, // In a legend with horizontal layout, the itemDistance defines the pixel distance between each item.
                itemHiddenStyle: {
                    color: '#CCC'
                }, // CSS styles for each legend item when the corresponding series or point is hidden. Only a subset of CSS is supported, notably those options related to text. Properties are inherited from style unless overridden here.
                itemHoverStyle: {
                    color: '#000'
                }, // CSS styles for each legend item in hover mode. Only a subset of CSS is supported, notably those options related to text. Properties are inherited from style unless overridden here.
                itemMarginBottom: 0, // The pixel bottom margin for each legend item.
                itemMarginTop: 10, // The pixel top margin for each legend item.
                itemStyle: {
                    "color": "#333333",
                    "cursor": "pointer",
                    "fontSize": "12px",
                    "fontWeight": "normal"
                }, // CSS styles for each legend item. Only a subset of CSS is supported, notably those options related to text.
                itemWidth: null, // The width for each legend item. This is useful in a horizontal layout with many items when you want the items to align vertically.
                labelFormat: '{name}', // A format string for each legend label. Available variables relates to properties on the series, or the point in case of pies.
                labelFormatter: null, // Callback function to format each of the series' labels. The this keyword refers to the series object, or the point object in case of pie charts.
                layout: 'horizontal', // The layout of the legend items. Can be one of "horizontal" or "vertical".
                lineHeight: 16, // Line height for the legend items. Deprecated as of 2.1. Instead, the line height for each item can be set using itemStyle.lineHeight, and the padding between items using itemMarginTop and itemMarginBottom.
                margin: 15, // If the plot area sized is calculated automatically and the legend is not floating, the legend margin is the space between the legend and the axis labels or plot area.
                maxHeight: null, // Maximum pixel height for the legend. When the maximum height is extended, navigation will show.
                navigation: {
                    activeColor: '#3E576F', // The color for the active up or down arrow in the legend page navigation.
                    animation: true, // How to animate the pages when navigating up or down. A value of true applies the default navigation given in the chart.animation option. Additional options can be given as an object containing values for easing and duration.
                    arrowSize: 12, // The pixel size of the up and down arrows in the legend paging navigation.
                    inactiveColor: '#CCC', // The color of the inactive up or down arrow in the legend page navigation.
                    style: null // Text styles for the legend page navigation.
                },
                padding: 8, // The inner padding of the legend box.
                reversed: false, // Whether to reverse the order of the legend items compared to the order of the series or points as defined in the configuration object.
                rtl: false, // Whether to show the symbol on the right side of the text rather than the left side. This is common in Arabic and Hebraic.
                shadow: false, // Whether to apply a drop shadow to the legend. A backgroundColor also needs to be applied for this to take effect. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                symbolHeight: 12, // The pixel height of the symbol for series types that use a rectangle in the legend.
                symbolPadding: 5, // The pixel padding between the legend item symbol and the legend item text.
                symbolRadius: 2, // The border radius of the symbol for series types that use a rectangle in the legend.
                symbolWidth: 16, // The pixel width of the legend item symbol.
                title: {
                    style: {
                        fontWeight: 'bold'
                    }, // Generic CSS styles for the legend title.
                    text: null // A text or HTML string for the title.
                },
                useHTML: false, // Whether to use HTML to render the legend item texts. When using HTML, legend.navigation is disabled.
                verticalAlign: 'bottom', // The vertical alignment of the legend box. Can be one of "top", "middle" or "bottom". Vertical position can be further determined by the y option.
                // width: null, // The width of the legend box.
                x: 0, // The x offset of the legend relative to it's horizontal alignment align within chart.spacingLeft and chart.spacingRight. Negative x moves it to the left, positive x moves it to the right.
                y: 0 // The vertical offset of the legend relative to it's vertical alignment verticalAlign within chart.spacingTop and chart.spacingBottom. Negative y moves it up, positive y moves it down.
            };
            return obj;
        };
        HighchartConfig.DefaultConfig.loading = function() {
            var obj = {
                hideDuration: 100, // The duration in milliseconds of the fade out effect.
                labelStyle: {
                    'font-weight': 'bold',
                    'position': 'relative',
                    'top': '45%'
                }, // CSS styles for the loading label span.
                showDuration: 100, // The duration in milliseconds of the fade in effect.
                style: new Object() // CSS styles for the loading screen that covers the plot area.
            };
            return obj;
        };
        HighchartConfig.DefaultConfig.noData = function() {
            var obj = {
                attr: null, // An object of additional SVG attributes for the no-data label.
                position: {
                    'x': 0,
                    'y': 0,
                    'align': 'center',
                    'verticalAlign': 'middle'
                }, // The position of the no-data label, relative to the plot area.
                style: {
                    "fontSize": "12px",
                    "fontWeight": "bold",
                    "color": "#60606a"
                }, // CSS styles for the no-data label.
                useHTML:true
            };
            return obj;
        };
        HighchartConfig.DefaultConfig.subTitle = function() {
            var obj = {
                align: 'center', // The horizontal alignment of the subtitle. Can be one of "left", "center" and "right".
                floating: false, // When the subtitle is floating, the plot area will not move to make space for it.
                style: {
                    'color': '#555555'
                }, // CSS styles for the title. Exact positioning of the title can be achieved by changing the margin property, or by adding position: "absolute" and left and top properties.
                text: null, // The subtitle of the chart.
                useHTML: false, // Whether to use HTML to render the text.
                verticalAlign: null, // The vertical alignment of the title. Can be one of "top", "middle" and "bottom". When a value is given, the title behaves as floating.
                x: 0, // The x position of the subtitle relative to the alignment within chart.spacingLeft and chart.spacingRight.
                y: 35 // The y position of the subtitle relative to the alignment within chart.spacingTop and chart.spacingBottom. By default the subtitle is laid out below the title unless the title is floating.
            };
            return obj;
        }
        HighchartConfig.DefaultConfig.title = function() {
            var obj = {
                align: 'center', // The horizontal alignment of the title. Can be one of "left", "center" and "right".
                floating: false, // When the title is floating, the plot area will not move to make space for it.
                margin: 15, // The margin between the title and the plot area, or if a subtitle is present, the margin between the subtitle and the plot area.
                style: {
                    'color': '#333333',
                    'fontSize': '18px'
                }, // CSS styles for the title. Use this for font styling, but use align, x and yfor text alignment.
                text: 'Chart title', // The title of the chart. To disable the title, set the text to null.
                useHTML: false, // Whether to use HTML to render the text.
                verticalAlign: null, // The vertical alignment of the title. Can be one of "top", "middle" and "bottom". When a value is given, the title behaves as floating.
                x: 0, // The x position of the title relative to the alignment within chart.spacingLeft and chart.spacingRight.
                y: 15 // The y position of the title relative to the alignment within chart.spacingTop and chart.spacingBottom.
            };
            return obj;
        };
        HighchartConfig.DefaultConfig.tooltip = function() {
            var obj = {
                animation: true, // Enable or disable animation of the tooltip. In slow legacy IE browsers the animation is disabled by default.
                backgroundColor: '#fff', // The background color or gradient for the tooltip.
                borderColor: null, // The color of the tooltip border. When null, the border takes the color of the corresponding series or point.
                borderRadius: 3, // The radius of the rounded border corners.
                borderWidth: 1, // The pixel width of the tooltip border.
                crosshairs: null, // Display crosshairs to connect the points with their corresponding axis values. The crosshairs can be defined as a boolean, an array of booleans or an object.
                dateTimeLabelFormats: {
                    millisecond: '%A, %b %e, %H:%M:%S.%L',
                    second: '%A, %b %e, %H:%M:%S',
                    minute: '%A, %b %e, %H:%M',
                    hour: '%A, %b %e, %H:%M',
                    day: '%A, %b %e, %Y',
                    week: 'Week from %A, %b %e, %Y',
                    month: '%B %Y',
                    year: '%Y'
                }, // For series on a datetime axes, the date format in the tooltip's header will by default be guessed based on the closest data points. This member gives the default string representations used for each unit. For an overview of the replacement codes, see dateFormat.
                enabled: true, // Enable or disable the tooltip.
                followPointer: false, // Whether the tooltip should follow the mouse as it moves across columns, pie slices and other point types with an extent. By default it behaves this way for scatter, bubble and pie series by override in the plotOptions for those series types.
                followTouchMove: false, // Whether the tooltip should follow the finger as it moves on a touch device. The default value of false causes a touch move to scroll the web page, as is default behaviour on touch devices. Setting it to true may cause the user to be trapped inside the chart and unable to scroll away, so it should be used with care.
                footerFormat: '', // A string to append to the tooltip format.
                formatter: function(){
                    return '<div style="color:'+this.series.color+';text-align:center"><b>'+this.point.name+'</b></div><span style="color:'+this.series.color+'">\u25CF</span> '+this.series.name+': <b>'+this.y+' '+this.point.unit+'</b><br/><span style="color:'+this.series.color+'">\u25CF</span> Date: <b>'+Highcharts.dateFormat('%A, %b %e, %H:%M', new Date(this.point.time))+'</b>';
                }, // Callback function to format the text of the tooltip. Return false to disable tooltip for a specific point on series.
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>', // The HTML of the tooltip header line. Variables are enclosed by curly brackets. Available variables     are point.key, series.name, series.color and other members from the point and series objects. The point.key variable contains the category name, x value or datetime string depending on the type of axis. For datetime axes, the point.key date format can be set using tooltip.xDateFormat.
                hideDelay: 500, // The number of milliseconds to wait until the tooltip is hidden when mouse out from a point or chart.
                pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>Date: {point.time}', // The HTML of the point's line in the tooltip. Variables are enclosed by curly brackets. Available variables are point.x, point.y, series.name and series.color and other properties on the same form. Furthermore, point.y can be extended by the tooltip.yPrefix and tooltip.ySuffix variables.
                positioner: null, // A callback function to place the tooltip in a default position. The callback receives three parameters: labelWidth, labelHeight and point, where point contains values for plotX and plotY telling where the reference point is in the plot area. Add chart.plotLeft and chart.plotTop to get the full coordinates.
                shadow: true, // Whether to apply a drop shadow to the tooltip.
                shape: 'callout', // The name of a symbol to use for the border around the tooltip. In Highcharts 3.x and less, the shape was square.
                shared: false, // When the tooltip is shared, the entire plot area will capture mouse movement. Tooltip texts for series types with ordered data (not pie, scatter, flags etc) will be shown in a single bubble. This is recommended for single series charts and for tablet/mobile optimized charts.
                snap: 10, // Proximity snap for graphs or single points. Does not apply to bars, columns and pie slices. It defaults to 10 for mouse-powered devices and 25 for touch devices.
                style: {
                    color: '#333333',
                    fontSize: '12px',
                    padding: '8px'
                }, // CSS styles for the tooltip. The tooltip can also be styled through the CSS class .highcharts-tooltip.
                useHTML: true, // Use HTML to render the contents of the tooltip instead of SVG. Using HTML allows advanced formatting like tables and images in the tooltip. It is also recommended for rtl languages as it works around rtl bugs in early Firefox.
                valueDecimals: null, // How many decimals to show in each series' y value. This is overridable in each series' tooltip options object. The default is to preserve all decimals.
                valuePrefix: null, // A string to prepend to each series' y value. Overridable in each series' tooltip options object.
                valueSuffix: null, // A string to append to each series' y value. Overridable in each series' tooltip options object.
                xDateFormat: null // The format for the date in the tooltip header if the X axis is a datetime axis. The default is a best guess based on the smallest distance between points in the chart.
            };
            return obj;
        };
        HighchartConfig.initializeGlobalConfig = function() {
            HighchartConfig.CONFIG.global = HighchartConfig.DefaultConfig.global();
            HighchartConfig.CONFIG.lang = HighchartConfig.DefaultConfig.lang();
            HighchartConfig.CONFIG.colors = HighchartConfig.DefaultConfig.colors();
            HighchartConfig.CONFIG.credits = HighchartConfig.DefaultConfig.credit();
            HighchartConfig.CONFIG.labels = HighchartConfig.DefaultConfig.labels();
            HighchartConfig.CONFIG.legend = HighchartConfig.DefaultConfig.legends()
            HighchartConfig.CONFIG.loading = HighchartConfig.DefaultConfig.loading();
            HighchartConfig.CONFIG.noData = HighchartConfig.DefaultConfig.noData();
            HighchartConfig.CONFIG.title = HighchartConfig.DefaultConfig.title();
            HighchartConfig.CONFIG.subtitle = HighchartConfig.DefaultConfig.subTitle();
            HighchartConfig.CONFIG.tooltip = HighchartConfig.DefaultConfig.tooltip();
            HighchartConfig.setGlobalConfig(HighchartConfig.CONFIG);
        };
        HighchartConfig.initializeGlobalConfig();
        return {
            getLineConfig: function() {
                var plotOptions = {
                    allowPointSelect: false, // Allow this series' points to be selected by clicking on the markers, bars or pie slices.
                    animation: true, // Enable or disable the initial animation when a series is displayed. The animation can also be set as a configuration object. Please note that this option only applies to the initial animation of the series itself. For other animations, see chart.animation and the animation parameter under the API methods.
                    color: null, // The main color or the series. In line type series it applies to the line and the point markers unless otherwise specified. In bar type series it applies to the bars unless a color is specified per point. The default value is pulled from the options.colors array.
                    connectEnds: true, // Polar charts only. Whether to connect the ends of a line series plot across the extremes.
                    connectNulls: false, // Whether to connect a graph line across null points.
                    cropThreshold: 300, // When the series contains less points than the crop threshold, all points are drawn, event if the points fall outside the visible plot area at the current zoom. The advantage of drawing all points (including markers and columns), is that animation is performed on updates.
                    cursor: null, // You can set the cursor to "pointer" if you have click events attached to the series, to signal to the user that the points and lines can be clicked.
                    dashStyle: 'Solid', // <A name for the dash style to use for the graph. Applies only to series type having a graph, like line, spline, area and scatter in case it has a lineWidth.
                    dataLabels: {
                        align: 'center', // The alignment of the data label compared to the point. Can be one of "left", "center" or "right". Defaults to "center".
                        backgroundColor: undefined, // The background color or gradient for the data label.
                        borderColor: undefined, // The border color for the data label.
                        borderRadius: 0, // The border radius in pixels for the data label.
                        borderWidth: 0, // The border width in pixels for the data label.
                        color: "", // The text color for the data labels.
                        crop: true, // Whether to hide data labels that are outside the plot area. By default, the data label is moved inside the plot area according to the overflow option.
                        defer: true, // Whether to defer displaying the data labels until the initial series animation has finished.
                        enabled: true, // Enable or disable the data labels.
                        format: '{y}', // A format string for the data label. Available variables are the same as for formatter.
                        formatter: null, // Callback JavaScript function to format the data label. Note that if a format is defined, the format takes precedence and the formatter is ignored.
                        inside: null, // For points with an extent, like columns, whether to align the data label inside the box or to the actual value point.
                        overflow: 'justify', // How to handle data labels that flow outside the plot area. The default is justify, which aligns them inside the plot area. For columns and bars, this means it will be moved inside the bar. To display data labels outside the plot area, set crop to false and overflow to "none".
                        padding: 8, // When either the borderWidth or the backgroundColor is set, this     is the padding within the box.
                        rotation: 0, // Text rotation in degrees. Note that due to a more complex structure, backgrounds and borders will be lost on a rotated data label.
                        shadow: false, // The shadow of the box. Works best with borderWidth or backgroundColor. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                        style: new Object(), // Styles for the label.
                        useHTML: false, // Whether to use HTML to render the labels.
                        verticalAlign: null, // The vertical alignment of a data label. Can be one of top, middle or bottom. The default value depends on the data, for instance in a column chart, the label is above positive values and below negative values.
                        x: 0, // The x position offset of the label relative to the point.
                        y: -6, // The y position offset of the label relative to the point.
                        zIndex: 6 // The Z index of the data labels. The default Z index puts it above the series. Use a Z index of 2 to display it behind the series.
                    },
                    enableMouseTracking: false, // Enable or disable the mouse tracking for a specific series. This includes point tooltips and click events on graphs and points. For large datasets it improves performance.
                    events: {
                        afterAnimate: null, // Fires after the series has finished its initial animation, or in case animation is disabled, immediately as the series is displayed.
                        checkboxClick: null, // Fires when the checkbox next to the series' name in the legend is clicked.. The this keyword refers to the series object itself. One parameter, event, is passed to the function. The state of the checkbox is found by event.checked. Return false to prevent the default action which is to toggle the select state of the series.
                        click: null, // Fires when the series is clicked. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts. Additionally, event.point holds a pointer to the nearest point on the graph.
                        hide: null, // Fires when the series is hidden after chart generation time, either by clicking the legend item or by calling .hide().
                        legendItemClick: null, // Fires when the legend item belonging to the series is clicked. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts. The default action is to toggle the visibility of the series. This can be prevented by returning false or calling event.preventDefault().
                        mouseOut: null, // Fires when the mouse leaves the graph. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts. If the stickyTracking option is true, mouseOut doesn't happen before the mouse enters another graph or leaves the plot area.
                        mouseOver: null, // Fires when the mouse enters the graph. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                        show: null, // Fires when the series is shown after chart generation time, either by clicking the legend item or by calling .show().
                    },
                    getExtremesFromAll: false, // Whether to use the Y extremes of the total chart width or only the zoomed area when zooming in on parts of the X axis. By default, the Y axis adjusts to the min and max of the visible data. Cartesian series only.
                    lineColor: null, // A separate color for the graph line. By default the line takes the color of the series, but the lineColor setting allows setting a separate color for the line without altering the fillColor.
                    lineWidth: 2, // Pixel with of the graph line.
                    linkedTo: null, // The id of another series to link to. Additionally, the value can be ":previous" to link to the previous series. When two series are linked, only the first one appears in the legend. Toggling the visibility of this also toggles the linked series.
                    marker: {
                        enabled: true, // Enable or disable the point marker.
                        fillColor: null, // The fill color of the point marker. When null, the series' or point's color is used.
                        lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                        lineWidth: 0, // The width of the point marker's outline.
                        radius: 4, // The radius of the point marker.
                        states: {
                            hover: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the marker in hover state.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: null // The radius of the point marker. In hover state, it defaults to the normal state's radius + 2.
                            },
                            select: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the marker in hover state.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: null // The radius of the point marker. In hover state, it defaults to the normal state's radius + 2.
                            }
                        },
                        symbol: null // A predefined shape or symbol for the marker. When null, the symbol is pulled from options.symbols. Other possible values are "circle", "square", "diamond", "triangle" and "triangle-down".
                    },
                    /* use it in series */
                    // negativeColor: null, // The color for the parts of the graph or points that are below the threshold.
                    /* use it in series */
                    point: {
                        events: {
                            click: null, // Fires when a point is clicked. The this keyword refers to the point object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                            mouseOut: null, // Fires when the mouse leaves the area close to the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                            mouseOver: null, // Fires when the mouse enters the area close to the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                            remove: null, // Fires when the point is removed using the .remove() method. The this keyword refers to the point object itself. One parameter, event, is passed to the function. Returning false cancels the operation.
                            select: null, // Fires when the point is selected either programatically or following a click on the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. Returning false cancels the operation.
                            unselect: null, // Fires when the point is unselected either programatically or following a click on the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. Returning false cancels the operation.
                            update: null // Fires when the point is updated programmatically through the .update() method. The this keyword refers to the point object itself. One parameter, event, is passed to the function. The new point options can be accessed through event.options. Returning false cancels the operation.
                        }
                    },
                    /* start  use it iin series */
                    // pointInterval: 1, // If no x values are given for the points in a series, pointInterval defines the interval of the x values. For example, if a series contains one value every decade starting from year 0, set pointInterval to 10.
                    // pointIntervalUnit: , // On datetime series, this allows for setting the pointInterval to the two irregular time units, month and year. Combine it with pointInterval to draw quarters, 6 months, 10 years etc.
                    // pointPlacement: null, // Possible values: null, "on", "between". In a column chart, when pointPlacement is "on", the point will not create any padding of the X axis. In a polar column chart this means that the first column points directly north. If the pointPlacement is "between", the columns will be laid out between ticks. This is useful for example for visualising an amount between two points in time or in a certain sector of a polar chart.
                    // pointStart: 0, // If no x values are given for the points in a series, pointStart defines on what value to start. For example, if a series contains one yearly value starting from 1945, set pointStart to 1945. Defaults to 0.
                    /* end   use it iin series */
                    selected: false, // Whether to select the series initially. If showCheckbox is true, the checkbox next to the series name will be checked for a selected series.
                    shadow: false, // Whether to apply a drop shadow to the graph line. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                    showCheckbox: false, // If true, a checkbox is displayed next to the legend item to allow selecting the series. The state of the checkbox is determined by the selected option.
                    showInLegend: true, // Whether to display this particular series or series type in the legend. The default value is true for standalone series, false for linked series.
                    stacking: null, // Whether to stack the values of each series on top of each other. Possible values are null to disable, "normal" to stack by value or "percent".
                    states: {
                        hover: {
                            enabled: true, // Enable separate styles for the hovered series to visualize that the user hovers either the series itself or the legend.
                            halo: {
                                attributes: null, // A collection of SVG attributes to override the appearance of the halo, for example fill, stroke and stroke-width.
                                opacity: 0.25, // Opacity for the halo unless a specific fill is overridden using the attributes setting. Note that Highcharts is only able to apply opacity to colors of hex or rgb(a) formats.
                                size: 10, // The pixel size of the halo. For point markers this is the radius of the halo. For pie slices it is the width of the halo outside the slice. For bubbles it defaults to 5 and is the width of the halo outside the bubble.
                            },
                            lineWidth: 2, // Pixel with of the graph line.
                            marker: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the point marker. When null, the series' or point's color is used.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: 4, // The radius of the point marker.
                                symbol: null // A predefined shape or symbol for the marker. When null, the symbol is pulled from options.symbols. Other possible values are "circle", "square", "diamond", "triangle" and "triangle-down".
                            }
                        }
                    },
                    step: false, //Whether to apply steps to the line. Possible values are left, center and right. Prior to 2.3.5, only left was supported.
                    stickyTracking: true, // Sticky tracking of mouse events. When true, the mouseOut event on a series isn't triggered until the mouse moves over another series, or out of the plot area. When false, the mouseOut event on a series is triggered when the mouse leaves the area around the series' graph or markers.
                    threshold: 0, // The Y axis value to serve as the base for the area, for distinguishing between values above and below a threshold. If null, the area behaves like a line series with fill between the graph and the Y axis minimum.
                    tooltip: HighchartConfig.DefaultConfig.tooltip,
                    turboThreshold: 1000, // When a series contains a data array that is longer than this, only one dimensional arrays of numbers, or two dimensional arrays with x and y values are allowed. Also, only the first point is tested, and the rest are assumed to be the same format. This saves expensive data checking and indexing in long series. Set it to 0 disable.
                    visible: true, // Set the initial visibility of the series.
                    zoneAxis: 'y', // Defines the Axis on which the zones are applied. Defaults to y.
                    zones: [] // An array defining zones within a series. Zones can be applied to the X axis, Y axis or Z axis for bubbles, according to the zoneAxis option.
                }
                return {
                    plotOptions: {
                        line: plotOptions
                    }
                }
            },
            getSplineConfig: function() {
                var plotOptions = {
                    allowPointSelect: false, // Allow this series' points to be selected by clicking on the markers, bars or pie slices.
                    animation: true, // Enable or disable the initial animation when a series is displayed. The animation can also be set as a configuration object. Please note that this option only applies to the initial animation of the series itself. For other animations, see chart.animation and the animation parameter under the API methods.
                    color: null, // The main color or the series. In line type series it applies to the line and the point markers unless otherwise specified. In bar type series it applies to the bars unless a color is specified per point. The default value is pulled from the options.colors array.
                    connectEnds: true, // Polar charts only. Whether to connect the ends of a line series plot across the extremes.
                    connectNulls: false, // Whether to connect a graph line across null points.
                    cropThreshold: 300, // When the series contains less points than the crop threshold, all points are drawn, event if the points fall outside the visible plot area at the current zoom. The advantage of drawing all points (including markers and columns), is that animation is performed on updates.
                    cursor: null, // You can set the cursor to "pointer" if you have click events attached to the series, to signal to the user that the points and lines can be clicked.
                    dashStyle: 'Solid', // <A name for the dash style to use for the graph. Applies only to series type having a graph, like line, spline, area and scatter in case it has a lineWidth.
                    dataLabels: {
                        align: 'center', // The alignment of the data label compared to the point. Can be one of "left", "center" or "right". Defaults to "center".
                        backgroundColor: undefined, // The background color or gradient for the data label.
                        borderColor: undefined, // The border color for the data label.
                        borderRadius: 0, // The border radius in pixels for the data label.
                        borderWidth: 0, // The border width in pixels for the data label.
                        color: "", // The text color for the data labels.
                        crop: true, // Whether to hide data labels that are outside the plot area. By default, the data label is moved inside the plot area according to the overflow option.
                        defer: true, // Whether to defer displaying the data labels until the initial series animation has finished.
                        enabled: false, // Enable or disable the data labels.
                        format: '{y}', // A format string for the data label. Available variables are the same as for formatter.
                        formatter: null, // Callback JavaScript function to format the data label. Note that if a format is defined, the format takes precedence and the formatter is ignored.
                        inside: null, // For points with an extent, like columns, whether to align the data label inside the box or to the actual value point.
                        overflow: 'justify', // How to handle data labels that flow outside the plot area. The default is justify, which aligns them inside the plot area. For columns and bars, this means it will be moved inside the bar. To display data labels outside the plot area, set crop to false and overflow to "none".
                        padding: 8, // When either the borderWidth or the backgroundColor is set, this     is the padding within the box.
                        rotation: 0, // Text rotation in degrees. Note that due to a more complex structure, backgrounds and borders will be lost on a rotated data label.
                        shadow: false, // The shadow of the box. Works best with borderWidth or backgroundColor. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                        style: new Object(), // Styles for the label.
                        useHTML: false, // Whether to use HTML to render the labels.
                        verticalAlign: null, // The vertical alignment of a data label. Can be one of top, middle or bottom. The default value depends on the data, for instance in a column chart, the label is above positive values and below negative values.
                        x: 0, // The x position offset of the label relative to the point.
                        y: -6, // The y position offset of the label relative to the point.
                        zIndex: 6 // The Z index of the data labels. The default Z index puts it above the series. Use a Z index of 2 to display it behind the series.
                    },
                    enableMouseTracking: true, // Enable or disable the mouse tracking for a specific series. This includes point tooltips and click events on graphs and points. For large datasets it improves performance.
                    events: {
                        afterAnimate: null, // Fires after the series has finished its initial animation, or in case animation is disabled, immediately as the series is displayed.
                        checkboxClick: null, // Fires when the checkbox next to the series' name in the legend is clicked.. The this keyword refers to the series object itself. One parameter, event, is passed to the function. The state of the checkbox is found by event.checked. Return false to prevent the default action which is to toggle the select state of the series.
                        click: null, // Fires when the series is clicked. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts. Additionally, event.point holds a pointer to the nearest point on the graph.
                        hide: null, // Fires when the series is hidden after chart generation time, either by clicking the legend item or by calling .hide().
                        legendItemClick: null, // Fires when the legend item belonging to the series is clicked. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts. The default action is to toggle the visibility of the series. This can be prevented by returning false or calling event.preventDefault().
                        mouseOut: null, // Fires when the mouse leaves the graph. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts. If the stickyTracking option is true, mouseOut doesn't happen before the mouse enters another graph or leaves the plot area.
                        mouseOver: null, // Fires when the mouse enters the graph. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                        show: null, // Fires when the series is shown after chart generation time, either by clicking the legend item or by calling .show().
                    },
                    getExtremesFromAll: false, // Whether to use the Y extremes of the total chart width or only the zoomed area when zooming in on parts of the X axis. By default, the Y axis adjusts to the min and max of the visible data. Cartesian series only.
                    lineColor: null, // A separate color for the graph line. By default the line takes the color of the series, but the lineColor setting allows setting a separate color for the line without altering the fillColor.
                    lineWidth: 4, // Pixel with of the graph line.
                    linkedTo: null, // The id of another series to link to. Additionally, the value can be ":previous" to link to the previous series. When two series are linked, only the first one appears in the legend. Toggling the visibility of this also toggles the linked series.
                    marker: {
                        enabled: true, // Enable or disable the point marker.
                        fillColor: null, // The fill color of the point marker. When null, the series' or point's color is used.
                        lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                        lineWidth: 0, // The width of the point marker's outline.
                        radius: 4, // The radius of the point marker.
                        states: {
                            hover: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the marker in hover state.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: null // The radius of the point marker. In hover state, it defaults to the normal state's radius + 2.
                            },
                            select: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the marker in hover state.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: null // The radius of the point marker. In hover state, it defaults to the normal state's radius + 2.
                            }
                        },
                        symbol: null // A predefined shape or symbol for the marker. When null, the symbol is pulled from options.symbols. Other possible values are "circle", "square", "diamond", "triangle" and "triangle-down".
                    },
                    negativeColor: null, // The color for the parts of the graph or points that are below the threshold.
                    point: {
                        events: {
                            click: null, // Fires when a point is clicked. The this keyword refers to the point object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                            mouseOut: null, // Fires when the mouse leaves the area close to the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                            mouseOver: null, // Fires when the mouse enters the area close to the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                            remove: null, // Fires when the point is removed using the .remove() method. The this keyword refers to the point object itself. One parameter, event, is passed to the function. Returning false cancels the operation.
                            select: null, // Fires when the point is selected either programatically or following a click on the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. Returning false cancels the operation.
                            unselect: null, // Fires when the point is unselected either programatically or following a click on the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. Returning false cancels the operation.
                            update: null // Fires when the point is updated programmatically through the .update() method. The this keyword refers to the point object itself. One parameter, event, is passed to the function. The new point options can be accessed through event.options. Returning false cancels the operation.
                        }
                    },
                    pointInterval: 1, // If no x values are given for the points in a series, pointInterval defines the interval of the x values. For example, if a series contains one value every decade starting from year 0, set pointInterval to 10.
                    pointIntervalUnit: 'day', // On datetime series, this allows for setting the pointInterval to the two irregular time units, month and year. Combine it with pointInterval to draw quarters, 6 months, 10 years etc.
                    pointPlacement: null, // Possible values: null, "on", "between". In a column chart, when pointPlacement is "on", the point will not create any padding of the X axis. In a polar column chart this means that the first column points directly north. If the pointPlacement is "between", the columns will be laid out between ticks. This is useful for example for visualising an amount between two points in time or in a certain sector of a polar chart.
                    pointStart: 0, // If no x values are given for the points in a series, pointStart defines on what value to start. For example, if a series contains one yearly value starting from 1945, set pointStart to 1945. Defaults to 0.
                    selected: false, // Whether to select the series initially. If showCheckbox is true, the checkbox next to the series name will be checked for a selected series.
                    shadow: false, // Whether to apply a drop shadow to the graph line. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                    showCheckbox: false, // If true, a checkbox is displayed next to the legend item to allow selecting the series. The state of the checkbox is determined by the selected option.
                    showInLegend: true, // Whether to display this particular series or series type in the legend. The default value is true for standalone series, false for linked series.
                    stacking: null, // Whether to stack the values of each series on top of each other. Possible values are null to disable, "normal" to stack by value or "percent".
                    states: {
                        hover: {
                            enabled: true, // Enable separate styles for the hovered series to visualize that the user hovers either the series itself or the legend.
                            halo: {
                                attributes: null, // A collection of SVG attributes to override the appearance of the halo, for example fill, stroke and stroke-width.
                                opacity: 0.25, // Opacity for the halo unless a specific fill is overridden using the attributes setting. Note that Highcharts is only able to apply opacity to colors of hex or rgb(a) formats.
                                size: 10, // The pixel size of the halo. For point markers this is the radius of the halo. For pie slices it is the width of the halo outside the slice. For bubbles it defaults to 5 and is the width of the halo outside the bubble.
                            },
                            lineWidth: 5, // Pixel with of the graph line.
                            marker: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the point marker. When null, the series' or point's color is used.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: 4, // The radius of the point marker.
                                symbol: null // A predefined shape or symbol for the marker. When null, the symbol is pulled from options.symbols. Other possible values are "circle", "square", "diamond", "triangle" and "triangle-down".
                            }
                        }
                    },
                    stickyTracking: true, // Sticky tracking of mouse events. When true, the mouseOut event on a series isn't triggered until the mouse moves over another series, or out of the plot area. When false, the mouseOut event on a series is triggered when the mouse leaves the area around the series' graph or markers.
                    threshold: 0, // The Y axis value to serve as the base for the area, for distinguishing between values above and below a threshold. If null, the area behaves like a line series with fill between the graph and the Y axis minimum.
                    tooltip: HighchartConfig.DefaultConfig.tooltip,
                    trackByArea: false, // Whether the whole area or just the line should respond to mouseover tooltips and other mouse or touch events.
                    turboThreshold: 1000, // When a series contains a data array that is longer than this, only one dimensional arrays of numbers, or two dimensional arrays with x and y values are allowed. Also, only the first point is tested, and the rest are assumed to be the same format. This saves expensive data checking and indexing in long series. Set it to 0 disable.
                    visible: true // Set the initial visibility of the series.
                }
                return {
                    plotOptions: {
                        spline: plotOptions
                    }
                }
            },
            getColumnConfig: function() {
                var plotOptions = {
                    allowPointSelect: false, // Allow this series' points to be selected by clicking on the markers, bars or pie slices.
                    animation: true, // Enable or disable the initial animation when a series is displayed. The animation can also be set as a configuration object. Please note that this option only applies to the initial animation of the series itself. For other animations, see chart.animation and the animation parameter under the API methods.
                    borderColor: "#FFFFFF", // The color of the border surrounding each column or bar.
                    borderRadius: 0, // The corner radius of the border surrounding each column or bar.
                    borderWidth: 1, // The width of the border surrounding each column or bar.
                    color: null, // The main color or the series. In line type series it applies to the line and the point markers unless otherwise specified. In bar type series it applies to the bars unless a color is specified per point. The default value is pulled from the options.colors array.
                    colorByPoint: false, // When using automatic point colors pulled from the options.colors collection, this option determines whether the chart should receive one color per series or one color per point.
                    cropThreshold: 300, // When the series contains less points than the crop threshold, all points are drawn, event if the points fall outside the visible plot area at the current zoom. The advantage of drawing all points (including markers and columns), is that animation is performed on updates.
                    cursor: null, // You can set the cursor to "pointer" if you have click events attached to the series, to signal to the user that the points and lines can be clicked.
                    dataLabels: {
                        align: 'center', // The alignment of the data label compared to the point. Can be one of "left", "center" or "right". Defaults to "center".
                        backgroundColor: undefined, // The background color or gradient for the data label.
                        borderColor: undefined, // The border color for the data label.
                        borderRadius: 0, // The border radius in pixels for the data label.
                        borderWidth: 0, // The border width in pixels for the data label.
                        color: "", // The text color for the data labels.
                        crop: true, // Whether to hide data labels that are outside the plot area. By default, the data label is moved inside the plot area according to the overflow option.
                        defer: true, // Whether to defer displaying the data labels until the initial series animation has finished.
                        enabled: false, // Enable or disable the data labels.
                        format: '{y}', // A format string for the data label. Available variables are the same as for formatter.
                        formatter: null, // Callback JavaScript function to format the data label. Note that if a format is defined, the format takes precedence and the formatter is ignored.
                        inside: null, // For points with an extent, like columns, whether to align the data label inside the box or to the actual value point.
                        overflow: 'justify', // How to handle data labels that flow outside the plot area. The default is justify, which aligns them inside the plot area. For columns and bars, this means it will be moved inside the bar. To display data labels outside the plot area, set crop to false and overflow to "none".
                        padding: 8, // When either the borderWidth or the backgroundColor is set, this     is the padding within the box.
                        rotation: 0, // Text rotation in degrees. Note that due to a more complex structure, backgrounds and borders will be lost on a rotated data label.
                        shadow: false, // The shadow of the box. Works best with borderWidth or backgroundColor. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                        style: new Object(), // Styles for the label.
                        useHTML: false, // Whether to use HTML to render the labels.
                        verticalAlign: null, // The vertical alignment of a data label. Can be one of top, middle or bottom. The default value depends on the data, for instance in a column chart, the label is above positive values and below negative values.
                        x: 0, // The x position offset of the label relative to the point.
                        y: -6, // The y position offset of the label relative to the point.
                        zIndex: 6 // The Z index of the data labels. The default Z index puts it above the series. Use a Z index of 2 to display it behind the series.
                    },
                    depth: 25, // Depth of the columns in a 3D column chart. Requires highcharts-3d.js.
                    edgeColor: '#FFFFFF', // 3D columns only. The color of the edges. Similar to borderColor, except it defaults to the same color as the column.
                    edgeWidth: 1, // 3D columns only. The width of the colored edges.
                    enableMouseTracking: true, // Enable or disable the mouse tracking for a specific series. This includes point tooltips and click events on graphs and points. For large datasets it improves performance.
                    getExtremesFromAll: false, // Whether to use the Y extremes of the total chart width or only the zoomed area when zooming in on parts of the X axis. By default, the Y axis adjusts to the min and max of the visible data. Cartesian series only.
                    groupPadding: 0.2, // Padding between each value groups, in x axis units.
                    groupZPadding: 1, // The spacing between columns on the Z Axis in a 3D chart. Requires highcharts-3d.js.
                    grouping: true, // Whether to group non-stacked columns or to let them render independent of each other. Non-grouped columns will be laid out individually and overlap each other.
                    linkedTo: null, // The id of another series to link to. Additionally, the value can be ":previous" to link to the previous series. When two series are linked, only the first one appears in the legend. Toggling the visibility of this also toggles the linked series.
                    maxPointWidth: null, // The maximum allowed pixel width for a column, translated to the height of a bar in a bar chart. This prevents the columns from becoming too wide when there is a small number of points in the chart.
                    minPointLength: 0, // The minimal height for a column or width for a bar. By default, 0 values are not shown. To visualize a 0 (or close to zero) point, set the minimal point length to a pixel value like 3. In stacked column charts, minPointLength might not be respected for tightly packed values.
                    negativeColor: null, // The color for the parts of the graph or points that are below the threshold.
                    point: {
                        events: {
                            click: function() {
                                
                            }
                        }
                    },
                    pointInterval: 1, // If no x values are given for the points in a series, pointInterval defines the interval of the x values. For example, if a series contains one value every decade starting from year 0, set pointInterval to 10.
                    pointIntervalUnit: 'day', // On datetime series, this allows for setting the pointInterval to the two irregular time units, month and year. Combine it with pointInterval to draw quarters, 6 months, 10 years etc.
                    pointPadding: 0.1, // Padding between each column or bar, in x axis units.
                    pointPlacement: null, // Possible values: null, "on", "between". In a column chart, when pointPlacement is "on", the point will not create any padding of the X axis. In a polar column chart this means that the first column points directly north. If the pointPlacement is "between", the columns will be laid out between ticks. This is useful for example for visualising an amount between two points in time or in a certain sector of a polar chart.
                    pointStart: 0, // If no x values are given for the points in a series, pointStart defines on what value to start. For example, if a series contains one yearly value starting from 1945, set pointStart to 1945. Defaults to 0.
                    pointWidth: null, // A pixel value specifying a fixed width for each column or bar. When null, the width is calculated from the pointPadding and groupPadding.
                    selected: false, // Whether to select the series initially. If showCheckbox is true, the checkbox next to the series name will be checked for a selected series.
                    shadow: false, // Whether to apply a drop shadow to the graph line. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                    showCheckbox: false, // If true, a checkbox is displayed next to the legend item to allow selecting the series. The state of the checkbox is determined by the selected option.
                    showInLegend: true, // Whether to display this particular series or series type in the legend. The default value is true for standalone series, false for linked series.
                    stacking: null, // Whether to stack the values of each series on top of each other. Possible values are null to disable, "normal" to stack by value or "percent".
                    states: {
                        hover: {
                            enabled: true, // Enable separate styles for the hovered series to visualize that the user hovers either the series itself or the legend.
                            halo: {
                                attributes: null, // A collection of SVG attributes to override the appearance of the halo, for example fill, stroke and stroke-width.
                                opacity: 0.25, // Opacity for the halo unless a specific fill is overridden using the attributes setting. Note that Highcharts is only able to apply opacity to colors of hex or rgb(a) formats.
                                size: 10, // The pixel size of the halo. For point markers this is the radius of the halo. For pie slices it is the width of the halo outside the slice. For bubbles it defaults to 5 and is the width of the halo outside the bubble.
                            },
                            lineWidth: 5, // Pixel with of the graph line.
                            marker: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the point marker. When null, the series' or point's color is used.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: 4, // The radius of the point marker.
                                symbol: null // A predefined shape or symbol for the marker. When null, the symbol is pulled from options.symbols. Other possible values are "circle", "square", "diamond", "triangle" and "triangle-down".
                            }
                        }
                    },
                    stickyTracking: true, // Sticky tracking of mouse events. When true, the mouseOut event on a series isn't triggered until the mouse moves over another series, or out of the plot area. When false, the mouseOut event on a series is triggered when the mouse leaves the area around the series' graph or markers.
                    threshold: 0, // The Y axis value to serve as the base for the area, for distinguishing between values above and below a threshold. If null, the area behaves like a line series with fill between the graph and the Y axis minimum.
                    tooltip: {
                        headerFormat: ''
                    },
                    trackByArea: false, // Whether the whole area or just the line should respond to mouseover tooltips and other mouse or touch events.
                    turboThreshold: 1000, // When a series contains a data array that is longer than this, only one dimensional arrays of numbers, or two dimensional arrays with x and y values are allowed. Also, only the first point is tested, and the rest are assumed to be the same format. This saves expensive data checking and indexing in long series. Set it to 0 disable.
                    visible: true, // Set the initial visibility of the series.
                    zoneAxis: 'y', // Defines the Axis on which the zones are applied. Defaults to y.
                    zones: [] // An array defining zones within a series. Zones can be applied to the X axis, Y axis or Z axis for bubbles, according to the zoneAxis option.
                }
                return {
                    plotOptions: {
                        column: plotOptions
                    },
                    tooltip: {
                        formatter: function() {
                            if (this.y <= 0) {
                                return false;
                            } else {
                                var max = utils.getDisplayPrice(parseInt(this.point.name) + parseInt(this.point.gap));
                                return this.y + " properties in " + utils.getDisplayPrice(this.point.name) +" - "+ max;
                            }
                        }
                    }
                }
            },
            getPieConfig: function() {
                var plotOptions = {
                    allowPointSelect: true, // Allow this series' points to be selected by clicking on the markers, bars or pie slices.
                    animation: true, // Enable or disable the initial animation when a series is displayed. The animation can also be set as a configuration object. Please note that this option only applies to the initial animation of the series itself. For other animations, see chart.animation and the animation parameter under the API methods.
                    borderColor: "#FFFFFF", // The color of the border surrounding each column or bar.
                    borderRadius: 0, // The corner radius of the border surrounding each column or bar.
                    borderWidth: 1, // The width of the border surrounding each column or bar.
                    cursor: 'pointer', // You can set the cursor to "pointer" if you have click events attached to the series, to signal to the user that the points and lines can be clicked.
                    // colors: ['#d2d4d4', '#fba607'],
                    dataLabels: {
                        align: 'center', // The alignment of the data label compared to the point. Can be one of "left", "center" or "right". Defaults to "center".
                        backgroundColor: undefined, // The background color or gradient for the data label.
                        borderColor: undefined, // The border color for the data label.
                        borderRadius: 0, // The border radius in pixels for the data label.
                        borderWidth: 0, // The border width in pixels for the data label.
                        color: "", // The text color for the data labels.
                        crop: true, // Whether to hide data labels that are outside the plot area. By default, the data label is moved inside the plot area according to the overflow option.
                        defer: true, // Whether to defer displaying the data labels until the initial series animation has finished.
                        enabled: true, // Enable or disable the data labels.
                        format: '<b>{point.name}</b> ({point.y})', // A format string for the data label. Available variables are the same as for formatter.
                        formatter: null, // Callback JavaScript function to format the data label. Note that if a format is defined, the format takes precedence and the formatter is ignored.
                        inside: null, // For points with an extent, like columns, whether to align the data label inside the box or to the actual value point.
                        overflow: 'justify', // How to handle data labels that flow outside the plot area. The default is justify, which aligns them inside the plot area. For columns and bars, this means it will be moved inside the bar. To display data labels outside the plot area, set crop to false and overflow to "none".
                        padding: 8, // When either the borderWidth or the backgroundColor is set, this     is the padding within the box.
                        rotation: 0, // Text rotation in degrees. Note that due to a more complex structure, backgrounds and borders will be lost on a rotated data label.
                        shadow: false, // The shadow of the box. Works best with borderWidth or backgroundColor. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                        style: new Object(), // Styles for the label.
                        useHTML: false, // Whether to use HTML to render the labels.
                        verticalAlign: null, // The vertical alignment of a data label. Can be one of top, middle or bottom. The default value depends on the data, for instance in a column chart, the label is above positive values and below negative values.
                        x: 0, // The x position offset of the label relative to the point.
                        y: -6, // The y position offset of the label relative to the point.
                        zIndex: 6 // The Z index of the data labels. The default Z index puts it above the series. Use a Z index of 2 to display it behind the series.
                    },
                    depth: 25, // Depth of the columns in a 3D column chart. Requires highcharts-3d.js.
                    enableMouseTracking: true, // Enable or disable the mouse tracking for a specific series. This includes point tooltips and click events on graphs and points. For large datasets it improves performance.
                    endAngle: null, // The end angle of the pie in degrees where 0 is top and 90 is right. Defaults to startAngle plus 360. Defaults to null.
                    events: {
                        afterAnimate: null, // Fires after the series has finished its initial animation, or in case animation is disabled, immediately as the series is displayed.
                        checkboxClick: null, // Fires when the checkbox next to the series' name in the legend is clicked.. The this keyword refers to the series object itself. One parameter, event, is passed to the function. The state of the checkbox is found by event.checked. Return false to prevent the default action which is to toggle the select state of the series.
                        click: null, // Fires when the series is clicked. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts. Additionally, event.point holds a pointer to the nearest point on the graph.
                        hide: null, // Fires when the series is hidden after chart generation time, either by clicking the legend item or by calling .hide().
                        legendItemClick: null, // Fires when the legend item belonging to the series is clicked. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts. The default action is to toggle the visibility of the series. This can be prevented by returning false or calling event.preventDefault().
                        mouseOut: null, // Fires when the mouse leaves the graph. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts. If the stickyTracking option is true, mouseOut doesn't happen before the mouse enters another graph or leaves the plot area.
                        mouseOver: null, // Fires when the mouse enters the graph. The this keyword refers to the series object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                        show: null, // Fires when the series is shown after chart generation time, either by clicking the legend item or by calling .show().
                    },
                    getExtremesFromAll: false, // Whether to use the Y extremes of the total chart width or only the zoomed area when zooming in on parts of the X axis. By default, the Y axis adjusts to the min and max of the visible data. Cartesian series only.
                    ignoreHiddenPoint: true, // whether the series shall be redrawn as if the hidden point were null.
                    innerSize: "50%", // The size of the inner diameter for the pie. A size greater than 0 renders a donut chart. Can be a percentage or pixel value. Percentages are relative to the pie size. Pixel values are given as integers.
                    keys: undefined, // An array specifying which option maps to which key in the data point array. This makes it convenient to work with unstructured data arrays from different sources.
                    linkedTo: null, // The id of another series to link to. Additionally, the value can be ":previous" to link to the previous series. When two series are linked, only the first one appears in the legend. Toggling the visibility of this also toggles the linked series.
                    minSize: 80, // The minimum size for a pie in response to auto margins. The pie will try to shrink to make room for data labels in side the plot area, but only to this size. Defaults to 80.
                    point: {
                        events: {
                            click: null, // Fires when a point is clicked. The this keyword refers to the point object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                            mouseOut: null, // Fires when the mouse leaves the area close to the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                            mouseOver: null, // Fires when the mouse enters the area close to the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. This contains common event information based on jQuery or MooTools depending on which library is used as the base for Highcharts.
                            remove: null, // Fires when the point is removed using the .remove() method. The this keyword refers to the point object itself. One parameter, event, is passed to the function. Returning false cancels the operation.
                            select: null, // Fires when the point is selected either programatically or following a click on the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. Returning false cancels the operation.
                            unselect: null, // Fires when the point is unselected either programatically or following a click on the point. The this keyword refers to the point object itself. One parameter, event, is passed to the function. Returning false cancels the operation.
                            update: null // Fires when the point is updated programmatically through the .update() method. The this keyword refers to the point object itself. One parameter, event, is passed to the function. The new point options can be accessed through event.options. Returning false cancels the operation.
                        }
                    },
                    selected: false, // Whether to select the series initially. If showCheckbox is true, the checkbox next to the series name will be checked for a selected series.
                    shadow: false, // Whether to apply a drop shadow to the graph line. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                    showInLegend: true, // Whether to display this particular series or series type in the legend. The default value is true for standalone series, false for linked series.
                    size: "100%", // The diameter of the pie relative to the plot area. Can be a percentage or pixel value. Pixel values are given as integers. The default behaviour (as of 3.0) is to scale to the plot area and give room for data labels within the plot area. As a consequence, the size of the pie may vary when points are updated and data labels more around. In that case it is best to set a fixed value, for example "75%". Defaults to .
                    slicedOffset: 10, // If a point is sliced, moved out from the center, how many pixels should it be moved?. Defaults to 10.
                    startAngle: 0, // The start angle of the pie slices in degrees where 0 is top and 90 right. Defaults to 0.
                    states: {
                        hover: {
                            enabled: true, // Enable separate styles for the hovered series to visualize that the user hovers either the series itself or the legend.
                            halo: {
                                attributes: null, // A collection of SVG attributes to override the appearance of the halo, for example fill, stroke and stroke-width.
                                opacity: 0.25, // Opacity for the halo unless a specific fill is overridden using the attributes setting. Note that Highcharts is only able to apply opacity to colors of hex or rgb(a) formats.
                                size: 10, // The pixel size of the halo. For point markers this is the radius of the halo. For pie slices it is the width of the halo outside the slice. For bubbles it defaults to 5 and is the width of the halo outside the bubble.
                            },
                            lineWidth: 5, // Pixel with of the graph line.
                            marker: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the point marker. When null, the series' or point's color is used.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: 4, // The radius of the point marker.
                                symbol: null // A predefined shape or symbol for the marker. When null, the symbol is pulled from options.symbols. Other possible values are "circle", "square", "diamond", "triangle" and "triangle-down".
                            }
                        }
                    },
                    stickyTracking: false, // Sticky tracking of mouse events. When true, the mouseOut event on a series isn't triggered until the mouse moves over another series, or out of the plot area. When false, the mouseOut event on a series is triggered when the mouse leaves the area around the series' graph or markers.
                    tooltip: HighchartConfig.DefaultConfig.tooltip,
                    visible: true, // Set the initial visibility of the series.
                    zoneAxis: 'y', // Defines the Axis on which the zones are applied. Defaults to y.
                    zones: [] // An array defining zones within a series. Zones can be applied to the X axis, Y axis or Z axis for bubbles, according to the zoneAxis option.
                }
                return {
                    plotOptions: {
                        pie: plotOptions
                    }
                };
            },
            getAreaSplineConfig: function() {
                var plotOptions = {
                    allowPointSelect: false, // Allow this series' points to be selected by clicking on the markers, bars or pie slices.
                    animation: true, // Enable or disable the initial animation when a series is displayed. The animation can also be set as a configuration object. Please note that this option only applies to the initial animation of the series itself. For other animations, see chart.animation and the animation parameter under the API methods.
                    color: null, // The main color or the series. In line type series it applies to the line and the point markers unless otherwise specified. In bar type series it applies to the bars unless a color is specified per point. The default value is pulled from the options.colors array.
                    connectEnds: true, // Polar charts only. Whether to connect the ends of a line series plot across the extremes.
                    connectNulls: false, // Whether to connect a graph line across null points.
                    cropThreshold: 300, // When the series contains less points than the crop threshold, all points are drawn, event if the points fall outside the visible plot area at the current zoom. The advantage of drawing all points (including markers and columns), is that animation is performed on updates.
                    cursor: null, // You can set the cursor to "pointer" if you have click events attached to the series, to signal to the user that the points and lines can be clicked.
                    dashStyle: 'Solid', // <A name for the dash style to use for the graph. Applies only to series type having a graph, like line, spline, area and scatter in case it has a lineWidth.
                    dataLabels: {
                        align: 'left', // The alignment of the data label compared to the point. Can be one of "left", "center" or "right". Defaults to "center".
                        backgroundColor: undefined, // The background color or gradient for the data label.
                        borderColor: undefined, // The border color for the data label.
                        borderRadius: 0, // The border radius in pixels for the data label.
                        borderWidth: 0, // The border width in pixels for the data label.
                        color: "", // The text color for the data labels.
                        crop: true, // Whether to hide data labels that are outside the plot area. By default, the data label is moved inside the plot area according to the overflow option.
                        defer: true, // Whether to defer displaying the data labels until the initial series animation has finished.
                        enabled: false, // Enable or disable the data labels.
                        format: '{y}', // A format string for the data label. Available variables are the same as for formatter.
                        formatter: null, // Callback JavaScript function to format the data label. Note that if a format is defined, the format takes precedence and the formatter is ignored.
                        inside: null, // For points with an extent, like columns, whether to align the data label inside the box or to the actual value point.
                        overflow: 'justify', // How to handle data labels that flow outside the plot area. The default is justify, which aligns them inside the plot area. For columns and bars, this means it will be moved inside the bar. To display data labels outside the plot area, set crop to false and overflow to "none".
                        padding: 8, // When either the borderWidth or the backgroundColor is set, this     is the padding within the box.
                        rotation: 0, // Text rotation in degrees. Note that due to a more complex structure, backgrounds and borders will be lost on a rotated data label.
                        shadow: false, // The shadow of the box. Works best with borderWidth or backgroundColor. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                        style: new Object(), // Styles for the label.
                        useHTML: false, // Whether to use HTML to render the labels.
                        verticalAlign: null, // The vertical alignment of a data label. Can be one of top, middle or bottom. The default value depends on the data, for instance in a column chart, the label is above positive values and below negative values.
                        x: 0, // The x position offset of the label relative to the point.
                        y: -6, // The y position offset of the label relative to the point.
                        zIndex: 6 // The Z index of the data labels. The default Z index puts it above the series. Use a Z index of 2 to display it behind the series.
                    },
                    enableMouseTracking: true, // Enable or disable the mouse tracking for a specific series. This includes point tooltips and click events on graphs and points. For large datasets it improves performance.
                    fillColor: null, //Fill color or gradient for the area. When null, the series' color is used with the series' fillOpacity.
                    fillOpacity: 0.3, //Fill opacity for the area. Note that when you set an explicit fillColor, the fillOpacity is not applied. Instead, you should define the opacity in the fillColor with an rgba color definition. Defaults to 0.75.
                    getExtremesFromAll: false, // Whether to use the Y extremes of the total chart width or only the zoomed area when zooming in on parts of the X axis. By default, the Y axis adjusts to the min and max of the visible data. Cartesian series only.
                    lineColor: null, // A separate color for the graph line. By default the line takes the color of the series, but the lineColor setting allows setting a separate color for the line without altering the fillColor.
                    lineWidth: 4, // Pixel with of the graph line.
                    linkedTo: null, // The id of another series to link to. Additionally, the value can be ":previous" to link to the previous series. When two series are linked, only the first one appears in the legend. Toggling the visibility of this also toggles the linked series.
                    marker: {
                        enabled: true, // Enable or disable the point marker.
                        fillColor: null, // The fill color of the point marker. When null, the series' or point's color is used.
                        lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                        lineWidth: 0, // The width of the point marker's outline.
                        radius: 4, // The radius of the point marker.
                        states: {
                            hover: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the marker in hover state.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: null // The radius of the point marker. In hover state, it defaults to the normal state's radius + 2.
                            },
                            select: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the marker in hover state.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: null // The radius of the point marker. In hover state, it defaults to the normal state's radius + 2.
                            }
                        },
                        symbol: null // A predefined shape or symbol for the marker. When null, the symbol is pulled from options.symbols. Other possible values are "circle", "square", "diamond", "triangle" and "triangle-down".
                    },
                    negativeColor: null, // The color for the parts of the graph or points that are below the threshold.
                    negativeFillColor: null,
                    pointInterval: 1, // If no x values are given for the points in a series, pointInterval defines the interval of the x values. For example, if a series contains one value every decade starting from year 0, set pointInterval to 10.
                    pointIntervalUnit: 'day', // On datetime series, this allows for setting the pointInterval to the two irregular time units, month and year. Combine it with pointInterval to draw quarters, 6 months, 10 years etc.
                    pointPlacement: null, // Possible values: null, "on", "between". In a column chart, when pointPlacement is "on", the point will not create any padding of the X axis. In a polar column chart this means that the first column points directly north. If the pointPlacement is "between", the columns will be laid out between ticks. This is useful for example for visualising an amount between two points in time or in a certain sector of a polar chart.
                    pointStart: 0, // If no x values are given for the points in a series, pointStart defines on what value to start. For example, if a series contains one yearly value starting from 1945, set pointStart to 1945. Defaults to 0.
                    selected: false, // Whether to select the series initially. If showCheckbox is true, the checkbox next to the series name will be checked for a selected series.
                    shadow: false, // Whether to apply a drop shadow to the graph line. Since 2.3 the shadow can be an object configuration containing color, offsetX, offsetY, opacity and width.
                    showCheckbox: false, // If true, a checkbox is displayed next to the legend item to allow selecting the series. The state of the checkbox is determined by the selected option.
                    showInLegend: true, // Whether to display this particular series or series type in the legend. The default value is true for standalone series, false for linked series.
                    stacking: null, // Whether to stack the values of each series on top of each other. Possible values are null to disable, "normal" to stack by value or "percent".
                    states: {
                        hover: {
                            enabled: true, // Enable separate styles for the hovered series to visualize that the user hovers either the series itself or the legend.
                            halo: {
                                attributes: null, // A collection of SVG attributes to override the appearance of the halo, for example fill, stroke and stroke-width.
                                opacity: 0.25, // Opacity for the halo unless a specific fill is overridden using the attributes setting. Note that Highcharts is only able to apply opacity to colors of hex or rgb(a) formats.
                                size: 10, // The pixel size of the halo. For point markers this is the radius of the halo. For pie slices it is the width of the halo outside the slice. For bubbles it defaults to 5 and is the width of the halo outside the bubble.
                            },
                            lineWidth: 5, // Pixel with of the graph line.
                            marker: {
                                enabled: true, // Enable or disable the point marker.
                                fillColor: null, // The fill color of the point marker. When null, the series' or point's color is used.
                                lineColor: '#FFFFFF', // The color of the point marker's outline. When null, the series' or point's color is used.
                                lineWidth: 0, // The width of the point marker's outline.
                                radius: 4, // The radius of the point marker.
                                symbol: null // A predefined shape or symbol for the marker. When null, the symbol is pulled from options.symbols. Other possible values are "circle", "square", "diamond", "triangle" and "triangle-down".
                            }
                        }
                    },
                    stickyTracking: true, // Sticky tracking of mouse events. When true, the mouseOut event on a series isn't triggered until the mouse moves over another series, or out of the plot area. When false, the mouseOut event on a series is triggered when the mouse leaves the area around the series' graph or markers.
                    threshold: 0, // The Y axis value to serve as the base for the area, for distinguishing between values above and below a threshold. If null, the area behaves like a line series with fill between the graph and the Y axis minimum.
                    tooltip: HighchartConfig.DefaultConfig.tooltip,
                    trackByArea: false, // Whether the whole area or just the line should respond to mouseover tooltips and other mouse or touch events.
                    turboThreshold: 1000, // When a series contains a data array that is longer than this, only one dimensional arrays of numbers, or two dimensional arrays with x and y values are allowed. Also, only the first point is tested, and the rest are assumed to be the same format. This saves expensive data checking and indexing in long series. Set it to 0 disable.
                    visible: true // Set the initial visibility of the series.
                }
                return {
                    plotOptions: {
                        areaspline: plotOptions
                    }
                }
            }
        };
    });
});
