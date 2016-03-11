'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Busline = mongoose.model('Busline'),
    _ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
    var busline = new Busline(req.body);
    busline.user = req.user;

    busline.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(busline);
        }
    });
};

/**
 * Show the current busline
 */
exports.read = function(req, res) {
    res.json(req.busline);
};

/**
 * Update a busline
 */
exports.update = function(req, res) {
    var busline = req.busline;

    busline = _.extend(busline, req.body);

    busline.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(busline);
        }
    });
};

/**
 * Delete an busline
 */
exports.delete = function(req, res) {
    var busline = req.busline;

    busline.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(busline);
        }
    });
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
    Busline.find().sort('-created').populate('user', 'displayName').exec(function(err, buslines) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(buslines);
        }
    });
};

/**
 * Article middleware
 */
exports.buslineByID = function(req, res, next, id) {
    Busline.findById(id).populate('user', 'displayName').exec(function(err, busline) {
        if (err) return next(err);
        if (!busline) return next(new Error('Failed to load busline ' + id));
        req.busline = busline;
        next();
    });
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.busline.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
