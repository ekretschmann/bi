'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var BuslineSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    labels: [{
        type: String,
        default: []
    }],
    name: {
        type: String,
        default: '',
        trim: true
    },
    stops: [{
        type: String,
        default: []
    }],
    runtimes: [{
        type: String,
        default: []
    }],
    times: [{
        type: Number,
        default: []
    }]
});

mongoose.model('Busline', BuslineSchema);
