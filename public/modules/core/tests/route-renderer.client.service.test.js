'use strict';

(function () {
    describe('RouteRenderService', function () {
        //Initialize global variables
        var Service;


      //  console.log(ApplicationConfiguration.applicationModuleName);

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));




        beforeEach(inject(function (_RouteRenderService_) {

            Service = _RouteRenderService_;
        }));


        fit('should render trivial route with one intermediary stop', function () {

            var journey = {
                arrivalLine: '1', arrivalStop: '3a', arrivalTime: '06:10',
                departureLine: '1', departureStop: '1a', departureTime: '06:00',
                changes: [
                    {departureTime: '06:11', line: '1', stop: '1a'},
                    {arrivalTime: '06:50', line: '1', stop: '3a'}
                ]};


            var buslines = [];
            buslines.push({
                stops: [
                    {id: '1a', name: 'Stop 1a', lat: 100, lng: 100},
                    {id: '2a', name: 'Stop 2a', lat: 110, lng: 110},
                    {id: '3a', name: 'Stop 3a', lat: 120, lng: 120}
                ]
            });

            var markers = [];
            var paths = {};
            Service.drawJourney(journey, buslines, markers, paths);

            var expectedStartMarker = {
                lat: 100, lng: 100, icon: Service.busstopDepartureIcon
            };

            var expectedBusstopMarker = {
                lat: 110, lng: 110, icon: Service.busstopIcon
            };

            var expectedEndMarker = {
                lat: 120, lng: 120, icon: Service.busstopArrivalIcon
            };

            expect(markers.length).toBe(3);
            expect(markers).toContain(expectedStartMarker);
            expect(markers).toContain(expectedBusstopMarker);
            expect(markers).toContain(expectedEndMarker);


            //expect(paths.journey.latlngs.length).toBe(2);
            //expect(paths.journey.latlngs[0]).toEqual({lat: 100, lng: 100});
            //expect(paths.journey.latlngs[1]).toEqual({lat: 110, lng: 110});
            //expect(paths.journey.latlngs[2]).toEqual({lat: 120, lng: 120});
            //console.log(paths.journey.latlngs);

        });

        it('should render trivial route', function () {

            var journey = {
            arrivalLine: '1', arrivalStop: '2a', arrivalTime: '06:10',
            departureLine: '1', departureStop: '1a', departureTime: '06:00',
            changes: [
                {departureTime: '06:11', line: '1', stop: '1a'},
                {arrivalTime: '06:50', line: '1', stop: '2a'}
            ]};


            var buslines = [];
            buslines.push({
                stops: [
                    {id: '1a', name: 'Stop 1a', lat: 100, lng: 100},
                    {id: '2a', name: 'Stop 2a', lat: 110, lng: 110}
                ]
            });

            var markers = [];
            var paths = {};
            Service.drawJourney(journey, buslines, markers, paths);

            var expectedStartMarker = {
                lat: 100, lng: 100, icon: Service.busstopDepartureIcon
            };

            var expectedEndMarker = {
                lat: 110, lng: 110, icon: Service.busstopArrivalIcon
            };

            expect(markers.length).toBe(2);
            expect(markers).toContain(expectedStartMarker);
            expect(markers).toContain(expectedEndMarker);


            expect(paths.journey.latlngs.length).toBe(2);
            expect(paths.journey.latlngs[0]).toEqual({lat: 100, lng: 100});
            expect(paths.journey.latlngs[1]).toEqual({lat: 110, lng: 110});
            //console.log(paths.journey.latlngs);

        });


    });
})();
