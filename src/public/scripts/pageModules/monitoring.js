"use strict";
define([
    'common/sharedConfig',
    'services/commonService'
], (sharedConfig) => {
    Box.Application.addModule("monitoring", (context) => {

        const CommonService = context.getService('CommonService'),
            logger = context.getService('Logger');
        var messages = [],
            behaviors = [],
            moduleEl;

        function _setValues(urlType, limit, domain){
            $(moduleEl).find('[data-dropdown="url"] [data-selected]').data('val',urlType).text(urlType);
            $(moduleEl).find('[data-dropdown="limit"] [data-selected]').data('val', limit).text('last '+limit+' releases');
            $(moduleEl).find('[data-dropdown="environment"] [data-selected]').data('val', domain).text(domain);
        }

        function getJsonFromUrl() {
            var query = location.search.substr(1);
            var result = {};
            query.split("&").forEach(function(part) {
                var item = part.split("=");
                result[item[0]] = decodeURIComponent(item[1]);
            });
            return result;
        }
        function init() {
            moduleEl = context.getElement();
            let query = getJsonFromUrl();
            let urlType = (sharedConfig.testingUrls[query.urlType] && query.urlType)  || sharedConfig.default.urlType;
            let limit = query.count || sharedConfig.default.limit;
            let domain = (sharedConfig.domain[query.env] && query.env) || sharedConfig.default.domain;

            try{
                limit  = parseInt(limit);
            }catch(e){
                limit  = sharedConfig.default.limit;
            }
            _setValues(urlType,limit,domain);
        }

        function destroy() {
            //clear all the binding and objects
            $(window).off('scroll', scrollerHandler2);
        }

        function onmessage(name, data) {
            // bind custom messages/events
        }

        function onclick(event, element, elementType) {
            // bind custom messages/events
            switch(elementType){
                case "url":
                case "limit":
                case "env":
                    let selectedEl = $(element).parents('[data-dropdown]').find('[data-selected]');
                    selectedEl.data('val', $(element).data('val')).text($(element).text());
                break;
                case "getResult":
                    let testUrl = $(moduleEl).find('[data-dropdown="url"] [data-selected]').data('val');
                    let limit = $(moduleEl).find('[data-dropdown="limit"] [data-selected]').data('val');
                    let env = $(moduleEl).find('[data-dropdown="environment"] [data-selected]').data('val');
                    let url  = window.location.origin+ window.location.pathname + '?' + 'urlType='+testUrl +'&count=' + limit +'&env=' +env;
                    window.location.href = url;
                break;
            }
        }

        return {
            init,
            messages,
            behaviors,
            onmessage,
            onclick,
            destroy
        };
    });
});