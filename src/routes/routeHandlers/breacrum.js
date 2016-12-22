"use strict";

var _ = require('lodash');
var request = require('request');
var mongo = require('services/mongoService');
var path = require('path');
var template = require('marko').load(path.join(__dirname, '..', 'views/performance.marko'));
var sharedConfig = require('public/scripts/common/sharedConfig');

var mongoCollection = "wpt";
var config = {
	domain: {
		"beta": "http://beta.makaan-ws.com",
		"production": "http://www.makaan.com"
	}
}

module.exports.routeHandler = function(req, res, next) {
	
};



