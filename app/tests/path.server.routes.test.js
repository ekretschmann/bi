//'use strict';
//
//var should = require('should'),
//	request = require('supertest'),
//	app = require('../../server'),
//	mongoose = require('mongoose'),
//	User = mongoose.model('User'),
//	Path = mongoose.model('Path'),
//	agent = request.agent(app);
//
///**
// * Globals
// */
//var credentials, user, path;
//
///**
// * Path routes tests
// */
//describe('Path CRUD tests', function() {
//	beforeEach(function(done) {
//		// Create user credentials
//		credentials = {
//			username: 'username',
//			password: 'password'
//		};
//
//		// Create a new user
//		user = new User({
//			firstName: 'Full',
//			lastName: 'Name',
//			displayName: 'Full Name',
//			email: 'test@test.com',
//			username: credentials.username,
//			password: credentials.password,
//			provider: 'local'
//		});
//
//		// Save a user to the test db and create new Path
//		user.save(function() {
//			path = {
//				name: 'Path Name'
//			};
//
//			done();
//		});
//	});
//
//	it('should be able to save Path instance if logged in', function(done) {
//		agent.post('/auth/signin')
//			.send(credentials)
//			.expect(200)
//			.end(function(signinErr, signinRes) {
//				// Handle signin error
//				if (signinErr) done(signinErr);
//
//				// Get the userId
//				var userId = user.id;
//
//				// Save a new Path
//				agent.post('/paths')
//					.send(path)
//					.expect(200)
//					.end(function(pathSaveErr, pathSaveRes) {
//						// Handle Path save error
//						if (pathSaveErr) done(pathSaveErr);
//
//						// Get a list of Paths
//						agent.get('/paths')
//							.end(function(pathsGetErr, pathsGetRes) {
//								// Handle Path save error
//								if (pathsGetErr) done(pathsGetErr);
//
//								// Get Paths list
//								var paths = pathsGetRes.body;
//
//								// Set assertions
//								(paths[0].user._id).should.equal(userId);
//								(paths[0].name).should.match('Path Name');
//
//								// Call the assertion callback
//								done();
//							});
//					});
//			});
//	});
//
//	it('should not be able to save Path instance if not logged in', function(done) {
//		agent.post('/paths')
//			.send(path)
//			.expect(401)
//			.end(function(pathSaveErr, pathSaveRes) {
//				// Call the assertion callback
//				done(pathSaveErr);
//			});
//	});
//
//	it('should not be able to save Path instance if no name is provided', function(done) {
//		// Invalidate name field
//		path.name = '';
//
//		agent.post('/auth/signin')
//			.send(credentials)
//			.expect(200)
//			.end(function(signinErr, signinRes) {
//				// Handle signin error
//				if (signinErr) done(signinErr);
//
//				// Get the userId
//				var userId = user.id;
//
//				// Save a new Path
//				agent.post('/paths')
//					.send(path)
//					.expect(400)
//					.end(function(pathSaveErr, pathSaveRes) {
//						// Set message assertion
//						(pathSaveRes.body.message).should.match('Please fill Path name');
//
//						// Handle Path save error
//						done(pathSaveErr);
//					});
//			});
//	});
//
//	it('should be able to update Path instance if signed in', function(done) {
//		agent.post('/auth/signin')
//			.send(credentials)
//			.expect(200)
//			.end(function(signinErr, signinRes) {
//				// Handle signin error
//				if (signinErr) done(signinErr);
//
//				// Get the userId
//				var userId = user.id;
//
//				// Save a new Path
//				agent.post('/paths')
//					.send(path)
//					.expect(200)
//					.end(function(pathSaveErr, pathSaveRes) {
//						// Handle Path save error
//						if (pathSaveErr) done(pathSaveErr);
//
//						// Update Path name
//						path.name = 'WHY YOU GOTTA BE SO MEAN?';
//
//						// Update existing Path
//						agent.put('/paths/' + pathSaveRes.body._id)
//							.send(path)
//							.expect(200)
//							.end(function(pathUpdateErr, pathUpdateRes) {
//								// Handle Path update error
//								if (pathUpdateErr) done(pathUpdateErr);
//
//								// Set assertions
//								(pathUpdateRes.body._id).should.equal(pathSaveRes.body._id);
//								(pathUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');
//
//								// Call the assertion callback
//								done();
//							});
//					});
//			});
//	});
//
//	it('should be able to get a list of Paths if not signed in', function(done) {
//		// Create new Path model instance
//		var pathObj = new Path(path);
//
//		// Save the Path
//		pathObj.save(function() {
//			// Request Paths
//			request(app).get('/paths')
//				.end(function(req, res) {
//					// Set assertion
//					res.body.should.be.an.Array.with.lengthOf(1);
//
//					// Call the assertion callback
//					done();
//				});
//
//		});
//	});
//
//
//	it('should be able to get a single Path if not signed in', function(done) {
//		// Create new Path model instance
//		var pathObj = new Path(path);
//
//		// Save the Path
//		pathObj.save(function() {
//			request(app).get('/paths/' + pathObj._id)
//				.end(function(req, res) {
//					// Set assertion
//					res.body.should.be.an.Object.with.property('name', path.name);
//
//					// Call the assertion callback
//					done();
//				});
//		});
//	});
//
//	it('should be able to delete Path instance if signed in', function(done) {
//		agent.post('/auth/signin')
//			.send(credentials)
//			.expect(200)
//			.end(function(signinErr, signinRes) {
//				// Handle signin error
//				if (signinErr) done(signinErr);
//
//				// Get the userId
//				var userId = user.id;
//
//				// Save a new Path
//				agent.post('/paths')
//					.send(path)
//					.expect(200)
//					.end(function(pathSaveErr, pathSaveRes) {
//						// Handle Path save error
//						if (pathSaveErr) done(pathSaveErr);
//
//						// Delete existing Path
//						agent.delete('/paths/' + pathSaveRes.body._id)
//							.send(path)
//							.expect(200)
//							.end(function(pathDeleteErr, pathDeleteRes) {
//								// Handle Path error error
//								if (pathDeleteErr) done(pathDeleteErr);
//
//								// Set assertions
//								(pathDeleteRes.body._id).should.equal(pathSaveRes.body._id);
//
//								// Call the assertion callback
//								done();
//							});
//					});
//			});
//	});
//
//	it('should not be able to delete Path instance if not signed in', function(done) {
//		// Set Path user
//		path.user = user;
//
//		// Create new Path model instance
//		var pathObj = new Path(path);
//
//		// Save the Path
//		pathObj.save(function() {
//			// Try deleting Path
//			request(app).delete('/paths/' + pathObj._id)
//			.expect(401)
//			.end(function(pathDeleteErr, pathDeleteRes) {
//				// Set message assertion
//				(pathDeleteRes.body.message).should.match('User is not logged in');
//
//				// Handle Path error error
//				done(pathDeleteErr);
//			});
//
//		});
//	});
//
//	afterEach(function(done) {
//		User.remove().exec();
//		Path.remove().exec();
//		done();
//	});
//});
