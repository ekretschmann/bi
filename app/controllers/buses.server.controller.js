'use strict';

var http = require('http');
var https = require('https');


exports.busroute = function(req, res) {



	var options = {
		//http://mk.ods-live.co.uk/api/1/bus/locations.json?service='+id
		host: 'www.arrivabus.co.uk',
		path: '/TimetableData/?route=true&id='+req.params.routeId+'&date=150913'
	};

	//res.jsonp(line5);

	var httpReq = https.get(options, function(response) {
		console.log('STATUS: ' + response.statusCode);
		console.log('HEADERS: ' + JSON.stringify(response.headers));

		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		response.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = JSON.parse(Buffer.concat(bodyChunks));
			console.log('BODY: ' + body.toString());
			// ...and/or process the entire body here.
			res.jsonp(body);
		});
	});

	httpReq.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});

};

/**
 * List of Buses
 */
exports.busservices = function(req, res) {


	var options = {
		//http://mk.ods-live.co.uk/api/1/bus/locations.json?service='+id
		host: 'mk.ods-live.co.uk',
		path: '/api/1/bus/services.json'
	};

	//res.jsonp(services);

	var httpReq = http.get(options, function(response) {
		console.log('STATUS: ' + response.statusCode);
		console.log('HEADERS: ' + JSON.stringify(response.headers));

		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		response.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);
		}).on('end', function() {
			console.log(Buffer.concat(bodyChunks));
			var body = JSON.parse(Buffer.concat(bodyChunks));
			console.log('BODY: ' + body.toString());
			// ...and/or process the entire body here.
			res.jsonp(body);
		});
	});

	httpReq.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});

};

exports.busservice = function(req, res) {



	var options = {
		//http://mk.ods-live.co.uk/api/1/bus/locations.json?service='+id
		host: 'mk.ods-live.co.uk',
		path: '/api/1/bus/locations.json?service='+req.params.busId
	};

	//res.jsonp(line5);

	var httpReq = http.get(options, function(response) {
		console.log('STATUS: ' + response.statusCode);
		console.log('HEADERS: ' + JSON.stringify(response.headers));

		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		response.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = JSON.parse(Buffer.concat(bodyChunks));
			console.log('BODY: ' + body.toString());
			// ...and/or process the entire body here.
			res.jsonp(body);
		});
	});

	httpReq.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});

};

