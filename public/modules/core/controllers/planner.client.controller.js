'use strict';


angular.module('core').controller('PlannerController',
    ['$scope', '$http', '$timeout', '$window', 'lodash', 'Authentication', 'Locations',
        function ($scope, $http, $timeout, $window, _, Authentication, Locations) {
            // This provides Authentication context.
            $scope.authentication = Authentication;


            var icons = {
                blue: {
                    type: 'div',
                    iconSize: [10, 10],
                    className: 'blue',
                    iconAnchor: [5, 5]
                },
                red: {
                    type: 'div',
                    iconSize: [10, 10],
                    className: 'red',
                    iconAnchor: [5, 5]
                }
            };

            $scope.calculateDirections = function () {

                console.log($scope.nearestBusstopFrom.info);
                console.log($scope.nearestBusstopTo.info);

                //var minDistance = 100;
                //var minLoc;
                //Locations.query(function (locations) {
                //    for (var i = 0; i < locations.length; i++) {
                //        var loc = locations[i];
                //        var distance = Math.sqrt((loc.lat - $scope.from.lat) * (loc.lat - $scope.from.lat) + (loc.lng - $scope.from.lng) * (loc.lng - $scope.from.lng));
                //        if (distance < minDistance) {
                //            minLoc = loc;
                //            minDistance = distance;
                //        }
                //    }
                //    $scope.nearestStop = {
                //        lat: minLoc.lat,
                //        lng: minLoc.lng,
                //        icon: {
                //            type: 'div',
                //            html: '<div class="test-icon"></div>',
                //            className: 'map-marker test-icon'
                //        },
                //        message: minLoc.name + ' lines:' + minLoc.info
                //    };
                //    $scope.markers.push($scope.nearestStop);
                //});

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

                $scope.locations = Locations.query();

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

            $scope.findNearestBusstops = function(lat, lng) {
                var minLoc;
                var minDistance = 10000;
                for (var i = 0; i < $scope.locations.length; i++) {

                    var loc = $scope.locations[i];
                    var distance = Math.sqrt((loc.lat - lat) * (loc.lat - lat) + (loc.lng - lng) * (loc.lng - lng));
                    if (distance < minDistance) {
                        minLoc = loc;
                        minDistance = distance;
                    }
                }

                return minLoc;
                //return {
                //    lat: minLoc.lat,
                //    lng: minLoc.lng,
                //    icon: {
                //        type: 'div',
                //        html: '<div class="test-icon"></div>',
                //        className: 'map-marker test-icon'
                //    },
                //    message: minLoc.name + ' lines:' + minLoc.info
                //};
            };

            $scope.selectFrom = function(leafEvent) {
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

                $scope.from.text = 'lat: ' + $scope.from.lat + ' lng: ' + $scope.from.lng;
                $scope.locationInputState = 'select-to';
                $scope.fromInput = false;
                $scope.toggleTo();

                $scope.nearestBusstopFrom = $scope.findNearestBusstops($scope.from.lat, $scope.from.lng);
                $scope.markers.push({
                        lat: $scope.nearestBusstopFrom.lat,
                        lng: $scope.nearestBusstopFrom.lng,
                        icon: {
                            type: 'div',
                            html: '<div class="bus-icon"></div>',
                            className: 'map-marker bus-icon'
                        },
                        message: $scope.nearestBusstopFrom.name + ' lines:' + $scope.nearestBusstopFrom.info
                    }
                );

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

                    $scope.to.text = 'lat: ' + $scope.to.lat + ' lng: ' + $scope.to.lng;

                    $scope.locationInputState = 'select-go';
                    $scope.goReady = true;
                    $scope.fromInput = false;
                    $scope.toInput = false;

                    $scope.nearestBusstopTo = $scope.findNearestBusstops($scope.to.lat, $scope.to.lng);
                    $scope.markers.push({
                            lat: $scope.nearestBusstopTo.lat,
                            lng: $scope.nearestBusstopTo.lng,
                            icon: {
                                type: 'div',
                                html: '<div class="bus-icon"></div>',
                                className: 'map-marker bus-icon'
                            },
                            message: $scope.nearestBusstopTo.name + ' lines:' + $scope.nearestBusstopTo.info
                        }
                    );
                }
            });

            angular.extend($scope, {

                mk: {
                    //  autoDiscover: true
                    lat: 52.036,
                    lng: -0.7532501220703125,
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

