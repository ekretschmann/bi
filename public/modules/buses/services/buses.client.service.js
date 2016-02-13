'use strict';

//Buses service used to communicate Buses REST endpoints
angular.module('buses').factory('Buses', ['$resource',
	function($resource) {
		return $resource('buses/:busId', { busId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);