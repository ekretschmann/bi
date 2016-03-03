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

        //it('should find alternative routes with 2 changes', function () {
        //
        //    var departure = {
        //        lat: 50,
        //        lng: 50
        //    };
        //
        //    var destination = {
        //        lat: 86,
        //        lng: 86
        //    };
        //
        //    var stop1 = {
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['06:00', '07:00', '08:0'],
        //        departures: ['06:01', '07:01', '08:01'],
        //        lat: 49,
        //        lng: 49
        //    };
        //
        //    var stop2a = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1', '2', '3'],
        //        line: '1',
        //        arrivals: ['06:05', '07:05', '08:05'],
        //        departures: ['06:06', '07:06', '08:06'],
        //        lat: 60,
        //        lng: 60
        //    };
        //
        //    var stop2b = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1', '2', '3'],
        //        line: '2',
        //        arrivals: ['06:10', '07:10', '08:10'],
        //        departures: ['06:11','07:11','08:11'],
        //        lat: 60,
        //        lng: 60
        //    };
        //
        //    var stop2c = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1', '2', '3'],
        //        line: '3',
        //        arrivals: ['06:20', '07:20', '08:20'],
        //        departures: ['06:21','07:21','08:21'],
        //        lat: 60,
        //        lng: 60
        //    };
        //
        //    var stop3b = {
        //        id: 's3',
        //        name: 'Stop 3',
        //        lines: ['2', '3', '4'],
        //        line: '2',
        //        arrivals: ['06:30', '07:30', '08:30'],
        //        departures: ['06:31','07:31','08:31'],
        //        lat: 75,
        //        lng: 75
        //    };
        //
        //    var stop3c = {
        //        id: 's3',
        //        name: 'Stop 3',
        //        lines: ['2', '3', '4'],
        //        line: '3',
        //        arrivals: ['06:25', '07:25', '08:25'],
        //        departures: ['06:26','07:26','08:26'],
        //        lat: 75,
        //        lng: 75
        //    };
        //
        //    var stop3d = {
        //        id: 's3',
        //        name: 'Stop 3',
        //        lines: ['2', '3', '4'],
        //        line: '4',
        //        arrivals: ['06:40', '07:40', '08:40'],
        //        departures: ['06:41','07:41','08:41'],
        //        lat: 75,
        //        lng: 75
        //    };
        //
        //
        //    var stop4 = {
        //        id: 's4',
        //        name: 'Stop 4',
        //        lines: ['4'],
        //        line: '4',
        //        arrivals: ['06:50', '07:50', '08:50'],
        //        departures: ['06:51','07:51','08:51'],
        //        lat: 85,
        //        lng: 85
        //    };
        //
        //
        //    var line1 = {
        //        name: '1',
        //        stops: [stop1, stop2a]
        //    };
        //
        //    var line2 = {
        //        name: '2',
        //        stops: [stop2b, stop3b]
        //    };
        //
        //
        //    var line3 = {
        //        name: '3',
        //        stops: [stop2c, stop3c]
        //    };
        //
        //    var line4 = {
        //        name: '4',
        //        stops: [stop3d, stop4]
        //    };
        //
        //    var time = '2013-02-08 06:30';
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, time, [line1, line2, line3, line4]);
        //
        //    expect(journeyPlan.length).toBe(1);
        //
        //    var plan1 = journeyPlan[0];
        //
        //
        //
        //    //var plan2 = journeyPlan[1];
        //    //
        //    expect(plan1.length).toBe(6);
        //    var s1a = plan1[0];
        //    var s1b = plan1[1];
        //    var s1c = plan1[2];
        //    var s1d = plan1[3];
        //    var s1e = plan1[4];
        //    var s1f = plan1[5];
        //
        //    expect(plan1.departureTime).toBe('07:01');
        //    expect(plan1.departureStop).toBe('Stop 1');
        //    expect(plan1.departureLine).toBe('1');
        //
        //    //expect(plan1.arrivalTime).toBe('07:50');
        //    //expect(plan1.arrivalStop).toBe('Stop 4');
        //    //expect(plan1.arrivalLine).toBe('4');
        //
        //
        //    //expect(s1a.stop).toBe('Stop 1');
        //    //expect(s1a.departureTime).toBe('07:01');
        //    //expect(s1a.line).toBe('1');
        //    //
        //    //expect(s1b.stop).toBe('Stop 2');
        //    //expect(s1b.arrivalTime).toBe('07:05');
        //    //expect(s1b.line).toBe('1');
        //    //
        //    //expect(s1c.stop).toBe('Stop 2');
        //    //expect(s1c.departureTime).toBe('07:21');
        //    //expect(s1c.line).toBe('3');
        //    //
        //    //expect(s1d.stop).toBe('Stop 3');
        //    //expect(s1d.arrivalTime).toBe('07:25');
        //    //expect(s1d.line).toBe('3');
        //    //
        //    //
        //    //expect(plan2.length).toBe(4);
        //    //var s2a = plan2[0];
        //    //var s2b = plan2[1];
        //    //var s2c = plan2[2];
        //    //var s2d = plan2[3];
        //    //
        //    //expect(plan2.departureTime).toBe('07:01');
        //    //expect(plan2.departureStop).toBe('Stop 1');
        //    //expect(plan2.departureLine).toBe('1');
        //    //
        //    //expect(plan2.arrivalTime).toBe('07:30');
        //    //expect(plan2.arrivalStop).toBe('Stop 3');
        //    //expect(plan2.arrivalLine).toBe('2');
        //    //
        //    //
        //    //expect(s2a.stop).toBe('Stop 1');
        //    //expect(s2a.departureTime).toBe('07:01');
        //    //expect(s2a.line).toBe('1');
        //    //
        //    //expect(s2b.stop).toBe('Stop 2');
        //    //expect(s2b.arrivalTime).toBe('07:05');
        //    //expect(s2b.line).toBe('1');
        //    //
        //    //expect(s2c.stop).toBe('Stop 2');
        //    //expect(s2c.departureTime).toBe('07:11');
        //    //expect(s2c.line).toBe('2');
        //    //
        //    //expect(s2d.stop).toBe('Stop 3');
        //    //expect(s2d.arrivalTime).toBe('07:30');
        //    //expect(s2d.line).toBe('2');
        //
        //});

        //it('should find alternative routes with change', function () {
        //
        //    var departure = {
        //        lat: 50,
        //        lng: 50
        //    };
        //
        //    var destination = {
        //        lat: 76,
        //        lng: 76
        //    };
        //
        //    var stop1 = {
        //        id: 's1',
        //        name: 'Stop 1',
        //        lines: ['1'],
        //        line: '1',
        //        arrivals: ['06:00', '07:00', '08:0'],
        //        departures: ['06:01', '07:01', '08:01'],
        //        lat: 49,
        //        lng: 49
        //    };
        //
        //    var stop2a = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1', '2', '3'],
        //        line: '1',
        //        arrivals: ['06:05', '07:05', '08:05'],
        //        departures: ['06:06', '07:06', '08:06'],
        //        lat: 60,
        //        lng: 60
        //    };
        //
        //    var stop2b = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1', '2', '3'],
        //        line: '2',
        //        arrivals: ['06:10', '07:10', '08:10'],
        //        departures: ['06:11','07:11','08:11'],
        //        lat: 60,
        //        lng: 60
        //    };
        //
        //    var stop2c = {
        //        id: 's2',
        //        name: 'Stop 2',
        //        lines: ['1', '2', '3'],
        //        line: '3',
        //        arrivals: ['06:20', '07:20', '08:20'],
        //        departures: ['06:21','07:21','08:21'],
        //        lat: 60,
        //        lng: 60
        //    };
        //
        //    var stop3b = {
        //        id: 's3',
        //        name: 'Stop 3',
        //        lines: ['2', '3'],
        //        line: '2',
        //        arrivals: ['06:30', '07:30', '08:30'],
        //        departures: ['06:31','07:31','08:31'],
        //        lat: 75,
        //        lng: 75
        //    };
        //
        //    var stop3c = {
        //        id: 's3',
        //        name: 'Stop 3',
        //        lines: ['2', '3'],
        //        line: '3',
        //        arrivals: ['06:25', '07:25', '08:25'],
        //        departures: ['06:26','07:26','08:26'],
        //        lat: 75,
        //        lng: 75
        //    };
        //
        //
        //
        //    var line1 = {
        //        name: '1',
        //        stops: [stop1, stop2a]
        //    };
        //
        //    var line2 = {
        //        name: '2',
        //        stops: [stop2b, stop3b]
        //    };
        //
        //
        //    var line3 = {
        //        name: '3',
        //        stops: [stop2c, stop3c]
        //    };
        //
        //    var time = '2013-02-08 06:30';
        //
        //
        //    var journeyPlan = Service.getDirections(departure, destination, time, [line1, line2, line3]);
        //
        //    expect(journeyPlan.length).toBe(2);
        //
        //    //var plan1 = journeyPlan[0];
        //    //var plan2 = journeyPlan[1];
        //    //
        //    //expect(plan1.length).toBe(4);
        //    //var s1a = plan1[0];
        //    //var s1b = plan1[1];
        //    //var s1c = plan1[2];
        //    //var s1d = plan1[3];
        //    //
        //    //expect(plan1.departureTime).toBe('07:01');
        //    //expect(plan1.departureStop).toBe('Stop 1');
        //    //expect(plan1.departureLine).toBe('1');
        //    //
        //    //expect(plan1.arrivalTime).toBe('07:25');
        //    //expect(plan1.arrivalStop).toBe('Stop 3');
        //    //expect(plan1.arrivalLine).toBe('3');
        //    //
        //    //
        //    //expect(s1a.stop).toBe('Stop 1');
        //    //expect(s1a.departureTime).toBe('07:01');
        //    //expect(s1a.line).toBe('1');
        //    //
        //    //expect(s1b.stop).toBe('Stop 2');
        //    //expect(s1b.arrivalTime).toBe('07:05');
        //    //expect(s1b.line).toBe('1');
        //    //
        //    //expect(s1c.stop).toBe('Stop 2');
        //    //expect(s1c.departureTime).toBe('07:21');
        //    //expect(s1c.line).toBe('3');
        //    //
        //    //expect(s1d.stop).toBe('Stop 3');
        //    //expect(s1d.arrivalTime).toBe('07:25');
        //    //expect(s1d.line).toBe('3');
        //    //
        //    //
        //    //expect(plan2.length).toBe(4);
        //    //var s2a = plan2[0];
        //    //var s2b = plan2[1];
        //    //var s2c = plan2[2];
        //    //var s2d = plan2[3];
        //    //
        //    //expect(plan2.departureTime).toBe('07:01');
        //    //expect(plan2.departureStop).toBe('Stop 1');
        //    //expect(plan2.departureLine).toBe('1');
        //    //
        //    //expect(plan2.arrivalTime).toBe('07:30');
        //    //expect(plan2.arrivalStop).toBe('Stop 3');
        //    //expect(plan2.arrivalLine).toBe('2');
        //    //
        //    //
        //    //expect(s2a.stop).toBe('Stop 1');
        //    //expect(s2a.departureTime).toBe('07:01');
        //    //expect(s2a.line).toBe('1');
        //    //
        //    //expect(s2b.stop).toBe('Stop 2');
        //    //expect(s2b.arrivalTime).toBe('07:05');
        //    //expect(s2b.line).toBe('1');
        //    //
        //    //expect(s2c.stop).toBe('Stop 2');
        //    //expect(s2c.departureTime).toBe('07:11');
        //    //expect(s2c.line).toBe('2');
        //    //
        //    //expect(s2d.stop).toBe('Stop 3');
        //    //expect(s2d.arrivalTime).toBe('07:30');
        //    //expect(s2d.line).toBe('2');
        //
        //});

        it('should find a alternative routs without changes with intermediate stops', function () {

            var departure = {
                lat: 50,
                lng: 50
            };

            var destination = {
                lat: 76,
                lng: 76
            };

            var stopB1a = {
                id: 'sB1a',
                name: 'Stop Before 1a',
                lines: ['1'],
                line: '1',
                arrivals: ['05:40', '05:55', '06:05'],
                departures: ['05:41', '05:56', '06:06'],
                lat: 30,
                lng: 30
            };

            var stop1a = {
                id: 's1',
                name: 'Stop 1',
                lines: ['1', '2'],
                line: '1',
                arrivals: ['05:50', '06:05', '06:20'],
                departures: ['05:51', '06:06', '06:21'],
                lat: 49,
                lng: 49
            };

            var stopI1a = {
                id: 'sI1a',
                name: 'Stop Intermediate 1a',
                lines: ['1'],
                line: '1',
                arrivals: ['06:00', '06:15', '06:30'],
                departures: ['06:01', '06:16', '06:31'],
                lat: 60,
                lng: 60
            };

            var stop2a = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1', '2'],
                line: '1',
                arrivals: ['06:10', '06:25', '06:40'],
                departures: ['06:11','06:26','06:41'],
                lat: 75,
                lng: 75
            };

            var stopA2a = {
                id: 'sA2a',
                name: 'Stop After 2a',
                lines: ['1'],
                line: '1',
                arrivals: ['06:20', '06:35', '06:45'],
                departures: ['06:21', '06:36', '06:46'],
                lat: 80,
                lng: 80
            };

            var stopB1b = {
                id: 'sB1b',
                name: 'Stop Before 1b',
                lines: ['2'],
                line: '2',
                arrivals: ['05:40', '05:55', '06:05'],
                departures: ['05:41', '05:56', '06:06'],
                lat: 25,
                lng: 25
            };

            var stop1b = {
                id: 's1',
                name: 'Stop 1',
                lines: ['1', '2'],
                line: '2',
                arrivals: ['05:52', '06:07', '06:22'],
                departures: ['05:53', '06:08', '06:24'],
                lat: 49,
                lng: 49
            };

            var stopI1b = {
                id: 'sI1b',
                name: 'Stop Intermediate ba',
                lines: ['2'],
                line: '2',
                arrivals: ['06:00', '06:15', '06:30'],
                departures: ['06:01', '06:16', '06:31'],
                lat: 62,
                lng: 62
            };


            var stop2b = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1', '2'],
                line: '2',
                arrivals: ['06:08', '06:23', '06:38'],
                departures: ['06:09','06:24','06:40'],
                lat: 75,
                lng: 75
            };

            var stopA2b = {
                id: 'sA2b',
                name: 'Stop After 2b',
                lines: ['2'],
                line: '2',
                arrivals: ['06:20', '06:35', '06:45'],
                departures: ['06:21', '06:36', '06:46'],
                lat: 80,
                lng: 80
            };


            var line1 = {
                name: '1',
                stops: [stopB1a, stop1a, stopI1a, stop2a, stopA2a]
            };

            var line2 = {
                name: '2',
                stops: [stopB1b, stop1b, stopI1b, stop2b]
            };

            var time = '2013-02-08 06:00';


            var journeyPlan = Service.getDirections(departure, destination, time, [line1, line2]);

            expect(journeyPlan.length).toBe(2);

            var plan1 = journeyPlan[0];
            expect(plan1.length).toBe(2);
            var s1b = plan1[0];
            var s2b = plan1[1];

            expect(plan1.departureTime).toBe('06:08');
            expect(plan1.departureStop).toBe('Stop 1');
            expect(plan1.departureLine).toBe('2');

            expect(plan1.arrivalTime).toBe('06:23');
            expect(plan1.arrivalStop).toBe('Stop 2');
            expect(plan1.arrivalLine).toBe('2');


            expect(s1b.stop).toBe('Stop 1');
            expect(s1b.departureTime).toBe('06:08');
            expect(s1b.line).toBe('2');

            expect(s2b.stop).toBe('Stop 2');
            expect(s2b.arrivalTime).toBe('06:23');
            expect(s2b.line).toBe('2');

            var plan2 = journeyPlan[1];
            expect(plan2.length).toBe(2);
            var s1a = plan2[0];
            var s2a = plan2[1];

            expect(plan2.departureTime).toBe('06:06');
            expect(plan2.departureStop).toBe('Stop 1');
            expect(plan2.departureLine).toBe('1');

            expect(plan2.arrivalTime).toBe('06:25');
            expect(plan2.arrivalStop).toBe('Stop 2');
            expect(plan2.arrivalLine).toBe('1');

            expect(s1a.stop).toBe('Stop 1');
            expect(s1a.departureTime).toBe('06:06');
            expect(s1a.line).toBe('1');

            expect(s2a.stop).toBe('Stop 2');
            expect(s2a.arrivalTime).toBe('06:25');
            expect(s2a.line).toBe('1');

        });

        it('should find a alternative routs without changes', function () {

            var departure = {
                lat: 50,
                lng: 50
            };

            var destination = {
                lat: 100,
                lng: 100
            };

            var stop1a = {
                id: 's1',
                name: 'Stop 1',
                lines: ['1', '2'],
                line: '1',
                arrivals: ['05:50', '06:05', '06:20'],
                departures: ['05:51', '06:06', '06:21'],
                lat: 49,
                lng: 49
            };

            var stop1b = {
                id: 's1',
                name: 'Stop 1',
                lines: ['1', '2'],
                line: '2',
                arrivals: ['05:52', '06:07', '06:22'],
                departures: ['05:53', '06:08', '06:24'],
                lat: 49,
                lng: 49
            };

            var stop2a = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1', '2'],
                line: '1',
                arrivals: ['06:10', '06:25', '06:40'],
                departures: ['06:11','06:26','06:41'],
                lat: 75,
                lng: 75
            };

            var stop2b = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1', '2'],
                line: '2',
                arrivals: ['06:08', '06:23', '06:38'],
                departures: ['06:09','06:24','06:40'],
                lat: 75,
                lng: 75
            };



            var line1 = {
                name: '1',
                stops: [stop1a, stop2a]
            };

            var line2 = {
                name: '2',
                stops: [stop1b, stop2b]
            };

            var time = '2013-02-08 06:00';


            var journeyPlan = Service.getDirections(departure, destination, time, [line1, line2]);

            expect(journeyPlan.length).toBe(2);

            var plan1 = journeyPlan[0];
            expect(plan1.length).toBe(2);
            var s1b = plan1[0];
            var s2b = plan1[1];

            expect(plan1.departureTime).toBe('06:08');
            expect(plan1.departureStop).toBe('Stop 1');
            expect(plan1.departureLine).toBe('2');

            expect(plan1.arrivalTime).toBe('06:23');
            expect(plan1.arrivalStop).toBe('Stop 2');
            expect(plan1.arrivalLine).toBe('2');


            expect(s1b.stop).toBe('Stop 1');
            expect(s1b.departureTime).toBe('06:08');
            expect(s1b.line).toBe('2');

            expect(s2b.stop).toBe('Stop 2');
            expect(s2b.arrivalTime).toBe('06:23');
            expect(s2b.line).toBe('2');

            var plan2 = journeyPlan[1];
            expect(plan2.length).toBe(2);
            var s1a = plan2[0];
            var s2a = plan2[1];

            expect(plan2.departureTime).toBe('06:06');
            expect(plan2.departureStop).toBe('Stop 1');
            expect(plan2.departureLine).toBe('1');

            expect(plan2.arrivalTime).toBe('06:25');
            expect(plan2.arrivalStop).toBe('Stop 2');
            expect(plan2.arrivalLine).toBe('1');

            expect(s1a.stop).toBe('Stop 1');
            expect(s1a.departureTime).toBe('06:06');
            expect(s1a.line).toBe('1');

            expect(s2a.stop).toBe('Stop 2');
            expect(s2a.arrivalTime).toBe('06:25');
            expect(s2a.line).toBe('1');

        });

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
            var plan = journeyPlan[0];
            expect(plan.length).toBe(4);
            var s1 = plan[0];
            var s2 = plan[1];
            var s3 = plan[2];
            var s4 = plan[3];

            expect(plan.departureTime).toBe('06:00');
            expect(plan.departureStop).toBe('Stop 1');
            expect(plan.departureLine).toBe('1');

            expect(plan.arrivalTime).toBe('06:39');
            expect(plan.arrivalStop).toBe('Stop 3');
            expect(plan.arrivalLine).toBe('2');

            expect(s1.stop).toBe('Stop 1');
            expect(s1.departureTime).toBe('06:00');
            expect(s1.line).toBe('1');

            expect(s2.stop).toBe('Stop 2');
            expect(s2.arrivalTime).toBe('06:09');
            expect(s2.line).toBe('1');

            expect(s3.stop).toBe('Stop 2');
            expect(s3.departureTime).toBe('06:16');
            expect(s3.line).toBe('2');

            expect(s4.stop).toBe('Stop 3');
            expect(s4.arrivalTime).toBe('06:39');
            expect(s4.line).toBe('2');

        });

        it('should find earliest possible connection for simple route', function () {

            var departure = {
                lat: 0,
                lng: 0
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
                arrivals: ['05:59', '07:59', '09:59'],
                departures: ['06:00', '08:00', '10:00'],
                lat: 10,
                lng: 10
            };

            var stop2 = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1'],
                line: '1',
                arrivals: ['07:00', '09:00', '11:00'],
                departures: ['07:01', '09:01', '11:01'],
                lat: 90,
                lng: 90
            };

            var line1 = {
                name: '1',
                stops: [stop1, stop2]
            };


            var time = '2013-02-08 07:30';


            var journeyPlan = Service.getDirections(departure, destination, time, [line1]);


            expect(journeyPlan.length).toBe(1);
            var plan = journeyPlan[0];


            expect(plan.departureTime).toBe('08:00');
            expect(plan.departureStop).toBe('Stop 1');
            expect(plan.departureLine).toBe('1');

            expect(plan.arrivalTime).toBe('09:00');
            expect(plan.arrivalStop).toBe('Stop 2');
            expect(plan.arrivalLine).toBe('1');
        });

        it('should find route on one line with follow on stops', function () {


            //var d1 = moment('09:30');
            //console.log(d1);

            var departure = {
                lat: 29,
                lng: 29
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
                arrivals: ['05:59'],
                departures: ['06:00'],
                lat: 10,
                lng: 10
            };

            var stop2 = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1'],
                line: '1',
                arrivals: ['06:19'],
                departures: ['06:20'],
                lat: 30,
                lng: 30
            };

            var stop3 = {
                id: 's3',
                name: 'Stop 3',
                lines: ['1'],
                line: '1',
                arrivals: ['06:39'],
                departures: ['06:40'],
                lat: 60,
                lng: 60
            };

            var stop4 = {
                id: 's4',
                name: 'Stop 4',
                lines: ['1'],
                line: '1',
                arrivals: ['07:00'],
                departures: ['07:01'],
                lat: 90,
                lng: 90
            };

            var stop5 = {
                id: 's5',
                name: 'Stop 5',
                lines: ['1'],
                line: '1',
                arrivals: ['07:20'],
                departures: ['07:21'],
                lat: 120,
                lng: 120
            };

            var line1 = {
                name: '1',
                stops: [stop1, stop2, stop3, stop4, stop5]
            };


            var time = '2013-02-08 06:00';


            var journeyPlan = Service.getDirections(departure, destination, time, [line1]);

            expect(journeyPlan.length).toBe(1);
            var plan = journeyPlan[0];

            expect(plan.departureTime).toBe('06:20');
            expect(plan.departureStop).toBe('Stop 2');
            expect(plan.departureLine).toBe('1');

            expect(plan.arrivalTime).toBe('07:00');
            expect(plan.arrivalStop).toBe('Stop 4');
            expect(plan.arrivalLine).toBe('1');


        });

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
                id: 's1',
                name: 'Stop 1',
                lines: ['1'],
                line: '1',
                arrivals: ['05:59'],
                departures: ['06:00'],
                lat: 10,
                lng: 10
            };

            var stop2 = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1'],
                line: '1',
                arrivals: ['06:19'],
                departures: ['06:20'],
                lat: 30,
                lng: 30
            };

            var stop3 = {
                id: 's3',
                name: 'Stop 3',
                lines: ['1'],
                line: '1',
                arrivals: ['06:40'],
                departures: ['06:41'],
                lat: 60,
                lng: 60
            };

            var stop4 = {
                id: 's4',
                name: 'Stop 4',
                lines: ['1'],
                line: '1',
                arrivals: ['07:00'],
                departures: ['07:21'],
                lat: 90,
                lng: 90
            };

            var line1 = {
                name: '1',
                stops: [stop1, stop2, stop3, stop4]
            };


            var time = '2013-02-08 06:00';


            var journeyPlan = Service.getDirections(departure, destination, time, [line1]);

            expect(journeyPlan.length).toBe(1);
            var plan = journeyPlan[0];

            expect(plan.departureTime).toBe('06:20');
            expect(plan.departureStop).toBe('Stop 2');
            expect(plan.departureLine).toBe('1');

            expect(plan.arrivalTime).toBe('07:00');
            expect(plan.arrivalStop).toBe('Stop 4');
            expect(plan.arrivalLine).toBe('1');
        });

        it('should find route on one line with intermediate stop', function () {

            var departure = {
                lat: 0,
                lng: 0
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
                arrivals: ['05:59'],
                departures: ['06:00'],
                lat: 10,
                lng: 10
            };

            var stop2 = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1'],
                line: '1',
                arrivals: ['06:29'],
                departures: ['06:30'],
                lat: 10,
                lng: 10
            };

            var stop3 = {
                id: 's3',
                name: 'Stop 3',
                lines: ['1'],
                line: '1',
                arrivals: ['07:00'],
                departures: ['07:01'],
                lat: 90,
                lng: 90
            };

            var line1 = {
                name: '1',
                stops: [stop1, stop2, stop3]
            };


            var time = '2013-02-08 05:40';


            var journeyPlan = Service.getDirections(departure, destination, time, [line1]);


            expect(journeyPlan.length).toBe(1);
            var plan = journeyPlan[0];

            expect(plan.departureTime).toBe('06:00');
            expect(plan.departureStop).toBe('Stop 1');
            expect(plan.departureLine).toBe('1');

            expect(plan.arrivalTime).toBe('07:00');
            expect(plan.arrivalStop).toBe('Stop 3');
            expect(plan.arrivalLine).toBe('1');
        });

        it('should find simple route', function () {

            var departure = {
                lat: 0,
                lng: 0
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
                arrivals: ['05:59'],
                departures: ['06:00'],
                lat: 10,
                lng: 10
            };

            var stop2 = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1'],
                line: '1',
                arrivals: ['07:00'],
                departures: ['07:01'],
                lat: 90,
                lng: 90
            };

            var line1 = {
                name: '1',
                stops: [stop1, stop2]
            };


            var time = '2013-02-08 05:40';


            var journeyPlan = Service.getDirections(departure, destination, time, [line1]);

            expect(journeyPlan.length).toBe(1);
            var plan = journeyPlan[0];
            expect(plan.length).toBe(2);
            var s0 = plan[0];
            var s1 = plan[1];

            expect(plan.departureTime).toBe('06:00');
            expect(plan.departureStop).toBe('Stop 1');
            expect(plan.departureLine).toBe('1');

            expect(plan.arrivalTime).toBe('07:00');
            expect(plan.arrivalStop).toBe('Stop 2');
            expect(plan.arrivalLine).toBe('1');

            expect(s0.stop).toBe('Stop 1');
            expect(s1.stop).toBe('Stop 2');
            expect(s0.departureTime).toBe('06:00');
            expect(s1.arrivalTime).toBe('07:00');
        });



    });
})();
