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

                var addLinesToStops = function (lines, stops) {
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

                var getLine = function (lineId, lines) {
                    return _.find(lines, function (line) {
                        return line.id === lineId;
                    });
                };

                var calculateEdges = function (lines, stops) {

                    _.forEach(lines, function (line) {

                        _self.nodes.push({id: line.id});

                        _.forEach(line.stops, function (arrivalStopId) {

                            var arrivalStop = stops[arrivalStopId];
                            _.forEach(arrivalStop.lines, function (change) {

                                if (change !== line.id &&
                                    getLine(change, lines).name !== getLine(line.id, lines).name) {
                                    _self.edges.push({
                                        from: line.id,
                                        to: change,
                                        stop: arrivalStop
                                    });
                                }
                            });
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


            this.canChange = function (edge, path) {
                var result = true;
                var _self = this;

                var isBefore = function (stopa, stopb, lineId) {

                    var line = _.find(_self.lines, function (l) {
                        return l.id === lineId;
                    });

                    if (stopa.id === stopb.id) {
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

                //console.log('can change from '+edge.from+' to '+edge.to+' at '+edge.stop.id);


                if (path.length > 0) {

                    //console.log('  previous changes:');
                    _.forEach(path, function (leg) {

                        //console.log('  '+leg.from+' to '+leg.to+' at '+leg.stop.id);



                        if (leg.stop.id === edge.stop.id) {
                            //console.log('  used stop before: '+edge.stop.id+' is '+leg.stop.id);
                            result = false;
                        }


                        //console.log(leg);
                        //console.log(leg.from, edge.to, edge.stop.id, leg.stop.id);
                        //console.log(isBefore(edge.stop, leg.stop, leg.from));
                        if (leg.from === edge.to) {
                            //console.log('  used line '+edge.to+' before');
                            result = false;
                        }

                        //if (!isBefore(edge.stop, leg.stop, leg.to))
                    });


                    var lastLeg = path[path.length-1];
                    if (lastLeg.stop.id === edge.stop.id) {
                        //console.log('  '+edge.stop.id+' is '+lastLeg.stop.id);
                        result = false;
                    } else {

                        if (isBefore(edge.stop, lastLeg.stop, lastLeg.to)) {
                            //console.log('  ' + edge.stop.id + ' is after ' + lastLeg.stop.id + ' at line ' + lastLeg.to + ': ' + isBefore(edge.stop, lastLeg.stop, lastLeg.to));
                            result = false;
                        }
                    }


                    //result = result ||

                    //result = false;
                }

                //console.log(result);
                //if (path.length > 0) {
                //    var foundLoop = false;
                //
                //    var usedLines = [];
                //    _.forEach(path, function (option) {
                //        usedLines.push(option.from);
                //        usedLines.push(option.to);
                //    });
                //
                //    _.forEach(path, function (pathStop) {
                //
                //        _.forEach(usedLines, function (line) {
                //
                //            foundLoop = foundLoop || isBefore(edge.stop, pathStop.stop, line);
                //
                //        });
                //    });
                //
                //    if (foundLoop) {
                //        result = false;
                //    }
                //
                //}

                return result;
            };

            this.traverse = function (start, stop, path, paths) {

                var _self = this;
                var n = _self.getNode(start);
                _.forEach(_self.getEdges(n), function (edge) {

                    if (_self.canChange(edge, path, start)) {


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
            createNew: function (lines, stops) {

                return new RouteGraphInstance().init(lines, stops);
            }
        };

    }
]);
