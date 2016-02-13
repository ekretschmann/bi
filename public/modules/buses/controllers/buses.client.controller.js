'use strict';

// Buses controller
angular.module('buses').controller('BusesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Buses',
	function($scope, $stateParams, $location, Authentication, Buses) {
		$scope.authentication = Authentication;

		// Create new Bus
		$scope.create = function() {
			// Create new Bus object
			var bus = new Buses ({
				name: this.name
			});

			// Redirect after save
			bus.$save(function(response) {
				$location.path('buses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Bus
		$scope.remove = function(bus) {
			if ( bus ) { 
				bus.$remove();

				for (var i in $scope.buses) {
					if ($scope.buses [i] === bus) {
						$scope.buses.splice(i, 1);
					}
				}
			} else {
				$scope.bus.$remove(function() {
					$location.path('buses');
				});
			}
		};

		// Update existing Bus
		$scope.update = function() {
			var bus = $scope.bus;

			bus.$update(function() {
				$location.path('buses/' + bus._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Buses
		$scope.find = function() {
			$scope.buses = Buses.query();
		};

		// Find existing Bus
		$scope.findOne = function() {
			$scope.bus = Buses.get({ 
				busId: $stateParams.busId
			});
		};
	}
]);