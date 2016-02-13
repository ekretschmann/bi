'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'lodash', 'Authentication',
    function ($scope, $http, _, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;


        $scope.markers = [];


        $scope.init = function () {
            $http.get('/busservices/').then(function (response) {

                //$scope.info = response.data.Root.Services;

                $scope.busservices = [];
                for (var i = 0; i < response.data.Root.Services.length; i++) {
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
            }, paths: {},
            markers: {},
            defaults: {
                scrollWheelZoom: false
            }
        });

        $scope.displayBusRoute = function (id) {
            $scope.markers = [];
            $http.get('/busservices/' + id)
                .then(function (response) {
                   // $scope.info = response.data.Root.Locations;

                    for (var i = 0; i < response.data.Root.Locations.length; i++) {
                        var point = response.data.Root.Locations[i];
                        $scope.markers.push({
                            lat: point.Latitude,
                            lng: point.Longitude,
                            message: point.Name
                        });
                    }

                    $scope.info = response;
                });


            $scope.route = [[]];

            var routeIds = {
                '1': '32106',
                '2': '32919',
                '4': '32110',
                '5': '32451',
                '6': '37288',
                '7': '37292',
                '8': '32677'
            };
            if (routeIds[id]) {
                $http.get('/busroutes/'+routeIds[id])
                    .then(function (response) {
                        var data = response.data.r[Object.keys(response.data.r)[0]];


                        for (var i = 0; i < data.length; i++) {
                            $scope.route[0].push({
                                lat: data[i][0],
                                lng: data[i][1]
                            });
                        }
                    });

                $scope.info = $scope.route;
                $scope.paths = {};
                $scope.paths.p1 = {
                    color: 'blue',
                    weight: 2,
                    type: "multiPolyline",
                    latlngs: $scope.route
                };


            }


        };


    }


]);

angular.module('core').config(function ($logProvider) {
    $logProvider.debugEnabled(false);
});


