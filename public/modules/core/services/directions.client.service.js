'use strict';


angular.module('core').service('DirectionsService', [
    'lodash', '$moment', 'RouteGraph',
    function (_, moment, RouteGraph) {


        this.getDirectionsBetweenStops = function (departureStop, arrivalStop, time, lines, stops) {

            var paths = this.getChangeStopsForAllLines(departureStop, arrivalStop, time, lines, stops);


            var journeyPlan = {};
            journeyPlan.options = [];
            var _self = this;
            _.forEach(paths, function (path) {


                var arrivalTime;
                var itinerary = {};
                itinerary.changes = [];
                var journeyTime = moment(time);
                _.forEach(path, function (change) {


                    var line = _.find(lines, function(l) {return l.id === change.line;});

                    var schedule = _self.getScheduledTimes(change.departureStop, change.arrivalStop, journeyTime, line);

                    var hours = schedule.arrivalTime.split(':')[0];
                    var minutes =schedule.arrivalTime.split(':')[1];
                    journeyTime.hours(hours).minutes(minutes);


                    itinerary.changes.push({
                        stopId: change.departureStop.id,
                        stopName: change.departureStop.name,
                        departureTime: schedule.departureTime,
                        line: change.line
                    });

                    itinerary.changes.push({
                        stopId: change.arrivalStop.id,
                        stopName: change.arrivalStop.name,
                        arrivalTime: schedule.arrivalTime,
                        line: change.line
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

        this.getDirections = function (departure, arrival, time, lines, stops) {


            var departStop = this.getClosestStop(departure.lat, departure.lng, stops);
            var arriveStop = this.getClosestStop(arrival.lat, arrival.lng, stops);
            return this.getDirectionsBetweenStops(departStop, arriveStop, time, lines, stops);

        };


        this.addMinutes = function(time, addedTime, earliestTime) {

            var hours = time.split(':')[0];
            var minutes = Number(time.split(':')[1])+addedTime;
            var moment = earliestTime.clone();
            moment.hours(hours).minutes(minutes);

            var hoursString = moment.hours()+'';
            var minutesString = moment.minutes()+'';

            if (hoursString.length === 1) {
                hoursString = '0'+hoursString;
            }

            if (minutesString.length === 1) {
                minutesString = '0'+minutesString;
            }
            return hoursString+':'+minutesString;
        };

        this.getScheduledTimes = function (departStop, arriveStop, earliestTravel, line) {

            var _self = this;



            var departures = [];
            _.forEach(line.stops, function(stop, index) {
                if(stop === departStop.id) {
                    _.forEach(line.runtimes, function(runtime){
                        departures.push(runtime);
                    });

                }
            });


            var minDifference = Number.MAX_VALUE;



            var scheduleIndex = -1;
            _.forEach(departures, function (departure, index) {
                var hours = departure.split(':')[0];
                var minutes = departure.split(':')[1];
                var departureMoment = earliestTravel.clone();
                departureMoment.hours(hours).minutes(minutes);
                var diff = departureMoment.diff(earliestTravel);
                if (diff > 0 && diff < minDifference) {
                    minDifference = diff;

                    scheduleIndex = index;
                }
            });


            var arrivalTime;
            var departureTime;
            var getTotalDelay = function(times, index) {
                return _.sum(_.filter(times, function(t, i) {
                    return i <= index;
                }));
            };

            _.forEach(line.stops, function(stop, index) {


                if(stop === arriveStop.id) {
                    arrivalTime = _self.addMinutes(line.runtimes[scheduleIndex], getTotalDelay(line.times, index), earliestTravel);
                }
                if(stop === departStop.id) {
                    departureTime = _self.addMinutes(line.runtimes[scheduleIndex], getTotalDelay(line.times, index), earliestTravel);
                }
            });


            return {
                departureTime: departureTime,
                arrivalTime: arrivalTime
            };

        };


        this.getChangeStopsForAllLines = function (departStop, arriveStop, time, lines, stops) {

            var getStop = function (departStop, departLine) {

                var line = _.find(lines, function (l) {
                    return l.id === departLine;
                });


                return _.find(stops, function (stop) {
                    return departStop.id === stop.id;
                });

            };


            var _self = this;

            var routeGraph = RouteGraph.createNew(lines, stops);


            var changes = [];

            _.forEach(departStop.lines, function (departLine) {


                _.forEach(arriveStop.lines, function (arriveLine) {



                    var departLineStop = getStop(departStop, departLine);
                    var arriveLineStop = getStop(arriveStop, arriveLine);

                    if (departLine === arriveLine) {

                        changes.push([{
                            departureStop: departLineStop,
                            arrivalStop: arriveLineStop,
                            line: departLine
                        }]);
                    } else {

                        var path = [];


                        path = routeGraph.calculatePaths(departLine, arriveLine)[0];


                        if (path && path.length > 0) {
                            if (path[0].stop.id !== departLineStop.id) {


                                var change = [];
                                change.push({
                                    departureStop: departLineStop,
                                    arrivalStop: path[0].stop,
                                    line:departLine
                                });
                                //for (var i=1; i<path.length; i++) {
                                //    change.push({departureStop: path[i].departureStop, arrivalStop: path[i].arrivalStop});
                                //}
                                change.push({
                                    departureStop: path[0].stop,
                                    arrivalStop: arriveLineStop,
                                    line: arriveLine
                                });
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
