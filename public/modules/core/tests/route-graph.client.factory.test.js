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


        it('should build simple graph with one edge', function () {

            var stop1 = {
                id: 's1',
                name: 'Stop 1',
                lines: ['1'],
                line: '1'
            };

            var stop2a = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1', '2'],
                line: '1'
            };

            var stop2b = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1', '2'],
                line: '2'
            };

            var stop3 = {
                id: 's3',
                name: 'Stop 3',
                lines: ['2'],
                line: '2'
            };

            var line1 = {
                name: '1',
                stops: [stop1, stop2a]
            };

            var line2 = {
                name: '2',
                stops: [stop2b, stop3]
            };

            var graph = RouteGraph.createNew([line1, line2]);
            expect(graph.nodes.length).toBe(2);
            expect(graph.nodes[0].name).toBe('1');
            expect(graph.nodes[1].name).toBe('2');

            expect(graph.edges.length).toBe(2);
            expect(graph.edges[0].from).toBe('1');
            expect(graph.edges[0].to).toBe('2');
            expect(graph.edges[0].arrivalStop).toBeTruthy();
            expect(graph.edges[0].arrivalStop.id).toBe('s2');
            expect(graph.edges[0].arrivalStop.line).toBe('1');
            expect(graph.edges[0].departureStop).toBeTruthy();
            expect(graph.edges[0].departureStop.id).toBe('s2');
            expect(graph.edges[0].departureStop.line).toBe('2');


            expect(graph.edges[1].from).toBe('2');
            expect(graph.edges[1].to).toBe('1');
            expect(graph.edges[1].arrivalStop).toBeTruthy();
            expect(graph.edges[1].arrivalStop.id).toBe('s2');
            expect(graph.edges[1].arrivalStop.line).toBe('2');
            expect(graph.edges[1].departureStop).toBeTruthy();
            expect(graph.edges[1].departureStop.id).toBe('s2');
            expect(graph.edges[1].departureStop.line).toBe('1');

            var paths = graph.calculatePaths('1', '2');
            expect(paths.length).toBe(1);
            console.log(paths);

        });

        it('should build trival graph with one node and no edges', function () {

            var stop1 = {
                id: 's1',
                name: 'Stop 1',
                lines: ['1'],
                line: '1'
            };

            var stop2 = {
                id: 's2',
                name: 'Stop 2',
                lines: ['1'],
                line: '1'
            };


            var line1 = {
                name: '1',
                stops: [stop1, stop2]
            };


            var graph = RouteGraph.createNew([line1]);
            expect(graph.nodes.length).toBe(1);
            expect(graph.nodes[0].name).toBe('1');

            expect(graph.edges.length).toBe(0);

        });



    });
})();
