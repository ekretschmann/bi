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

        //it('should find a alternative routs without changes', function () {
        //
        //
        //    var departure = {
        //        lat: 50,
        //        lng: 50
        //    };
        //
        //    var destination = {
        //        lat: 100,
        //        lng: 100
        //    };
        //
        //    var stop1a = {
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1', '2'],
        //        line: '1',
        //        arrivals: ['05:50', '06:05', '06:20'],
        //        departures: ['05:51', '06:06', '06:21'],
        //        lat: 49,
        //        lng: 49
        //    };
        //
        //    var stop1b = {
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1', '2'],
        //        line: '2',
        //        arrivals: ['05:52', '06:07', '06:22'],
        //        departures: ['05:53', '06:08', '06:24'],
        //        lat: 49,
        //        lng: 49
        //    };
        //
        //    var stop2a = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1', '2'],
        //        line: '1',
        //        arrivals: ['06:10', '06:25', '06:40'],
        //        departures: ['06:11','06:26','06:41'],
        //        lat: 75,
        //        lng: 75
        //    };
        //
        //    var stop2b = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1', '2'],
        //        line: '2',
        //        arrivals: ['06:08', '06:23', '06:38'],
        //        departures: ['06:09','06:24','06:40'],
        //        lat: 75,
        //        lng: 75
        //    };
        //
        //
        //
        //    var line1 = {
        //        name: '1',
        //        stops: [stop1a, stop2a]
        //    };
        //
        //    var line2 = {
        //        name: '2',
        //        stops: [stop1b, stop2b]
        //    };
        //
        //    var time = '2013-02-08 06:00';
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, time, [line1, line2]);
        //    //var journeyPlan = Service.getDirections(departure, destination, time, [line1, line2]);
        //
        //    expect(journeyPlan.length).toBe(2);
        //
        //    var journey1 = journeyPlan[0];
        //    expect(journey1.departure.stop).toBe('Stop 1');
        //    expect(journey1.arrival.stop).toBe('Stop 2');
        //    expect(journey1.departure.time).toBe('06:08');
        //    expect(journey1.arrival.time).toBe('06:23');
        //    expect(journey1.changes.length).toBe(0);
        //
        //    var journey2 = journeyPlan[1];
        //    expect(journey2.departure.stop).toBe('Stop 1');
        //    expect(journey2.arrival.stop).toBe('Stop 2');
        //    expect(journey2.departure.time).toBe('06:06');
        //    expect(journey2.arrival.time).toBe('06:25');
        //    expect(journey2.changes.length).toBe(0);
        //    //expect(journeyPlan.departure.time).toBe('06:09');
        //    //expect(journeyPlan.destination.time).toBe('06:23');
        //    //expect(journeyPlan.destination.time).toBe('06:39');
        //    //expect(journeyPlan.changes.length).toBe(1);
        //    //expect(journeyPlan.changes[0].stop).toBe('Stop 2');
        //    //expect(journeyPlan.changes[0].arrival).toBe('06:09');
        //    //expect(journeyPlan.changes[0].departure).toBe('06:16');
        //
        //});

        //it('should find a alternative routs with a change', function () {
        //
        //
        //    var departure = {
        //        lat: 50,
        //        lng: 50
        //    };
        //
        //    var destination = {
        //        lat: 100,
        //        lng: 100
        //    };
        //
        //    var stop1a = {
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1', '3'],
        //        line: '1',
        //        arrivals: ['05:39', '05:59', '06:19'],
        //        departures: ['05:40', '06:00', '06:20'],
        //        lat: 49,
        //        lng: 49
        //    };
        //
        //    var stop1b = {
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1', '3'],
        //        line: '3',
        //        arrivals: ['05:45', '06:05', '06:25'],
        //        departures: ['05:46', '06:06', '06:26'],
        //        lat: 49,
        //        lng: 49
        //    };
        //
        //    var stop2a = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1', '2'],
        //        line: '1',
        //        arrivals: ['05:49', '06:09', '06:19'],
        //        departures: ['05:50','06:10','06:20'],
        //        lat: 75,
        //        lng: 75
        //    };
        //
        //    var stop2b = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1', '2'],
        //        line: '2',
        //        arrivals: ['06:15'],
        //        departures: ['06:16'],
        //        lat: 75,
        //        lng: 75
        //    };
        //
        //    var stop4a = {
        //        id: 's4',
        //        name: 'Stop 4',
        //        lines: ['2', '3'],
        //        line: '3',
        //        arrivals: ['05:50', '06:10', '06:30'],
        //        departures: ['05:51', '06:11', '06:31'],
        //        lat: 49,
        //        lng: 49
        //    };
        //
        //    var stop4b = {
        //        id: 's4',
        //        name: 'Stop 4',
        //        lines: ['2', '3'],
        //        line: '2',
        //        arrivals: ['05:59', '06:19', '06:39'],
        //        departures: ['06:00', '06:20', '06:40'],
        //        lat: 49,
        //        lng: 49
        //    };
        //
        //    var stop3a = {
        //        id: 's3',
        //        name: 'Stop 3',
        //        lines: ['2'],
        //        line: '2',
        //        arrivals: ['06:39'],
        //        departures: ['06:40'],
        //        lat: 99,
        //        lng: 99
        //    };
        //
        //
        //    var line1 = {
        //        name: '1',
        //        stops: [stop1a, stop2a]
        //    };
        //
        //    var line2 = {
        //        name: '2',
        //        stops: [stop2b, stop3a]
        //    };
        //
        //    var line3 = {
        //        name: '3',
        //        stops: [stop1b, stop3b]
        //    };
        //
        //    var line4 = {
        //        name: '4',
        //        stops: [stop2b, stop3b]
        //    };
        //
        //    var time = '2013-02-08 05:50';
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, time, [line1, line2]);
        //
        //
        //    expect(journeyPlan.departure.stop).toBe('Stop 1');
        //    expect(journeyPlan.destination.stop).toBe('Stop 3');
        //    expect(journeyPlan.departure.time).toBe('06:00');
        //    expect(journeyPlan.destination.time).toBe('06:39');
        //    expect(journeyPlan.changes.length).toBe(1);
        //    expect(journeyPlan.changes[0].stop).toBe('Stop 2');
        //    expect(journeyPlan.changes[0].arrival).toBe('06:09');
        //    expect(journeyPlan.changes[0].departure).toBe('06:16');
        //
        //});

        it('should find a route with a change', function () {


            var departure = {
                lat: 50,
                lng: 50
            };

            var destination = {
                lat: 100,
                lng: 100
            };

            var stop1 = {
                id: 's1',
                name: 'Stop 1',
                lines: ['1'],
                line: '1',
                arrivals: ['05:39', '05:59', '06:19'],
                departures: ['05:40', '06:00', '06:20'],
                lat: 49,
                lng: 49
            };

            var stop2a = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1', '2'],
                line: '1',
                arrivals: ['05:49', '06:09', '06:19'],
                departures: ['05:50','06:10','06:20'],
                lat: 75,
                lng: 75
            };

            var stop2b = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1', '2'],
                line: '2',
                arrivals: ['06:15'],
                departures: ['06:16'],
                lat: 75,
                lng: 75
            };

            var stop3 = {
                id: 's3',
                name: 'Stop 3',
                lines: ['2'],
                line: '2',
                arrivals: ['06:39'],
                departures: ['06:40'],
                lat: 99,
                lng: 99
            };


            var line1 = {
                name: '1',
                stops: [stop1, stop2a]
            };

            var line2 = {
                name: '2',
                stops: [stop2b, stop3]
            };

            var time = '2013-02-08 05:50';


            var journeyPlan = Service.getDirections(departure, destination, time, [line1, line2]);

            expect(journeyPlan.length).toBe(1);
            var journeyPlan1 = journeyPlan[0];

            //expect(journeyPlan1.departure.stop).toBe('Stop 1');
            //expect(journeyPlan1.arrival.stop).toBe('Stop 3');
            //expect(journeyPlan1.departure.time).toBe('06:00');
            //expect(journeyPlan1.arrival.time).toBe('06:39');
            //expect(journeyPlan1.changes.length).toBe(1);
            //expect(journeyPlan1.changes[0].stop).toBe('Stop 2');
            //expect(journeyPlan1.changes[0].arrival).toBe('06:09');
            //expect(journeyPlan1.changes[0].departure).toBe('06:16');

        });

        //it('should find earliest possible connection for simple route', function () {
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
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['05:59', '07:59', '09:59'],
        //        departures: ['06:00', '08:00', '10:00'],
        //        lat: 10,
        //        lng: 10
        //    };
        //
        //    var stop2 = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['07:00', '09:00', '11:00'],
        //        departures: ['07:01', '09:01', '11:01'],
        //        lat: 90,
        //        lng: 90
        //    };
        //
        //    var line1 = {
        //        name: '1',
        //        stops: [stop1, stop2]
        //    };
        //
        //
        //    var time = '2013-02-08 07:30';
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, time, [line1]);
        //
        //
        //    expect(journeyPlan.length).toBe(1);
        //    var journeyPlan1 = journeyPlan[0];
        //
        //    expect(journeyPlan1.departure.stop).toBe('Stop 1');
        //    expect(journeyPlan1.arrival.stop).toBe('Stop 2');
        //    expect(journeyPlan1.departure.time).toBe('08:00');
        //    expect(journeyPlan1.arrival.time).toBe('09:00');
        //});
        //
        //it('should find route on one line with follow on stops', function () {
        //
        //
        //    //var d1 = moment('09:30');
        //    //console.log(d1);
        //
        //    var departure = {
        //        lat: 29,
        //        lng: 29
        //    };
        //
        //    var destination = {
        //        lat: 100,
        //        lng: 100
        //    };
        //
        //    var stop1 = {
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['05:59'],
        //        departures: ['06:00'],
        //        lat: 10,
        //        lng: 10
        //    };
        //
        //    var stop2 = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['06:19'],
        //        departures: ['06:20'],
        //        lat: 30,
        //        lng: 30
        //    };
        //
        //    var stop3 = {
        //        id: 's3',
        //        name: 'Stop 3',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['06:39'],
        //        departures: ['06:40'],
        //        lat: 60,
        //        lng: 60
        //    };
        //
        //    var stop4 = {
        //        id: 's4',
        //        name: 'Stop 4',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['07:00'],
        //        departures: ['07:01'],
        //        lat: 90,
        //        lng: 90
        //    };
        //
        //    var stop5 = {
        //        id: 's5',
        //        name: 'Stop 5',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['07:20'],
        //        departures: ['07:21'],
        //        lat: 120,
        //        lng: 120
        //    };
        //
        //    var line1 = {
        //        name: '1',
        //        stops: [stop1, stop2, stop3, stop4, stop5]
        //    };
        //
        //
        //    var time = '2013-02-08 06:00';
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, time, [line1]);
        //
        //    expect(journeyPlan.length).toBe(1);
        //    var journeyPlan1 = journeyPlan[0];
        //
        //    expect(journeyPlan1.departure.stop).toBe('Stop 2');
        //    expect(journeyPlan1.arrival.stop).toBe('Stop 4');
        //    expect(journeyPlan1.departure.time).toBe('06:20');
        //    expect(journeyPlan1.arrival.time).toBe('07:00');
        //});
        //
        //it('should find route on one line with previous stop', function () {
        //
        //    var departure = {
        //        lat: 29,
        //        lng: 29
        //    };
        //
        //    var destination = {
        //        lat: 100,
        //        lng: 100
        //    };
        //
        //    var stop1 = {
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['05:59'],
        //        departures: ['06:00'],
        //        lat: 10,
        //        lng: 10
        //    };
        //
        //    var stop2 = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['06:19'],
        //        departures: ['06:20'],
        //        lat: 30,
        //        lng: 30
        //    };
        //
        //    var stop3 = {
        //        id: 's3',
        //        name: 'Stop 3',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['06:40'],
        //        departures: ['06:41'],
        //        lat: 60,
        //        lng: 60
        //    };
        //
        //    var stop4 = {
        //        id: 's4',
        //        name: 'Stop 4',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['07:00'],
        //        departures: ['07:21'],
        //        lat: 90,
        //        lng: 90
        //    };
        //
        //    var line1 = {
        //        name: '1',
        //        stops: [stop1, stop2, stop3, stop4]
        //    };
        //
        //
        //    var time = '2013-02-08 06:00';
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, time, [line1]);
        //
        //    expect(journeyPlan.length).toBe(1);
        //    var journeyPlan1 = journeyPlan[0];
        //
        //    expect(journeyPlan1.departure.stop).toBe('Stop 2');
        //    expect(journeyPlan1.arrival.stop).toBe('Stop 4');
        //    expect(journeyPlan1.departure.time).toBe('06:20');
        //    expect(journeyPlan1.arrival.time).toBe('07:00');
        //});
        //
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
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['05:59'],
        //        departures: ['06:00'],
        //        lat: 10,
        //        lng: 10
        //    };
        //
        //    var stop2 = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['06:29'],
        //        departures: ['06:30'],
        //        lat: 10,
        //        lng: 10
        //    };
        //
        //    var stop3 = {
        //        id: 's3',
        //        name: 'Stop 3',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['07:00'],
        //        departures: ['07:01'],
        //        lat: 90,
        //        lng: 90
        //    };
        //
        //    var line1 = {
        //        name: '1',
        //        stops: [stop1, stop2, stop3]
        //    };
        //
        //
        //    var time = '2013-02-08 05:40';
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, time, [line1]);
        //
        //
        //    expect(journeyPlan.length).toBe(1);
        //    var journeyPlan1 = journeyPlan[0];
        //
        //    expect(journeyPlan1.departure.stop).toBe('Stop 1');
        //    expect(journeyPlan1.arrival.stop).toBe('Stop 3');
        //    expect(journeyPlan1.departure.time).toBe('06:00');
        //    expect(journeyPlan1.arrival.time).toBe('07:00');
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
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['05:59'],
        //        departures: ['06:00'],
        //        lat: 10,
        //        lng: 10
        //    };
        //
        //    var stop2 = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['07:00'],
        //        departures: ['07:01'],
        //        lat: 90,
        //        lng: 90
        //    };
        //
        //    var line1 = {
        //        name: '1',
        //        stops: [stop1, stop2]
        //    };
        //
        //
        //    var time = '2013-02-08 05:40';
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, time, [line1]);
        //
        //    expect(journeyPlan.length).toBe(1);
        //    var journeyPlan1 = journeyPlan[0];
        //
        //
        //    expect(journeyPlan1.departure.stop).toBe('Stop 1');
        //    expect(journeyPlan1.arrival.stop).toBe('Stop 2');
        //    expect(journeyPlan1.departure.time).toBe('06:00');
        //    expect(journeyPlan1.arrival.time).toBe('07:00');
        //});
        //


    });
})();
