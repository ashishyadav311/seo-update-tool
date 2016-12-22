"use strict";

var _ = require('lodash');
var request = require('request');
var mongo = require('services/mongoService');

var mongoCollection = "wpt";

function getResult(testId, res){
	request("http://www.webpagetest.org/jsonResult.php?test=" + testId, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        	let responseData;
        	responseData = JSON.parse(body);
        	responseData = responseData.data;
        	responseData = _parseData(responseData)
        	insertResult(testId, responseData.testUrl, responseData).then(()=>{
        		let response = {
        			status: "success",
        			testId: testId,
        			testUrl: responseData.testUrl
        		};
        		console.log('insert response: ',response);
        		res.send(response);
        	},(error)=>{
        		let response = {
        			status: "error",
        			testId: testId,
        			testUrl: responseData.testUrl,
        			error: error
        		};
        		console.error('error insert response: ',response);
        		res.send(response);
        	});
        }else{
            getResult(testId);
        }
	});
}

module.exports.routeHandler = function(req, res, next) {
    if(req.query.id){
    	getResult(req.query.id, res)
    }
};

function _parseData(data){
	let performanceData = data.runs["1"].firstView;
	let performanceDataAverage = data.average.firstView;
	let parsedData = {
		testUrl: data.url,
		label: data.label || data.id,
		time:{
			load 				: performanceDataAverage.loadTime || performanceData.loadTime,
			complete 			: performanceDataAverage.fullyLoaded || performanceData.fullyLoaded,
			ready 				: performanceDataAverage.domInteractive || performanceData.domInteractive,
			visuallyComplete	: performanceDataAverage.visualComplete || performanceData.visualComplete,
			renderStart 		: performanceDataAverage.render || performanceData.render
		},
		size:{
			load 				: performanceDataAverage.bytesInDoc || performanceData.bytesInDoc,
			complete 			: performanceDataAverage.bytesIn || performanceData.bytesIn,
		},
		request:{
			load 				: performanceDataAverage.requestsDoc || performanceData.requestsDoc,
			complete 			: performanceDataAverage.requestsFull || performanceData.requestsFull
		}
	};
	return parsedData;
}

function insertResult(testId, testUrl, data={}){
	return mongo.insert(mongoCollection, {
		"testId": testId,
		"data": data,
		"testUrl": testUrl,
		"timestamp": Date.now()
	});
}

