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


            var now = moment(time);




            var _self = this;

            var journeyPlan = [];
            var _self = this;
            _.forEach(paths, function (path) {

                var changes = [];
                var currentStop = path[0].departureStop;
                console.log( path[0].departureStop);
                console.log( path[0].arrivalStop);

                var departureTime = _self.getNextDeparture(currentStop, now);
                var currentTime = departureTime;



             //   console.log(currentTime);

                //console.log(path.length);

                _.forEach(path, function (change) {

                    var changeArrive = _self.getArrival(currentStop, currentTime, change.arrivalStop);
                    var hours = changeArrive.split(':')[0];
                    var minutes = changeArrive.split(':')[1];
                    now.hours(hours).minutes(minutes);


                    var changeDeparture = _self.getNextDeparture(change.departureStop, now);
                    changes.push({
                        stop: change.arrivalStop.name,
                        arrival: changeArrive,
                        departure: changeDeparture
                    });
                    currentTime = changeDeparture;
                    currentStop = change.departureStop;
                });
                var arrivalTime = _self.getArrival(currentStop, currentTime, arriveStop);

                console.log('departure ',departureTime);
                console.log('arrival ',arrivalTime);
                console.log('changes ',changes);

                journeyPlan.push({
                    departure: {
                        stop: departStop.name,
                        time: departureTime
                    },
                    changes: changes,
                    destination: {
                        stop: arriveStop.name,
                        time: arrivalTime
                    }
                });

            });

            return _.sortBy(journeyPlan, function(j) { return j.destination.time; });


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

        this.traverse = function (start, stop, graph, path, result) {
            var n = graph.getNode(start);
            n.visited = true;
            _.forEach(graph.getEdges(n), function (edge) {

                if (!graph.getNode(edge.to).visited) {
                    if (edge.to === stop) {
                        path.push({arrivalStop: edge.arrivalStop, departureStop: edge.departureStop});

                        result.push(path);
                    } else {
                        //  console.log('xxx');
                    }
                }
            });
        };

        this.getChangeStops = function (departStop, arriveStop, time, lines) {


            //if (departStop.line === arriveStop.line) {
            //    return [];
            //} else {

            //console.log(departStop);
            //console.log(arriveStop);


            var _self = this;
            var graph = _self.getLineGraph(lines);

            var changes = [];
            _.forEach(departStop.lines, function(departLine) {
                _.forEach(arriveStop.lines, function(arriveLine) {



                    //console.log('traverse ',departLine, arriveLine);
                    if (departLine !== arriveLine) {
                        var path = [];
                        _self.traverse(departLine, arriveLine, graph, path, changes);
                    }
                    //console.log(path);
                });
            });
            return changes;

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
