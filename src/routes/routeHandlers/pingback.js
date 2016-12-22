"use strict";

var query = require('services/query');

module.exports.routeHandler = function(req, res, next) {
    console.log()
    query.getAllTemplateIds().then(function(response) {
        res.send(response);
        console.log('--------')
    }, function(error) {
        res.send(error);
        console.log('---###---')

    })
};
