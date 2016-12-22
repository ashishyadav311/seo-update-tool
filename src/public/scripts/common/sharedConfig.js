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
                },
                breadcrumb: function(){
                    return{
                        controller: 'breadcrumb',
                        method: ['GET'],
                        url: '/seo/breadcrumb',
                        route: '/seo/breadcrumb'
                    }
                }
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
