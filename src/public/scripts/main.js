require.config({
    "baseUrl": "/",
    "paths": {
        "t3": "scripts/vendor/t3",
        "jquery": "bower_components/jquery/dist/jquery.min",
        "bootstrap": "scripts/vendor/bootstrap",
        "highcharts": "bower_components/highcharts/highcharts",
        "highcharts-more": "bower_components/highcharts/highcharts-more",
        "highcharts-no-data": "bower_components/highcharts/modules/no-data-to-display",
        "highcharts3d": "bower_components/highcharts/highcharts-3d",
        "app": "scripts/app",
        "infra": "scripts/infra",
        "services": "scripts/services",
        "common": "scripts/common",
        "behaviors": "scripts/behaviors",
        "vendor": "scripts/vendor",
        "promise": "scripts/vendor/es6-promise"
    },
    "shim": {
        "t3": {
            "deps": ["jquery"]
        },
        "ajaxify": {
            "deps": ["jquery"]
        },
        "bootstrap": ["jquery"],
        "highcharts": ["jquery"],
        "highcharts-more": ["highcharts"],
        "highcharts-no-data": ["highcharts"],
        "highcharts3d": ["highcharts"]
    },
    "waitSeconds": 200,
    "doT": {
        "ext": ".html"
    }
});
