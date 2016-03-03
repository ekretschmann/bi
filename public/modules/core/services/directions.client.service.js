'use strict';


angular.module('core').service('DirectionsService', [
    'lodash', '$moment', 'RouteGraph',
    function (_, moment, RouteGraph) {

        this.getDirections = function (departure, arrival, time, lines) {


            var departStop = this.getClosestStop(departure.lat, departure.lng, lines);
            var arriveStop = this.getClosestStop(arrival.lat, arrival.lng, lines);
            var paths = this.getChangeStopsForAllLines(departStop, arriveStop, time, lines);

            var journeyTime = moment(time);


            var journeyPlan = [];
            var _self = this;
            _.forEach(paths, function (path) {


                var arrivalTime;
                var changes = [];

                _.forEach(path, function (change) {


                    var departureTime = _self.getNextDeparture(change.departureStop, journeyTime);
                    var currentTime = departureTime;
                    arrivalTime = _self.getArrival(change.departureStop, currentTime, change.arrivalStop);
                    changes.push({
                        stop: change.departureStop.name,
                        departureTime: departureTime,
                        line: change.departureStop.line
                    });

                    changes.push({
                        stop: change.arrivalStop.name,
                        arrivalTime: arrivalTime,
                        line: change.arrivalStop.line
                    });
                });


                changes.departureTime = changes[0].departureTime;
                changes.departureStop = changes[0].stop;
                changes.departureLine = changes[0].line;


                var lastIndex = changes.length - 1;
                changes.arrivalTime = changes[lastIndex].arrivalTime;
                changes.arrivalStop = changes[lastIndex].stop;
                changes.arrivalLine = changes[lastIndex].line;
                journeyPlan.push(changes);

            });


            return _.sortBy(journeyPlan, function (c) {

                return c[c.length - 1].arrivalTime;
            });


        };

        this.getNextDeparture = function (departStop, earliestTravel) {

            var departureTime = '';
            var minDifference = Number.MAX_VALUE;


            _.forEach(departStop.departures, function (departure) {

                var hours = departure.split(':')[0];
                var minutes = departure.split(':')[1];
                var departureMoment = earliestTravel.clone();
                departureMoment.hours(hours).minutes(minutes);
                var diff = departureMoment.diff(earliestTravel);
                if (diff > 0 && diff < minDifference) {
                    minDifference = diff;
                    departureTime = departure;
                }
            });
            return departureTime;

        };


        this.getArrival = function (departStop, time, arriveStop) {

            //var line = _.find(lines, function(line) {
            //    return route[0] === line.name;
            //});


            for (var i = 0; i < departStop.departures.length; i++) {
                if (departStop.departures[i] === time) {
                    return arriveStop.arrivals[i];
                }
            }


        };

        this.getLineGraph = function (lines) {
            var graph = {
                nodes: [],
                edges: [],
                getNode: function (name) {
                    return _.find(this.nodes, function (n) {
                        return n.name === name;
                    })
                },
                getEdges: function (n) {
                    return _.filter(this.edges, function (e) {
                        return e.from === n.name;
                    });
                }
            };

            var getStop = function (id, linename) {
                var line = _.find(lines, function (line) {
                    return line.name === linename;
                });


                return _.find(line.stops, function (stop) {
                    return stop.id === id;
                })
            };

            _.forEach(lines, function (line) {
                graph.nodes.push({name: line.name, visited: false});
                _.forEach(line.stops, function (arrivalStop) {
                    _.forEach(arrivalStop.lines, function (change) {
                        if (change !== line.name) {

                            var departureStop = getStop(arrivalStop.id, change);
                            graph.edges.push({
                                from: line.name,
                                to: change,
                                arrivalStop: arrivalStop,
                                departureStop: departureStop
                            });
                        }
                    });
                });
            });
            return graph;
        };

        this.traverse = function (start, stop, graph, path) {
            var n = graph.getNode(start);
            n.visited = true;
            var _self = this;
            _.forEach(graph.getEdges(n), function (edge) {

                if (!graph.getNode(edge.to).visited) {
                    console.log(stop, edge.to);
                    if (edge.to === stop) {

                        path.push({departureStop: edge.departureStop, arrivalStop: edge.arrivalStop});

                    } else {
                        console.log('x');
                        _self.traverse(edge.to, stop, graph, path);
                    }
                }
            });
        };

        this.getChangeStopsForAllLines = function (departStop, arriveStop, time, lines) {


            var getStop = function (departStop, departLine) {

                var line = _.find(lines, function (l) {
                    return l.name === departLine;
                });


                return _.find(line.stops, function (stop) {
                    return stop.id === departStop.id;
                });

            };


            var _self = this;

            var routeGraph = RouteGraph.createNew(lines);

            //console.log('aaaaa');
            //var graph = _self.getLineGraph(lines);

            var changes = [];
            _.forEach(departStop.lines, function (departLine) {


                _.forEach(arriveStop.lines, function (arriveLine) {
                    var departLineStop = getStop(departStop, departLine);
                    var arriveLineStop = getStop(arriveStop, arriveLine);


                    if (departLine === arriveLine) {

                        changes.push([{departureStop: departLineStop, arrivalStop: arriveLineStop}]);
                    } else {

                        var path = [];


                        routeGraph.traverse(departLine, arriveLine, path);


                        if (path.length > 0) {
                            if (path[0].departureStop.id !== departLineStop.id) {



                                var change = [];
                                change.push({departureStop: departLineStop, arrivalStop: path[0].arrivalStop});
                                //for (var i=1; i<path.length; i++) {
                                //    change.push({departureStop: path[i].departureStop, arrivalStop: path[i].arrivalStop});
                                //}
                                change.push({departureStop: path[0].departureStop, arrivalStop: arriveLineStop});
                                changes.push(change);
                            }
                        }
                    }
                });
            });


            return changes;

        };

        this.getChangeStops = function (departStop, arriveStop, time, lines) {

        };


        this.getClosestStop = function (lat, lng, lines) {


            var minDistance = Number.MAX_VALUE;
            var result;

            _.forEach(lines, function (line) {
                _.forEach(line.stops, function (stop) {
                    var distance = Math.sqrt(
                        (lat - stop.lat) * (lat - stop.lat) +
                        (lng - stop.lng) * (lng - stop.lng)
                    );

                    if (distance < minDistance) {
                        minDistance = distance;
                        result = stop;
                    }
                });
            });

            return result;
        }


    }
]);
