'use strict';


angular.module('core').service('DirectionsService', [
    function () {

        this.getDirections = function (departure, destination, locations) {
            console.log('xxxx');
            console.log(departure);
            console.log(destination);
        };



    }
]);
