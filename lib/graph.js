"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newGraph = newGraph;
exports.addEdge = addEdge;
exports.addVertex = addVertex;

function newGraph() {
  return {
    edges: [],
    vertices: []
  };
}

function addEdge(traverser, id, label, to, from, props) {
  traverser.graph.edges.push({
    id: id,
    label: label,
    to: to,
    from: from,
    props: props
  });
}

function addVertex(traverser, id, label, props) {
  var v = {
    id: id,
    label: label,
    props: props
  };
  traverser.graph.vertices.push({
    id: id,
    label: label,
    props: props
  });
  return [v];
}