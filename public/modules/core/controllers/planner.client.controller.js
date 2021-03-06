'use strict';


angular.module('core').controller('PlannerController',
    ['$scope', '$http', '$timeout', '$window', 'lodash', 'Authentication', 'Locations', 'Buslines', 'DirectionsService', 'RouteRenderService',
        function ($scope, $http, $timeout, $window, _, Authentication, Locations, Buslines, DirectionsService, RouteRenderService) {
            // This provides Authentication context.
            $scope.authentication = Authentication;




            $scope.calculateDirections = function () {


                if ($scope.nearestBusstopFrom && $scope.nearestBusstopTo) {
                    //console.log('xxxx');
                    //console.log($scope.nearestBusstopFrom);
                    //console.log($scope.nearestBusstopTo);




                    var journey = DirectionsService.getDirectionsBetweenStops($scope.nearestBusstopFrom, $scope.nearestBusstopTo,
                        '2013-02-08 08:40', $scope.buslines, $scope.busstops);

                   // console.log($scope.busstops);
                   // console.log($scope.nearestBusstopFrom);
                   // console.log($scope.nearestBusstopTo);
                    //console.log(journey);

                    //console.log(journey);
                  //  console.log($scope.buslines);
                    //console.log($scope.busstops);

                    RouteRenderService.drawJourney(journey.options[0], $scope.buslines, $scope.busstops, $scope.markers, $scope.paths);

                    //console.log(journey.options[0]);

                    //console.log('xxxxx');
                    //console.log($scope.markers);
                    //console.log($scope.markers.length);
                }




            };

            $scope.init = function () {
                $scope.goReady = false;
                $scope.from = undefined;
                $scope.to = undefined;
                $scope.routePlannerExpanded = false;
                $scope.fromInputFocus = false;
                $scope.toInput = false;
                $scope.priceSlider = 10;
                $scope.startDate = $scope.getStartDate(Date.now());
                $scope.startTime = $scope.getStartTime(Date.now());

                $scope.locationInputState = 'select-from';
                $scope.instruction = 'Select Departure';
                $scope.fromInput = true;

                //  $scope.locations = Locations.query();

                //$scope.busstops = {};
                // figure out line graph with intersection stops
                Buslines.query(function (lines) {
                    //console.log(lines);
                    Locations.query(function(stops) {
                        //console.log(stops);
                        $scope.busstops = {};
                        _.forEach(stops, function (stop) {
                            $scope.busstops[stop.info.naptan] = stop;
                            stop.id = stop.info.naptan;
                        });


                        _.forEach(lines, function (line) {
                            line.id = line._id;
                            //_.forEach(line.stops, function(stopId) {
                            //    if ($scope.busstops[stopId].lines && $scope.busstops[stopId].lines.indexOf(line.id) === -1) {
                            //        $scope.busstops[stopId].lines.push(line.id);
                            //    } else {
                            //        $scope.busstops[stopId].lines= [line.id];
                            //    }
                            //
                            //});
                        });


                        //$scope.buslines = BuslinesToNetworkCalculator.calculateNetwork(lines, $scope.busstops);
                        $scope.buslines = lines;

                        //console.log($scope.busstops);
                        //console.log($scope.buslines);

                        //console.log($scope.buslines);
                        //_.forEach(lines, function (line) {
                        //    //line.id = line._id;
                        //    console.log(line.stops);
                        //});
                        //console.log($scope.buslines);
                    });

                });

            };

            $scope.getStartDate = function (d) {
                var result = '';
                result += new Date(d).getDate() + '/';
                result += ((new Date(d).getMonth()) + 1) + '/';
                result += ((new Date(d).getFullYear()) - 2000) + ' ';
                //if (new Date(d).getHours()<10) {
                //    result += '0';
                //}
                //result += new Date(d).getHours()+':';
                //if (new Date(d).getMinutes()<10) {
                //    result += '0';
                //}
                //result += new Date(d).getMinutes();
                return result;
            };

            $scope.getStartTime = function (d) {
                var result = '';

                if (new Date(d).getHours() < 10) {
                    result += '0';
                }
                result += new Date(d).getHours() + ':';
                if (new Date(d).getMinutes() < 10) {
                    result += '0';
                }
                result += new Date(d).getMinutes();
                return result;
            };


            $scope.resetTime = function () {

                $scope.slider.value = Date.now();
                $scope.startTime = $scope.getStartTime($scope.slider.value);
                $scope.startDate = $scope.getStartDate($scope.slider.value);
            };

            $scope.changeDate = function (howMuch) {

                var newValue = $scope.slider.value + howMuch * 1000 * 60 * 60 * 24;

                if (newValue > Date.now()) {
                    $scope.slider.value = newValue;
                } else {
                    $scope.slider.value = Date.now();
                }
                $scope.startTime = $scope.getStartTime($scope.slider.value);
                $scope.startDate = $scope.getStartDate($scope.slider.value);

                $scope.slider.options.floor = $scope.slider.value - 1000 * 60 * 60 * 2;
                $scope.slider.options.ceil = $scope.slider.value + 1000 * 60 * 60 * 2;

                if ($scope.slider.options.floor < Date.now()) {
                    $scope.slider.options.floor = Date.now();
                    $scope.slider.options.ceil = $scope.slider.options.floor + 1000 * 60 * 60 * 4;
                }
            };

            $scope.changeTime = function (howMuch) {

                var newValue = $scope.slider.value + howMuch * 1000 * 60;

                if (newValue > Date.now()) {
                    $scope.slider.value = newValue;

                } else {
                    $scope.slider.value = Date.now();
                }
                $scope.startTime = $scope.getStartTime($scope.slider.value);
                $scope.startDate = $scope.getStartDate($scope.slider.value);

                $scope.slider.options.floor = $scope.slider.value - 1000 * 60 * 60 * 2;
                $scope.slider.options.ceil = $scope.slider.value + 1000 * 60 * 60 * 2;

                if ($scope.slider.options.floor < Date.now()) {
                    $scope.slider.options.floor = Date.now();
                    $scope.slider.options.ceil = $scope.slider.options.floor + 1000 * 60 * 60 * 4;
                }
            };

            $scope.changeTimeFast = function (howMuch) {
                $scope.fastTimeChange = true;
                $timeout(function () {
                    if ($scope.fastTimeChange) {
                        $scope.changeTime(howMuch);
                        $scope.changeTimeFast(howMuch);
                    }
                }, 100);
            };

            $scope.stopChangeTimeFast = function () {
                $scope.fastTimeChange = false;
            };

            $scope.slider = {
                value: Date.now(),
                options: {
                    hideLimitLabels: true,
                    floor: Date.now(),
                    ceil: Date.now() + 1000 * 60 * 60 * 4,
                    interval: 60000,
                    getPointerColor: function (value) {
                        return '#2b669a';
                    },
                    getSelectionBarColor: function (value) {
                        return '#2b669a';
                    },
                    translate: function (value) {
                        return '';
                    },
                    onChange: function (sliderId, modelValue, highValue) {
                        $scope.startTime = $scope.getStartTime(modelValue);
                        $scope.startDate = $scope.getStartDate(modelValue);
                    }

                }
            };


            $scope.toggleFrom = function () {


                $scope.fromInput = true;
                $scope.toInput = false;
                $timeout(function () {
                    var element = $window.document.getElementById('from-input');
                    if (element) {
                        element.focus();
                    }
                });

            };


            $scope.toggleTo = function () {
                $scope.fromInput = false;
                $scope.toInput = true;
                $timeout(function () {
                    var element = $window.document.getElementById('to-input');
                    if (element) {
                        element.focus();
                    }
                });
            };

            $scope.findNearestBusstops = function (lat, lng) {
                var minLoc;
                var minDistance = Number.MAX_VALUE;


                _.forEach($scope.buslines, function (line) {

                    _.forEach(line.stops, function (stopId) {

                        //console.log(stopId);
                        var stop = $scope.busstops[stopId];
                        // move this into a util service
                        var distance = Math.sqrt((stop.lat - lat) * (stop.lat - lat) + (stop.lng - lng) * (stop.lng - lng));
                        if (distance < minDistance) {
                            minLoc = stop;
                            minDistance = distance;
                        }
                    });
                });


                return minLoc;

            };

            $scope.getLineName = function (lineId) {
                var result = '';
                _.forEach($scope.buslines, function (line) {
                    if (line.id === lineId) {
                        result = line.name;
                    }
                });
                return result;
            };

            $scope.getStopInfo = function (stop) {

                var result = 'Lines: ';
                _.forEach(stop.lines, function (line, index) {
                    result += $scope.getLineName(line);
                    if (index < stop.lines.length - 1) {
                        result += ', ';
                    }
                });
                return result;
            };

            $scope.selectFrom = function (leafEvent) {
                if (!$scope.startMarker) {
                    $scope.startMarker = {
                        lat: leafEvent.latlng.lat,
                        lng: leafEvent.latlng.lng,
                        //icon: {
                        //
                        //    type: 'div',
                        //    html: '<div class="bus-icon"></div>',
                        //    className: 'map-marker bus-icon'
                        //},
                        message: 'From here'
                    };

                    $scope.markers.push($scope.startMarker);
                } else {
                    $scope.startMarker.lat = leafEvent.latlng.lat;
                    $scope.startMarker.lng = leafEvent.latlng.lng;
                }
                $scope.locationInputState = 'init';

                $scope.from = {};
                $scope.from.lat = Math.round(leafEvent.latlng.lat * 10000) / 10000;
                $scope.from.lng = Math.round(leafEvent.latlng.lng * 10000) / 10000;

                //$scope.from.lat = 52.1821;
                //$scope.from.lng = 0.1888;

                $scope.from.text = 'lat: ' + $scope.from.lat + ' lng: ' + $scope.from.lng;
                $scope.locationInputState = 'select-to';
                $scope.fromInput = false;
                $scope.toggleTo();

                $scope.nearestBusstopFrom = $scope.findNearestBusstops($scope.from.lat, $scope.from.lng);
                //
                //if ($scope.nearestBusstopFrom) {

                    //var html = '<div>';
                    //html += '<div>' + $scope.nearestBusstopFrom.name + '</div>';
                    //html += '<div>' + $scope.getStopInfo($scope.nearestBusstopFrom) + '</div>';
                    //html += '</div>';
                    //$scope.markers.push({
                    //        lat: $scope.nearestBusstopFrom.lat,
                    //        lng: $scope.nearestBusstopFrom.lng,
                    //        icon: {
                    //            type: 'div',
                    //            html: '<div class="busstop-departure-icon"></div>',
                    //            className: 'map-marker busstop-departure-icon'
                    //        },
                    //        //label: {
                    //        //    message: 'Hey, drag me if you want',
                    //        //    options: {
                    //        //        noHide: true
                    //        //    }
                    //        //},
                    //        focus: true,
                    //
                    //        message: html
                    //    }
                    //);
                //}

            };

            $scope.$on('leafletDirectiveMap.click', function (event, args) {
                var leafEvent = args.leafletEvent;


                if ($scope.locationInputState === 'select-from') {
                    $scope.selectFrom(leafEvent);

                    return;
                }

                if ($scope.locationInputState === 'select-to') {

                    if (!$scope.endMarker) {
                        $scope.endMarker = {
                            lat: leafEvent.latlng.lat,
                            lng: leafEvent.latlng.lng,
                            //icon: {
                            //    type: 'div',
                            //    html: '<div class="test-icon"></div>',
                            //    className: 'map-marker test-icon'
                            //},
                            message: 'To here'
                        };
                        $scope.markers.push($scope.endMarker);
                    } else {
                        $scope.endMarker.lat = leafEvent.latlng.lat;
                        $scope.endMarker.lng = leafEvent.latlng.lng;
                    }
                    $scope.locationInputState = 'init';

                    $scope.to = {};
                    $scope.to.lat = Math.round(leafEvent.latlng.lat * 10000) / 10000;
                    $scope.to.lng = Math.round(leafEvent.latlng.lng * 10000) / 10000;

                    //$scope.to.lat = 52.2138;
                    //$scope.to.lng = 0.138;

                    $scope.to.text = 'lat: ' + $scope.to.lat + ' lng: ' + $scope.to.lng;

                    $scope.locationInputState = 'select-go';
                    $scope.goReady = true;
                    $scope.fromInput = false;
                    $scope.toInput = false;

                    $scope.nearestBusstopTo = $scope.findNearestBusstops($scope.to.lat, $scope.to.lng);

                    //var html = '<div>';
                    //html += '<div>' + $scope.nearestBusstopFrom.name + '</div>';
                    //html += '<div>' + $scope.getStopInfo($scope.nearestBusstopTo) + '</div>';
                    //html += '</div>';
                    //if ($scope.nearestBusstopTo) {
                    //    $scope.markers.push({
                    //            lat: $scope.nearestBusstopTo.lat,
                    //            lng: $scope.nearestBusstopTo.lng,
                    //            icon: {
                    //                type: 'div',
                    //                html: '<div class="busstop-arrival-icon"></div>',
                    //                className: 'map-marker busstop-arrival-icon'
                    //            },
                    //            focus: true,
                    //            message: html
                    //        }
                    //    )
                    //    ;
                    //}
                }
            });

            angular.extend($scope, {

                //mk: {
                //    //  autoDiscover: true
                //    lat: 52.036,
                //    lng: -0.7532501220703125,
                //    zoom: 12
                //},
                mk: {
                    //  autoDiscover: true
                    lat: 52.1837736752,
                    lng: 0.2189300765,
                    zoom: 12
                },
                events: {},
                paths: {},
                markers: [],
                defaultIcon: {},
                defaults: {
                    scrollWheelZoom: false
                }

            });


        }


    ]);

