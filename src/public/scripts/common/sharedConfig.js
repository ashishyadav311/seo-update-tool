(function() {
    var global,
        config;

    function getURL(urlObj, query) {
        if (!query) {
            return urlObj;
        }

        var queryStr, seperator;
        if (typeof query === 'string') {
            queryStr = query;
        } else {
            queryStr = '';
            for (var key in query) {
                queryStr = queryStr + '&' + key + '=' + query[key];
            }
            queryStr = queryStr.slice(1);
        }
        seperator = urlObj.url.indexOf('?') > -1 ? '&' : '?';
        urlObj.url += seperator+queryStr;
        return urlObj;
    }

    config = {
        apiHandlers: {
                pingback: function(){
                    return{
                        controller: 'pingback',
                        method: ['GET'],
                        url: '/seo/pingback',
                        route: '/seo/pingback'
                    }
                }
        },
        testingUrls: {
            "Homepage"          : "/",
            "City Serp"         : "/bangalore-residential-property/buy-property-in-bangalore-city",
            "Locality Serp"     : "/bangalore-property/hebbal-flats-for-sale-50175",
            "Locality Overview" : "/bangalore/hebbal-real-estate-50175",
            "City Overview"     : "/real-estate-bangalore-property",
            "Project Overview"  : "/bangalore/skylark-ithaca-in-kr-puram-642535"
        },
        default:{
            urlType: "HomePage",
            limit: "10",
            domain: "beta"
        },
        testingLimits: [10,20,50,100,250,500],
        domain: {
            "beta": "http://beta.makaan-ws.com",
            "production": "http://www.makaan.com"
        },
        getURL: getURL
            
    };

    Object.keys(config.apiHandlers).map(function(key){
        var func = config.apiHandlers[key];
        config.apiHandlers[key] = (function() {
            return function(options) {
                if (options && options.query) {
                    return getURL(func(options), options.query);
                }
                return func(options);
            };
        })();
    });
    //to create a node module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = config;
    }
    //to create a amd component
    else if (typeof define === 'function' && define.amd) {
        define(function() {
            return config;
        });
    }
    //to create a global file if both are not present
    else {
        global = (function() {
            return this || (0, eval)('this');
        }());
        global.config = config;
    }

})();
