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

            var stop1 = {id: 's1'};
            var stop2 = {id: 's2'};
            var stop4 = {id: 's4'};
            var stop6 = {id: 's6'};
            var stop9 = {id: 's9'};


            var lineao = {id: 'ao', stops: ['s1', 's2', 's4', 's6']};
            var linebo = {id: 'bo', stops: ['s4', 's6']};
            var lineco = {id: 'co', stops: ['s2', 's4']};
            var linexo = {id: 'xo', stops: ['s6', 's9']};

            var lineai = {id: 'ai', stops: ['s6', 's4', 's2', 's1']};
            var linebi = {id: 'bi', stops: ['s6', 's4']};
            var lineci = {id: 'ci', stops: ['s4', 's2']};
            var linexi = {id: 'xi', stops: ['s9', 's6']};


            var stops = {s1: stop1, s2:stop2, s4:stop4, s6:stop6, s9:stop9};
            var graph = RouteGraph.createNew([lineao, linebo, lineco, linexo, lineai, linebi, lineci, linexi], stops);

            var edge2ca = {from: 'co', to: 'ao', stop: stop2};
            var edge4ab = {from: 'ao', to: 'bo', stop: stop4};
            var edge4ba = {from: 'bo', to: 'ao', stop: stop4};
            var edge4ac = {from: 'ao', to: 'co', stop: stop4};
            var edge4ca = {from: 'co', to: 'ao', stop: stop4};
            var edge4bc = {from: 'bo', to: 'co', stop: stop4};
            var edge4cb = {from: 'co', to: 'bo', stop: stop4};
            var edge6ab = {from: 'ao', to: 'bo', stop: stop6};
            var edge6ba = {from: 'bo', to: 'ao', stop: stop6};
            var edge6ax = {from: 'ao', to: 'xo', stop: stop6};
            var edge6xa = {from: 'xo', to: 'ao', stop: stop6};
            var edge6bx = {from: 'bo', to: 'xo', stop: stop6};
            var edge6xb = {from: 'xo', to: 'bo', stop: stop6};
            var edge2ac = {from: 'ao', to: 'co', stop: stop2};


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

            var stop1 = {id: 's1'};
            var stop2 = {id: 's2'};
            var stop4 = {id: 's4'};
            var stop6 = {id: 's6'};
            var stop9 = {id: 's9'};

            var linea = {id: 'a', stops: ['s1', 's2', 's4', 's6']};
            var lineb = {id: 'b', stops: ['s4', 's6']};
            var linec = {id: 'c', stops: ['s2', 's4']};
            var linex = {id: 'x', stops: ['s6', 's9']};


            var stops = {s1: stop1, s2:stop2, s4:stop4, s6:stop6, s9:stop9};
            var graph = RouteGraph.createNew([linea, lineb, linec, linex], stops);
            expect(graph.nodes.length).toBe(4);
            expect(graph.edges.length).toBe(14);

            var edge2ac = {from: 'a', to: 'c', stop: stop2};
            var edge2ca = {from: 'c', to: 'a', stop: stop2};
            var edge4ab = {from: 'a', to: 'b', stop: stop4};
            var edge4ba = {from: 'b', to: 'a', stop: stop4};
            var edge4ac = {from: 'a', to: 'c', stop: stop4};
            var edge4ca = {from: 'c', to: 'a', stop: stop4};
            var edge4bc = {from: 'b', to: 'c', stop: stop4};
            var edge4cb = {from: 'c', to: 'b', stop: stop4};
            var edge6ab = {from: 'a', to: 'b', stop: stop6};
            var edge6ba = {from: 'b', to: 'a', stop: stop6};
            var edge6ax = {from: 'a', to: 'x', stop: stop6};
            var edge6xa = {from: 'x', to: 'a', stop: stop6};
            var edge6bx = {from: 'b', to: 'x', stop: stop6};
            var edge6xb = {from: 'x', to: 'b', stop: stop6};


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

            var stop1 = {id: 's1'};
            var stop2 = {id: 's2'};
            var stop3 = {id: 's3'};
            var stop4 = {id: 's4'};

            var stops = {s1: stop1, s2:stop2, s3: stop3, s4:stop4};
            var linea = {id: 'a', stops: ['s1', 's2', 's3']};
            var lineb = {id: 'b', stops: ['s2', 's3']};
            var linec = {id: 'c', stops: ['s2', 's4']};

            var graph = RouteGraph.createNew([linea, lineb, linec], stops);
            expect(graph.nodes.length).toBe(3);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.nodes[1].id).toBe('b');
            expect(graph.nodes[2].id).toBe('c');

            expect(graph.edges.length).toBe(8);

            var edge2ab = {from: 'a', to: 'b', stop: stop2};
            var edge2ba = {from: 'b', to: 'a', stop: stop2};
            var edge2ac = {from: 'a', to: 'c', stop: stop2};
            var edge2ca = {from: 'c', to: 'a', stop: stop2};
            var edge2bc = {from: 'b', to: 'c', stop: stop2};
            var edge2cb = {from: 'c', to: 'b', stop: stop2};
            var edge3ab = {from: 'a', to: 'b', stop: stop3};
            var edge3ba = {from: 'b', to: 'a', stop: stop3};

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

        it('should not overshoot and come back', function () {

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
            var edge3bo_c = {from: 'b-o', to: 'c', stop: stop3};

            //expect(graph.nodes.length).toBe(2);
            //expect(graph.nodes).toContain({id: 'a-o'});
            //expect(graph.nodes).toContain({id: 'a-i'});
            //expect(graph.edges.length).toBe(0);

            var paths = graph.calculatePaths('a', 'c');

            expect(paths.length).toBe(1);
            var expectedPath1 = [edge2a_bo, edge3bo_c];
            expect(paths).toContain(expectedPath1);
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

            var stop1a = {info: {naptan: 's1'}};
            var stop2a = {info: {naptan: 's2'}};

            var stops = {s1: stop1a, s2:stop2a};
            var linea = {id: 'a', stops: ['s1', 's2'] };

            var graph = RouteGraph.createNew([linea], stops);
            expect(graph.nodes.length).toBe(1);
            expect(graph.nodes[0].id).toBe('a');
            expect(graph.edges.length).toBe(0);

        });




    });
})();
