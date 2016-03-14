'use strict';


angular.module('core').service('DirectionsService', [
    'lodash', '$moment', 'RouteGraph',
    function (_, moment, RouteGraph) {


        this.getDirectionsBetweenStops = function(departureStop, arrivalStop, time, lines) {
            var paths = this.getChangeStopsForAllLines(departureStop, arrivalStop, time, lines);


            var journeyTime = moment(time);


            var journeyPlan = {};
            journeyPlan.options = [];
            var _self = this;
            _.forEach(paths, function (path) {



                var arrivalTime;
                var itinerary = {};
                itinerary.changes = [];

                _.forEach(path, function (change) {


                    var departureTime = _self.getNextDeparture(change.departureStop, journeyTime);
                    var currentTime = departureTime;
                    arrivalTime = _self.getArrival(change.departureStop, currentTime, change.arrivalStop);
                    itinerary.changes.push({
                        stopId: change.departureStop.id,
                        stopName: change.departureStop.name,
                        departureTime: departureTime,
                        line: change.departureStop.line
                    });

                    itinerary.changes.push({
                        stopId: change.arrivalStop.id,
                        stopName: change.arrivalStop.name,
                        arrivalTime: arrivalTime,
                        line: change.arrivalStop.line
                    });
                });


                itinerary.departureTime = itinerary.changes[0].departureTime;
                itinerary.departureStopId = itinerary.changes[0].stopId;
                itinerary.departureStopName = itinerary.changes[0].stopName;
                itinerary.departureLine = itinerary.changes[0].line;


                var lastIndex = itinerary.changes.length - 1;
                itinerary.arrivalTime = itinerary.changes[lastIndex].arrivalTime;
                itinerary.arrivalStopName = itinerary.changes[lastIndex].stopName;
                itinerary.arrivalStopId = itinerary.changes[lastIndex].stopId;
                itinerary.arrivalLine = itinerary.changes[lastIndex].line;
                journeyPlan.options.push(itinerary);

            });


            journeyPlan.options = _.sortBy(journeyPlan.options, function (c) {

                return c.arrivalTime;
            });

            return journeyPlan;

        };

        this.getDirections = function (departure, arrival, time, lines) {


            var departStop = this.getClosestStop(departure.lat, departure.lng, lines);
            var arriveStop = this.getClosestStop(arrival.lat, arrival.lng, lines);
            return this.getDirectionsBetweenStops(departStop, arriveStop, time, lines);

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


        this.getChangeStopsForAllLines = function (departStop, arriveStop, time, lines) {

            var getStop = function (departStop, departLine) {

                var line = _.find(lines, function (l) {
                    return l.id === departLine;
                });


                return _.find(line.stops, function (stop) {
                    return stop.id === departStop.id;
                });

            };


            var _self = this;

            var routeGraph = RouteGraph.createNew(lines);


            var changes = [];

            _.forEach(departStop.lines, function (departLine) {


                _.forEach(arriveStop.lines, function (arriveLine) {
                    var departLineStop = getStop(departStop, departLine);
                    var arriveLineStop = getStop(arriveStop, arriveLine);

                    //console.log('xxxxx');
                    //console.log(departLineStop);
                    //console.log(arriveLineStop);

                    if (departLine === arriveLine) {

                        changes.push([{departureStop: departLineStop, arrivalStop: arriveLineStop}]);
                    } else {

                        var path = [];


                        path = routeGraph.calculatePaths(departLine, arriveLine)[0];



                        if (path && path.length > 0) {
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
        };


    }
]);
