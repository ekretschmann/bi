'use strict';


angular.module('core').controller('PlannerController',
    ['$scope', '$http', '$timeout', '$window', 'lodash', 'Authentication',
        function ($scope, $http, $timeout, $window, Authentication) {
            // This provides Authentication context.
            $scope.authentication = Authentication;


            $scope.init = function () {
                $scope.from = '120 Cherry Road';
                $scope.to = '48 Chesterton Road';
                $scope.routePlannerExpanded = false;
                $scope.fromInput = false;
                $scope.fromInputFocus = false;
                $scope.toInput = false;
                $scope.priceSlider = 10;
                $scope.startTime = $scope.getDateString(Date.now());
            };

            $scope.getDateString = function(d) {
                var result = '';
                result += new Date(d).getDate() +'/';
                result += new Date(d).getMonth()+'/';
                result += new Date(d).getFullYear()+' ';
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
                        $scope.startTime = $scope.getDateString(modelValue);
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

            angular.extend($scope, {

                mk: {
                    //  autoDiscover: true
                    lat: 52.036,
                    lng: -0.7532501220703125,
                    zoom: 12
                },
                paths: {},
                markers: {},
                defaultIcon: {},
                defaults: {
                    scrollWheelZoom: false
                }

            });


        }


    ]);

