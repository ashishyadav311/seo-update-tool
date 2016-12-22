"use strict";
var path = require('path');
var template = require('marko').load(path.join(__dirname, '..', 'views/breadcrumb.marko'));
var query = require('services/query');

module.exports.routeHandler = function(req, res, next) {
	query.getAllTemplateIds().then(function(response) {
	console.log('asdasdasdasd')

		console.log(response);
		template.render({
	        templates: response
	    }, res);
    }, function(error) {
	console.log('$$$$$$$$$$$$$$$$$$$')

        next(error);
    })
};