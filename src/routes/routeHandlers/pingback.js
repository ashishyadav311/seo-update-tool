"use strict";

var query = require('services/query');
var config = require('services/config');

module.exports.routeHandler = function(req, res, next) {

    query.getAllTemplateIds().then(function(response) {
        let url_category_id = {};
        for (var i in response) {
            for (var j in response[i]) {
                url_category_id[response[i]["id"]] = response[i]["name"];
            }
        }
        res.send(config);
        config = url_category_id;
        console.log(config)
    }, function(error) {
        res.send(error);
        console.log('---###---')
    })
    // query.getAllMapping(parseInt(req.query.id)).then(function(response) {
    //     res.send(response);
    //     console.log('--------')
    // }, function(error) {
    //     res.send(error);
    //     console.log('---###---')
    // })

};
