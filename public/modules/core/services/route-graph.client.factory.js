'use strict';


angular.module('core').factory('RouteGraph', [
    'lodash', '$moment',
    function (_, moment) {


        function RouteGraphInstance() {


            this.nodes = [];
            this.edges = [];

            this.getNode = function (id) {
                return _.find(this.nodes, function (n) {
                    return n.id === id;
                });
            };

            this.getEdges = function (n) {
                return _.filter(this.edges, function (e) {
                    return e.from === n.id;
                });
            };

            this.init = function (lines) {
                var _self = this;

                var getStop = function (id, linename) {
                    var line = _.find(lines, function (line) {
                        return line.id === linename;
                    });

                    if (!line) {
                        return [];
                    }

                    return _.find(line.stops, function (stop) {
                        return stop.id === id;
                    });
                };

                _.forEach(lines, function (line) {
                    _self.nodes.push({id: line.id});
                    _.forEach(line.stops, function (arrivalStop) {

                        _.forEach(arrivalStop.lines, function (change) {

                            if (change !== line.id) {

                                var departureStop = getStop(arrivalStop.id, change);
                                _self.edges.push({
                                    from: line.id,
                                    to: change,
                                    arrivalStop: arrivalStop,
                                    departureStop: departureStop,
                                    visited: false
                                });
                            }
                        });
                    });
                });
                return this;
            };

            this.calculatePaths = function (start, stop) {
                var path = [];
                var paths = [];
                _.forEach(this.edges, function (edge) {
                    edge.visited = false;
                });
                this.traverse(start, stop, path, paths);
                return paths;
            };

            this.printPath = function (path) {

                _.forEach(path, function (leg) {
                    console.log(leg.arrivalStop.id + leg.arrivalStop.line + ' - ' + leg.departureStop.id + leg.departureStop.line);
                });

            };

            this.canChange = function (edge, path) {
                var result = true;
                //var backToLine;



                _.forEach(path, function (stop) {
                    //if (stop.departureStop.line ===  edge.arrivalStop.line) {
                    //    backToLine = true;
                    //
                    //}
                    if (stop.arrivalStop.id === edge.arrivalStop.id || stop.departureStop.id === edge.arrivalStop.id) {
                        result = false;
                    }
                });

                if (result)  {
                    console.log('  arrival line',edge.arrivalStop.line);
                }


                return result;
            };

            this.traverse = function (start, stop, path, paths) {
                var _self = this;
                var n = _self.getNode(start);
                _.forEach(_self.getEdges(n), function (edge) {

                    if (_self.canChange(edge, path)) {
                        console.log('pushing');
                        path.push(edge);
                        _self.printPath(path);


                        if (edge.to === stop) {


                            console.log('solution found');
                            paths.push(_.cloneDeep(path));

                        } else {
                            console.log('recursion');
                            _self.traverse(edge.to, stop, path, paths);

                        }

                        console.log('popping');

                        path.pop();
                        _self.printPath(path);
                    }

                    //console.log('  done ',edge.arrivalStop.id);
                });
            };

        }

        return {
            createNew: function (lines) {

                return new RouteGraphInstance().init(lines);
            }
        };

    }
]);
