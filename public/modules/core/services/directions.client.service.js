'use strict';


angular.module('core').service('DirectionsService', [
    'lodash', '$moment',
    function (_, moment) {

        this.getDirections = function (departure, destination, time, lines) {



            var departStop = this.getClosestStop(departure.lat, departure.lng, lines);
            var arriveStop = this.getClosestStop(destination.lat, destination.lng, lines);



            var journeyStops = this.getChangeStops(departStop, arriveStop, time, lines);
            departStop = journeyStops[0];
            arriveStop = journeyStops[2];




           // var departureIndex = this.getNextDeparture(departStop, earliestTravel);


            var journey = {
                departure: {
                    stop: {
                        name: departStop.name
                    },
                    time: departStop.departures[0]
                },
                changes: [

                ],
                destination: {
                    stop: {
                        name: arriveStop.name
                    },
                    time: arriveStop.arrivals[0]
                }
            };


            return journey;
        };

        this.getChangeStops = function(departStop, arriveStop, time, lines) {

            var earliestTravel = moment(time);
            var departureTime = this.getNextDeparture(departStop, earliestTravel);

            var getLine = function(lineName) {
                return _.find(lines, function(line) {
                    return line.name === lineName;
                })
            };

            var findLine = function(departStop, arriveStop, lines, changes) {
                //console.log(departLine.line);
                if (departStop.line === arriveStop.line) {
                    return changes;
                }
                var line = getLine(departStop.line);
                console.log(line);
                var foundDepartureStop = false;
                for (var i=0; i<line.stops.length; i++) {
                    var stop = line.stops[i];
                    console.log(stop);
                    if (foundDepartureStop) {
                        console.log(stop.lines);
                    } else {
                        if (stop.id = departStop.id) {
                            foundDepartureStop = true;
                        }
                    }

                }

                return [[]]
            };

            findLine(departStop, arriveStop, lines, [[]]);

            //console.log(departureTime);



            //if (departStop.line === arriveStop.line) {
            //    return [departStop, [], arriveStop];
            //}
            //
            //
            //
            //return [departStop, ['s2'], arriveStop];
        };


        this.getNextDeparture = function(departStop, earliestTravel) {

            var departureTime = '';
            var minDifference = Number.MAX_VALUE;

            var today = moment(earliestTravel).hours(0).minutes(0).seconds(0);
            _.forEach(departStop.departures, function(departure) {

                var hours = departure.split(':')[0];
                var minutes = departure.split(':')[1];
                var departureMoment  = today.clone();
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


            var minDistance =  Number.MAX_VALUE;
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
