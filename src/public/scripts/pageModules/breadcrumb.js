"use strict";
define([
    'common/sharedConfig',
    'services/commonService',
    'services/apiService',
], (sharedConfig) => {
    Box.Application.addModule("breadcrumb", (context) => {

            var CommonService = context.getService('CommonService');
            var ApiService = context.getService('ApiService');
            var logger = context.getService('Logger');
            var messages = [],
                behaviors = [],
                moduleEl, config = {};

            function _setValues(urlType, limit, domain) {
                $(moduleEl).find('[data-dropdown="url"] [data-selected]').data('val', urlType).text(urlType);
            }

            function parser(response) {
                var parsedData = {};
                $.each(response, function(k, v) {
                    if (!parsedData[v.level]) {
                        parsedData[v.level] = [];
                    }
                    parsedData[v.level].push({
                        id: v.id,
                        name: v.sub_url_category_id,
                        order: v.url_order
                    })
                })
                return parsedData;
            }

            function getDetails(id, name) {
                ApiService.get('/seo/pingback?query=getTemplateById&id=' + id).then(function(response) {
                        var data = parser(response); 
                        $('#result').html(createTable(data, name));
                })
        }

        function createTable(data, name) {
            var str = "<table><tbody>";
                str += "<tr><td colspan='4'>"+name+"</td></tr>"

            $.each(data, function(k, v) {
                str += "<tr><td>"+k+"</td>"
                $.each(v, function(key, val) {
                    str += "<tr><td>"+val.id+"</td><td>"+val.name+"</td><td>"+val.order+"</td></tr>"
                });
                str += "</tr>"

            })
            str += "</tbody></table>";
            return str;
        }


        function init() {
            moduleEl = context.getElement();
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
            switch (elementType) {
                case "getResult":
                case "url":
                    let id = $(element).data().val;
                    let name = $(element).text();
                    getDetails(id, name);

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
