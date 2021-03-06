'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var paths = require('../../app/controllers/paths.server.controller');

	// Paths Routes
	app.route('/paths')
		.get(paths.list)
		.post(users.requiresLogin, paths.create);

	app.route('/paths/:pathId')
		.get(paths.read)
		.put(paths.update)
		.delete( paths.delete);

	// Finish by binding the Path middleware
	//app.param('pathId', paths.pathByID);
};
