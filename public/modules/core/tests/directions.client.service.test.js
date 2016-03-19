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

            var departure = {lat: 50, lng: 50};
            var arrival = {lat: 76, lng: 76};

            var stopB1a = {
                id: 'sB1a', name: 'Stop Before 1a', line: '1',
                arrivals: ['05:40', '05:55', '06:05'], departures: ['05:41', '05:56', '06:06'],
                lat: 30, lng: 30
            };

            var stop1a = {
                id: 's1', name: 'Stop 1', line: '1',
                arrivals: ['05:50', '06:05', '06:20'], departures: ['05:51', '06:06', '06:21'],
                lat: 49, lng: 49
            };

            var stopI1a = {
                id: 'sI1a', name: 'Stop Intermediate 1a', line: '1',
                arrivals: ['06:00', '06:15', '06:30'], departures: ['06:01', '06:16', '06:31'],
                lat: 60, lng: 60
            };

            var stop2a = {
                id: 's2', name: 'Stop 2', line: '1',
                arrivals: ['06:10', '06:25', '06:40'], departures: ['06:11','06:26','06:41'],
                lat: 75, lng: 75
            };

            var stopA2a = {
                id: 'sA2a', name: 'Stop After 2a', line: '1',
                arrivals: ['06:20', '06:35', '06:45'], departures: ['06:21', '06:36', '06:46'],
                lat: 80, lng: 80
            };

            var stopB1b = {
                id: 'sB1b', name: 'Stop Before 1b', line: '2',
                arrivals: ['05:40', '05:55', '06:05'], departures: ['05:41', '05:56', '06:06'],
                lat: 25, lng: 25
            };

            var stop1b = {
                id: 's1', name: 'Stop 1', line: '2',
                arrivals: ['05:52', '06:07', '06:22'], departures: ['05:53', '06:08', '06:24'],
                lat: 49, lng: 49
            };

            var stopI1b = {
                id: 'sI1b', name: 'Stop Intermediate ba', line: '2',
                arrivals: ['06:00', '06:15', '06:30'], departures: ['06:01', '06:16', '06:31'],
                lat: 62, lng: 62
            };


            var stop2b = {
                id: 's2', name: 'Stop 2', line: '2',
                arrivals: ['06:08', '06:23', '06:38'], departures: ['06:09','06:24','06:40'],
                lat: 75, lng: 75
            };

            var stopA2b = {
                id: 'sA2b', name: 'Stop After 2b', line: '2',
                arrivals: ['06:20', '06:35', '06:45'], departures: ['06:21', '06:36', '06:46'],
                lat: 80, lng: 80
            };


            var line1 = {id: '1', stops: [stopB1a, stop1a, stopI1a, stop2a, stopA2a]};

            var line2 = {id: '2', stops: [stopB1b, stop1b, stopI1b, stop2b]};

            var time = '2013-02-08 06:00';


            var journeyPlan = Service.getDirections(departure, arrival, time, [line1, line2]);

            expect(journeyPlan.options.length).toBe(2);

            var option1 = journeyPlan.options[0];
            expect(option1.changes.length).toBe(2);
            var s1b = option1.changes[0];
            var s2b = option1.changes[1];

            expect(option1.departureTime).toBe('06:08');
            expect(option1.departureStopName).toBe('Stop 1');
            expect(option1.departureLine).toBe('2');

            expect(option1.arrivalTime).toBe('06:23');
            expect(option1.arrivalStopName).toBe('Stop 2');
            expect(option1.arrivalLine).toBe('2');


            expect(s1b.stopName).toBe('Stop 1');
            expect(s1b.departureTime).toBe('06:08');
            expect(s1b.line).toBe('2');

            expect(s2b.stopName).toBe('Stop 2');
            expect(s2b.arrivalTime).toBe('06:23');
            expect(s2b.line).toBe('2');

            var option2 = journeyPlan.options[1];
            expect(option2.changes.length).toBe(2);
            var s1a = option2.changes[0];
            var s2a = option2.changes[1];

            expect(option2.departureTime).toBe('06:06');
            expect(option2.departureStopName).toBe('Stop 1');
            expect(option2.departureLine).toBe('1');

            expect(option2.arrivalTime).toBe('06:25');
            expect(option2.arrivalStopName).toBe('Stop 2');
            expect(option2.arrivalLine).toBe('1');

            expect(s1a.stopName).toBe('Stop 1');
            expect(s1a.departureTime).toBe('06:06');
            expect(s1a.line).toBe('1');

            expect(s2a.stopName).toBe('Stop 2');
            expect(s2a.arrivalTime).toBe('06:25');
            expect(s2a.line).toBe('1');

        });

        it('should find a alternative routes without changes', function () {

            var departure = {lat: 50, lng: 50};
            var arrival = {lat: 100, lng: 100};

            var stop1a = {
                id: 's1', name: 'Stop 1', line: '1',
                arrivals: ['05:50', '06:05', '06:20'], departures: ['05:51', '06:06', '06:21'],
                lat: 49, lng: 49
            };

            var stop1b = {
                id: 's1', name: 'Stop 1', line: '2',
                arrivals: ['05:52', '06:07', '06:22'], departures: ['05:53', '06:08', '06:24'],
                lat: 49, lng: 49
            };

            var stop2a = {
                id: 's2', name: 'Stop 2', line: '1',
                arrivals: ['06:10', '06:25', '06:40'], departures: ['06:11','06:26','06:41'],
                lat: 75, lng: 75
            };

            var stop2b = {
                id: 's2', name: 'Stop 2', line: '2',
                arrivals: ['06:08', '06:23', '06:38'], departures: ['06:09','06:24','06:40'],
                lat: 75, lng: 75
            };


            var line1 = {id: '1', stops: [stop1a, stop2a]};
            var line2 = {id: '2', stops: [stop1b, stop2b]};

            var time = '2013-02-08 06:00';


            var journeyPlan = Service.getDirections(departure, arrival, time, [line1, line2]);

            expect(journeyPlan.options.length).toBe(2);

            var option1 = journeyPlan.options[0];
            expect(option1.changes.length).toBe(2);
            var s1b = option1.changes[0];
            var s2b = option1.changes[1];

            expect(option1.departureTime).toBe('06:08');
            expect(option1.departureStopName).toBe('Stop 1');
            expect(option1.departureLine).toBe('2');

            expect(option1.arrivalTime).toBe('06:23');
            expect(option1.arrivalStopName).toBe('Stop 2');
            expect(option1.arrivalLine).toBe('2');


            expect(s1b.stopName).toBe('Stop 1');
            expect(s1b.departureTime).toBe('06:08');
            expect(s1b.line).toBe('2');

            expect(s2b.stopName).toBe('Stop 2');
            expect(s2b.arrivalTime).toBe('06:23');
            expect(s2b.line).toBe('2');

            var option2 = journeyPlan.options[1];
            expect(option2.changes.length).toBe(2);
            var s1a = option2.changes[0];
            var s2a = option2.changes[1];

            expect(option2.departureTime).toBe('06:06');
            expect(option2.departureStopName).toBe('Stop 1');
            expect(option2.departureLine).toBe('1');

            expect(option2.arrivalTime).toBe('06:25');
            expect(option2.arrivalStopName).toBe('Stop 2');
            expect(option2.arrivalLine).toBe('1');

            expect(s1a.stopName).toBe('Stop 1');
            expect(s1a.departureTime).toBe('06:06');
            expect(s1a.line).toBe('1');

            expect(s2a.stopName).toBe('Stop 2');
            expect(s2a.arrivalTime).toBe('06:25');
            expect(s2a.line).toBe('1');

        });

        it('should find a route with a change', function () {


            var departure = {lat: 50, lng: 50};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {
                id: 's1', name: 'Stop 1', line: '1',
                arrivals: ['05:39', '05:59', '06:19'], departures: ['05:40', '06:00', '06:20'],
                lat: 49, lng: 49
            };

            var stop2a = {
                id: 's2', name: 'Stop 2', line: '1',
                arrivals: ['05:49', '06:09', '06:19'], departures: ['05:50','06:10','06:20'],
                lat: 75, lng: 75
            };

            var stop2b = {
                id: 's2', name: 'Stop 2', line: '2',
                arrivals: ['06:15'], departures: ['06:16'],
                lat: 75, lng: 75
            };

            var stop3 = {
                id: 's3', name: 'Stop 3', line: '2',
                arrivals: ['06:39'], departures: ['06:40'],
                lat: 99, lng: 99
            };


            var line1 = {id: '1', stops: [stop1, stop2a]};
            var line2 = {id: '2', stops: [stop2b, stop3]};

            var time = '2013-02-08 05:50';

            var journeyPlan = Service.getDirections(departure, arrival, time, [line1, line2]);

            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];
            expect(option.changes.length).toBe(4);
            var s1 = option.changes[0];
            var s2 = option.changes[1];
            var s3 = option.changes[2];
            var s4 = option.changes[3];

            expect(option.departureTime).toBe('06:00');
            expect(option.departureStopName).toBe('Stop 1');
            expect(option.departureLine).toBe('1');

            expect(option.arrivalTime).toBe('06:39');
            expect(option.arrivalStopName).toBe('Stop 3');
            expect(option.arrivalLine).toBe('2');

            expect(s1.stopName).toBe('Stop 1');
            expect(s1.departureTime).toBe('06:00');
            expect(s1.line).toBe('1');

            expect(s2.stopName).toBe('Stop 2');
            expect(s2.arrivalTime).toBe('06:09');
            expect(s2.line).toBe('1');

            expect(s3.stopName).toBe('Stop 2');
            expect(s3.departureTime).toBe('06:16');
            expect(s3.line).toBe('2');

            expect(s4.stopName).toBe('Stop 3');
            expect(s4.arrivalTime).toBe('06:39');
            expect(s4.line).toBe('2');

        });

        fit('should find earliest possible connection for simple route', function () {

            var departure = {lat: 0, lng: 0};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {
                id: 's1', name: 'Stop 1', line: '1',
                arrivals: ['05:59', '07:59', '09:59'], departures: ['06:00', '08:00', '10:00'],
                lat: 10, lng: 10
            };

            var stop2 = {
                id: 's2', name: 'Stop 2', line: '1',
                arrivals: ['07:00', '09:00', '11:00'], departures: ['07:01', '09:01', '11:01'],
                lat: 90, lng: 90
            };

            var line1 = {id: '1', stops: ['s1', 's2']};
            var stops = {s1: stop1, s2:stop2};


            var time = '2013-02-08 07:30';


            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);


            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];


            expect(option.departureTime).toBe('08:00');
            expect(option.departureStopName).toBe('Stop 1');
            expect(option.departureLine).toBe('1');

            expect(option.arrivalTime).toBe('09:00');
            expect(option.arrivalStopName).toBe('Stop 2');
            expect(option.arrivalLine).toBe('1');
        });

        it('should find route on one line with follow on stops', function () {

            var departure = {lat: 29, lng: 29};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {
                id: 's1', name: 'Stop 1',
                lat: 10, lng: 10
            };

            var stop2 = {
                id: 's2', name: 'Stop 2',
                lat: 30, lng: 30
            };

            var stop3 = {
                id: 's3', name: 'Stop 3',
                lat: 60, lng: 60
            };

            var stop4 = {
                id: 's4', name: 'Stop 4',
                lat: 90, lng: 90
            };

            var stop5 = {
                id: 's5', name: 'Stop 5',
                lat: 120, lng: 120
            };


            var time = '2013-02-08 05:40';



            var line1 = {id: '1', stops: ['s1', 's2', 's3', 's4', 's5'], times: [0, 10, 20, 30, 40, 50], runtimes:['06:50']};
            var stops = {s1: stop1, s2:stop2, s3:stop3, s4:stop4, s5:stop5};
            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);

            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];

            expect(option.departureTime).toBe('07:00');
            expect(option.departureStopName).toBe('Stop 2');
            expect(option.departureLine).toBe('1');

            expect(option.arrivalTime).toBe('07:20');
            expect(option.arrivalStopName).toBe('Stop 4');
            expect(option.arrivalLine).toBe('1');


        });

        it('should find route on one line with previous stop', function () {

            var departure = {lat: 29, lng: 29};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {
                id: 's1', name: 'Stop 1',
                lat: 10, lng: 10
            };

            var stop2 = {
                id: 's2', name: 'Stop 2',
                lat: 30, lng: 30
            };

            var stop3 = {
                id: 's3', name: 'Stop 3',
                lat: 60, lng: 60
            };

            var stop4 = {
                id: 's4', name: 'Stop 4',
                lat: 90, lng: 90
            };



            var time = '2013-02-08 05:40';

            var line1 = {id: '1', stops: ['s1', 's2', 's3', 's4'], times: [0, 10, 20, 30, 40], runtimes:['06:00']};
            var stops = {s1: stop1, s2:stop2, s3:stop3, s4:stop4};
            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);

            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];

            expect(option.departureTime).toBe('06:10');
            expect(option.departureStopName).toBe('Stop 2');
            expect(option.departureLine).toBe('1');

            expect(option.arrivalTime).toBe('06:30');
            expect(option.arrivalStopName).toBe('Stop 4');
            expect(option.arrivalLine).toBe('1');
        });

        it('should find route on one line with intermediate stop', function () {

            var departure = {lat: 0, lng: 0};

            var arrival = {lat: 100, lng: 100};

            var stop1 = {
                id: 's1', name: 'Stop 1',
                lat: 10, lng: 10
            };

            var stop2 = {
                id: 's2', name: 'Stop 2',
                lat: 10, lng: 10
            };

            var stop3 = {
                id: 's3', name: 'Stop 3',
                lat: 90, lng: 90
            };


            var line1 = {id: '1', stops: ['s1', 's2', 's3'], times: [0, 10, 20], runtimes:['06:00']};


            var time = '2013-02-08 05:40';

            var stops = {s1: stop1, s2:stop2, s3:stop3};
            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);


            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];

            expect(option.departureTime).toBe('06:00');
            expect(option.departureStopName).toBe('Stop 1');
            expect(option.departureLine).toBe('1');

            expect(option.arrivalTime).toBe('06:20');
            expect(option.arrivalStopName).toBe('Stop 3');
            expect(option.arrivalLine).toBe('1');
        });

        it('should find simple route', function () {

            var departure = {lat: 0, lng: 0};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {
                id: 's1', name: 'Stop 1',
                lat: 10, lng: 10
            };

            var stop2 = {
                id: 's2', name: 'Stop 2',
                lat: 90, lng: 90
            };

            var stops = {s1: stop1, s2:stop2};
            var line1 = {id: '1', stops: ['s1', 's2'], times: [0, 10], runtimes:['06:00']};


            var time = '2013-02-08 05:40';


            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);



            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];

            expect(option.changes.length).toBe(2);
            var s0 = option.changes[0];
            var s1 = option.changes[1];

            expect(option.departureTime).toBe('06:00');
            expect(option.departureStopName).toBe('Stop 1');
            expect(option.departureLine).toBe('1');

            expect(option.arrivalTime).toBe('06:10');
            expect(option.arrivalStopName).toBe('Stop 2');
            expect(option.arrivalLine).toBe('1');

            expect(s0.stopName).toBe('Stop 1');
            expect(s1.stopName).toBe('Stop 2');
            expect(s0.departureTime).toBe('06:00');
            expect(s1.arrivalTime).toBe('06:10');
        });



    });
})();
