'use strict';

(function () {
    describe('RouteGraph', function () {
        //Initialize global variables
        var RouteGraph;

     //   console.log(ApplicationConfiguration.applicationModuleName);

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));




        beforeEach(inject(function (_RouteGraph_) {
            RouteGraph = _RouteGraph_;
        }));

        fit('should build graph with alternatives with more than one change', function () {


            // line a: s1    s2           s4          s6
            // line b:                    s4          s6
            // line c:       s2           s4
            // line x:                                s6    s9

            // routes: s1a - s6a - s6x - s9x
            //         s1a - s4a - s4b - s6b - s6x - s9x
            //         s1a - s2a - s2c - s4c - s4a - s6a - s6x - s9x
            //         s1a - s2a - s2c - s4c - s4b - s6b - s6x - s9x




            var stop1a = {id: 's1', line: 'a', lines: ['a']};
            var stop2a = {id: 's2', line: 'a', lines: ['a', 'c']};
            var stop2c = {id: 's2', line: 'c', lines: ['a', 'c']};
            var stop4a = {id: 's4', line: 'a', lines: ['a', 'b', 'c']};
            var stop4b = {id: 's4', line: 'b', lines: ['a', 'b', 'c']};
            var stop4c = {id: 's4', line: 'c', lines: ['a', 'b', 'c']};
            var stop6a = {id: 's6', line: 'a', lines: ['a', 'b', 'x']};
            var stop6b = {id: 's6', line: 'b', lines: ['a', 'b', 'x']};
            var stop6x = {id: 's6', line: 'x', lines: ['a', 'b', 'x']};
            var stop9x = {id: 's9', line: 'x', lines: ['x']};

            var linea = {id: 'a', stops: [stop1a, stop2a, stop4a, stop6a]};
            var lineb = {id: 'b', stops: [stop4b, stop6b]};
            var linec = {id: 'c', stops: [stop2c, stop4c]};
            var linex = {id: 'x', stops: [stop6x, stop9x]};


            var graph = RouteGraph.createNew([linea, lineb, linec, linex]);
            expect(graph.nodes.length).toBe(4);
            expect(graph.edges.length).toBe(14);

            var edge2ac = {from: stop2a.line, to: stop2c.line, arrivalStop: stop2a, departureStop: stop2c};
            var edge2ca = {from: stop2c.line, to: stop2a.line, arrivalStop: stop2c, departureStop: stop2a};
            var edge4ab = {from: stop4a.line, to: stop4b.line, arrivalStop: stop4a, departureStop: stop4b};
            var edge4ba = {from: stop4b.line, to: stop4a.line, arrivalStop: stop4b, departureStop: stop4a};
            var edge4ac = {from: stop4a.line, to: stop4c.line, arrivalStop: stop4a, departureStop: stop4c};
            var edge4ca = {from: stop4c.line, to: stop4a.line, arrivalStop: stop4c, departureStop: stop4a};
            var edge4bc = {from: stop4b.line, to: stop4c.line, arrivalStop: stop4b, departureStop: stop4c};
            var edge4cb = {from: stop4c.line, to: stop4b.line, arrivalStop: stop4c, departureStop: stop4b};
            var edge6ab = {from: stop6a.line, to: stop6b.line, arrivalStop: stop6a, departureStop: stop6b};
            var edge6ba = {from: stop6b.line, to: stop6a.line, arrivalStop: stop6b, departureStop: stop6a};
            var edge6ax = {from: stop6a.line, to: stop6x.line, arrivalStop: stop6a, departureStop: stop6x};
            var edge6xa = {from: stop6x.line, to: stop6a.line, arrivalStop: stop6x, departureStop: stop6a};
            var edge6bx = {from: stop6b.line, to: stop6x.line, arrivalStop: stop6b, departureStop: stop6x};
            var edge6xb = {from: stop6x.line, to: stop6b.line, arrivalStop: stop6x, departureStop: stop6b};


            expect(graph.edges).toContain(edge2ac);
            expect(graph.edges).toContain(edge2ca);
            expect(graph.edges).toContain(edge4ab);
            expect(graph.edges).toContain(edge4ba);
            expect(graph.edges).toContain(edge4ac);
            expect(graph.edges).toContain(edge4ca);
            expect(graph.edges).toContain(edge4bc);
            expect(graph.edges).toContain(edge4cb);
            expect(graph.edges).toContain(edge6ab);
            expect(graph.edges).toContain(edge6ba);
            expect(graph.edges).toContain(edge6ax);
            expect(graph.edges).toContain(edge6xa);
            expect(graph.edges).toContain(edge6bx);
            expect(graph.edges).toContain(edge6xb);


            var paths = graph.calculatePaths('a', 'x');

            var expectedPath3 = [
                {arrivalStop: stop2a, departureStop: stop2c},
                {arrivalStop: stop4c, departureStop: stop4a},
                {arrivalStop: stop6a, departureStop: stop6x},
            ];
            var expectedPath4 = [
                {arrivalStop: stop2a, departureStop: stop2c},
                {arrivalStop: stop4c, departureStop: stop4b},
                {arrivalStop: stop6b, departureStop: stop6x},
            ];



            expect(paths).toContain(expectedPath3);
            expect(paths).toContain(expectedPath4);


        });

        it('should not go backwards', function () {

            // line a: s1    s2    s3
            // line b:       s2    s3
            // line c:       s2          s4

            // routes: s1a - s2a - s2c - s4c

            var stop1a = {id: 's1', line: 'a', lines: ['a']};
            var stop2a = {id: 's2', line: 'a', lines: ['a', 'b', 'c']};
            var stop2b = {id: 's2', line: 'b', lines: ['a', 'b', 'c']};
            var stop2c = {id: 's2', line: 'c', lines: ['a', 'b', 'c']};
            var stop3a = {id: 's3', line: 'a', lines: ['a', 'b']};
            var stop3b = {id: 's3', line: 'b', lines: ['a', 'b']};
            var stop4c = {id: 's4', line: 'c', lines: ['c']};

            var linea = {id: 'a', stops: [stop1a, stop2a, stop3a]};
            var lineb = {id: 'b', stops: [stop2b, stop3b]};
            var linec = {id: 'c', stops: [stop2c, stop4c]};

            var graph = RouteGraph.createNew([linea, lineb, linec]);
            expect(graph.nodes.length).toBe(3);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.nodes[1].id).toBe('b');
            expect(graph.nodes[2].id).toBe('c');

            expect(graph.edges.length).toBe(8);

            var edge2ab = {from: stop2a.line, to: stop2b.line, arrivalStop: stop2a, departureStop: stop2b};
            var edge2ba = {from: stop2b.line, to: stop2a.line, arrivalStop: stop2b, departureStop: stop2a};
            var edge2ac = {from: stop2a.line, to: stop2c.line, arrivalStop: stop2a, departureStop: stop2c};
            var edge2ca = {from: stop2c.line, to: stop2a.line, arrivalStop: stop2c, departureStop: stop2a};
            var edge2bc = {from: stop2b.line, to: stop2c.line, arrivalStop: stop2b, departureStop: stop2c};
            var edge2cb = {from: stop2c.line, to: stop2b.line, arrivalStop: stop2c, departureStop: stop2b};
            var edge3ab = {from: stop3a.line, to: stop3b.line, arrivalStop: stop3a, departureStop: stop3b};
            var edge3ba = {from: stop3b.line, to: stop3a.line, arrivalStop: stop3b, departureStop: stop3a};

            expect(graph.edges).toContain(edge2ab);
            expect(graph.edges).toContain(edge2ba);
            expect(graph.edges).toContain(edge2ac);
            expect(graph.edges).toContain(edge2ca);
            expect(graph.edges).toContain(edge2bc);
            expect(graph.edges).toContain(edge2cb);
            expect(graph.edges).toContain(edge3ab);
            expect(graph.edges).toContain(edge3ba);


            var paths = graph.calculatePaths('a', 'c');
            expect(paths.length).toBe(1);

            var expectedPath1 = [edge2ac];

            expect(paths).toContain(expectedPath1);
        });

        it('should build graph with more than one change', function () {

            // line a: s1    s2
            // line b:       s2    s3
            // line c:             s3    s4

            // routes: s1a - s2a - s2b - s3b - s3c - s4c

            var stop1a = {id: 's1', line: 'a', lines: ['a']};
            var stop2a = {id: 's2', line: 'a', lines: ['a', 'b']};
            var stop2b = {id: 's2', line: 'b', lines: ['a', 'b']};
            var stop3b = {id: 's3', line: 'b', lines: ['b', 'c']};
            var stop3c = {id: 's3', line: 'c', lines: ['b', 'c']};
            var stop4c = {id: 's4', line: 'c', lines: ['c']};

            var linea = {id: 'a', stops: [stop1a, stop2a]};
            var lineb = {id: 'b', stops: [stop2b, stop3b]};
            var linec = {id: 'c', stops: [stop3c, stop4c]};

            var graph = RouteGraph.createNew([linea, lineb, linec]);
            expect(graph.nodes.length).toBe(3);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.nodes[1].id).toBe('b');
            expect(graph.nodes[2].id).toBe('c');

            expect(graph.edges.length).toBe(4);

            var edge2ab = {from: stop2a.line, to: stop2b.line, arrivalStop: stop2a, departureStop: stop2b};
            var edge2ba = {from: stop2b.line, to: stop2a.line, arrivalStop: stop2b, departureStop: stop2a};
            var edge3cb = {from: stop3c.line, to: stop3b.line, arrivalStop: stop3c, departureStop: stop3b};
            var edge3bc = {from: stop3b.line, to: stop3c.line, arrivalStop: stop3b, departureStop: stop3c};



            expect(graph.edges).toContain(edge2ab);
            expect(graph.edges).toContain(edge2ba);
            expect(graph.edges).toContain(edge3bc);
            expect(graph.edges).toContain(edge3cb);


            var paths = graph.calculatePaths('a', 'c');
            expect(paths.length).toBe(1);

            var expectedPath1 = [edge2ab, edge3bc];

            expect(paths).toContain(expectedPath1);


        });

        it('should build graph with alternative routes', function () {

            // line a: s1    s2          s4
            // line b:       s2    s3    s4

            // routes: s1a - s2a - s4b
            // routes: s1a - s4a - s4b

            var stop1a = {id: 's1', line: 'a', lines: ['a', 'b']};
            var stop1b = {id: 's1', line: 'b', lines: ['a', 'b']};
            var stop2a = {id: 's2', line: 'a', lines: ['a']};
            var stop3b = {id: 's3', line: 'b', lines: ['b']};
            var stop4a = {id: 's4', line: 'a', lines: ['a', 'b']};
            var stop4b = {id: 's4', line: 'b', lines: ['a', 'b']};


            var linea = {id: 'a', stops: [stop1a, stop2a, stop4a]};
            var lineb = {id: 'b', stops: [stop1b, stop3b, stop4b]};

            var graph = RouteGraph.createNew([linea, lineb]);
            expect(graph.nodes.length).toBe(2);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.nodes[1].id).toBe('b');

            expect(graph.edges.length).toBe(4);

            var edge1ab = {from: stop1a.line, to: stop1b.line, arrivalStop: stop1a, departureStop: stop1b};
            var edge1ba = {from: stop1b.line, to: stop1a.line, arrivalStop: stop1b, departureStop: stop1a};
            var edge4ab = {from: stop4a.line, to: stop4b.line, arrivalStop: stop4a, departureStop: stop4b};
            var edge4ba = {from: stop4b.line, to: stop4a.line, arrivalStop: stop4b, departureStop: stop4a};


            expect(graph.edges).toContain(edge1ab);
            expect(graph.edges).toContain(edge1ba);
            expect(graph.edges).toContain(edge4ab);
            expect(graph.edges).toContain(edge4ba);


            var paths = graph.calculatePaths('a', 'b');

            var expectedPath1 = [edge1ab];
            var expectedPath2 = [edge4ab];

            expect(paths).toContain(expectedPath1);
            expect(paths).toContain(expectedPath2);

        });


        it('should build simple graph with one edge', function () {

            // line a: s1    s2
            // line b:       s2    s3

            // routes: s1a - s2a - s2b - s3b

            var stop1a = {id: 's1', line: 'a', lines: ['a']};
            var stop2a = {id: 's2', line: 'a', lines: ['a', 'b']};
            var stop2b = {id: 's2', line: 'b', lines: ['a', 'b']};
            var stop3b = {id: 's3', line: 'b', lines: ['b']};

            var linea = {id: 'a', stops: [stop1a, stop2a]};
            var lineb = {id: 'b', stops: [stop2b, stop3b]};

            var graph = RouteGraph.createNew([linea, lineb]);
            expect(graph.nodes.length).toBe(2);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.nodes[1].id).toBe('b');

            var edge2ab = {from: stop2a.line, to: stop2b.line, arrivalStop: stop2a, departureStop: stop2b};
            var edge2ba = {from: stop2b.line, to: stop2a.line, arrivalStop: stop2b, departureStop: stop2a};


            expect(graph.edges.length).toBe(2);
            expect(graph.edges).toContain(edge2ab);
            expect(graph.edges).toContain(edge2ba);



            var paths = graph.calculatePaths('a', 'b');
            var expectedPath1 = [edge2ab];
            expect(paths).toContain(expectedPath1);

        });

        it('should build trival graph with one node and no edges', function () {

            // line a: s1    s2
            // routes: none

            var stop1a = { id: 's1', line: 'a', lines: ['a']};
            var stop2a = {id: 's2', line: 'a', lines: ['a']};

            var linea = {id: 'a', stops: [stop1a, stop2a] };

            var graph = RouteGraph.createNew([linea]);
            expect(graph.nodes.length).toBe(1);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.edges.length).toBe(0);

        });



    });
})();
