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
            var stop1ab = {info: {naptan: 's1ab'}};
            var stop2abc = {info: {naptan: 's2abc'}};
            var stop3a = {info: {naptan: 's3a'}};

            var stop3bc = {info: {naptan: 's3bc'}};

            var stop1c = {info: {naptan: 's1c'}};

            var linea = {id: 'a', stops: ['s1ab', 's2abc', 's3a']};
            var lineb = {id: 'b', stops: ['s1ab', 's2abc', 's3bc']};
            var linec = {id: 'c', stops: ['s1c', 's2abc', 's3bc']};

            var stops = {s1ab: stop1ab, s2abc:stop2abc, s3a: stop3a,
                s3bc: stop3bc,
                s1c: stop1c};
            var network = Service.calculateNetwork([linea, lineb, linec], stops);

            expect(network.length).toBe(3);
            expect(network[0].id).toBe('a');
            expect(network[0].stops).toContain({info: {naptan: 's1ab'},  line: 'a', lines: ['a', 'b']});
            expect(network[0].stops).toContain({info: {naptan: 's2abc'}, line: 'a', lines: ['a', 'b', 'c']});
            expect(network[0].stops).toContain({info: {naptan: 's3a'},  line: 'a', lines: ['a']});

            expect(network[1].id).toBe('b');
            expect(network[1].stops).toContain({info: {naptan: 's1ab'},  line: 'b', lines: ['a', 'b']});
            expect(network[1].stops).toContain({info: {naptan: 's2abc'}, line: 'b', lines: ['a', 'b', 'c']});
            expect(network[1].stops).toContain({info: {naptan: 's3bc'},  line: 'b', lines: ['b', 'c']});

            expect(network[2].id).toBe('c');
            expect(network[2].stops).toContain({info: {naptan: 's1c'},  line: 'c', lines: ['c']});
            expect(network[2].stops).toContain({info: {naptan: 's2abc'}, line: 'c', lines: ['a', 'b', 'c']});
            expect(network[2].stops).toContain({info: {naptan: 's3bc'},  line: 'c', lines: ['b', 'c']});
        });

        it('should calculate three intersecting lines', function () {
            var stop1a = {info: {naptan: 's1a'}};
            var stop2abc = {info: {naptan: 's2abc'}};
            var stop3a = {info: {naptan: 's3a'}};

            var stop1b = {info: {naptan: 's1b'}};
            var stop3b = {info: {naptan: 's3b'}};

            var stop1c = {info: {naptan: 's1c'}};
            var stop3c = {info: {naptan: 's3c'}};

            var linea = {id: 'a', stops: ['s1a', 's2abc', 's3a']};
            var lineb = {id: 'b', stops: ['s1b', 's2abc', 's3b']};
            var linec = {id: 'c', stops: ['s1c', 's2abc', 's3c']};

            var stops = {s1a: stop1a, s2abc:stop2abc, s3a: stop3a,
                s1b: stop1b, s3b: stop3b,
                s1c: stop1c, s3c: stop3c};

            var network = Service.calculateNetwork([linea, lineb, linec], stops);

            expect(network.length).toBe(3);
            expect(network[0].id).toBe('a');
            expect(network[0].stops).toContain({info: {naptan: 's1a'},  line: 'a', lines: ['a']});
            expect(network[0].stops).toContain({info: {naptan: 's2abc'}, line: 'a',  lines: ['a', 'b', 'c']});
            expect(network[0].stops).toContain({info: {naptan: 's3a'},  line: 'a', lines: ['a']});
            expect(network[1].id).toBe('b');
            expect(network[1].stops).toContain({info: {naptan: 's1b'},  line: 'b', lines: ['b']});
            expect(network[1].stops).toContain({info: {naptan: 's2abc'}, line: 'b', lines: ['a', 'b', 'c']});
            expect(network[1].stops).toContain({info: {naptan: 's3b'},  line: 'b', lines: ['b']});
            expect(network[2].id).toBe('c');
            expect(network[2].stops).toContain({info: {naptan: 's1c'},  line: 'c', lines: ['c']});
            expect(network[2].stops).toContain({info: {naptan: 's2abc'}, line: 'c', lines: ['a', 'b', 'c']});
            expect(network[2].stops).toContain({info: {naptan: 's3c'},  line: 'c', lines: ['c']});



        });

        it('should calculate two intersecting lines', function () {
            var stop1a = {info:{naptan:'s1a'}};
            var stop2ab = {info:{naptan:'s2ab'}};
            var stop3a = {info:{naptan:'s3a'}};
            //
            var stop1b = {info:{naptan:'s1b'}};
            var stop3b = {info:{naptan:'s3b'}};

            var linea = {id: 'a', stops: ['s1a', 's2ab', 's3a']};
            var lineb = {id: 'b', stops: ['s1b', 's2ab', 's3b']};

            var stops = {s1a: stop1a, s2ab:stop2ab, s3a: stop3a, s1b: stop1b, s3b: stop3b};
            var network = Service.calculateNetwork([linea, lineb], stops);

            expect(network.length).toBe(2);
            expect(network[0].id).toBe('a');
            expect(network[0].stops).toContain({info: {naptan: 's1a'}, line: 'a', lines: ['a']});
            expect(network[0].stops).toContain({info: {naptan: 's2ab'}, line: 'a', lines: ['a', 'b']});
            expect(network[0].stops).toContain({info: {naptan: 's3a'}, line: 'a', lines: ['a']});

            expect(network[1].id).toBe('b');
            expect(network[1].stops).toContain({info: {naptan: 's1b'}, line: 'b', lines: ['b']});
            expect(network[1].stops).toContain({info: {naptan: 's2ab'}, line: 'b', lines: ['a', 'b']});
            expect(network[1].stops).toContain({info: {naptan: 's3b'}, line: 'b', lines: ['b']});
        });


        it('should calculate trivial network', function () {
            var stop1 = {info: {naptan: 's1'}};
            var stop2 = {info: {naptan: 's2'}};

            var line1 = {id: '1', stops: ['s1', 's2']};

            var stops = {s1: stop1, s2:stop2};
            var network = Service.calculateNetwork([line1], stops);

            expect(network.length).toBe(1);
            expect(network[0].id).toBe('1');
            expect(network[0].stops).toContain({info:{naptan:'s1'}, line: '1', lines: ['1']});
            expect(network[0].stops).toContain({info:{naptan:'s2'}, line: '1', lines: ['1']});
        });




    });
})();
