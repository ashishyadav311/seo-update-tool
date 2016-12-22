"use strict";

const slash         = require('express-slash'),
    path            = require('path');
    var routeService    = {};

routeService.setup = function(app, router) {

    app.use(router);
    app.use(slash());

    // register apis urls
    require(`../routes/controller`).setup(router);

    app.use(function(err, req, res, next) {
        res.send(err);
    });
};

module.exports = routeService;
