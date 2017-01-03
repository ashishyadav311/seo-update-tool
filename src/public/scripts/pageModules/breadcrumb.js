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
                    id: v.sub_url_category_id,
                    name: v.sub_url_category_name,
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

            var str;
            $.each(data, function(k, v) {
                if (v) {
                    str += "<table><tbody>";
                    str += "<tr><th colspan='4'>" + name + "</th></tr>"
                    str += "<tr colspan=" + v.length + ">";
                    str += "<td>"
                    str += "<table><tbody><th>Level</th><tr><td>" + k + "</td></tr></tbody></table>";
                    str += "</td>";
                    str += "<td>";
                    str += "<table><tbody><th>id</th><th>name</th><th>order</th>"
                    $.each(v, function(key, val) {
                        str += "<tr><td>" + val.id + "</td><td>" + val.name + "</td><td>" + val.order + "</td></tr>"
                    });
                    str += "</tbody></table>";
                    str += "</td>";
                    str += "</tr><tr></tr>";
                    str += "</tbody></table>";
                }
            })
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
            var url_category_id = $(element).parents('#par').find('.val1').text();
            var sub_url_category_id = $(element).parents('#par').find('.val2').text();
            var level = $(element).parents('#par').find('.val3').text();
            var order = $(element).parents('#par').find('.val4').text();
            // bind custom messages/events
            switch (elementType) {
                case "getResult":
                case "url":
                    let id = $(element).data().val;
                    let name = $(element).text();
                    getDetails(id, name);
                    break;
                case 'val1':
                    $(element).parents('.dropdown').find('.val1').html($(element).data().val);
                    break;
                case 'val2':
                    $(element).parents('.dropdown').find('.val2').html($(element).data().val);
                    break;
                case 'level':
                    $(element).parents('.dropdown').find('.val3').html($(element).text());
                    break;
                case 'orderval':
                    $(element).parents('.dropdown').find('.val4').html($(element).text());
                    break;
                case "insert":
                    console.log("insert into url_category_breadcrum_mapping set url_category_id =" + url_category_id + " , sub_url_category_id =" + sub_url_category_id + " , level =" + level + " , url_order = 10, is_active = 1");
                    break;
                case "change":
                    console.log("update url_category_breadcrum_mapping set level=" + level + " where url_category_id =" + url_category_id + " and sub_url_category_id =" + sub_url_category_id);
                    break;
                case "order":
                    console.log("update url_category_breadcrum_mapping set url_order= " + order + " where url_category_id =" + url_category_id + " and sub_url_category_id =" + sub_url_category_id)
                    break;
                case "delete":
                    console.log("delete from url_category_breadcrum_mapping where url_category_id =" + url_category_id + " and sub_url_category_id =" + sub_url_category_id);
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
