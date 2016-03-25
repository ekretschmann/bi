'use strict';

angular.module('core').service('RouteRenderService', [
    'lodash',
    function (_) {


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

        this.drawJourney = function (journey, buslines, busstops, markerScope, pathScope) {


            var _self = this;

            this.buslines = buslines;
            this.busstops = busstops;

            var drawConnection = function (leg, first, last) {


                var line = _self.getLine(leg.departureLineId);

                var foundDepartureStop = false;
                var foundArrivalStop = false;



                _.forEach(line.stops, function (stopId) {

                    var stop = _self.busstops[stopId];
                    if (stop.id === leg.departureStopId) {
                        if (first) {
                            _self.drawDepartureIcon(markerScope, stop);
                        }
                        foundDepartureStop = true;

                    } else if (stop.id === leg.arrivalStopId) {
                        if (last) {
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
            _.forEach(journey, function (leg, index) {

                var first = index ===0;
                var last = index ===journey.length -1;
                drawConnection(leg, first, last);



            });


            pathScope.journey = {
                color: '#5B79BA',
                weight: 1,
                type: 'polyline',
                latlngs: journeyLatlngs
            };




        };


    }
]);
