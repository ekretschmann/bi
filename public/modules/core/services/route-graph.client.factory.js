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



            this.init = function (lines, stops) {
                this.lines = lines;
                this.stops = stops;
                var _self = this;

                var getStop = function (id, linename) {
                    var line = _.find(lines, function (line) {
                        return line.id === linename;
                    });



                    if (!line) {
                        return [];
                    }

                    return _.find(line.stops, function (stop) {
                        return stop === id;
                    });
                };

                var addLinesToStops = function(lines, stops) {

                    _.forEach(lines, function (line) {


                        _.forEach(line.stops, function (stopId) {
                            var stop = stops[stopId];
                            if (stop.lines) {
                                stop.lines.push(line.id);
                            } else {
                                stop.lines = [line.id];
                            }
                        });
                    });
                };

                var calculateEdges = function(lines, stops) {

                    _.forEach(lines, function (line) {

                        _self.nodes.push({id: line.id});

                        _.forEach(line.stops, function (arrivalStopId) {

                            var arrivalStop = stops[arrivalStopId];
                            //console.log(arrivalStop);
                            //if (!arrivalStop.processed) {
                                _.forEach(arrivalStop.lines, function (change) {
                                    if (change !== line.id) {
                                        _self.edges.push({
                                            from: line.id,
                                            to: change,
                                            stop: arrivalStop
                                        });
                                    }
                                });
                                //arrivalStop.processed = true;
                            //}
                        });
                    });
                };

                addLinesToStops(lines, stops);
                calculateEdges(lines, stops);


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
                var _self = this;

                var isBefore = function (stopa, stopb, line) {
                    //var founda = false;
                    //var foundb = false;



                    if (stopa.id === stopb.id ) {
                        return true;
                    }


                    var state = 'init';
                    var result = false;
                    _.forEach(line.stops, function (stop) {

                        if (stop === stopa.id && state === 'init') {
                            if (state === 'init') {
                                state = 'found a';
                            } else if (state === 'found b') {
                                state = 'found b before a';
                            }
                        }
                        if (stop === stopb.id) {
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

                if (path.length > 0) {
                    var foundLoop = false;

                    var usedLines = _.filter(_self.lines, function (line) {
                        var result = false;
                        _.forEach(path, function (option) {
                            if (option.stop.lines.indexOf(line.id) >-1) {
                                result = true;
                            }
                        });
                        return result;
                    });




                    _.forEach(path, function (pathStop) {



                        _.forEach(usedLines, function (line) {


                            //console.log(edge.stop.id, pathStop.stop.id, line.id, isBefore(edge.stop, pathStop.stop, line));
                            foundLoop = foundLoop || isBefore(edge.stop, pathStop.stop, line);

                        });
                    });

                    if (foundLoop) {
                        result = false;
                    }
                }

                //console.log(result);
                return result;
            };

            this.traverse = function (start, stop, path, paths) {

                console.log('traverse');
                console.log(start);
                console.log(stop);
                console.log(path);
                console.log(paths);

                var _self = this;
                var n = _self.getNode(start);
                _.forEach(_self.getEdges(n), function (edge) {

                    console.log('  trying edge');
                    console.log('  '+edge.from+' - '+edge.to+' - '+edge.stop.id);

                    if (_self.canChange(edge, path)) {

                        console.log('    can change');

                        path.push(edge);
                        if (edge.to === stop) {

                            console.log('   found ed stop, pushing');
                            paths.push(_.cloneDeep(path));

                        } else {
                            console.log('    not the end stop, recursion ....');
                            _self.traverse(edge.to, stop, path, paths);

                        }


                        path.pop();
                    } else {
                        console.log('    can NOT change');
                    }

                });
            };

        }

        return {
            createNew: function (lines, stops) {

                return new RouteGraphInstance().init(lines, stops);
            }
        };

    }
]);
