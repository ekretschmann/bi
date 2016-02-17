'use strict';


angular.module('core').controller('PlannerController',
    ['$scope', '$http', '$timeout', '$window', 'lodash', 'Authentication',
        function ($scope, $http, $timeout, $window, Authentication) {
            // This provides Authentication context.
            $scope.authentication = Authentication;


            $scope.init = function () {
                $scope.from = 'Current Location';
                $scope.to = undefined;
                $scope.routePlannerExpanded = false;
                $scope.fromInput = false;
                $scope.fromInputFocus = false;
                $scope.toInput = false;
                $scope.priceSlider = 10;
                $scope.startDate = $scope.getStartDate(Date.now());
                $scope.startTime = $scope.getStartTime(Date.now());

                $scope.locationInputState = 'init';
            };

            $scope.getStartDate = function(d) {
                var result = '';
                result += new Date(d).getDate() +'/';
                result += ((new Date(d).getMonth())+1)+'/';
                result += ((new Date(d).getFullYear())-2000)+' ';
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

            $scope.getStartTime = function(d) {
                var result = '';

                if (new Date(d).getHours()<10) {
                    result += '0';
                }
                result += new Date(d).getHours()+':';
                if (new Date(d).getMinutes()<10) {
                    result += '0';
                }
                result += new Date(d).getMinutes();
                return result;
            };


            $scope.changeDate = function(howMuch) {

                $scope.slider.value += howMuch * 1000 * 60 * 60 * 24;
                $scope.startTime = $scope.getStartTime( $scope.slider.value);
                $scope.startDate = $scope.getStartDate( $scope.slider.value);
            };

            $scope.changeTime = function(howMuch) {

                $scope.slider.value += howMuch * 1000 * 60;
                $scope.startTime = $scope.getStartTime( $scope.slider.value);
                $scope.startDate = $scope.getStartDate( $scope.slider.value);
            };

            $scope.slider = {
               value: Date.now(),
                options: {
                    hideLimitLabels: true,
                    floor: Date.now(),
                    ceil: Date.now()+1000*60*60*4,
                    interval: 60000,
                    getPointerColor: function(value) {
                        return '#2b669a';
                    },
                    getSelectionBarColor: function(value) {
                        return '#2b669a';
                    },
                    translate: function(value) {
                        return '';
                    },
                    onChange: function(sliderId, modelValue, highValue) {
                        $scope.startTime = $scope.getStartTime(modelValue);
                        $scope.startDate = $scope.getStartDate(modelValue);
                    }

                }
            };


            $scope.toggleFrom = function () {


                $scope.fromInput = !$scope.fromInput;
                $timeout(function () {
                    var element = $window.document.getElementById('from-input');
                    if (element) {
                        element.focus();
                    }
                });

            };


            $scope.toggleTo = function () {
                $scope.toInput = !$scope.toInput;
                $timeout(function () {
                    var element = $window.document.getElementById('to-input');
                    if (element) {
                        element.focus();
                    }
                });
            };

            $scope.selectFrom = function() {
                $scope.locationInputState = 'select-from';
            };

            $scope.selectTo = function() {
                $scope.locationInputState = 'select-to';
            };

            $scope.$on('leafletDirectiveMap.click', function(event, args){
                var leafEvent = args.leafletEvent;

                console.log($scope.locationInputState);
                if ($scope.locationInputState === 'select-from') {
                    $scope.markers.push({
                        lat: leafEvent.latlng.lat,
                        lng: leafEvent.latlng.lng,
                        icon: {
                            type: 'div',
                            html: '<div class="bus-icon"></div>',
                            className: 'map-marker bus-icon'
                        },
                        message: 'From here'
                    });
                    $scope.locationInputState = 'init';
                }

                if ($scope.locationInputState === 'select-to') {

                    $scope.markers.push({
                        lat: leafEvent.latlng.lat,
                        lng: leafEvent.latlng.lng,
                        icon: {
                            type: 'div',
                            html: '<div class="bus-icon"></div>',
                            className: 'map-marker bus-icon'
                        },
                        message: 'To here'
                    });
                    $scope.locationInputState = 'init';
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

