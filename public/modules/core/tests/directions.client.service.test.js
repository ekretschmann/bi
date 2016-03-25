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


        fit('should build graph with alternatives with more than one change with buses running both ways', function () {


            // line a: s1    s2           s4          s6
            // line b:             s3     s4          s6
            // line c:       s2           s4
            // line x:                                s6    s9

            // routes: s1a - s2a - s2c - s4c - s4a - s6a - s6x - s9x
            //         s1a - s2a - s2c - s4c - s4b - s6b - s6x - s9x
            //         s1a - s4a - s4b - s6b - s6x - s9x
            //         s1a - s6a - s6x - s9x

            var departure = {lat: 99, lng: 99};
            var arrival = {lat: 141, lng: 181};

            var stop1 = {id: 's1', lat: 100, lng: 100};
            var stop2 = {id: 's2', lat: 110, lng: 120};
            var stop3 = {id: 's3', lat: 115, lng: 130};
            var stop4 = {id: 's4', lat: 120, lng: 140};
            var stop6 = {id: 's6', lat: 130, lng: 160};
            var stop9 = {id: 's9', lat: 140, lng: 180};


            var lineao = {name:'Line A', id: 'ao', stops: ['s1', 's2', 's4', 's6']};
            var linebo = {name:'Line B', id: 'bo', stops: ['s3', 's4', 's6']};
            var lineco = {name:'Line C', id: 'co', stops: ['s2', 's4']};
            var linexo = {name:'Line X', id: 'xo', stops: ['s6', 's9']};

            lineao.runtimes = ['06:10', '06:40', '07:10']; lineao.times=[0, 5, 5, 5];
            linebo.runtimes = ['06:20', '06:50', '07:20']; linebo.times=[0, 5, 5];
            lineco.runtimes = ['06:30', '07:00', '07:30']; lineco.times=[0, 5];
            linexo.runtimes = ['06:40', '07:10', '07:40']; linexo.times=[0, 5];


            var time = '2013-02-08 06:00';

            var stops = {s1: stop1, s2: stop2, s3:stop3, s4: stop4, s6: stop6, s9: stop9};

            var journeyPlan = Service.getDirections(departure, arrival,
                time, [lineao, linebo, lineco, linexo], stops);

            expect(journeyPlan.options.length).toBe(4);

            //var option1 = journeyPlan.options[0];
            //expect(option1.length).toBe(2);
            //var leg1a = option1[0];
            //var leg1b = option1[1];

            //expect(leg1a.departureStopTime).toBe('06:10');
            //expect(leg1a.arrivalStopTime).toBe('06:25');
            //expect(leg1a.departureStopId).toBe('s1');
            //expect(leg1a.arrivalStopId).toBe('s6');
            //expect(leg1a.departureLineId).toBe('ao');
            //
            //expect(leg1b.departureStopTime).toBe('06:40');
            //expect(leg1b.arrivalStopTime).toBe('06:45');
            //expect(leg1b.departureStopId).toBe('s6');
            //expect(leg1b.arrivalStopId).toBe('s9');
            //expect(leg1b.departureLineId).toBe('xo');
            //
            //
            //var option2 = journeyPlan.options[1];
            //expect(option2.length).toBe(4);
            //var leg2a = option2[0];
            //var leg2b = option2[1];
            //var leg2c = option2[2];
            //var leg2d = option2[3];
            //
            //expect(leg2a.departureStopTime).toBe('06:10');
            //expect(leg2a.arrivalStopTime).toBe('06:15');
            //expect(leg2a.departureStopId).toBe('s1');
            //expect(leg2a.arrivalStopId).toBe('s2');
            //expect(leg2a.departureLineId).toBe('ao');
            //
            //expect(leg2b.departureStopTime).toBe('06:30');
            //expect(leg2b.arrivalStopTime).toBe('06:35');
            //expect(leg2b.departureStopId).toBe('s2');
            //expect(leg2b.arrivalStopId).toBe('s4');
            //expect(leg2b.departureLineId).toBe('co');
            //
            //expect(leg2c.departureStopTime).toBe('06:50');
            //expect(leg2c.arrivalStopTime).toBe('06:55');
            //expect(leg2c.departureStopId).toBe('s4');
            //expect(leg2c.arrivalStopId).toBe('s6');
            //expect(leg2c.departureLineId).toBe('ao');
            //
            //expect(leg2d.departureStopTime).toBe('07:10');
            //expect(leg2d.arrivalStopTime).toBe('07:15');
            //expect(leg2d.departureStopId).toBe('s6');
            //expect(leg2d.arrivalStopId).toBe('s9');
            //expect(leg2d.departureLineId).toBe('xo');
            //
            //
            //var option3 = journeyPlan.options[2];
            //expect(option3.length).toBe(4);
            //var leg3a = option2[0];
            //var leg3b = option2[1];
            //var leg3c = option2[2];
            //var leg3d = option2[3];
            //expect(leg3a.departureStopTime).toBe('06:10');
            //expect(leg3a.arrivalStopTime).toBe('06:15');
            //expect(leg3a.departureStopId).toBe('s1');
            //expect(leg3a.arrivalStopId).toBe('s2');
            //expect(leg3a.departureLineId).toBe('ao');
            //
            //expect(leg3b.departureStopTime).toBe('06:30');
            //expect(leg3b.arrivalStopTime).toBe('06:35');
            //expect(leg3b.departureStopId).toBe('s2');
            //expect(leg3b.arrivalStopId).toBe('s4');
            //expect(leg3b.departureLineId).toBe('co');
            //
            //expect(leg3c.departureStopTime).toBe('06:50');
            //expect(leg3c.arrivalStopTime).toBe('06:55');
            //expect(leg3c.departureStopId).toBe('s4');
            //expect(leg3c.arrivalStopId).toBe('s6');
            //expect(leg3c.departureLineId).toBe('ao');
            //
            //expect(leg3d.departureStopTime).toBe('07:10');
            //expect(leg3d.arrivalStopTime).toBe('07:15');
            //expect(leg3d.departureStopId).toBe('s6');
            //expect(leg3d.arrivalStopId).toBe('s9');
            //expect(leg3d.departureLineId).toBe('xo');
            //
            //var option4 = journeyPlan.options[3];
            //expect(option4.length).toBe(3);
            //var leg4a = option4[0];
            //var leg4b = option4[1];
            //var leg4c = option4[2];
            //
            //expect(leg4a.departureStopTime).toBe('06:10');
            //expect(leg4a.arrivalStopTime).toBe('06:20');
            //expect(leg4a.departureStopId).toBe('s1');
            //expect(leg4a.arrivalStopId).toBe('s4');
            //expect(leg4a.departureLineId).toBe('ao');
            //
            //expect(leg4b.departureStopTime).toBe('06:50');
            //expect(leg4b.arrivalStopTime).toBe('06:55');
            //expect(leg4b.departureStopId).toBe('s4');
            //expect(leg4b.arrivalStopId).toBe('s6');
            //expect(leg4b.departureLineId).toBe('bo');
            //
            //expect(leg4c.departureStopTime).toBe('07:10');
            //expect(leg4c.arrivalStopTime).toBe('07:15');
            //expect(leg4c.departureStopId).toBe('s6');
            //expect(leg4c.arrivalStopId).toBe('s9');
            //expect(leg4c.departureLineId).toBe('xo');



        });


        it('should find a alternative route without changes with intermediate stops', function () {

            var departure = {lat: 50, lng: 50};
            var arrival = {lat: 76, lng: 76};

            var stopb1a = {id: 'sb1a', name: 'Stop Before s1 on line a', lat: 30, lng: 30};
            var stop1 = {id: 's1', name: 'Stop 1', lat: 49, lng: 49};
            var stopi1a = {id: 'si1a', name: 'Stop between 1 and 2 on line a', lat: 60, lng: 60};
            var stop2 = {id: 's2', name: 'Stop 2', lat: 75, lng: 75};
            var stopa2a = {id: 'sa2a', name: 'Stop After 2 on line a', lat: 80, lng: 80};
            var stopb1b = {id: 'sb1b', name: 'Stop Before 1 on line b', lat: 25, lng: 25};
            var stopi1b = {id: 'si1b', name: 'Stop Intermediate ba', lat: 62, lng: 62};
            var stopa2b = {id: 'sa2b', name: 'Stop After 2 on line b', lat: 80, lng: 80};

            var line1 = {id: '1',
                name: 'Line 1',
                stops: ['sb1a', 's1', 'si1a', 's2', 'sa2a'],
                times: [0, 10, 10, 10, 10],
                runtimes: ['05:40', '05:55', '06:05', '06:35']
            };

            var line2 = {
                id: '2',
                name: 'Line 2',
                stops: ['sb1b', 's1', 'si1b', 's2', 'sa2b'],
                times: [0, 12, 8, 8, 10],
                runtimes: ['05:40', '05:55', '06:05', '06:35']
            };

            var time = '2013-02-08 06:00';


            var stops = {sb1a: stopb1a, s1:stop1, si1a:stopi1a, s2:stop2,
                sa2a:stopa2a, sb1b:stopb1b, si1b: stopi1b, sa2b: stopa2b};
            var journeyPlan = Service.getDirections(departure, arrival, time, [line1, line2], stops);

            expect(journeyPlan.options.length).toBe(2);


            var option1 = journeyPlan.options[0];
            expect(option1.length).toBe(1);
            var leg1a = option1[0];

            expect(leg1a.departureStopTime).toBe('06:17');
            expect(leg1a.arrivalStopTime).toBe('06:33');
            expect(leg1a.departureStopId).toBe('s1');
            expect(leg1a.arrivalStopId).toBe('s2');
            expect(leg1a.departureLineId).toBe('2');


            var option2 = journeyPlan.options[1];
            expect(option2.length).toBe(1);
            var leg2a = option2[0];

            expect(leg2a.departureStopTime).toBe('06:15');
            expect(leg2a.arrivalStopTime).toBe('06:35');
            expect(leg2a.departureStopId).toBe('s1');
            expect(leg2a.arrivalStopId).toBe('s2');
            expect(leg2a.departureLineId).toBe('1');



        });

        it('should find a alternative routes without changes', function () {

            var departure = {lat: 50, lng: 50};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {id: 's1', name: 'Stop 1', lat: 49, lng: 49};
            var stop2 = {id: 's2', name: 'Stop 2', lat: 75, lng: 75};

            var line1 = {name: 'Line 1', id: '1', stops: ['s1', 's2'], times: [0, 15], runtimes:['06:00', '06:30', '07:00']};
            var line2 = {name: 'Line 2', id: '2', stops: ['s1', 's2'], times: [0, 15], runtimes:['06:10', '06:40', '07:10']};

            var time = '2013-02-08 06:05';

            var stops = {s1: stop1, s2:stop2};
            var journeyPlan = Service.getDirections(departure, arrival, time, [line1, line2], stops);

            expect(journeyPlan.options.length).toBe(2);
            var option1 = journeyPlan.options[0];
            expect(option1.length).toBe(1);
            var leg1a = option1[0];

            expect(leg1a.departureStopTime).toBe('06:10');
            expect(leg1a.arrivalStopTime).toBe('06:25');
            expect(leg1a.departureStopId).toBe('s1');
            expect(leg1a.arrivalStopId).toBe('s2');
            expect(leg1a.departureLineId).toBe('2');


            var option2 = journeyPlan.options[1];
            expect(option2.length).toBe(1);
            var leg2a = option2[0];

            expect(leg2a.departureStopTime).toBe('06:30');
            expect(leg2a.arrivalStopTime).toBe('06:45');
            expect(leg2a.departureStopId).toBe('s1');
            expect(leg2a.arrivalStopId).toBe('s2');
            expect(leg2a.departureLineId).toBe('1');

        });

        it('should find a route with a change', function () {


            var departure = {lat: 50, lng: 50};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {id: 's1', name: 'Stop 1', lat: 49, lng: 49};
            var stop2 = {id: 's2', name: 'Stop 2', lat: 75, lng: 75};
            var stop3 = {id: 's3', name: 'Stop 3', lat: 99, lng: 99};

            var time = '2013-02-08 05:50';

            var line1 = {name:'Line 1', id: '1', stops: ['s1', 's2'], times: [0, 15], runtimes:['06:00', '06:30', '07:00']};
            var line2 = {name:'Line 2', id: '2', stops: ['s2', 's3'], times: [0, 10], runtimes:['06:10', '06:40', '07:10']};
            var stops = {s1: stop1, s2:stop2, s3:stop3};

            var journeyPlan = Service.getDirections(departure, arrival, time, [line1, line2], stops);


            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];
            expect(option.length).toBe(2);
            var leg1 = option[0];
            var leg2 = option[1];

            expect(leg1.departureStopTime).toBe('06:00');
            expect(leg1.arrivalStopTime).toBe('06:15');
            expect(leg1.departureStopId).toBe('s1');
            expect(leg1.arrivalStopId).toBe('s2');
            expect(leg1.departureLineId).toBe('1');

            expect(leg2.departureStopTime).toBe('06:40');
            expect(leg2.arrivalStopTime).toBe('06:50');
            expect(leg2.departureStopId).toBe('s2');
            expect(leg2.arrivalStopId).toBe('s3');
            expect(leg2.departureLineId).toBe('2');
        });

        it('should find earliest possible connection for simple route', function () {

            var departure = {lat: 0, lng: 0};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {id: 's1', name: 'Stop 1', lat: 10, lng: 10};
            var stop2 = {id: 's2', name: 'Stop 2', lat: 90, lng: 90};

            var time = '2013-02-08 06:10';


            var line1 = {id: '1', stops: ['s1', 's2'], times: [0, 10], runtimes:['06:00', '06:30', '07:00']};
            var stops = {s1: stop1, s2:stop2};

            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);


            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];
            expect(option.length).toBe(1);
            var leg = option[0];

            expect(leg.departureStopTime).toBe('06:30');
            expect(leg.arrivalStopTime).toBe('06:40');
            expect(leg.departureStopId).toBe('s1');
            expect(leg.arrivalStopId).toBe('s2');
            expect(leg.departureLineId).toBe('1');
            expect(leg.arrivalLineId).toBe('1');
        });

        it('should find route on one line with follow on stops', function () {

            var departure = {lat: 29, lng: 29};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {id: 's1', name: 'Stop 1', lat: 10, lng: 10};
            var stop2 = {id: 's2', name: 'Stop 2', lat: 30, lng: 30};
            var stop3 = {id: 's3', name: 'Stop 3', lat: 60, lng: 60};
            var stop4 = {id: 's4', name: 'Stop 4', lat: 90, lng: 90};
            var stop5 = {id: 's5', name: 'Stop 5', lat: 120, lng: 120};

            var time = '2013-02-08 05:40';

            var line1 = {id: '1', stops: ['s1', 's2', 's3', 's4', 's5'], times: [0, 10, 10, 10, 10, 10], runtimes:['06:50']};
            var stops = {s1: stop1, s2:stop2, s3:stop3, s4:stop4, s5:stop5};
            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);

            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];
            expect(option.length).toBe(1);
            var leg = option[0];

            expect(leg.departureStopTime).toBe('07:00');
            expect(leg.arrivalStopTime).toBe('07:20');
            expect(leg.departureStopId).toBe('s2');
            expect(leg.arrivalStopId).toBe('s4');
            expect(leg.departureLineId).toBe('1');
            expect(leg.arrivalLineId).toBe('1');


        });

        it('should find route on one line with previous stop', function () {

            var departure = {lat: 29, lng: 29};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {id: 's1', name: 'Stop 1', lat: 10, lng: 10};
            var stop2 = {id: 's2', name: 'Stop 2', lat: 30, lng: 30};
            var stop3 = {id: 's3', name: 'Stop 3', lat: 60, lng: 60};
            var stop4 = {id: 's4', name: 'Stop 4', lat: 90, lng: 90};

            var time = '2013-02-08 05:40';

            var line1 = {name: 'Line 1', id: '1', stops: ['s1', 's2', 's3', 's4'], times: [0, 10, 10, 10, 10], runtimes:['06:00']};
            var stops = {s1: stop1, s2:stop2, s3:stop3, s4:stop4};
            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);

            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];
            expect(option.length).toBe(1);
            var leg = option[0];

            expect(leg.departureStopTime).toBe('06:10');
            expect(leg.arrivalStopTime).toBe('06:30');
            expect(leg.departureStopId).toBe('s2');
            expect(leg.arrivalStopId).toBe('s4');
            expect(leg.departureLineId).toBe('1');
            expect(leg.arrivalLineId).toBe('1');
        });

        it('should find route on one line with intermediate stop', function () {

            var departure = {lat: 0, lng: 0};

            var arrival = {lat: 100, lng: 100};

            var stop1 = {id: 's1', name: 'Stop 1', lat: 10, lng: 10};
            var stop2 = {id: 's2', name: 'Stop 2', lat: 10, lng: 10};
            var stop3 = {id: 's3', name: 'Stop 3', lat: 90, lng: 90};

            var line1 = {name: 'Line 1', id: '1', stops: ['s1', 's2', 's3'], times: [0, 10, 10], runtimes:['06:00']};

            var time = '2013-02-08 05:40';

            var stops = {s1: stop1, s2:stop2, s3:stop3};
            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);


            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];
            expect(option.length).toBe(1);
            var leg = option[0];

            expect(leg.departureStopTime).toBe('06:00');
            expect(leg.arrivalStopTime).toBe('06:20');
            expect(leg.departureStopId).toBe('s1');
            expect(leg.arrivalStopId).toBe('s3');
            expect(leg.departureLineId).toBe('1');
            expect(leg.arrivalLineId).toBe('1');
        });

        it('should not find simple route when direction is wrong', function () {

            var departure = {lat: 100, lng: 100};
            var arrival = {lat: 10, lng: 10};

            var stop1 = {id: 's1', name: 'Stop 1', lat: 10, lng: 10};
            var stop2 = {id: 's2', name: 'Stop 2', lat: 90, lng: 90};

            var stops = {s1: stop1, s2:stop2};
            var line1 = {name: 'Line 1', id: '1', stops: ['s1', 's2'], times: [0, 10], runtimes:['06:00']};


            var time = '2013-02-08 05:40';


            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);


            expect(journeyPlan.options.length).toBe(0);

        });

        it('should find simple route', function () {

            var departure = {lat: 0, lng: 0};
            var arrival = {lat: 100, lng: 100};

            var stop1 = {id: 's1', name: 'Stop 1', lat: 10, lng: 10};
            var stop2 = {id: 's2', name: 'Stop 2', lat: 90, lng: 90};

            var stops = {s1: stop1, s2:stop2};
            var line1 = {name: 'Line 1', id: '1', stops: ['s1', 's2'], times: [0, 10], runtimes:['06:00']};


            var time = '2013-02-08 05:40';


            var journeyPlan = Service.getDirections(departure, arrival, time, [line1], stops);



            expect(journeyPlan.options.length).toBe(1);
            var option = journeyPlan.options[0];


            expect(option.length).toBe(1);
            var leg = option[0];

            expect(leg.departureStopTime).toBe('06:00');
            expect(leg.arrivalStopTime).toBe('06:10');
            expect(leg.departureStopId).toBe('s1');
            expect(leg.arrivalStopId).toBe('s2');
            expect(leg.departureLineId).toBe('1');
            expect(leg.arrivalLineId).toBe('1');
        });



    });
})();
