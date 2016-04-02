'use strict';


angular.module('core').service('DirectionsService', [
    'lodash', '$moment', 'RouteGraph',
    function (_, moment, RouteGraph) {


        this.getTotalDelay = function (times, index) {
            return _.sum(_.filter(times, function (t, i) {
                return i <= index;
            }));
        };


        this.setTime = function (departureMoment, newTime) {

            var hours = Number(newTime.split(':')[0]);
            var minutes = Number(newTime.split(':')[1]);
            departureMoment.hours(hours).minutes(minutes);
        };

        this.toTimeString = function (time) {

            var hoursString = time.hours() + '';
            var minutesString = time.minutes() + '';

            if (hoursString.length === 1) {
                hoursString = '0' + hoursString;
            }

            if (minutesString.length === 1) {
                minutesString = '0' + minutesString;
            }
            return hoursString + ':' + minutesString;
        };

        this.getStopTime = function (timeString, addedTime) {


            var hours = timeString.split(':')[0];
            var minutes = Number(timeString.split(':')[1]) + addedTime;
            var time = moment('2013-02-08 06:00');
            time.hours(hours).minutes(minutes);

            var hoursString = time.hours() + '';
            var minutesString = time.minutes() + '';

            if (hoursString.length === 1) {
                hoursString = '0' + hoursString;
            }

            if (minutesString.length === 1) {
                minutesString = '0' + minutesString;
            }
            return hoursString + ':' + minutesString;
        };

        this.getLine = function (lineId) {
            return _.find(this.lines, function (l) {
                return l.id === lineId;
            });
        };

        this.getRuntime = function (line, earliestDeparture) {
            var _self = this;
            return _.find(line.runtimes, function (runtime) {
                return runtime > earliestDeparture;
            });

        };


        this.getSchedule = function (departureStopId, arrivalStopId, departureLineId, arrivalLineId, earliestDeparture) {

            var _self = this;


            var line = _self.getLine(departureLineId);
            var runtime = _self.getRuntime(line, _self.toTimeString(earliestDeparture));
            var departureStopTime;
            var arrivalStopTime;
            _.forEach(line.stops, function (stop, index) {
                if (stop === departureStopId) {

                    departureStopTime = _self.getStopTime(runtime, _self.getTotalDelay(line.times, index));
                }
                if (stop === arrivalStopId) {
                    arrivalStopTime = _self.getStopTime(runtime, _self.getTotalDelay(line.times, index));
                }
            });

            if (departureStopTime < arrivalStopTime) {
                return {
                    departureLineId: departureLineId,
                    arrivalLineId: arrivalLineId,
                    departureStopId: departureStopId,
                    arrivalStopId: arrivalStopId,
                    departureStopTime: departureStopTime,
                    arrivalStopTime: arrivalStopTime
                };
            }
            return undefined;
        };

        this.getItinerary = function (path, departureStop, arrivalStop, earliestDeparture) {


            var _self = this;

            var currentStopId = departureStop.id;
            var departureMoment = earliestDeparture.clone();

            var itinerary = [];


            var invalidOption = false;





            // inbetween legs

            _.forEach(path, function (change) {
                var journeyLeg = _self.getSchedule(currentStopId, change.stop.id, change.from, change.to, departureMoment);


                if (journeyLeg) {
                    currentStopId = journeyLeg.arrivalStopId;

                    _self.setTime(departureMoment, journeyLeg.arrivalStopTime);
                    itinerary.push(journeyLeg);

                } else {
                    invalidOption = true;
                }
            });

            // last leg
            if (itinerary[itinerary.length - 1] && arrivalStop.id !== itinerary[itinerary.length - 1].arrivalStopId) {
                var previousLeg = itinerary[itinerary.length - 1];
                var journeyLeg = _self.getSchedule(previousLeg.arrivalStopId, arrivalStop.id, previousLeg.arrivalLineId, previousLeg.arrivalLineId, departureMoment);

                itinerary.push(journeyLeg);
            }

            if (invalidOption) {
                return undefined;
            }

            return itinerary;
        };

        this.getDirectionsBetweenStops = function (departureStop, arrivalStop, time, lines, stops) {

            this.lines = lines;
            var _self = this;

            var routeGraph = RouteGraph.createNew(lines, stops);
            var earliestDeparture = moment(time);

            var itinerary = {};
            itinerary.options = [];



            _.forEach(departureStop.lines, function (departLine) {

                _.forEach(arrivalStop.lines, function (arrivalLine) {


                    var paths = routeGraph.calculatePaths(departLine, arrivalLine);


                    if (paths.length === 0) {
                        var option = _self.getSchedule(departureStop.id, arrivalStop.id, departLine, departLine, earliestDeparture);
                        if (option) {
                            itinerary.options.push([option]);
                        }
                    } else {
                        _.forEach(paths, function (path, index) {
                            console.log(path);
                            var option = _self.getItinerary(path, departureStop, arrivalStop, earliestDeparture);
                            if (option && option.length > 0) {
                                itinerary.options.push(option);
                            }

                        });
                    }


                });
            });

            itinerary.options = _.sortBy(itinerary.options, function (c) {

                return c[c.length - 1].arrivalStopTime;
            });


            return itinerary;

        };

        this.getDirections = function (departure, arrival, time, lines, stops) {


            var departStop = this.getClosestStop(departure.lat, departure.lng, stops);
            var arriveStop = this.getClosestStop(arrival.lat, arrival.lng, stops);
            return this.getDirectionsBetweenStops(departStop, arriveStop, time, lines, stops);

        };


        this.getClosestStop = function (lat, lng, stops) {


            var minDistance = Number.MAX_VALUE;
            var result;

            _.forEach(stops, function (stop) {
                var distance = Math.sqrt(
                    (lat - stop.lat) * (lat - stop.lat) +
                    (lng - stop.lng) * (lng - stop.lng)
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    result = stop;
                }
            });

            return result;
        };


    }
]);
