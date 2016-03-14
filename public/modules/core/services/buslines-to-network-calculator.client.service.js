'use strict';


angular.module('core').service('BuslinesToNetworkCalculator', [
    'lodash',
    function (_) {


        this.calculateNetwork = function (lines) {
            var result = [];

            var stops = {};

            _.forEach(lines, function (line) {
                _.forEach(line.stops, function (stop) {
                    if (stops[stop._id]) {
                        stops[stop._id].lines.push(line._id);
                    } else {
                        stop.lines = [line._id];
                        stop.id = stop._id;
                        stops[stop._id] = stop;
                    }
                });
            });

            _.forEach(lines, function (line) {
                var busline = {
                    id: line._id,
                    name: line.name,
                    stops: []
                };
                result.push(busline);
                _.forEach(line.stops, function (stop) {
                    var stopCopy = _.cloneDeep(stops[stop._id]);
                    stopCopy.line = busline.id;
                    busline.stops.push(stopCopy);
                });
            });
            return result;
        }

    }
]);
