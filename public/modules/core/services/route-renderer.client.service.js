'use strict';

angular.module('core').service('RouteRenderService', [
    'lodash',
    function (_) {


        var buslines;
        this.busstopIcon = {
            type: 'div',
            html: '<div class="busstop-icon"></div>',
            className: 'map-marker busstop-icon'
        };
        this.busstopDepartureIcon = {
            type: 'div',
            html: '<div class="busstop-departure-icon"></div>',
            className: 'map-marker busstop-departure-icon'
        };
        this.busstopArrivalIcon = {
            type: 'div',
            html: '<div class="busstop-arrival-icon"></div>',
            className: 'map-marker busstop-arrival-icon'
        };

        this.busstopChangeIcon = {
            type: 'div',
            html: '<div class="busstop-change-icon"></div>',
            className: 'map-marker busstop-change-icon'
        };

        this.journey =

            this.getLine = function (lineId) {
                return _.find(this.buslines, function (line) {
                    return line.id === lineId;
                });
            };

        this.drawDepartureIcon = function (markerScope, stop) {
            markerScope.push({
                    lat: stop.lat,
                    lng: stop.lng,
                    icon: this.busstopDepartureIcon
                }
            );
        };

        this.drawArrivalIcon = function (markerScope, stop) {
            markerScope.push({
                    lat: stop.lat,
                    lng: stop.lng,
                    icon: this.busstopArrivalIcon
                }
            );
        };

        this.drawChangeIcon = function (markerScope, stop) {
            markerScope.push({
                    lat: stop.lat,
                    lng: stop.lng,
                    icon: this.busstopChangeIcon
                }
            );
        };

        this.drawBusstopIcon = function (markerScope, stop) {
            markerScope.push({
                    lat: stop.lat,
                    lng: stop.lng,
                    icon: this.busstopIcon
                }
            );
        };

        this.drawJourney = function (journey, buslines, markerScope, pathScope) {


            var _self = this;

            this.buslines = buslines;


            var departureStop;
            var arrivalStop;
            var isDepartureStop = true;


            var drawConnection = function (lineId, departureStop, arrivalStop, drawDepartureStop, drawArrivalStop, journeyLatlngs) {


                var line = _self.getLine(lineId);

                var foundDepartureStop = false;
                var foundArrivalStop = false;


                _.forEach(line.stops, function (stop) {

                    if (stop.id === departureStop.stopId) {
                        if (drawDepartureStop) {
                            _self.drawDepartureIcon(markerScope, stop);
                        }
                        foundDepartureStop = true;

                    } else if (stop.id === arrivalStop.stopId) {
                        if (drawArrivalStop) {
                            _self.drawArrivalIcon(markerScope, stop);
                            journeyLatlngs.push({lat: stop.lat, lng: stop.lng});
                        } else {
                            _self.drawChangeIcon(markerScope, stop);
                        }
                        foundArrivalStop = true;
                    } else if (foundDepartureStop && !foundArrivalStop) {
                        _self.drawBusstopIcon(markerScope, stop);
                    }

                    if (foundDepartureStop && !foundArrivalStop) {
                        journeyLatlngs.push({lat: stop.lat, lng: stop.lng});
                    }
                });

            };

            var journeyLatlngs = [];
            _.forEach(journey.changes, function (change, index) {

                if (isDepartureStop) {
                    departureStop = change;
                } else {
                    arrivalStop = change;
                    var drawArrivalStop = index >= journey.changes.length -1;
                    var drawDepartureStop = index === 1;
                    drawConnection(change.line, departureStop, arrivalStop, drawDepartureStop, drawArrivalStop, journeyLatlngs);

                }
                isDepartureStop = !isDepartureStop;

            });


            pathScope.journey = {
                color: '#5B79BA',
                weight: 1,
                type: 'polyline',
                latlngs: journeyLatlngs
            };


            //console.log(markerScope);

        };


    }
]);
