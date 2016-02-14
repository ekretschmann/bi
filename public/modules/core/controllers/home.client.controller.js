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

           // $scope.markers.m1.icon=$scope.markers.leafIcon;
        };



        angular.extend($scope, {

            mk: {
                //  autoDiscover: true
                lat: 52.036,
                lng: -0.7532501220703125,
                zoom: 12
            }, paths: {},
            markers: {},
            defaultIcon: {},
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
                            message: point.Name,
                            icon: {type: 'div',
                            html: '<div class="bus-icon"></div>',
                            className: 'map-marker bus-icon'}

                        });

                        //markers.m1.icon='makiMarkerIcon'; markers.m1.icon.icon='beer';
                    }

                    //$scope.info = response;
                });





            //if (routeIds[id]) {
                $http.get('/busroutes/'+id)
                    .then(function (response) {

                      //  console.log(response.data[0].path);

                        console.log(response);

                        var segments = response.data[0].path;


                        var route = [[]];
                        for (var i = 0; i < segments.length; i++) {
                            route[0].push({
                                lat: segments[i].lat,
                                lng: segments[i].lng
                            });
                          //  console.log(route[i].lat, route[i].lng);
                        }

                        console.log(route);

                        $scope.paths = {};
                        $scope.paths.p1 = {
                            color: 'blue',
                            weight: 2,
                            type: 'multiPolyline',
                            latlngs: route
                        };
                    });





            //}


        };


    }


]);

angular.module('core').config(function ($logProvider) {
    $logProvider.debugEnabled(false);
});


