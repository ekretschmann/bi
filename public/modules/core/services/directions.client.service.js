'use strict';


angular.module('core').service('DirectionsService', [
    'lodash', '$moment', 'RouteGraph',
    function (_, moment, RouteGraph) {


        this.getTotalDelay = function(times, index) {
            return _.sum(_.filter(times, function(t, i) {
                return i <= index;
            }));
        };


        this.setTime = function(departureMoment, newTime) {

            var hours =  Number(newTime.split(':')[0]);
            var minutes = Number(newTime.split(':')[1]);
            departureMoment.hours(hours).minutes(minutes);
        };

        this.toTimeString = function(time) {

            var hoursString = time.hours()+'';
            var minutesString = time.minutes()+'';

            if (hoursString.length === 1) {
                hoursString = '0'+hoursString;
            }

            if (minutesString.length === 1) {
                minutesString = '0'+minutesString;
            }
            return hoursString+':'+minutesString;
        };

        this.getStopTime = function(timeString, addedTime) {



            var hours = timeString.split(':')[0];
            var minutes = Number(timeString.split(':')[1])+addedTime;
            var time = moment('2013-02-08 06:00');
            time.hours(hours).minutes(minutes);

            var hoursString = time.hours()+'';
            var minutesString = time.minutes()+'';

            if (hoursString.length === 1) {
                hoursString = '0'+hoursString;
            }

            if (minutesString.length === 1) {
                minutesString = '0'+minutesString;
            }
            return hoursString+':'+minutesString;
        };

        this.getLine = function(lineId) {
            return _.find(this.lines, function(l) {return l.id === lineId;});
        };

        this.getRuntime = function(line, earliestDeparture) {
            var _self = this;
            return _.find(line.runtimes, function(runtime) {
                return runtime > earliestDeparture;
            });

        };

        this.getSchedule = function(departureStopId, arrivalStopId, departureLineId, arrivalLineId, earliestDeparture) {

            var _self = this;

            var line = _self.getLine(departureLineId);
            var runtime = _self.getRuntime(line, _self.toTimeString(earliestDeparture));
            var departureStopTime;
            var arrivalStopTime;
            _.forEach(line.stops, function(stop, index) {
                if (stop === departureStopId) {
                    departureStopTime = _self.getStopTime(runtime, _self.getTotalDelay(line.times, index));
                }
                if (stop === arrivalStopId) {
                    arrivalStopTime = _self.getStopTime(runtime, _self.getTotalDelay(line.times, index));
                }
            });

            return {
                departureLineId: departureLineId,
                arrivalLineId: arrivalLineId,
                departureStopId: departureStopId,
                arrivalStopId: arrivalStopId,
                departureStopTime: departureStopTime,
                arrivalStopTime: arrivalStopTime
            };
        };

        this.getItinerary = function(path, departureStop, arrivalStop, earliestDeparture) {


            var _self = this;

            var currentStopId = departureStop.id;
            var departureMoment = earliestDeparture.clone();

            var itinerary = [];


            // first leg


            // inbetween legs
            _.forEach(path, function (change) {


                var journeyLeg = _self.getSchedule(currentStopId, change.stop.id, change.from, change.to, departureMoment);
                currentStopId = journeyLeg.arrivalStopId;


                _self.setTime(departureMoment, journeyLeg.arrivalStopTime);

                itinerary.push(journeyLeg);
            });

            // last leg
            if (arrivalStop.id !== itinerary[itinerary.length-1].arrivalStopId) {
                var previousLeg = itinerary[itinerary.length-1];
                var journeyLeg = _self.getSchedule(previousLeg.arrivalStopId, arrivalStop.id, previousLeg.arrivalLineId, previousLeg.arrivalLineId,  departureMoment);
                itinerary.push(journeyLeg);
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

            _.forEach(departureStop.lines, function(departLine) {
                _.forEach(arrivalStop.lines, function(arrivalLine) {
                    var paths = routeGraph.calculatePaths(departLine, arrivalLine);
                    //var paths = this.getChangeStopsForAllLines(departureStop, arrivalStop, lines, stops, routeGraph);
                    _.forEach(paths, function(path) {
                        itinerary.options.push(_self.getItinerary(path, departureStop, arrivalStop, earliestDeparture));
                    });
                });
            });

            itinerary.options = _.sortBy(itinerary.options, function (c) {
                //console.log(c[c.length-1].arrivalStopTime);
                return c[c.length-1].arrivalStopTime;
            });


            return itinerary;

        };

        this.getDirections = function (departure, arrival, time, lines, stops) {


            var departStop = this.getClosestStop(departure.lat, departure.lng, stops);
            var arriveStop = this.getClosestStop(arrival.lat, arrival.lng, stops);
            return this.getDirectionsBetweenStops(departStop, arriveStop, time, lines, stops);

        };




        //this.getScheduledTimes = function (departStop, arriveStop, earliestTravel, line) {
        //
        //    var _self = this;
        //
        //
        //
        //    var departures = [];
        //    _.forEach(line.stops, function(stop, index) {
        //        if(stop === departStop.id) {
        //            _.forEach(line.runtimes, function(runtime){
        //                departures.push(runtime);
        //            });
        //
        //        }
        //    });
        //
        //
        //
        //
        //    var minDifference = Number.MAX_VALUE;
        //
        //
        //    var scheduleIndex = -1;
        //    _.forEach(departures, function (departure, index) {
        //        var hours = departure.split(':')[0];
        //        var minutes = departure.split(':')[1];
        //        var departureMoment = earliestTravel.clone();
        //        departureMoment.hours(hours).minutes(minutes);
        //        var diff = departureMoment.diff(earliestTravel);
        //        if (diff > 0 && diff < minDifference) {
        //            minDifference = diff;
        //
        //            scheduleIndex = index;
        //        }
        //    });
        //
        //
        //    var arrivalTime;
        //    var departureTime;
        //
        //    _.forEach(line.stops, function(stop, index) {
        //        if(stop === arriveStop.id) {
        //            arrivalTime = _self.addMinutes(line.runtimes[scheduleIndex], getTotalDelay(line.times, index), earliestTravel);
        //        }
        //        if(stop === departStop.id) {
        //            departureTime = _self.addMinutes(line.runtimes[scheduleIndex], getTotalDelay(line.times, index), earliestTravel);
        //        }
        //    });
        //
        //
        //    return {
        //        departureTime: departureTime,
        //        arrivalTime: arrivalTime
        //    };
        //
        //};


        //this.getChangeStopsForAllLines = function (departStop, arriveStop, lines, stops, routeGraph) {
        //
        //    var getStop = function (departStop, departLine) {
        //
        //        var line = _.find(lines, function (l) {
        //            return l.id === departLine;
        //        });
        //
        //
        //        return _.find(stops, function (stop) {
        //            return departStop.id === stop.id;
        //        });
        //
        //    };
        //
        //
        //    var _self = this;
        //
        //
        //
        //
        //    var changes = [];
        //
        //
        //
        //
        //    _.forEach(departStop.lines, function (departLine) {
        //
        //
        //
        //        _.forEach(arriveStop.lines, function (arriveLine) {
        //
        //
        //
        //            var departLineStop = getStop(departStop, departLine);
        //            var arriveLineStop = getStop(arriveStop, arriveLine);
        //
        //
        //            if (departLine === arriveLine) {
        //
        //                changes.push([{
        //                    departureStop: departLineStop,
        //                    arrivalStop: arriveLineStop,
        //                    line: departLine
        //                }]);
        //            } else {
        //
        //                var path = [];
        //
        //
        //                var paths = routeGraph.calculatePaths(departLine, arriveLine);
        //                path = paths[0];
        //              //  console.log(paths.length);
        //
        //                if (path && path.length > 0) {
        //                    if (path[0].stop.id !== departLineStop.id) {
        //
        //
        //                        var change = [];
        //                        change.push({
        //                            departureStop: departLineStop,
        //                            arrivalStop: path[0].stop,
        //                            line:departLine
        //                        });
        //
        //                        change.push({
        //                            departureStop: path[0].stop,
        //                            arrivalStop: arriveLineStop,
        //                            line: arriveLine
        //                        });
        //
        //
        //                        changes.push(change);
        //                    }
        //                }
        //            }
        //        });
        //    });
        //
        //
        //    return changes;
        //
        //};

        //this.getChangeStops = function (departStop, arriveStop, time, lines) {
        //
        //};


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
