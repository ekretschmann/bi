'use strict';

(function () {
    describe('DirectionsService', function () {
        //Initialize global variables
        var Service;


      //  console.log(ApplicationConfiguration.applicationModuleName);

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));




        beforeEach(inject(function (_DirectionsService_) {

            Service = _DirectionsService_;
        }));


        it('should find a alternative routs without changes with intermediate stops', function () {


        });




    });
})();
