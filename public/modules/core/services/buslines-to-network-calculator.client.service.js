'use strict';


angular.module('core').service('BuslinesToNetworkCalculator', [
    'lodash',
    function (_) {

        this.lineHasStop = function(line, stop, stops) {

            return  _.filter(line.stops, function(s) {
                return stops[s].info.naptan === stop.info.naptan;
            }).length > 0;


        };

        this.calculateNetwork = function (lines, stops) {
            var result = [];



            var _self = this;

            _.forEach(lines, function (line) {
                _.forEach(stops, function (stop) {
                    if (_self.lineHasStop(line, stop, stops)) {
                        if (stops[stop.info.naptan]) {
                            //console.log(stop.info.naptan);
                            if (stops[stop.info.naptan].lines) {

                                if (stops[stop.info.naptan].lines.indexOf(line.id) === -1) {
                                    stops[stop.info.naptan].lines.push(line.id);
                                }
                            } else {
                                stops[stop.info.naptan].lines = [line.id];
                            }
                        } else {
                            stop.lines = [line.id];
                            stop.id = stop.info.naptan;
                            stops[stop.info.naptan] = stop;
                        }
                    }
                });
            });

            _.forEach(lines, function (line) {


                var busline = {
                    id: line.id,
                    name: line.name,
                    stops: []
                };
                result.push(busline);
                _.forEach(stops, function (stop) {
                    //console.log(stop);
                    //console.log(line.stops);
                    if (_self.lineHasStop(line, stop, stops)) {
                        var stopCopy = _.cloneDeep(stops[stop.info.naptan]);
                        stopCopy.line = busline.id;
                        busline.stops.push(stopCopy);
                    }
                });
            });

            return result;
        };

    }
]);
