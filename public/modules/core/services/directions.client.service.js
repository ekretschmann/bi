'use strict';


angular.module('core').service('DirectionsService', [
    function () {

        this.getDirections = function (departure, destination, lines, timetable) {


            var departStop = this.getClosestStop(departure.lat, departure.lng, lines);
            var arriveStop = this.getClosestStop(destination.lat, destination.lng, lines);


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

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                for (var j = 0; j < line.stops.length; j++) {
                    var stop = line.stop[j];
                    var distance = Math.sqrt(
                        (lat - stop.lat) * (lat - stop.lat) +
                        (lng - stop.lng) * (lng - stop.lng)
                    );
                    if (distance < minDistance) {
                        minDistance = distance;
                        result = stop;
                    }
                }
            }

            return result;
        }


    }
]);
