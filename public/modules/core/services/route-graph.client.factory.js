'use strict';


angular.module('core').factory('RouteGraph', [
    'lodash', '$moment',
    function (_, moment) {


        function RouteGraphInstance() {


            this.nodes = [];
            this.edges = [];

            this.getNode = function (id) {
                return _.find(this.nodes, function (n) {
                    return n.id === id;
                });
            };

            this.getEdges = function (n) {
                return _.filter(this.edges, function (e) {

                    return e.from === n.id;
                });
            };



            this.init = function (lines) {
                this.lines = lines;
                var _self = this;

                var getStop = function (id, linename) {
                    var line = _.find(lines, function (line) {
                        return line.id === linename;
                    });

                    if (!line) {
                        return [];
                    }

                    return _.find(line.stops, function (stop) {
                        return stop.id === id;
                    });
                };

                var addLinesToStops = function() {
                    var stops = {};
                    _.forEach(lines, function (line) {
                        _.forEach(line.stops, function (stop) {
                            if (stops[stop.id]) {
                                stops[stop.id].push(line.id);
                            } else {
                                stops[stop.id] = [line.id];
                            }
                        });
                    });

                    _.forEach(lines, function (line) {
                        _.forEach(line.stops, function (stop) {
                            stop.lines = stops[stop.id];
                        });
                    });
                };

                var calculateEdges = function() {

                    _.forEach(lines, function (line) {

                        _self.nodes.push({id: line.id});
                        _.forEach(line.stops, function (arrivalStop) {

                            _.forEach(arrivalStop.lines, function (change) {

                                if (change !== line.id) {
                                    var departureStop = getStop(arrivalStop.id, change);
                                    _self.edges.push({
                                        from: line.id,
                                        to: change,
                                        arrivalStop: arrivalStop,
                                        departureStop: departureStop
                                    });
                                }
                            });
                        });
                    });
                };

                addLinesToStops();
                calculateEdges();


                return this;
            };

            this.calculatePaths = function (start, stop) {
                var path = [];
                var paths = [];

                this.traverse(start, stop, path, paths);

                return paths;
            };

            this.printPath = function (path) {

                _.forEach(path, function (leg) {
                    console.log(leg.arrivalStop.id + leg.arrivalStop.line + ' - ' + leg.departureStop.id + leg.departureStop.line);
                });

            };

            this.canChange = function (edge, path) {
                var result = true;
                //var backToLine;

                var _self = this;

                _.forEach(path, function (stop) {
                    if (stop.arrivalStop.id === edge.arrivalStop.id || stop.departureStop.id === edge.arrivalStop.id) {
                        result = false;
                    }
                });

                var isBefore = function (stopa, stopb, line) {
                    //var founda = false;
                    //var foundb = false;
                    var state = 'init';
                    var result = false;
                    _.forEach(line.stops, function (stop) {
                        if (stop.id === stopa.id && state === 'init') {
                            if (state === 'init') {
                                state = 'found a';
                            } else if (state === 'found b') {
                                state = 'found b before a';
                            }
                        }
                        if (stop.id === stopb.id) {
                            if (state === 'init') {
                                state = 'found b';
                            } else if (state === 'found a') {
                                state = 'found a before b';
                            }
                        }

                        if (state === 'found a before b') {
                            result = true;
                        }
                    });
                    return result;
                };

                if (result && path.length > 0) {
                    var foundLoop = false;

                    var usedLines = _.filter(_self.lines, function (line) {
                        var result = false;
                        _.forEach(path, function (stop) {
                            if (stop.departureStop.line === line.id) {
                                result = true;
                            }
                        });
                        return result;
                    });

                    _.forEach(path, function (pathStop) {



                        _.forEach(usedLines, function (line) {


                            foundLoop = foundLoop || isBefore(edge.departureStop, pathStop.departureStop, line);
                        });
                    });

                    if (foundLoop) {
                        result = false;
                    }
                }


                return result;
            };

            this.traverse = function (start, stop, path, paths) {
                var _self = this;
                var n = _self.getNode(start);
                _.forEach(_self.getEdges(n), function (edge) {


                    if (_self.canChange(edge, path)) {
                        path.push(edge);


                        if (edge.to === stop) {

                            paths.push(_.cloneDeep(path));

                        } else {
                            _self.traverse(edge.to, stop, path, paths);

                        }


                        path.pop();
                    }

                });
            };

        }

        return {
            createNew: function (lines) {

                return new RouteGraphInstance().init(lines);
            }
        };

    }
]);
