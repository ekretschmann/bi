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

        it('should build graph with alternatives with more than one change with buses running both ways', function () {


            // line a: s1    s2           s4          s6
            // line b:                    s4          s6
            // line c:       s2           s4
            // line x:                                s6    s9

            // routes: s1a - s2a - s2c - s4c - s4a - s6a - s6x - s9x
            //         s1a - s2a - s2c - s4c - s4b - s6b - s6x - s9x
            //         s1a - s4a - s4b - s6b - s6x - s9x
            //         s1a - s6a - s6x - s9x

            var stop1ao = {id: 's1', line: 'ao'};
            var stop2ao = {id: 's2', line: 'ao'};
            var stop2co = {id: 's2', line: 'co'};
            var stop4ao = {id: 's4', line: 'ao'};
            var stop4bo = {id: 's4', line: 'bo'};
            var stop4co = {id: 's4', line: 'co'};
            var stop6ao = {id: 's6', line: 'ao'};
            var stop6bo = {id: 's6', line: 'bo'};
            var stop6xo = {id: 's6', line: 'xo'};
            var stop9xo = {id: 's9', line: 'xo'};

            var stop1ai = {id: 's1', line: 'ai'};
            var stop2ai = {id: 's2', line: 'ai'};
            var stop2ci = {id: 's2', line: 'ci'};
            var stop4ai = {id: 's4', line: 'ai'};
            var stop4bi = {id: 's4', line: 'bi'};
            var stop4ci = {id: 's4', line: 'ci'};
            var stop6ai = {id: 's6', line: 'ai'};
            var stop6bi = {id: 's6', line: 'bi'};
            var stop6xi = {id: 's6', line: 'xi'};
            var stop9xi = {id: 's9', line: 'xi'};

            var lineao = {id: 'ao', stops: [stop1ao, stop2ao, stop4ao, stop6ao]};
            var linebo = {id: 'bo', stops: [stop4bo, stop6bo]};
            var lineco = {id: 'co', stops: [stop2co, stop4co]};
            var linexo = {id: 'xo', stops: [stop6xo, stop9xo]};

            var lineai = {id: 'ai', stops: [stop1ai, stop2ai, stop4ai, stop6ai]};
            var linebi = {id: 'bi', stops: [stop4bi, stop6bi]};
            var lineci = {id: 'ci', stops: [stop2ci, stop4ci]};
            var linexi = {id: 'xi', stops: [stop6xi, stop9xi]};


            var graph = RouteGraph.createNew([lineao, linebo, lineco, linexo, lineai, linebi, lineci, linexi]);

            var edge2ca = {from: stop2co.line, to: stop2ao.line, arrivalStop: stop2co, departureStop: stop2ao};
            var edge4ab = {from: stop4ao.line, to: stop4bo.line, arrivalStop: stop4ao, departureStop: stop4bo};
            var edge4ba = {from: stop4bo.line, to: stop4ao.line, arrivalStop: stop4bo, departureStop: stop4ao};
            var edge4ac = {from: stop4ao.line, to: stop4co.line, arrivalStop: stop4ao, departureStop: stop4co};
            var edge4ca = {from: stop4co.line, to: stop4ao.line, arrivalStop: stop4co, departureStop: stop4ao};
            var edge4bc = {from: stop4bo.line, to: stop4co.line, arrivalStop: stop4bo, departureStop: stop4co};
            var edge4cb = {from: stop4co.line, to: stop4bo.line, arrivalStop: stop4co, departureStop: stop4bo};
            var edge6ab = {from: stop6ao.line, to: stop6bo.line, arrivalStop: stop6ao, departureStop: stop6bo};
            var edge6ba = {from: stop6bo.line, to: stop6ao.line, arrivalStop: stop6bo, departureStop: stop6ao};
            var edge6ax = {from: stop6ao.line, to: stop6xo.line, arrivalStop: stop6ao, departureStop: stop6xo};
            var edge6xa = {from: stop6xo.line, to: stop6ao.line, arrivalStop: stop6xo, departureStop: stop6ao};
            var edge6bx = {from: stop6bo.line, to: stop6xo.line, arrivalStop: stop6bo, departureStop: stop6xo};
            var edge6xb = {from: stop6xo.line, to: stop6bo.line, arrivalStop: stop6xo, departureStop: stop6bo};
            var edge2ac = {from: stop2ao.line, to: stop2co.line, arrivalStop: stop2ao, departureStop: stop2co};


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


            var paths = graph.calculatePaths('ao', 'xo');

            var expectedPath1 = [edge2ac, edge4ca, edge6ax];
            var expectedPath2 = [edge2ac, edge4cb, edge6bx];
            var expectedPath3 = [edge4ab, edge6bx];
            var expectedPath4 = [edge6ax];
            expect(paths).toContain(expectedPath1);
            expect(paths).toContain(expectedPath2);
            expect(paths).toContain(expectedPath3);
            expect(paths).toContain(expectedPath4);


        });

        it('should build graph with alternatives with more than one change', function () {

            // line a: s1    s2           s4          s6
            // line b:                    s4          s6
            // line c:       s2           s4
            // line x:                                s6    s9

            // routes: s1a - s2a - s2c - s4c - s4a - s6a - s6x - s9x
            //         s1a - s2a - s2c - s4c - s4b - s6b - s6x - s9x
            //         s1a - s4a - s4b - s6b - s6x - s9x
            //         s1a - s6a - s6x - s9x

            var stop1a = {id: 's1', line: 'a'};
            var stop2a = {id: 's2', line: 'a'};
            var stop2c = {id: 's2', line: 'c'};
            var stop4a = {id: 's4', line: 'a'};
            var stop4b = {id: 's4', line: 'b'};
            var stop4c = {id: 's4', line: 'c'};
            var stop6a = {id: 's6', line: 'a'};
            var stop6b = {id: 's6', line: 'b'};
            var stop6x = {id: 's6', line: 'x'};
            var stop9x = {id: 's9', line: 'x'};

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

            var expectedPath1 = [edge2ac, edge4ca, edge6ax];
            var expectedPath2 = [edge2ac, edge4cb, edge6bx];
            var expectedPath3 = [edge4ab, edge6bx];
            var expectedPath4 = [edge6ax];
            expect(paths).toContain(expectedPath1);
            expect(paths).toContain(expectedPath2);
            expect(paths).toContain(expectedPath3);
            expect(paths).toContain(expectedPath4);


        });

        it('should not go backwards', function () {

            // line a: s1    s2    s3
            // line b:       s2    s3
            // line c:       s2          s4

            // routes: s1a - s2a - s2c - s4c

            var stop1a = {id: 's1', line: 'a'};
            var stop2a = {id: 's2', line: 'a'};
            var stop2b = {id: 's2', line: 'b'};
            var stop2c = {id: 's2', line: 'c'};
            var stop3a = {id: 's3', line: 'a'};
            var stop3b = {id: 's3', line: 'b'};
            var stop4c = {id: 's4', line: 'c'};

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

        fit('should not overshoot and come back', function () {

            // line a  : s1    s2
            // line b-o:       s2    s3    s4
            // line b-i:       s4    s3    s2
            // line c: :             s3          s5

            // routes: s1a - s2a - s2b - s3b - s3c - s5

            var stop1 = {id: 's1'};
            var stop2 = {id: 's2'};
            var stop3 = {id: 's3'};
            var stop4 = {id: 's4'};
            var stop5 = {id: 's5'};

            var linea = {id: 'a', stops: ['s1', 's2'] };
            var linebo = {id: 'b-o', stops: ['s2', 's3', 's4'] };
            var linebi = {id: 'b-i', stops: ['s4', 's3', 's2'] };
            var linec = {id: 'c', stops: ['s3', 's5'] };

            var stops = {s1: stop1, s2:stop2, s3: stop3, s4:stop4, s5: stop5};
            var graph = RouteGraph.createNew([linea, linebo, linebi, linec], stops);

            var edge2a_bo = {from: 'a', to: 'b-o', stop: stop2};
            var edge3bo_c = {from: 'b-o', to: 'a', stop: stop3};

            //expect(graph.nodes.length).toBe(2);
            //expect(graph.nodes).toContain({id: 'a-o'});
            //expect(graph.nodes).toContain({id: 'a-i'});
            //expect(graph.edges.length).toBe(0);

            var paths = graph.calculatePaths('a', 'c');
            expect(paths.length).toBe(1);
            //var expectedPath1 = [edge2a_bo, edge3bo_c];
            //expect(paths).toContain(expectedPath1);
        });


        it('should build graph with more than one change', function () {

            // line a: s1    s2
            // line b:       s2    s3
            // line c:             s3    s4

            // routes: s1a - s2a - s2b - s3b - s3c - s4c

            var stop1 = {id: 's1'};
            var stop2 = {id: 's2'};
            var stop3 = {id: 's3'};
            var stop4 = {id: 's4'};

            var linea = {id: 'a', stops: ['s1', 's2']};
            var lineb = {id: 'b', stops: ['s2', 's3']};
            var linec = {id: 'c', stops: ['s3', 's4']};

            var stops = {s1: stop1, s2:stop2, s3: stop3, s4:stop4};
            var graph = RouteGraph.createNew([linea, lineb, linec], stops);
            expect(graph.nodes.length).toBe(3);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.nodes[1].id).toBe('b');
            expect(graph.nodes[2].id).toBe('c');

            expect(graph.edges.length).toBe(4);

            var edge2ab = {from: 'a', to: 'b', stop: stop2};
            var edge2ba = {from: 'b', to: 'a', stop: stop2};
            var edge3cb = {from: 'c', to: 'b', stop: stop3};
            var edge3bc = {from: 'b', to: 'c', stop: stop3};



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

            var stop1 = {id: 's1'};
            var stop2 = {id: 's2'};
            var stop3 = {id: 's3'};
            var stop4 = {id: 's4'};


            var stops = {s1: stop1, s2:stop2, s3: stop3, s4:stop4};
            var linea = {id: 'a', stops: ['s1', 's2', 's4']};
            var lineb = {id: 'b', stops: ['s1', 's3', 's4']};

            var graph = RouteGraph.createNew([linea, lineb], stops);
            expect(graph.nodes.length).toBe(2);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.nodes[1].id).toBe('b');

            expect(graph.edges.length).toBe(4);

            var edge1ab = {from: 'a', to: 'b', stop: stop1};
            var edge1ba = {from: 'b', to: 'a', stop: stop1};
            var edge4ab = {from: 'a', to: 'b', stop: stop4};
            var edge4ba = {from: 'b', to: 'a', stop: stop4};


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

            var stop1 = {id: 's1'};
            var stop2 = {id: 's2'};
            var stop3 = {id: 's3'};

            var stops = {s1: stop1, s2:stop2, s3:stop3};
            var linea = {id: 'a', stops: ['s1', 's2']};
            var lineb = {id: 'b', stops: ['s2', 's3']};

            var graph = RouteGraph.createNew([linea, lineb], stops);
            expect(graph.nodes.length).toBe(2);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.nodes[1].id).toBe('b');

            var edge2ab = {from: 'a', to: 'b', stop: stop2};
            var edge2ba = {from: 'b', to: 'a', stop: stop2};


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

            var stop1a = { id: 's1'};
            var stop2a = {id: 's2'};

            var stops = {s1: stop1a, s2:stop2a};
            var linea = {id: 'a', stops: ['s1', 's2'] };

            var graph = RouteGraph.createNew([linea], stops);
            expect(graph.nodes.length).toBe(1);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.edges.length).toBe(0);

        });



    });
})();
