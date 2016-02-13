'use strict';

module.exports = function(app) {
	var buses = require('../../app/controllers/buses.server.controller');

	// Buses Routes
	app.get('/busservices', buses.busservices);

	app.get('/busservices/:busId', buses.busservice);

	// Finish by binding the Bus middleware
	//app.param('busId', buses.busByID);
};
