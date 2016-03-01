'use strict';


angular.module('core').service('DirectionsService', [
    'lodash', '$moment',
    function (_, moment) {

        this.getDirections = function (departure, arrival, time, lines) {


            var departStop = this.getClosestStop(departure.lat, departure.lng, lines);
            var arriveStop = this.getClosestStop(arrival.lat, arrival.lng, lines);


            //console.log(departStop);
            //console.log(arriveStop);

            var paths = this.getChangeStopsForAllLines(departStop, arriveStop, time, lines);

            //console.log(paths[0].length);
            //console.log(paths[0][0].departureStop.line);
            //console.log(paths[0][0].arrivalStop.line);

            var journeyTime = moment(time);




            var journeyPlan = [];
            var _self = this;
            _.forEach(paths, function (path) {


                var arrivalTime;
                var changes = [];

                _.forEach(path, function (change) {

                    //console.log(change);
                    var departureTime = _self.getNextDeparture(change.departureStop, journeyTime);
                    var currentTime = departureTime;
                    arrivalTime = _self.getArrival(change.departureStop, currentTime, change.arrivalStop);

                   // console.log(changeArrive);
            //        var hours = changeArrive.split(':')[0];
            //        var minutes = changeArrive.split(':')[1];
            //        now.hours(hours).minutes(minutes);
            //
            //
            //
            //        var changeDeparture = _self.getNextDeparture(change.departureStop, now);
            //
                    changes.push({
                        stop: change.departureStop.name,
                        //arrival: changeArrive,
                        departureTime: departureTime
                    });

                    changes.push({
                        stop: change.arrivalStop.name,
                        //arrival: changeArrive,
                        arrivalTime: arrivalTime
                    });
            //        //currentTime = changeDeparture;
            //        //currentStop = change.departureStop;
                });

                //var arrivalTime = _self.getArrival(currentStop, currentTime, arriveStop);

                //console.log('departure ',departureTime);
                //console.log('arrival ',arrivalTime);
                //console.log('changes ',changes);


                journeyPlan.push(changes);

                //journeyPlan.push({
                //    departure: {
                //        stop: changes[0].stop,
                //        time: changes[0].departureTime
                //    },
                //    changes: [{}],
                //    arrival: {
                //        stop: changes[3].stop,
                //        time: changes[3].arrivalTime
                //    }
                //});
            //
            //    console.log('bbbbb');
            //
            });
            //
            //return _.sortBy(journeyPlan, function(j) { return j.arrival.time; });


            return journeyPlan;

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
            _.forEach(graph.getEdges(n), function (edge) {

                if (!graph.getNode(edge.to).visited) {
                    if (edge.to === stop) {
                        path.push({ departureStop: edge.departureStop, arrivalStop: edge.arrivalStop});

                        //result.push(path);
                    } else {
                        //  console.log('xxx');
                    }
                }
            });
        };

        this.getChangeStopsForAllLines = function (departStop, arriveStop, time, lines) {



            var getStop = function(departStop, departLine) {

                var line = _.find(lines, function(l){
                    return l.name === departLine;
                });

                //console.log(lineStops);

                return _.find(line.stops, function(stop) {
                    return stop.id === departStop.id;
                });

            };


            var _self = this;
            var graph = _self.getLineGraph(lines);

            var changes = [];
            _.forEach(departStop.lines, function(departLine) {
                _.forEach(arriveStop.lines, function(arriveLine) {


                    var departLineStop = getStop(departStop, departLine);
                    var arriveLineStop = getStop(arriveStop, arriveLine);

//                    console.log(departLine, arriveLine);

                    if (departLine === arriveLine) {
                        changes.push([{ departureStop: departLineStop, arrivalStop: arriveLineStop}]);
                    } else {
                        var path = [];
                        //changes.push([{arrivalStop: arriveLineStop, departureStop: departLineStop}]);
                        _self.traverse(departLine, arriveLine, graph, path);

                        var change = [];

                        change.push({ departureStop: departLineStop, arrivalStop: path[0].arrivalStop});

                        change.push({ departureStop: path[0].departureStop, arrivalStop: arriveLineStop});

                        changes.push(change);
                        //console.log('l1',path);
                        //console.log(path[0].arrivalStop);
                        //console.log(path[0].departureStop);

                        //console.log(changes[0][0].arrivalStop);
                        //console.log(changes[1]);
                    }
                    //console.log(path);
                });
            });
            //console.log('l2',changes.length);
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
