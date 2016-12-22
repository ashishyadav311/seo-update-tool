
'use strict';
define(['services/loggerService'], () => {
    const SERVICE_NAME = 'ApiService';

    Box.Application.addService(SERVICE_NAME, (application) => {
        const Logger = application.getService('Logger');
        /**
         * Common method to make GET API calls
         * @param  {String}  url           [URL string of API point]
         * @param  {Boolean} isCustomError [If true then the error is handled by the API calling method.
         *                                  If false then show generic error message]
         * @return {Object}                [Returns the response]
         */

        function get(url, isCustomError) {
            let request = $.ajax({
                method: 'GET',
                url: url,
                data: {
                    format: 'json'
                }
            });

            let promise = request
                .then(function(response) {
                    if (!response || (response.statusCode && response.statusCode !== '2XX' && response.statusCode !== 200) || (response.status && response.status !== 'success') ) {
                        let errorMsg = response.error && response.error.msg  ? response.error.msg : 'Error in API';
                        return errorHandler(new Error(errorMsg), isCustomError, url);
                    }
                    return response;
                }, function(error) {
                    return errorHandler(error, isCustomError, url);
                }).always(function() {});

            promise.abort = request.abort;

            return promise;
        }

        function post(url, data, headers, isCustomError) {
            let postObj = {
                method: 'POST',
                url: url
            };
            if (data) {
                postObj.data = data;
            }
            if (headers) {
                postObj.headers = headers;
            }

            let request = $.ajax(postObj),
                promise = request
                .then(function(response) {
                    if (!response || (response.statusCode && response.statusCode !== '2XX' && response.statusCode !== 200) || (response.status && response.status !== 'success') ) {
                        let errorMsg = response.error && response.error.msg  ? response.error.msg : 'Error in API';
                        return errorHandler(new Error(errorMsg), isCustomError, url);
                    }
                    return response;
                }, function(error) {
                    // (function(error, isCustomError) {
                        return errorHandler(error, isCustomError, url);
                    // })(error, isCustomError);
                })
                .always(function() {});
            promise.abort = request.abort;
            return promise;
        }

        function patch(url, data, headers, isCustomError) {
            let patchObj = {
                method: 'PATCH',
                url: url
            };
            if (data) {
                patchObj.data = data;
            }
            if (headers) {
                patchObj.headers = headers;
            }

            let request = $.ajax(patchObj),
                promise = request
                .then(function(response) {
                    if (!response || (response.statusCode && response.statusCode !== '2XX' && response.statusCode !== 200) || (response.status && response.status !== 'success') ) {
                        let errorMsg = response.error && response.error.msg  ? response.error.msg : 'Error in API';
                        return errorHandler(new Error(errorMsg), isCustomError, url);
                    }
                    return response;
                }, function(error) {
                    // (function(error, isCustomError) {
                        return errorHandler(error, isCustomError, url);
                    // })(error, isCustomError);
                })
                .always(function() {});
            promise.abort = request.abort;
            return promise;
        }

        function postJSON(url, data, isCustomError) {
            var headers = {
                'content-type': 'application/json'
            };

            if (typeof data === "object") {
                // stringify object
                data = JSON.stringify(data);
            }

            var request = post(url, data, headers, isCustomError);
            var promise = request
                .then(function(response) {
                    return response;
                }, function(e) {
                    return $.Deferred().reject(e);
                });
            promise.abort = request.abort;
            return promise;
        }

        function put(url, data, headers, isCustomError) {
            let putObj = {
                method: 'PUT',
                url: url
            };
            if (data) {
                putObj.data = data;
            }
            if (headers) {
                putObj.headers = headers;
            }

            let request = $.ajax(putObj),
                promise = request
                .then(function(response) {
                    return response;
                }, function(error) {
                    (function(error, isCustomError) {
                        return errorHandler(error, isCustomError, url);
                    })(error, isCustomError);
                })
                .always(function() {});
            promise.abort = request.abort;
            return promise;
        }

        function putJSON(url, data, isCustomError) {
            var headers = {
                'Content-Type': 'application/json'
            };
            return put(url, data, headers, isCustomError)
                .then(function(response) {
                    return response;
                }, function(e) {
                    return $.Deferred().reject(e);
                });
        }

        function deleteEntry(url, data, isCustomError) {
            var request = $.ajax({
                method: 'DELETE',
                url: url,
                data: data
            });
            var promise = request
                .then(function(response) {
                    return response;
                }, function(error) {
                    //(function(isCustomError) {
                        return errorHandler(error, isCustomError, url);
                    //})(error, isCustomError);
                })
                .always(function() {});
            promise.abort = request.abort;
            return promise;
        }

        function composite(arr, isCustomError) {
            var baseUrl = 'app/v1/composite?api=';
            var str;
            //Create a copy of original array
            arr = arr.slice();

            if (typeof arr === 'object' && arr.length) {
                for (var count = 0, len = arr.length; count < len; count++) {
                    arr[count] = encodeURIComponent(arr[count]);
                }

                str = arr.join('&api=');

                var request = get(baseUrl + str);
                var promise = request
                    .then(function(response) {
                        if (!response || response.status !== 200 || !response.data || !response.data.data) {
                            return errorHandler(response, isCustomError, str);
                        }
                        for (var i in response.data.data) {
                            if (!response.data.data[i] || response.data.data[i].statusCode !== '2XX') {
                                return errorHandler(response, isCustomError, str);
                            }
                        }
                        return response;
                    });
                promise.abort = request.abort;
                return promise;
            }
            return $.Deferred().reject(undefined);
        }
        /**
         * Error handler for get, post and composite calls
         * @param  {response}  e             response from the call
         * @param  {Boolean} isCustomError flag which tells whether generic handling should be done or not
         * @return {promise}                reject promise
         */
        function errorHandler(e, isCustomError, url) {
            if (!isCustomError) {
                var message;
                // message = '<span> Some error has occured. Please retry.</span>"';
                Logger.error('error for', url);
                // Logger.error(message);
            }

            // throw e;
            return $.Deferred().reject(e);
        }

        return {
            get:get,
            post,
            patch,
            postJSON,
            put,
            putJSON,
            deleteEntry,
            composite
        };
    });

    return Box.Application.getService(SERVICE_NAME);
});
