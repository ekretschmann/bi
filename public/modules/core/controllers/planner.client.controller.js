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
            };


            $scope.slider = {
               value: Date.now(),
                options: {
                    hideLimitLabels: true,
                    floor: Date.now(),
                    ceil: Date.now()+1000*60*60*24,
                    interval: 60000,
                    getPointerColor: function(value) {
                        return '#2b669a';
                    },
                    getSelectionBarColor: function(value) {
                        return '#2b669a';
                    },
                    translate: function(value) {
                        //return new Date(value);
                        return '';
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

