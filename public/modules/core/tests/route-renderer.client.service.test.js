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

        it('should render route with a change', function () {

            var journey = {
                arrivalLine: 'b', arrivalStopId: '5b', arrivalTime: '06:10',
                departureLine: 'a', departureStopId: '1a', departureTime: '06:00',
                changes: [
                    {departureTime: '06:10', line: 'a', stopId: '1a'},
                    {arrivalTime: '06:20', line: 'a', stopId: '3ab'},
                    {departureTime: '06:30', line: 'b', stopId: '3ab'},
                    {arrivalTime: '06:40', line: 'b', stopId: '5b'}
                ]};

            var stop1a = {id: '1a', name: 'Stop 1a', lat: 100, lng: 100};
            var stop2a = {id: '2a', name: 'Stop 2a', lat: 110, lng: 120};
            var stop3ab = {id: '3ab', name: 'Stop 3ab', lat: 120, lng: 140};
            var stop4a = {id: '4a', name: 'Stop 4a', lat: 130, lng: 160};
            var stop5a = {id: '5a', name: 'Stop 5a', lat: 140, lng: 180};

            var stop1b = {id: '1b', name: 'Stop 1b', lat: 80, lng: 100};
            var stop2b = {id: '2b', name: 'Stop 2b', lat: 100, lng: 120};
            var stop4b = {id: '4b', name: 'Stop 4b', lat: 140, lng: 160};
            var stop5b = {id: '5b', name: 'Stop 5b', lat: 160, lng: 180};


            var buslines = [];
            buslines.push({
                id: 'a',
                stops: ['1a', '2a', '3ab', '4a', '5a']
            });

            buslines.push({
                id: 'b',
                stops: ['1b', '2b', '3ab', '4b', '5b']
            });

            var markers = [];
            var paths = {};
            var stops = {'1a': stop1a, '2a':stop2a, '3ab': stop3ab, '4a':stop4a, '5a':stop5a,
                '1b': stop1b, '2b':stop2b, '4b':stop4b, '5b':stop5b};

            Service.drawJourney(journey, buslines, stops, markers, paths);

            var expectedStartMarker = {lat: 100, lng: 100, icon: Service.busstopDepartureIcon};
            var expectedBusstopMarker1 = {lat: 110, lng: 120, icon: Service.busstopIcon};
            var expectedChangeMarker = {lat: 120, lng: 140, icon: Service.busstopChangeIcon};
            var expectedBusstopMarker2 = {lat: 140, lng: 160, icon: Service.busstopIcon};
            var expectedEndMarker = {lat: 160, lng: 180, icon: Service.busstopArrivalIcon};

            expect(markers.length).toBe(5);
            expect(markers).toContain(expectedStartMarker);
            expect(markers).toContain(expectedBusstopMarker1);
            expect(markers).toContain(expectedChangeMarker);
            expect(markers).toContain(expectedBusstopMarker2);
            expect(markers).toContain(expectedEndMarker);

            expect(paths.journey.latlngs.length).toBe(5);
            expect(paths.journey.latlngs[0]).toEqual({lat: 100, lng: 100});
            expect(paths.journey.latlngs[1]).toEqual({lat: 110, lng: 120});
            expect(paths.journey.latlngs[2]).toEqual({lat: 120, lng: 140});
            expect(paths.journey.latlngs[3]).toEqual({lat: 140, lng: 160});
            expect(paths.journey.latlngs[4]).toEqual({lat: 160, lng: 180});

        });

        it('should render one line route with previous stop', function () {

            var journey = {
                arrivalLine: '1', arrivalStopId: '5a', arrivalTime: '06:10',
                departureLine: '1', departureStopId: '3a', departureTime: '06:00',
                changes: [
                    {departureTime: '06:11', line: '1', stopId: '3a'},
                    {arrivalTime: '06:50', line: '1', stopId: '5a'}
                ]};

            var stop1 = {id: '1a', name: 'Stop 1a', lat: 100, lng: 100};
            var stop2 = {id: '2a', name: 'Stop 2a', lat: 110, lng: 120};
            var stop3 = {id: '3a', name: 'Stop 3a', lat: 120, lng: 140};
            var stop4 = {id: '4a', name: 'Stop 4a', lat: 130, lng: 160};
            var stop5 = {id: '5a', name: 'Stop 5a', lat: 140, lng: 180};

            var buslines = [];
            buslines.push({
                id: '1',
                stops: ['1a', '2a', '3a', '4a', '5a']
            });

            var markers = [];
            var paths = {};
            var stops = {'1a': stop1, '2a':stop2, '3a': stop3, '4a':stop4, '5a':stop5};

            Service.drawJourney(journey, buslines, stops, markers, paths);

            var expectedStartMarker = {lat: 120, lng: 140, icon: Service.busstopDepartureIcon};
            var expectedBusstopMarker = {lat: 130, lng: 160, icon: Service.busstopIcon};
            var expectedEndMarker = {lat: 140, lng: 180, icon: Service.busstopArrivalIcon};

            expect(markers.length).toBe(3);
            expect(markers).toContain(expectedStartMarker);
            expect(markers).toContain(expectedBusstopMarker);
            expect(markers).toContain(expectedEndMarker);

            expect(paths.journey.latlngs.length).toBe(3);
            expect(paths.journey.latlngs[0]).toEqual({lat: 120, lng: 140});
            expect(paths.journey.latlngs[1]).toEqual({lat: 130, lng: 160});
            expect(paths.journey.latlngs[2]).toEqual({lat: 140, lng: 180});

        });

        it('should render one line route with two intermediary stop', function () {

            var journey = {
                arrivalLine: '1', arrivalStopId: '4a', arrivalTime: '06:10',
                departureLine: '1', departureStopId: '1a', departureTime: '06:00',
                changes: [
                    {departureTime: '06:11', line: '1', stopId: '1a'},
                    {arrivalTime: '06:50', line: '1', stopId: '4a'}
                ]};

            var stop1 = {id: '1a', name: 'Stop 1a', lat: 100, lng: 100};
            var stop2 = {id: '2a', name: 'Stop 2a', lat: 110, lng: 110};
            var stop3 = {id: '3a', name: 'Stop 3a', lat: 120, lng: 120};
            var stop4 = {id: '4a', name: 'Stop 3a', lat: 130, lng: 150};

            var buslines = [];
            buslines.push({
                id: '1',
                stops: ['1a', '2a', '3a', '4a']
            });

            var markers = [];
            var paths = {};
            var stops = {'1a': stop1, '2a':stop2, '3a': stop3, '4a':stop4};
            Service.drawJourney(journey, buslines, stops, markers, paths);

            var expectedStartMarker = {lat: 100, lng: 100, icon: Service.busstopDepartureIcon};
            var expectedBusstopMarker1 = {lat: 110, lng: 110, icon: Service.busstopIcon};
            var expectedBusstopMarker2 = {lat: 120, lng: 120, icon: Service.busstopIcon};
            var expectedEndMarker = {lat: 130, lng: 150, icon: Service.busstopArrivalIcon};

            expect(markers.length).toBe(4);
            expect(markers).toContain(expectedStartMarker);
            expect(markers).toContain(expectedBusstopMarker1);
            expect(markers).toContain(expectedBusstopMarker2);
            expect(markers).toContain(expectedEndMarker);


            expect(paths.journey.latlngs.length).toBe(4);
            expect(paths.journey.latlngs[0]).toEqual({lat: 100, lng: 100});
            expect(paths.journey.latlngs[1]).toEqual({lat: 110, lng: 110});
            expect(paths.journey.latlngs[2]).toEqual({lat: 120, lng: 120});
            expect(paths.journey.latlngs[3]).toEqual({lat: 130, lng: 150});


        });


        it('should render one line route with one intermediary stop', function () {

            var journey = {
                arrivalLine: '1', arrivalStopId: '3a', arrivalTime: '06:10',
                departureLine: '1', departureStopId: '1a', departureTime: '06:00',
                changes: [
                    {departureTime: '06:11', line: '1', stopId: '1a'},
                    {arrivalTime: '06:50', line: '1', stopId: '3a'}
                ]};


            var stop1 = {id: '1a', name: 'Stop 1a', lat: 100, lng: 100};
            var stop2 = {id: '2a', name: 'Stop 2a', lat: 110, lng: 110};
            var stop3 = {id: '3a', name: 'Stop 3a', lat: 120, lng: 120};

            var stops = {'1a': stop1, '2a':stop2, '3a': stop3};

            var buslines = [];
            buslines.push({
                id: '1',
                stops: ['1a', '2a', '3a']
            });

            var markers = [];
            var paths = {};
            Service.drawJourney(journey, buslines, stops, markers, paths);

            var expectedStartMarker = {lat: 100, lng: 100, icon: Service.busstopDepartureIcon};
            var expectedBusstopMarker = {lat: 110, lng: 110, icon: Service.busstopIcon};
            var expectedEndMarker = {lat: 120, lng: 120, icon: Service.busstopArrivalIcon};

            expect(markers.length).toBe(3);
            expect(markers).toContain(expectedStartMarker);
            expect(markers).toContain(expectedBusstopMarker);
            expect(markers).toContain(expectedEndMarker);

            expect(paths.journey.latlngs.length).toBe(3);
            expect(paths.journey.latlngs[0]).toEqual({lat: 100, lng: 100});
            expect(paths.journey.latlngs[1]).toEqual({lat: 110, lng: 110});
            expect(paths.journey.latlngs[2]).toEqual({lat: 120, lng: 120});


        });


        it('should render trivial route', function () {

            var journey = {
            arrivalLine: '1', arrivalStopId: '2a', arrivalTime: '06:10',
            departureLine: '1', departureStopId: '1a', departureTime: '06:00',
            changes: [
                {departureTime: '06:11', line: '1', stopId: '1a'},
                {arrivalTime: '06:50', line: '1', stopId: '2a'}
            ]};

            var stop1 = {id: '1a', name: 'Stop 1a', lat: 100, lng: 100};
            var stop2 = {id: '2a', name: 'Stop 2a', lat: 110, lng: 110};
            var stops = {'1a': stop1, '2a':stop2};
            var buslines = [];

            buslines.push({
                id: '1',
                stops: ['1a', '2a']
            });

            var markers = [];
            var paths = {};
            Service.drawJourney(journey, buslines, stops, markers, paths);

            var expectedStartMarker = {lat: 100, lng: 100, icon: Service.busstopDepartureIcon};
            var expectedEndMarker = {lat: 110, lng: 110, icon: Service.busstopArrivalIcon};

            expect(markers.length).toBe(2);
            expect(markers).toContain(expectedStartMarker);
            expect(markers).toContain(expectedEndMarker);

            expect(paths.journey.latlngs.length).toBe(2);
            expect(paths.journey.latlngs[0]).toEqual({lat: 100, lng: 100});
            expect(paths.journey.latlngs[1]).toEqual({lat: 110, lng: 110});

        });


    });
})();
