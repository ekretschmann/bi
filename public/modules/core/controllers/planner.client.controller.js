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

