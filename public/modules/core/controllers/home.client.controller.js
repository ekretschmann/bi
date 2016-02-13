'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'lodash', 'Authentication',
    function ($scope, $http, _, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;


        $scope.markers = [];

        $scope.init = function() {
            $http.get('/busservices/').then(function (response) {

                $scope.info = response.data.Root.Services;

                $scope.busservices = [];
                for (var i=0; i< response.data.Root.Services.length; i++) {
                    $scope.busservices.push(response.data.Root.Services[i]);
                }
            });


        };



        angular.extend($scope, {
            mk: {
                //  autoDiscover: true
                lat: 52.036,
                lng: -0.7532501220703125,
                zoom: 12
            }, defaults: {
                scrollWheelZoom: false
            }
        });

        $scope.displayBusRoute = function (id) {
            $scope.markers = [];
            $http.get('/busservices/' + id)
                .then(function (response) {
                    $scope.info = response.data.Root.Locations;

                    for (var i=0; i< $scope.info.length; i++) {
                        $scope.markers.push({
                            lat: $scope.info[i].Latitude,
                            lng: $scope.info[i].Longitude,
                            message: $scope.info[i].Name
                        });
                    }

                    //$scope.markers = addressPointsToMarkers(data);

                });


            // $scope.info = 'test';
        };


    }
]);

angular.module('core').config(function ($logProvider) {
    $logProvider.debugEnabled(false);
});


