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

        this.journey =

            this.getLine = function (lineId) {
                return _.find(this.buslines, function (line) {
                    return line;
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

            var latlngs = [];

            var foundDepartureStop = false;
            var foundArrivalStop = false;


            _.forEach(line.stops, function (stop) {

                if (stop.id === journey.departureStop) {
                    _self.drawDepartureIcon(markerScope, stop);
                    foundDepartureStop = true;
                } else if (stop.id === journey.arrivalStop) {
                    _self.drawArrivalIcon(markerScope, stop);
                    foundArrivalStop = true;
                } else if(foundDepartureStop && !foundArrivalStop) {
                    _self.drawBusstopIcon(markerScope, stop);
                    latlngs.push({lat: stop.lat, lng: stop.lng});
                }




            });
            pathScope.journey = {
                color: '#5B79BA',
                weight: 1,
                type: 'polyline',
                latlngs: latlngs
            };


        };


    }
]);
