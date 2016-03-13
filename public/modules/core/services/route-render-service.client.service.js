'use strict';

angular.module('core').service('RouteRenderService', [
    'lodash',
    function (_) {


        var buslines;

        this.getLine= function(lineId) {
            return _.find(this.buslines, function(line) {
                return line;
            });
        };

        this.drawJourney = function(journey, buslines, markerScope, pathScope) {
            this.buslines = buslines;
            var line = this.getLine(journey.departureLine);

            var latlngs = [];


            _.forEach(line.stops, function(stop) {
                // console.log(stop);
                markerScope.push({
                        lat: stop.lat,
                        lng: stop.lng,
                        icon: {
                            type: 'div',
                            html: '<div class="busstop-icon"></div>',
                            className: 'map-marker busstop-icon'
                        }
                        //label: {
                        //    message: 'Hey, drag me if you want',
                        //    options: {
                        //        noHide: true
                        //    }
                        //},
                        //focus: true,
                        //
                        //message: html
                    }
                );
                latlngs.push({lat: stop.lat, lng:stop.lng});
            });
            pathScope.p1 = {
                color: '#5B79BA',
                weight: 1,
                type: 'polyline',
                latlngs:  latlngs
            };


        };





    }
]);
