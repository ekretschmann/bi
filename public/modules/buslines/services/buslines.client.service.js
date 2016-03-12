'use strict';

//Locations service used to communicate Locations REST endpoints
angular.module('buslines').factory('Buslines', ['$resource',
  function($resource) {
    return $resource('buslines/:buslineId', { buslineId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
