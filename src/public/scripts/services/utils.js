"use strict";
define(['common/utilFunctions',
    'common/sharedConfig',
    'services/localStorageService'
], (uf, sharedConfig, localStorageService) => {
    let utilfunc = uf;
    const SERVICE_NAME = 'Utils';

    Box.Application.addService(SERVICE_NAME, () => {
        utilfunc.setcookie = function(cname, cvalue) {
            document.cookie = cname + "=" + cvalue + ";path=/";
        };
        utilfunc.getCookie = function(key) {
            var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            return keyValue ? keyValue[2] : null;
        };
        utilfunc.deleteCookie = function(key) {
            document.cookie = key + '=;path=/;expires=Thu, 01-Jan-70 00:00:01 GMT;';
        };
        utilfunc.isMobileRequest = function() {
            let ua = window.navigator.userAgent;
            if (/mobile/i.test(ua)) {
                return true;
            }
            return false;
        };

        utilfunc.elementInViewport = function(el) {
            if(!el) return false;
            var top = el.offsetTop;
            var left = el.offsetLeft;
            var width = el.offsetWidth;
            var height = el.offsetHeight;

            while (el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }

            return (
                top < (window.pageYOffset + window.innerHeight) &&
                left < (window.pageXOffset + window.innerWidth) &&
                (top + height) > window.pageYOffset &&
                (left + width) > window.pageXOffset
            );
        }
        utilfunc.trackEvent = function(action, category, label, value, nonInteraction){
            if(typeof analytics != 'undefined' && typeof analytics.track === "function"){
                analytics.track(action, {
                    category: category,
                    label: label,
                    value: value,
                    nonInteraction: nonInteraction ? 1 : undefined
                });
            }
            if(typeof ga === 'function'){
                ga('send', 'event', category, action, label, value, nonInteraction ? {'nonInteraction': 1} : undefined);
            }
        };

        // userId : string
        // traits : object with all properties
        utilfunc.trackIdentity = function(userId, traits){
            if(typeof analytics != 'undefined' && typeof analytics.identify === "function"){
                analytics.identify(userId, traits);
            }
        };

        utilfunc.showOnSlowSpeed = function(element, className, speed) {
            if (window.clientCurrentSpeed < speed) {
                $(element).removeClass(className);
            }
        };

        

        utilfunc.getPageTimingData = function(){
            let timing = {};
            if(window.performance && window.performance.timing){
                let TimingService = performance.timing;
                timing.pageLoadTime = TimingService.domComplete - TimingService.connectStart;
                timing.domReadyTime = TimingService.domInteractive - TimingService.connectStart;
            }
            return timing;
        };

        utilfunc.getPageExtraData = function(){
            try{
                return JSON.parse($('script[type="text/x-page-config"]').text());
            }catch(e){
                return {};
            }
        };

        utilfunc.getTrackPageCategory = function(){
            let pageType = utilfunc.getPageData('pageType'),
                pageTypeMap = {
                    'HOME_PAGE_URLS': 'Home',
                    'PROJECT_URLS_OVERVIEW': 'Project',
                    'CITY_URLS_OVERVIEW': 'City',
                    'SUBURB_URLS_OVERVIEW': 'Locality',
                    'LOCALITY_URLS_OVERVIEW': 'Locality',
                    'PROPERTY_URLS': 'Property',
                    'BUILDER_URLS': 'SERP_BUILDER',
                    'BUILDER_TAXONOMY_URLS': 'SERP_BUILDER',
                    'SELLER_PROPERTY_URLS': 'SERP_SELLER',
                    'CITY_URLS': 'SERP_CITY',
                    'CITY_TAXONOMY_URLS': 'SERP_CITY',
                    'STATIC_URLS': 'SERP_STATIC',
                    'PROJECT_URLS': 'SERP_PROJECT',
                    'NEARBY_LISTING_URLS': 'SERP_LANDMARK',
                    'SIMILAR_PROPERTY_URLS': 'SERP_CHILD',
                    'LOCALITY_URLS': 'SERP_LOCALITY',
                    'LOCALITY_TAXONOMY_URLS': 'SERP_LOCALITY',
                    'SUBURB_URLS': 'SERP_SUBURB',
                    'SUBURB_TAXONOMY_URLS': 'SERP_SUBURB',
                    'LOCALITY_SUBURB_TAXONOMY': 'SERP_LOCALITY', // to handle fallback for previous support
                    'LISTINGS_PROPERTY_URLS': 'SERP_GENERAL',
                    'CITY_URLS_MAPS': 'SERP_MAP_CITY',
                    'CITY_TAXONOMY_URLS_MAPS': 'SERP_MAP_CITY',
                    'STATIC_URLS_MAPS': 'SERP_MAP_STATIC',
                    'PROJECT_URLS_MAPS': 'SERP_MAP_PROJECT',
                    'NEARBY_LISTING_URLS_MAPS': 'SERP_MAP_LANDMARK',
                    'SIMILAR_PROPERTY_URLS_MAPS': 'SERP_MAP_CHILD',
                    'LOCALITY_URLS_MAPS': 'SERP_MAP_LOCALITY',
                    'LOCALITY_TAXONOMY_URLS_MAPS': 'SERP_MAP_LOCALITY',
                    'SUBURB_URLS_MAPS': 'SERP_MAP_SUBURB',
                    'SUBURB_TAXONOMY_URLS_MAPS': 'SERP_MAP_SUBURB',
                    'LOCALITY_SUBURB_TAXONOMY_MAPS': 'SERP_MAP_LOCALITY', // to handle fallback for previous support
                    'LISTINGS_PROPERTY_URLS_MAPS': 'SERP_MAP_GENERAL',
                    'BUILDER_URLS_MAPS': 'SERP_MAP_BUILDER',
                    'BUILDER_TAXONOMY_URLS_MAPS': 'SERP_MAP_BUILDER',
                    'SELLER_PROPERTY_URLS_MAPS': 'SERP_MAP_SELLER',
                    'BUYER_DASHBOARD': 'DASHBOARD',
                    'SERVICES': 'Services_BD',
                    '404': '404',
                    '500': '500'
                };
            return pageTypeMap[pageType];
        };

        utilfunc.getPageData = function(name) {

            let data = window.pageData || {};
            data.listingType = data.listingType || 'buy';

            if (name) {
                return data[name];
            }
            return data;
        };

        utilfunc.setPageData = function(name, value) {

            let data = window.pageData || {};

            if (name && value) {
                data[name] = value;
            }

            window.pageData = data;
            return data;
        };

        utilfunc.listingsPropertyFullPath = function() {
            let prefix = utilfunc.getPageData('isMap') ? '/maps' : '',
                pathName = utilfunc.listingsPropertyPathName();

            return `${prefix}${pathName}`;
        };

        utilfunc.gotoEl = function(dest, threshold, offset, callback) {
            callback = typeof callback !== 'function' ? function(){} : callback;
            let destination = $(dest),
                scrollTo = destination.offset().top;
            scrollTo -= threshold && threshold < scrollTo ? offset : 0;
            $('body,html').animate({
                'scrollTop': scrollTo
            }, 'slow', callback);
        };

        /**
         * [scrollToTop description] Scrolls to top of page on event of an element
         * @param  {[String]} element Selector of element on wholse event page is scrolled
         * @return {[String]} event event triggering the scroll
         */
        utilfunc.scrollToTop = function(element, event) {
            $(element).on(event, function() {
                utilfunc.gotoEl('body', 0, 0);
            });
        };

        utilfunc.getGeoLocation = function(options) {
            return new Promise(function(resolve, reject) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    resolve(position);
                }, function(error) {
                    reject(error);
                }, options);
            });
        };

        utilfunc.generateSerpFilter = function(data) {
            let filterKeyMap = {
                    beds: ["beds"],
                    propertyType: ["propertyType"],
                    area: ["minSize", "maxSize"],
                    budget: ["minPrice", "maxPrice"],
                    localityOrSuburbId: ["localityOrSuburbId"],
                    listingCategory: ["listingCategory"]
                },
                filter = {},
                key,
                k,
                urlObj,
                getURL = sharedConfig.getURL;

            for (key in filterKeyMap) {
                filter[key] = [];
                let mappedKeys = filterKeyMap[key];
                for (k = 0; k < mappedKeys.length; k++) {
                    if (data[mappedKeys[k]]) {
                        filter[key].push(data[mappedKeys[k]]);
                    }
                }
                let length = filter[key].length;
                if (length) {
                    if (length === 2 && filter[key][0] === filter[key][1]) {
                        filter[key].splice(1, 1);
                    }
                    filter[key] = filter[key].join(",");
                } else {
                    delete filter[key];
                }
            }
            urlObj = {
                url: ""
            };
            return Object.keys(filter).length ? getURL(urlObj, filter).url : null;
        };

        utilfunc.checkInViewPort = function(element, extra) {
            extra = extra || 65;
            if (!element) {
                return false;
            }
            let scrollTop = $(window).scrollTop(),
                offsetTop = $(element).offset().top,
                windowHeight = $(window).height();
            return scrollTop >= offsetTop - windowHeight - extra ? true : false;
        };

        utilfunc.isScrolledTo = function(elem) {
            if (elem && elem.length>0) {
                var docViewTop = $(window).scrollTop(); //num of pixels hidden above current screen
                var docViewBottom = docViewTop + $(window).height();
                var elemTop = $(elem).offset().top; //num of pixels above the elem
                var elemBottom = elemTop + $(elem).height();
                return ((elemTop <= docViewTop || elemTop >= docViewTop));
            }
            return false;
        };

        utilfunc.flattenObjectToArray = function(obj, result) {
            result = result || [];
            $.each(obj, (k, v) => {
                if ($.isArray(v)) {
                    result.push(v);
                } else if (typeof v === 'object') {
                    return utilfunc.flattenObjectToArray(v, result);
                }
            });
            return Array.prototype.concat.apply([], result);
        };

        utilfunc.isValidValue = function(value) {
            var value = $.trim(value)
            if ( value.length > 2 && value.length < 50) {
                return true;
            }
            return false;
        };

        utilfunc.isArray = function(data) {
            if (typeof Array.isArray !== "undefined") {
                return Array.isArray(data);
            }

            return Object.prototype.toString.call(data) === '[object Array]';
        };

        utilfunc.triggerPageInteractive = function(){
            $(window).trigger('pageCompleted');
        }

        utilfunc.getTrackingListingCategory = function(listingCategory) {
            if (!listingCategory) {
                return;
            }
            return listingCategory.toLowerCase() == "rental" ? "rent" : listingCategory.toLowerCase();
        }

        return utilfunc;
    });
    return Box.Application.getService(SERVICE_NAME);
});
