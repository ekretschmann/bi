'use strict';

angular.module('core').directive('focusOn', function() {
    return function(scope, elem, attr) {
        return {
            link: function(scope, element, attrs) {
                console.log('aaaa');
                scope.$watch(attrs.focusOn, function(value) {
                    if (value) {
                        console.log('xxxxx');
                    }
                });
            }
        };
    };
});
