'use strict';


angular.module('core').service('DirectionsService', [
    'lodash', '$moment',
    function (_, moment) {

        this.getDirections = function (departure, destination, time, lines) {


            var earliestTravel = moment(time);
            var departStop = this.getClosestStop(departure.lat, departure.lng, lines);
            var arriveStop = this.getClosestStop(destination.lat, destination.lng, lines);


            var departureTime = '';
            var arrivalTime = '';
            var minDistance = 100000;
            var today = moment().hours(0).minutes(0).seconds(0);
            console.log(today);
            //_.forEach(departStop.departures, function(departure) {
            //
            //});


            var journey = {
                departure: {
                    stop: {
                        name: departStop.name
                    },
                    time: departStop.departures[0]
                },
                destination: {
                    stop: {
                        name: arriveStop.name
                    },
                    time: arriveStop.arrivals[0]
                }
            };


            return journey;
        };


        this.getClosestStop = function (lat, lng, lines) {


            var minDistance = 10000000;
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
