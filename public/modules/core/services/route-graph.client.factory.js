'use strict';


angular.module('core').factory('RouteGraph', [
    'lodash', '$moment',
    function (_, moment) {


        return {
            createNew: function (lines) {

                return new RouteGraphInstance().init(lines);
            }
        };


        function RouteGraphInstance() {


            this.nodes= [];
            this.edges = [];

            this.getNode = function (name) {
                return _.find(this.nodes, function (n) {
                    return n.name === name;
                })
            };

            this.getEdges = function (n) {
                return _.filter(this.edges, function (e) {
                    return e.from === n.name;
                });
            };

            this.init = function (lines) {
                var _self = this;

                var getStop = function (id, linename) {
                    var line = _.find(lines, function (line) {
                        return line.name === linename;
                    });

                    if (!line) {
                        return [];
                    }

                    return _.find(line.stops, function (stop) {
                        return stop.id === id;
                    })
                };

                _.forEach(lines, function (line) {
                    _self.nodes.push({name: line.name, visited: false});
                    _.forEach(line.stops, function (arrivalStop) {

                        _.forEach(arrivalStop.lines, function (change) {

                            if (change !== line.name) {

                                var departureStop = getStop(arrivalStop.id, change);
                                _self.edges.push({
                                    from: line.name,
                                    to: change,
                                    arrivalStop: arrivalStop,
                                    departureStop: departureStop
                                });
                            }
                        });
                    });
                });
                return this;
            };

            this.calculatePaths = function(start, stop) {
                var path = [];
                var paths = [];
                _.forEach(this.nodes, function(node) {
                    node.visited = false;
                });
                this.traverse(start, stop, path, paths);
                return paths;
            };

            this.traverse = function (start, stop, path, paths) {
                var _self = this;
                var n = _self.getNode(start);

                n.visited = true;

                _.forEach(_self.getEdges(n), function (edge) {

                    console.log('trying edge ',edge);
                    if (!_self.getNode(edge.to).visited) {


                        console.log(edge.to, stop);
                        if (edge.to === stop) {

                            console.log('pushing');
                            path.push({arrivalStop: edge.arrivalStop, departureStop: edge.departureStop});
                            paths.push(path);
                            path = [];

                        } else {
                            console.log('recursion');
                            path.push({arrivalStop: edge.arrivalStop, departureStop: edge.departureStop});
                            _self.traverse(edge.to, stop, path, paths);
                        }
                    }
                });
            };

        }

    }
]);
