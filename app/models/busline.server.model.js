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
    id: {
        type: String,
        trim: true,
        required: 'Bus line need an unique identifier'
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    stops: [{

        id: {
            type: String,
            trim: true,
            required: 'Bus line need an unique identifier'
        },
        name: {
            type: String,
            default: '',
            trim: true
        },
        line: {
            type: String,
            trim: true,
            required: 'Bus line need an unique identifier'
        },
        arrivals: [{
            type: String,
            trim: true
        }],
        departures: [{
            type: String,
            trim: true
        }],
        lat: {
            type: Number,
            required: 'Bus stop needs a latitude'
        },
        lng: {
            type: Number,
            required: 'Bus stop needs a longitude'
        }


    }]
});

mongoose.model('Busline', BuslineSchema);
