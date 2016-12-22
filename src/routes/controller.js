"use strict";

/*
Description: This registers routes for all api wrappers and assigns respective handlers
*/

const routeHandlers = require('public/scripts/common/sharedConfig').apiHandlers;
module.exports.setup = function(router) {
    for (let route in routeHandlers) {

        let _routeHandler = routeHandlers[route]();
        var parser = require('./routeHandlers/' + _routeHandler.controller);
        if (parser) {
            let methods = _routeHandler.method;
            for (let i = 0; i < methods.length; i++) {
                let httpVerb = methods[i];
                let parserRouter = router.route(_routeHandler.route);
                if (httpVerb === 'GET') {
                    parserRouter.get(parser.routeHandler);
                }
                if (httpVerb === 'POST') {
                    parserRouter.post(parser.routeHandler);
                }
                if (httpVerb === 'PUT') {
                    parserRouter.put(parser.routeHandler);
                }
                if (httpVerb === 'PATCH') {
                    parserRouter.patch(parser.routeHandler);
                }
                if (httpVerb === 'DELETE') {
                    parserRouter.delete(parser.routeHandler);
                }
            }
        }
    }

    router.get('/seo/*', (req, res) => {
        logger.error('Error: Url ' + req.originalUrl + ' does not exit.');
        res.status(404).send({
            message: 'this url does not exist !!'
        });
    });
};
