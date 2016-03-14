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

        this.busstopChangelIcon = {
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
            var line = this.getLine(journey.departureLine);


            var journeyLatlngs = [];

            var foundDepartureStop = false;
            var foundArrivalStop = false;


            _.forEach(line.stops, function (stop) {



                if (stop.id === journey.departureStopId) {
                    _self.drawDepartureIcon(markerScope, stop);
                    foundDepartureStop = true;
                    journeyLatlngs.push({lat: stop.lat, lng: stop.lng});
                } else if (stop.id === journey.arrivalStopId) {
                    _self.drawArrivalIcon(markerScope, stop);
                    foundArrivalStop = true;
                    journeyLatlngs.push({lat: stop.lat, lng: stop.lng});
                } else if(foundDepartureStop && !foundArrivalStop) {
                    _self.drawBusstopIcon(markerScope, stop);
                    journeyLatlngs.push({lat: stop.lat, lng: stop.lng});
                }

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
