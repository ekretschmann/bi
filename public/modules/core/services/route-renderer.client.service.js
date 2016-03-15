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


            var drawConnection = function (lineId, departureStop, arrivalStop, drawDepartureStop, drawArrivalStop) {
                var line = _self.getLine(lineId);
                var journeyLatlngs = [];

                var foundDepartureStop = false;
                var foundArrivalStop = false;

                console.log(lineId);
                //console.log(line.stops);

                _.forEach(line.stops, function (stop) {

                    console.log(arrivalStop.stop, stop.id);

                    if (stop.id === departureStop.stop) {
                        if (drawDepartureStop) {
                            console.log('drawing departure');
                            _self.drawDepartureIcon(markerScope, stop);
                        }
                        foundDepartureStop = true;
                        journeyLatlngs.push({lat: stop.lat, lng: stop.lng});
                    } else if (stop.id === arrivalStop.stop) {
                        if (drawArrivalStop) {
                            console.log('drawing arrival');
                            _self.drawArrivalIcon(markerScope, stop);
                        } else {
                            console.log('drawing change');
                            _self.drawChangeIcon(markerScope, stop);

                        }

                        foundArrivalStop = true;
                        journeyLatlngs.push({lat: stop.lat, lng: stop.lng});
                    } else if (foundDepartureStop && !foundArrivalStop) {
                        console.log('drawing stop');
                        _self.drawBusstopIcon(markerScope, stop);
                        journeyLatlngs.push({lat: stop.lat, lng: stop.lng});
                    }

                });

            };

            _.forEach(journey.changes, function (change, index) {

                if (isDepartureStop) {
                    departureStop = change;
                } else {
                    arrivalStop = change;
                    var drawArrivalStop = index >= journey.changes.length -1;
                    var drawDepartureStop = index === 1;
                    drawConnection(change.line, departureStop, arrivalStop, drawDepartureStop, drawArrivalStop);

                }
                isDepartureStop = !isDepartureStop;

            });


            //pathScope.journey = {
            //    color: '#5B79BA',
            //    weight: 1,
            //    type: 'polyline',
            //    latlngs: journeyLatlngs
            //};


            //console.log(markerScope);

        };


    }
]);
