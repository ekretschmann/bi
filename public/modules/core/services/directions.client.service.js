'use strict';


angular.module('core').service('DirectionsService', [
    'lodash', '$moment',
    function (_, moment) {

        this.getDirections = function (departure, destination, time, lines) {


            var earliestTravel = moment(time);
            var departStop = this.getClosestStop(departure.lat, departure.lng, lines);
            var arriveStop = this.getClosestStop(destination.lat, destination.lng, lines);

            console.log(departStop.line);
            console.log(arriveStop.line);


            var departureIndex = this.getNextDeparture(departStop, earliestTravel);

            var journeyStops = this.getChangeStops(departStop, arriveStop, lines);



            var journey = {
                departure: {
                    stop: {
                        name: departStop.name
                    },
                    time: departStop.departures[departureIndex]
                },
                destination: {
                    stop: {
                        name: arriveStop.name
                    },
                    time: arriveStop.arrivals[departureIndex]
                }
            };


            return journey;
        };

        this.getChangeStops = function(departStop, arriveStop, lines) {
            if (departStop.line === arriveStop.line) {
                return [departStop.id, arriveStop.id];
            }
            return [departStop.id, 's2', arriveStop.id];
        };


        this.getNextDeparture = function(departStop, earliestTravel) {
            var departureTime = '';
            var departureIndex = -1;
            var index = 0;
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
                    departureIndex = index;
                }
                index ++;
            });
            return departureIndex;

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
