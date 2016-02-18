'use strict';

// Locations controller
angular.module('locations').controller('LocationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Locations',
	function($scope, $stateParams, $location, Authentication, Locations) {
		$scope.authentication = Authentication;

		$scope.lines = [];

		$scope.addLine = function() {
			$scope.lines.push($scope.newLine);
			$scope.newLine = '';
		};

		$scope.createBusstop = function() {
			// Create new Location object
			var busstop = new Locations({
				name: this.name,
				lat: this.lat,
				lng: this.lng,
				info: $scope.lines
			});

			busstop.$save(function(response) {
				$location.path('locations/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Create new Location
		$scope.create = function() {
			// Create new Location object
			var location = new Locations ({
				name: this.name,
				info: this.info
			});

			console.log(location);

			// Redirect after save
			//location.$save(function(response) {
			//	$location.path('locations/' + response._id);
            //
			//	// Clear form fields
			//	$scope.name = '';
			//}, function(errorResponse) {
			//	$scope.error = errorResponse.data.message;
			//});
		};

		// Remove existing Location
		$scope.remove = function(location) {
			if ( location ) { 
				location.$remove();

				for (var i in $scope.locations) {
					if ($scope.locations [i] === location) {
						$scope.locations.splice(i, 1);
					}
				}
			} else {
				$scope.location.$remove(function() {
					$location.path('locations');
				});
			}
		};

		// Update existing Location
		$scope.update = function() {
			var location = $scope.location;

			location.$update(function() {
				$location.path('locations/' + location._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Locations
		$scope.find = function() {
			$scope.locations = Locations.query();
		};

		// Find existing Location
		$scope.findOne = function() {
			$scope.location = Locations.get({
				locationId: $stateParams.locationId
			});
		};
	}
]);
