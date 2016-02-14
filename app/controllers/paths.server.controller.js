'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Path = mongoose.model('Path'),
    _ = require('lodash'),
    http = require('http'),
    https = require('https');


exports.busroute = function (req, res) {

    console.log('xxx');



    console.log(req.params.routeId);

    Path.find({type: 'busline', name:req.params.routeId}).exec(function (err, path) {

        if (path && path.length > 0) {
            res.jsonp(path[0]);
        } else {
            var routeIds = {
                '1': '32106',
                '2': '32919',
                '4': '32110',
                '5': '32451',
                '6': '37288',
                '7': '37292',
                '8': '32677',
                '13': '32507',
                '14': '65128',
                '150': '32070',
                '70': '56124',
                'F70': '56124',
                '60': '32054',
                'X60': '32054'
            };

            if (routeIds[req.params.routeId]) {
                var options = {
                    host: 'www.arrivabus.co.uk',
                    path: '/TimetableData/?route=true&id=' + routeIds[req.params.routeId] + '&date=151011'
                };

                //res.jsonp(line5);

                var httpReq = https.get(options, function (response) {
                    console.log('STATUS: ' + response.statusCode);
                    //console.log('HEADERS: ' + JSON.stringify(response.headers));

                    // Buffer the body entirely for processing as a whole.
                    var bodyChunks = [];
                    response.on('data', function (chunk) {
                        // You can process streamed parts here...
                        bodyChunks.push(chunk);
                    }).on('end', function () {
                        var body = JSON.parse(Buffer.concat(bodyChunks));
                        //console.log('BODY: ' + body.toString());
                        // ...and/or process the entire body here.


                        console.log(Object.keys(body.r).length);

                        // var segments = body.r[Object.keys(body.r)[0]];

                        var route = [];
                        for (var j = 0; j < Object.keys(body.r).length; j++) {
                            route.push([]);
                            var segments = body.r[Object.keys(body.r)[j]];
                            for (var i = 0; i < segments.length; i++) {
                                route[j].push({
                                    lat: segments[i][0],
                                    lng: segments[i][1]
                                });
                            }
                        }

                        var path = new Path({
                            type: 'busline',
                            name: req.params.routeId,
                            path: route
                        });

                        //res.jsonp(path);


                        path.save(function (err, newPath) {
                            if (err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                res.jsonp(newPath);
                            }
                        });

                        //res.jsonp(body);
                    });
                });

                httpReq.on('error', function (e) {
                    console.log('ERROR: ' + e.message);
                });
            }
        }

        //if (err) return next(err);
        //if (!path) return next(new Error('Failed to load Path ' + id));
        //req.path = path;
        //next();
    });



};

/**
 * Create a Path
 */
exports.create = function (req, res) {
    var path = new Path(req.body);

    path.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(path);
        }
    });
};

/**
 * Show the current Path
 */
exports.read = function (req, res) {
    res.jsonp(req.path);
};

/**
 * Update a Path
 */
exports.update = function (req, res) {
    var path = req.path;

    path = _.extend(path, req.body);

    path.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(path);
        }
    });
};

/**
 * Delete an Path
 */
exports.delete = function (req, res) {

    console.log('xxx');

    Path.findById(req.params.pathId).exec(function (err, path) {
        console.log(path);
        path.remove(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(path);
            }
        });

    });
};

/**
 * List of Paths
 */
exports.list = function (req, res) {
    Path.find().sort('-created').exec(function (err, paths) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(paths);
        }
    });
};

/**
 * Path middleware
 */
exports.pathByID = function (req, res, next, id) {
    Path.findById(id).exec(function (err, path) {
        if (err) return next(err);
        if (!path) return next(new Error('Failed to load Path ' + id));
        req.path = path;
        next();
    });
};

/**
 * Path authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.path.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};
