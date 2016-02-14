'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Path Schema
 */
var PathSchema = new Schema({

	type: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	path: {
		type: [{
			lat: Number,
			lng: Number
		}],

		//type: String,
		default: []
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Path', PathSchema);
