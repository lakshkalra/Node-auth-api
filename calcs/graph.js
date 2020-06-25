const Graph = require('node-dijkstra');
const { Router } = require('express');

const cost_map = (source, destination) => {
    const cost = new Graph( {
        start: {A: 5, B: 2},
        A: {C: 4, D: 2},
        B: {A: 8, D: 7},
        C: {D: 6, finish: 3},
        D: {finish: 1},
        finish: {}
      });
      return cost.path(source, destination, {cost:true})
}


const time_map = (source, destination) => {
    const time = new Graph( {
        start: {A: 10, B: 15},
        A: {C: 16, D: 20},
        B: {A: 5, D: 53},
        C: {D: 11, finish: 13},
        D: {finish: 10},
        finish: {}
     });
    return time.path(source, destination, {cost:true})
    
}

module.exports.cost_map = cost_map;
module.exports.time_map = time_map;