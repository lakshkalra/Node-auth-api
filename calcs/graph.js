const Graph = require('node-dijkstra');
const { Router } = require('express');

const cost_map = (source, destination) => {
    const cost = new Graph( {
        // BUS NO. 403
        'dwarka': {"rajori": 5},
        'rajori': {"NSP": 2,"dwarka":2,
                   "moti nagar":3, "mayapuri":3},
        'moti nagar': {'rajori': 3, 
                         'jhande vala': 2},
        'jhande vala': {'moti nagar': 2, 
                          'rajiv chowk': 2},
        'rajiv chowk': {'jhande vala': 2, 
                          'mandi house': 5,
                           CS:2, 'chandni chowk':1},
        'mandi house': {'rajiv chowk':5,
                          'indraprasth': 2},
        'indraprasth': {'mandi houe': 2},
    
        // METRO RITHALA - SHAHEED SHTAL
        rithala: {NSP: 3},
        NSP: {'shalimar bagh': 2, rithala: 3,
               inderlok: 2, rajori: 2},
        inderlok: {NSP: 2, 'shastri park': 2},
        'shastri park': {inderlok: 2, 'tiz hazari': 2},
        'tiz hazari': {'shastri park': 2,
                       'kashmiri gate':3},
        'kashmiri gate': {'tiz hazari': 3,
                          'civil lines':2, shahdra: 3, 'chandi chowk': 2,
                           indraprasth:10},
        shahdra: {'kashmiri gate': 3,'dilshad garden':2},
        'dilshad garden': {shahdra: 2,'shaheed shtal':3},
    
        // BUS NO. 306
        'samayapur badli': {'azad nagar':3},
        'azad nagar': {'samayapur badli':3,
                         'mukund pur':2,
                         'vishwa vidhyalay':3,
                         'majis park':3},
        'vishwa vidhyalay': {'azad nagar':3, 
                               'civil lines':2},
        'civil lines': {'vishwa vidhyalay':2,
                          'kashmiri gate':2},
        'kashmiri gate': {'civil lines':2, 
                           'chandni chowk':2,
                           'tiz hazari':3, shahdra:3, indraprasth:10},
        'chandni chowk': {'kashmiri gate':2, 
                          'rajiv chowk':1},
        'rajiv chowk': {'chandni chowk':1,
                          'jhande vala':2,
                          'mandi house':5, CS:2},
        CS: {'rajiv chowk':2,indraprasth:1, 
                saket:3},
        saket: {CS:3},
            
        // METRO KG TO MOHAN ESTATE
        'kashmiri gate': {indraprasth:10,
                            'civil lines':2, 
                            'chandni chowk':2,
                            'tiz hazari':3, shahdra:3},
        indraprasth: {'kashmiri gate':10, 
                        'mandi house':2, 
                        'mohan estate':5},
    
        // METRO MAYAPURI TO MUKUND PUR
        mayapuri: {rajori:3},
        rajori: {"NSP": 2,"dwarka":2,
                    "moti nagar":3, "mayapuri":3},
        NSP: {'shalimar bagh': 2, rithala: 3,
               inderlok: 2, rajori: 2},
        'shalimar bagh': {NSP: 2, 'majis park':2},
        'majis park': {'shalimar bagh':2, 
                       'azad nagar':3},
        'azad nagar': {'samayapur badli':3,
                         'mukund pur':2,
                         'vishwa vidhyalay':3,
                         'majis park':3},
    });
    
      return cost.path(source, destination, {cost:true})
}


module.exports.cost_map = cost_map;
