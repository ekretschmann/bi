'use strict';

(function () {
    describe('BuslinesToNetworkCalculator', function () {
        //Initialize global variables
        var Service;


      //  console.log(ApplicationConfiguration.applicationModuleName);

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));




        beforeEach(inject(function (_BuslinesToNetworkCalculator_) {

            Service = _BuslinesToNetworkCalculator_;
        }));


        it('should calculate triangle of lines', function () {
            var stop1a = {_id: 's1ab', line: 'a'};
            var stop2a = {_id: 's2abc', line: 'a'};
            var stop3a = {_id: 's3a', line: 'a'};

            var stop1b = {_id: 's1ab', line: 'b'};
            var stop2b = {_id: 's2abc', line: 'b'};
            var stop3b = {_id: 's3bc', line: 'b'};

            var stop1c = {_id: 's1c', line: 'c'};
            var stop2c = {_id: 's2abc', line: 'c'};
            var stop3c = {_id: 's3bc', line: 'c'};

            var linea = {_id: 'a', stops: [stop1a, stop2a, stop3a]};
            var lineb = {_id: 'b', stops: [stop1b, stop2b, stop3b]};
            var linec = {_id: 'c', stops: [stop1c, stop2c, stop3c]};

            var network = Service.calculateNetwork([linea, lineb, linec]);

            expect(network.length).toBe(3);
            expect(network[0].id).toBe('a');
            expect(network[0].stops).toContain({_id: 's1ab', id: 's1ab', line: 'a', lines: ['a', 'b']});
            expect(network[0].stops).toContain({_id: 's2abc', id: 's2abc', line: 'a', lines: ['a', 'b', 'c']});
            expect(network[0].stops).toContain({_id: 's3a', id: 's3a', line: 'a', lines: ['a']});

            expect(network[1].id).toBe('b');
            expect(network[1].stops).toContain({_id: 's1ab', id: 's1ab', line: 'b', lines: ['a', 'b']});
            expect(network[1].stops).toContain({_id: 's2abc', id: 's2abc', line: 'b', lines: ['a', 'b', 'c']});
            expect(network[1].stops).toContain({_id: 's3bc', id: 's3bc', line: 'b', lines: ['b', 'c']});

            expect(network[2].id).toBe('c');
            expect(network[2].stops).toContain({_id: 's1c', id: 's1c', line: 'c', lines: ['c']});
            expect(network[2].stops).toContain({_id: 's2abc', id: 's2abc', line: 'c', lines: ['a', 'b', 'c']});
            expect(network[2].stops).toContain({_id: 's3bc', id: 's3bc', line: 'c', lines: ['b', 'c']});
        });

        it('should calculate three intersecting lines', function () {
            var stop1a = {_id: 's1a', line: 'a'};
            var stop2a = {_id: 's2abc', line: 'a'};
            var stop3a = {_id: 's3a', line: 'a'};

            var stop1b = {_id: 's1b', line: 'b'};
            var stop2b = {_id: 's2abc', line: 'b'};
            var stop3b = {_id: 's3b', line: 'b'};

            var stop1c = {_id: 's1c', line: 'c'};
            var stop2c = {_id: 's2abc', line: 'c'};
            var stop3c = {_id: 's3c', line: 'c'};

            var linea = {_id: 'a', stops: [stop1a, stop2a, stop3a]};
            var lineb = {_id: 'b', stops: [stop1b, stop2b, stop3b]};
            var linec = {_id: 'c', stops: [stop1c, stop2c, stop3c]};

            var network = Service.calculateNetwork([linea, lineb, linec]);

            expect(network.length).toBe(3);
            expect(network[0].id).toBe('a');
            expect(network[0].stops).toContain({_id: 's1a', id: 's1a', line: 'a', lines: ['a']});
            expect(network[0].stops).toContain({_id: 's2abc', id: 's2abc', line: 'a', lines: ['a', 'b', 'c']});
            expect(network[0].stops).toContain({_id: 's3a', id: 's3a', line: 'a', lines: ['a']});

            expect(network[1].id).toBe('b');
            expect(network[1].stops).toContain({_id: 's1b', id: 's1b', line: 'b', lines: ['b']});
            expect(network[1].stops).toContain({_id: 's2abc', id: 's2abc', line: 'b', lines: ['a', 'b', 'c']});
            expect(network[1].stops).toContain({_id: 's3b', id: 's3b', line: 'b', lines: ['b']});

            expect(network[2].id).toBe('c');
            expect(network[2].stops).toContain({_id: 's1c', id: 's1c', line: 'c', lines: ['c']});
            expect(network[2].stops).toContain({_id: 's2abc', id: 's2abc', line: 'c', lines: ['a', 'b', 'c']});
            expect(network[2].stops).toContain({_id: 's3c', id: 's3c', line: 'c', lines: ['c']});
        });

        it('should calculate two intersecting lines', function () {
            var stop1a = {_id: 's1a', line: 'a'};
            var stop2a = {_id: 's2ab', line: 'a'};
            var stop3a = {_id: 's3a', line: 'a'};

            var stop1b = {_id: 's1b', line: 'b'};
            var stop2b = {_id: 's2ab', line: 'b'};
            var stop3b = {_id: 's3b', line: 'b'};

            var linea = {_id: 'a', stops: [stop1a, stop2a, stop3a]};
            var lineb = {_id: 'b', stops: [stop1b, stop2b, stop3b]};

            var network = Service.calculateNetwork([linea, lineb]);

            expect(network.length).toBe(2);
            expect(network[0].id).toBe('a');
            expect(network[0].stops).toContain({_id: 's1a', id: 's1a', line: 'a', lines: ['a']});
            expect(network[0].stops).toContain({_id: 's2ab', id: 's2ab', line: 'a', lines: ['a', 'b']});
            expect(network[0].stops).toContain({_id: 's3a', id: 's3a', line: 'a', lines: ['a']});

            expect(network[1].id).toBe('b');
            expect(network[1].stops).toContain({_id: 's1b', id: 's1b', line: 'b', lines: ['b']});
            expect(network[1].stops).toContain({_id: 's2ab', id: 's2ab', line: 'b', lines: ['a', 'b']});
            expect(network[1].stops).toContain({_id: 's3b', id: 's3b', line: 'b', lines: ['b']});
        });


        it('should calculate trivial network', function () {
            var stop1a = {_id: 's1', line: '1'};
            var stop2a = {_id: 's2', line: '1'};

            var line1 = {_id: '1', stops: [stop1a, stop2a]};

            var network = Service.calculateNetwork([line1]);

            expect(network.length).toBe(1);
            expect(network[0].id).toBe('1');
            expect(network[0].stops).toContain({_id: 's1', id: 's1', line: '1', lines: ['1']});
            expect(network[0].stops).toContain({_id: 's2', id: 's2', line: '1', lines: ['1']});
        });




    });
})();
