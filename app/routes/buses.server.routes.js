'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var buses = require('../../app/controllers/buses.server.controller');

	// Buses Routes
	app.route('/buses')
		.get(buses.list)
		.post(users.requiresLogin, buses.create);

	app.route('/buses/:busId')
		.get(buses.read)
		.put(users.requiresLogin, buses.hasAuthorization, buses.update)
		.delete(users.requiresLogin, buses.hasAuthorization, buses.delete);

	// Finish by binding the Bus middleware
	app.param('busId', buses.busByID);
};
