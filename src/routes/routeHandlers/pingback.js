"use strict";

var pingbackService = require('services/pingbackService');
var mapping = {
    templateIds: pingbackService.getAllTemplateIds,
    getTemplateById: pingbackService.getBreadcrumbMapping
}

module.exports.routeHandler = function(req, res, next) {
    console.log('$$$$$$$$$',req.query)
    if (mapping[req.query.query]) {
        mapping[req.query.query](req.query).then(function(data) {
            res.send(data);
        }, function(error) {
            res.send(error);
        })
    } else {
        res.send({
            msg: "Provide correct query type"
        })
    }
};