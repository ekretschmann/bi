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

        it('should build graph with alternatives with more than one change', function () {


            // line a: s1    s2           s4
            // line b:       s2     s3
            // line c:       s2           s4    s5
            // line d:                          s5    s6
            // line e:              s3                s6

            // routes: s1a - s2a - s2b - s3b - s3e - s6e
            //         s1a - s2a - s2c - s5c - s5d - s6d
            //
            //         s1a - s4a - s4c - s5c - s5d - s6d
            var stop1a = {
                id: 's1',
                lines: ['a'],
                line: 'a'
            };

            var stop2a = {
                id: 's2',
                lines: ['a', 'b'],
                line: 'a'
            };

            var stop2b = {
                id: 's2',
                lines: ['a', 'b'],
                line: 'b'
            };

            var stop3b = {
                id: 's3',
                lines: ['b', 'c'],
                line: 'b'
            };

            var stop3c = {
                id: 's3',
                lines: ['b', 'c'],
                line: 'c'
            };

            var stop4c = {
                id: 's4',
                lines: ['c'],
                line: 'c'
            };


            var linea = {
                name: 'a',
                stops: [stop1a, stop2a]
            };

            var lineb = {
                name: 'b',
                stops: [stop2b, stop3b]
            };


            var linec = {
                name: 'c',
                stops: [stop3c, stop4c]
            };

            var graph = RouteGraph.createNew([linea, lineb, linec]);
            expect(graph.nodes.length).toBe(3);
            expect(graph.nodes[0].name).toBe('a');
            expect(graph.nodes[1].name).toBe('b');
            expect(graph.nodes[2].name).toBe('c');

            expect(graph.edges.length).toBe(4);

            //console.log(graph.edges[1]);

            var edge1 = {
                from: 'a',
                to: 'b',
                arrivalStop: {
                    id: 's2',
                    line: 'a',
                    lines: ['a', 'b']
                },
                departureStop: {
                    id: 's2',
                    line: 'b',
                    lines: ['a', 'b']
                }
            };

            var edge2 = {
                from: 'b',
                to: 'c',
                arrivalStop: {
                    id: 's3',
                    line: 'b',
                    lines: ['b', 'c']
                },
                departureStop: {
                    id: 's3',
                    line: 'c',
                    lines: ['b', 'c']
                }
            };

            var edge3 = {
                from: 'b',
                to: 'a',
                arrivalStop: {
                    id: 's2',
                    line: 'b',
                    lines: ['a', 'b']
                },
                departureStop: {
                    id: 's2',
                    line: 'a',
                    lines: ['a', 'b']
                }
            };

            var edge4 = {
                from: 'c',
                to: 'b',
                arrivalStop: {
                    id: 's3',
                    line: 'c',
                    lines: ['b', 'c']
                },
                departureStop: {
                    id: 's3',
                    line: 'b',
                    lines: ['b', 'c']
                }
            };

            expect(graph.edges).toContain(edge1);
            expect(graph.edges).toContain(edge2);
            expect(graph.edges).toContain(edge3);
            expect(graph.edges).toContain(edge4);


            var paths = graph.calculatePaths('a', 'c');
            expect(paths.length).toBe(1);


            var expectedPaths = [
                [
                    {
                        arrivalStop: {
                            id: 's2',
                            line: 'a',
                            lines: ['a', 'b']
                        },
                        departureStop: {
                            id: 's2',
                            line: 'b',
                            lines: ['a', 'b']
                        }
                    }, {
                    arrivalStop: {
                        id: 's3',
                        line: 'b',
                        lines: ['b', 'c']
                    },
                    departureStop: {
                        id: 's3',
                        line: 'c',
                        lines: ['b', 'c']
                    }
                }
                ]
            ];

            expect(paths).toEqual(expectedPaths);


        });

        it('should build graph with more than one change', function () {

            var stop1a = {
                id: 's1',
                lines: ['a'],
                line: 'a'
            };

            var stop2a = {
                id: 's2',
                lines: ['a', 'b'],
                line: 'a'
            };

            var stop2b = {
                id: 's2',
                lines: ['a', 'b'],
                line: 'b'
            };

            var stop3b = {
                id: 's3',
                lines: ['b', 'c'],
                line: 'b'
            };

            var stop3c = {
                id: 's3',
                lines: ['b', 'c'],
                line: 'c'
            };

            var stop4c = {
                id: 's4',
                lines: ['c'],
                line: 'c'
            };


            var linea = {
                name: 'a',
                stops: [stop1a, stop2a]
            };

            var lineb = {
                name: 'b',
                stops: [stop2b, stop3b]
            };


            var linec = {
                name: 'c',
                stops: [stop3c, stop4c]
            };

            var graph = RouteGraph.createNew([linea, lineb, linec]);
            expect(graph.nodes.length).toBe(3);
            expect(graph.nodes[0].name).toBe('a');
            expect(graph.nodes[1].name).toBe('b');
            expect(graph.nodes[2].name).toBe('c');

            expect(graph.edges.length).toBe(4);

            //console.log(graph.edges[1]);

            var edge1 = {
                from: 'a',
                to: 'b',
                arrivalStop: {
                    id: 's2',
                    line: 'a',
                    lines: ['a', 'b']
                },
                departureStop: {
                    id: 's2',
                    line: 'b',
                    lines: ['a', 'b']
                }
            };

            var edge2 = {
                from: 'b',
                to: 'c',
                arrivalStop: {
                    id: 's3',
                    line: 'b',
                    lines: ['b', 'c']
                },
                departureStop: {
                    id: 's3',
                    line: 'c',
                    lines: ['b', 'c']
                }
            };

            var edge3 = {
                from: 'b',
                to: 'a',
                arrivalStop: {
                    id: 's2',
                    line: 'b',
                    lines: ['a', 'b']
                },
                departureStop: {
                    id: 's2',
                    line: 'a',
                    lines: ['a', 'b']
                }
            };

            var edge4 = {
                from: 'c',
                to: 'b',
                arrivalStop: {
                    id: 's3',
                    line: 'c',
                    lines: ['b', 'c']
                },
                departureStop: {
                    id: 's3',
                    line: 'b',
                    lines: ['b', 'c']
                }
            };

            expect(graph.edges).toContain(edge1);
            expect(graph.edges).toContain(edge2);
            expect(graph.edges).toContain(edge3);
            expect(graph.edges).toContain(edge4);


            var paths = graph.calculatePaths('a', 'c');
            expect(paths.length).toBe(1);


            var expectedPaths = [
                [
                    {
                        arrivalStop: {
                            id: 's2',
                            line: 'a',
                            lines: ['a', 'b']
                        },
                        departureStop: {
                            id: 's2',
                            line: 'b',
                            lines: ['a', 'b']
                        }
                    }, {
                        arrivalStop: {
                            id: 's3',
                            line: 'b',
                            lines: ['b', 'c']
                        },
                        departureStop: {
                            id: 's3',
                            line: 'c',
                            lines: ['b', 'c']
                        }
                    }
                ]
            ];

            expect(paths).toEqual(expectedPaths);


        });

        fit('should build graph with alternative routes', function () {

            var stop1a = {
                id: 's1',
                lines: ['a', 'b'],
                line: 'a'
            };

            var stop1b = {
                id: 's1',
                lines: ['a', 'b'],
                line: 'b'
            };

            var stop2a = {
                id: 's2',
                lines: ['a'],
                line: 'a'
            };

            var stop3b = {
                id: 's3',
                lines: ['b'],
                line: 'b'
            };

            var stop4a = {
                id: 's4',
                lines: ['a', 'b'],
                line: 'a'
            };

            var stop4b = {
                id: 's4',
                lines: ['a', 'b'],
                line: 'b'
            };


            var linea = {
                name: 'a',
                stops: [stop1a, stop2a, stop4a]
            };

            var lineb = {
                name: 'b',
                stops: [stop1b, stop3b, stop4b]
            };

            var graph = RouteGraph.createNew([linea, lineb]);
            expect(graph.nodes.length).toBe(2);
            expect(graph.nodes[0].name).toBe('a');
            expect(graph.nodes[1].name).toBe('b');

            expect(graph.edges.length).toBe(4);

            var edge1 = {
                from: 'a',
                to: 'b',
                arrivalStop: {
                    id: 's1',
                    line: 'a',
                    lines: ['a', 'b']
                },
                departureStop: {
                    id: 's1',
                    line: 'b',
                    lines: ['a', 'b']
                }
            };

            var edge2 = {
                from: 'a',
                to: 'b',
                arrivalStop: {
                    id: 's4',
                    line: 'a',
                    lines: ['a', 'b']
                },
                departureStop: {
                    id: 's4',
                    line: 'b',
                    lines: ['a', 'b']
                }
            };

            var edge3 = {
                from: 'b',
                to: 'a',
                arrivalStop: {
                    id: 's1',
                    line: 'b',
                    lines: ['a', 'b']
                },
                departureStop: {
                    id: 's1',
                    line: 'a',
                    lines: ['a', 'b']
                }
            };

            var edge4 = {
                from: 'b',
                to: 'a',
                arrivalStop: {
                    id: 's4',
                    line: 'b',
                    lines: ['a', 'b']
                },
                departureStop: {
                    id: 's4',
                    line: 'a',
                    lines: ['a', 'b']
                }
            };

            expect(graph.edges).toContain(edge1);
            expect(graph.edges).toContain(edge2);
            expect(graph.edges).toContain(edge3);
            expect(graph.edges).toContain(edge4);


            var paths = graph.calculatePaths('a', 'b');


            var expectedPaths = [
                [
                    {
                        arrivalStop: {
                            id: 's1',
                            lines: [ 'a', 'b' ],
                            line: 'a'
                        },
                        departureStop: {
                            id: 's1',
                            lines: [ 'a', 'b' ],
                            line: 'b' }
                    }
                ],
                [
                    {
                        arrivalStop: {
                            id: 's4',
                            lines: [ 'a', 'b' ],
                            line: 'a'
                        },
                        departureStop: {
                            id: 's4',
                            lines: [ 'a', 'b' ],
                            line: 'b'
                        }
                    }
                ]
            ];

            expect(paths).toEqual(expectedPaths);


        });


        it('should build simple graph with one edge', function () {

            var stop1 = {
                id: 's1',
                lines: ['1'],
                line: '1'
            };

            var stop2a = {
                id: 's2',
                lines: ['1', '2'],
                line: '1'
            };

            var stop2b = {
                id: 's2',
                lines: ['1', '2'],
                line: '2'
            };

            var stop3 = {
                id: 's3',
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

            var edge1 = {
                from: '1',
                to: '2',
                arrivalStop: {
                    id: 's2',
                    line: '1',
                    lines: ['1', '2']
                },
                departureStop: {
                    id: 's2',
                    line: '2',
                    lines: ['1', '2']
                }
            };

            var edge2 = {
                from: '2',
                to: '1',
                arrivalStop: {
                    id: 's2',
                    line: '2',
                    lines: ['1', '2']
                },
                departureStop: {
                    id: 's2',
                    line: '1',
                    lines: ['1', '2']
                }
            };


            expect(graph.edges.length).toBe(2);
            expect(graph.edges).toContain(edge1);
            expect(graph.edges).toContain(edge2);

            var paths = graph.calculatePaths('1', '2');
            var expectedPaths = [
                [
                    {
                        arrivalStop: {
                            id: 's2',
                            line: '1',
                            lines: ['1', '2']
                        },
                        departureStop: {
                            id: 's2',
                            line: '2',
                            lines: ['1', '2']
                        }
                    }
                ]
            ];

            expect(paths).toEqual(expectedPaths);

        });

        it('should build trival graph with one node and no edges', function () {

            var stop1 = {
                id: 's1',
                lines: ['1'],
                line: '1'
            };

            var stop2 = {
                id: 's2',
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
