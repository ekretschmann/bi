'use strict';


angular.module('core').service('DirectionsService', [
    'lodash', '$moment',
    function (_, moment) {

        this.getDirections = function (departure, destination, time, lines) {


            var departStop = this.getClosestStop(departure.lat, departure.lng, lines);
            var arriveStop = this.getClosestStop(destination.lat, destination.lng, lines);



            var paths = this.getChangeStops(departStop, arriveStop, time, lines);

            //departStop = journeyStops[0];
            //var changes = journeyStops[1];
            //arriveStop = journeyStops[2];



            var departureTime = this.getNextDeparture(departStop, time);

            var currentStop = departStop;
            var currentTime = departureTime;
            var _self = this;
            var changes = [];
            _.forEach(paths, function(path) {
                _.forEach(path, function (change) {

                    //console.log(currentStop);
                    //console.log(currentTime);
                    //console.log(change);
                    var changeArrive = _self.getArrival(currentStop, currentTime, change);
                    var changeDeparture = _self.getNextDeparture(change, changeArrive);
                    changes.push({
                        stop: change.name,
                        arrrival: changeArrive,
                        deparutre: changeDeparture
                    });
                    currentTime = changeDeparture;
                    //console.log(changeArrive);
                });
            });

            var arrivalTime = this.getArrival(departStop, currentTime, arriveStop);

            var journey = {
                departure: {
                    stop: {
                        name: departStop.name
                    },
                    departure: departureTime
                },
                changes: changes,
                destination: {
                    stop: {
                        name: arriveStop.name
                    },
                    arrival: arrivalTime
                }
            };


            return journey;
        };

        this.getArrival = function(departStop, time, arriveStop) {

            //var line = _.find(lines, function(line) {
            //    return route[0] === line.name;
            //});

           // console.log(time);


            for(var i=0; i<departStop.departures.length; i++) {
                if(departStop.departures[i] == time) {
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
                    return _.filter(this.edges, function(e) {
                        return e.from === n.name;
                    });
                }
            };
            _.forEach(lines, function (line) {
                graph.nodes.push({name: line.name, visited: false});
                _.forEach(line.stops, function (stop) {
                    _.forEach(stop.lines, function (change) {
                        if (change !== line.name) {

                            graph.edges.push({from: line.name, to: change, stop: stop});
                        }
                    });
                });
            });
            return graph;
        };

        this.traverse = function (start, stop, graph, path, result) {
            var n = graph.getNode(start);
            n.visited = true;
            _.forEach(graph.getEdges(n), function(edge) {

                if (!graph.getNode(edge.to).visited) {
                    if (edge.to === stop) {
                        path.push(edge.stop);
                        result.push(path);
                       // console.log(path);
                    } else {
                      //  console.log('xxx');
                    }
                }
            });
        };

        this.getChangeStops = function (departStop, arriveStop, time, lines) {


            //console.log(departStop.line);
            //console.log(arriveStop.line);

            if (departStop.line === arriveStop.line) {
                return [];
            } else {

                var graph = this.getLineGraph(lines);
                var path = [];
                var changes = [];
                this.traverse(departStop.line, arriveStop.line, graph, path, changes);
                return changes;
                //return [departStop, result, arriveStop];
            }
            //var earliestTravel = moment(time);
            //var departureTime = this.getNextDeparture(departStop, earliestTravel);
            //
            //var getLine = function(lineName) {
            //    return _.find(lines, function(line) {
            //        return line.name === lineName;
            //    })
            //};
            //
            //var findLine = function(departStop, arriveStop, lines, changes) {
            //    //console.log(departLine.line);
            //    if (departStop.line === arriveStop.line) {
            //        return changes;
            //    }
            //    var line = getLine(departStop.line);
            //    console.log(line);
            //    var foundDepartureStop = false;
            //    for (var i=0; i<line.stops.length; i++) {
            //        var stop = line.stops[i];
            //        console.log(stop);
            //        if (foundDepartureStop) {
            //            console.log(stop.lines);
            //        } else {
            //            if (stop.id = departStop.id) {
            //                foundDepartureStop = true;
            //            }
            //        }
            //
            //    }
            //
            //    return [[]]
            //};
            //
            //findLine(departStop, arriveStop, lines, [[]]);

            //console.log(departureTime);


            //if (departStop.line === arriveStop.line) {
            //    return [departStop, [], arriveStop];
            //}
            //
            //
            //
            //return [departStop, ['s2'], arriveStop];
        };


        this.getNextDeparture = function (departStop, earliestTravel) {

            var departureTime = '';
            var minDifference = Number.MAX_VALUE;

            var today = moment(earliestTravel).hours(0).minutes(0).seconds(0);
            _.forEach(departStop.departures, function (departure) {

                var hours = departure.split(':')[0];
                var minutes = departure.split(':')[1];
                var departureMoment = today.clone();
                departureMoment.hours(hours).minutes(minutes);
                var diff = departureMoment.diff(earliestTravel);
                if (diff > 0 && diff < minDifference) {
                    minDifference = diff;
                    departureTime = departure;
                }
            });
            return departureTime;

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
