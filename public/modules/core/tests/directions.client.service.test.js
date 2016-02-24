'use strict';

(function () {
    describe('DirectionsService', function () {
        //Initialize global variables
        var Service;


        console.log(ApplicationConfiguration.applicationModuleName);

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));




        beforeEach(inject(function (_DirectionsService_) {
            Service = _DirectionsService_;
        }));


        it('should find route on one line with previous stop', function () {

            var departure = {
                lat: 29,
                lng: 29
            };

            var destination = {
                lat: 100,
                lng: 100
            };

            var stop1 = {
                name: 'Stop 1',
                lines: ['1'],
                departures: ['6.00'],
                lat: 10,
                lng: 10
            };

            var stop2 = {
                name: 'Stop 2',
                lines: ['1'],
                departures: ['6.20'],
                lat: 30,
                lng: 30
            };

            var stop3 = {
                name: 'Stop 3',
                lines: ['1'],
                arrivals: ['6.40'],
                lat: 60,
                lng: 60
            };

            var stop4 = {
                name: 'Stop 4',
                lines: ['1'],
                arrivals: ['7.00'],
                lat: 90,
                lng: 90
            };

            var line1 = {
                stops: [stop1, stop2, stop3]
            };


            var time = {
                hours: 5,
                minutes: 0
            };


            var journeyPlan = Service.getDirections(departure, destination, [line1]);


            expect(journeyPlan.departure.stop.name).toBe('Stop 2');
            expect(journeyPlan.destination.stop.name).toBe('Stop 4');
            expect(journeyPlan.departure.time).toBe('6.20');
            expect(journeyPlan.destination.time).toBe('7.00');
        });


        //it('should find route on one line with intermediate stop', function () {
        //
        //    var departure = {
        //        lat: 0,
        //        lng: 0
        //    };
        //
        //    var destination = {
        //        lat: 100,
        //        lng: 100
        //    };
        //
        //    var stop1 = {
        //        name: 'Stop 1',
        //        lines: ['1'],
        //        departures: ['6.00'],
        //        lat: 10,
        //        lng: 10
        //    };
        //
        //    var stop2 = {
        //        name: 'Stop 1',
        //        lines: ['1'],
        //        departures: ['6.30'],
        //        lat: 10,
        //        lng: 10
        //    };
        //
        //    var stop3 = {
        //        name: 'Stop 3',
        //        lines: ['1'],
        //        arrivals: ['7.00'],
        //        lat: 90,
        //        lng: 90
        //    };
        //
        //    var line1 = {
        //        stops: [stop1, stop2, stop3]
        //    };
        //
        //
        //    var time = {
        //        hours: 5,
        //        minutes: 0
        //    };
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, [line1]);
        //
        //
        //    expect(journeyPlan.departure.stop.name).toBe('Stop 1');
        //    expect(journeyPlan.destination.stop.name).toBe('Stop 3');
        //    expect(journeyPlan.departure.time).toBe('6.00');
        //    expect(journeyPlan.destination.time).toBe('7.00');
        //});
        //
        //it('should find simple route', function () {
        //
        //    var departure = {
        //        lat: 0,
        //        lng: 0
        //    };
        //
        //    var destination = {
        //        lat: 100,
        //        lng: 100
        //    };
        //
        //    var stop1 = {
        //        name: 'Stop 1',
        //        lines: ['1'],
        //        departures: ['6.00'],
        //        lat: 10,
        //        lng: 10
        //    };
        //
        //    var stop2 = {
        //        name: 'Stop 2',
        //        lines: ['1'],
        //        arrivals: ['7.00'],
        //        lat: 90,
        //        lng: 90
        //    };
        //
        //    var line1 = {
        //        stops: [stop1, stop2]
        //    };
        //
        //
        //    var time = {
        //        hours: 5,
        //        minutes: 0
        //    };
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, [line1]);
        //
        //
        //    expect(journeyPlan.departure.stop.name).toBe('Stop 1');
        //    expect(journeyPlan.destination.stop.name).toBe('Stop 2');
        //    expect(journeyPlan.departure.time).toBe('6.00');
        //    expect(journeyPlan.destination.time).toBe('7.00');
        //});
        //


    });
})();
