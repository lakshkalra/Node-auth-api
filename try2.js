// // db.buses.insertMany([
// //     {
// //         type: 'bus',
// //         number: 306,
// //         source: "saket",
// //         quantity: 5,
// //         destination: 'samaypur badli',
// //         path: ['saket','CS','Rajiv chowk', 'chandni chowk', 'kashmiri gate',
// //                'civil lines', 'vishwa vidhyalay', 'azad nagar','samayapur badli']
// //     },
// //     {
// //         type: 'bus',
// //         number: 407,
// //         source: "dwarka",
// //         quantity: 9,
// //         destination: 'indraprasth', 
// //         path: ['dwarka', 'rajori', 'moti nagar', 'jhande vala', 'rajiv chowk', 'indraprasth']
// //     },
// //     {
// //         type: 'bus',
// //         number: 309,
// //         source: "kashmiri gate",
// //         quantity: 5,
// //         destination: 'saket',
// //         path: ['saket','CS','Rajiv chowk', 'chandni chowk', 'kashmiri gate',
// //                'civil lines', 'vishwa vidhyalay', 'azad nagar','samayapur badli']
// //     }

// // ])


// db.trains.insertMany([
//     {
//         type: 'train',
//         number: 3065,
//         source: "delhi",
//         capacity: 800,
//         destination: 'himachal pradesh',
//         time: "10:56 PM",
//         path: ['some path']
//     },
//     {
//         type: 'train',
//         number: 4392,
//         source: "chennai",
//         capacity: 850,
//         destination: 'delhi',
//         time: "10:56 PM",
//         path: ['some path']
//     },
//     {
//         type: 'train',
//         number: 7589,
//         source: "mumbai",
//         capacity: 780,
//         destination: 'bhopal',
//         time: "10:56 PM",
//         path: ['some path']
//     }

// ])


// // const convertTime12to24 = (time12h) => {
// //     const [time, modifier] = time12h.split(' ');
  
// //     let [hours, minutes] = time.split(':');
  
// //     if (hours === '12') {
// //       hours = '00';
// //     }
  
// //     if (modifier === 'PM') {
// //       hours = parseInt(hours, 10) + 12;
// //     }
  
// //     return `${hours}:${minutes}`;
// //   }
  
// //   console.log(convertTime12to24('01:02 PM'));
// //   console.log(convertTime12to24('05:06 PM'));
// //   console.log(convertTime12to24('12:00 PM'));
// //   console.log(convertTime12to24('12:00 AM'));

// // function tConvert (time) {
// //     // Check correct time format and split into components
// //     time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
// //     if (time.length > 1) { // If time format correct
// //       time = time.slice (1);  // Remove full string match value
// //       time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
// //       time[0] = +time[0] % 12 || 12; // Adjust hours
// //     }
// //     return time.join (''); // return adjusted time or original string
// //   }
  
// //   console.log(tConvert ('18:00'));

// // var str = "1700";
// // console.log(str.substr(0,2)+":"+str.substr(2))

// // console.log("700".replace(/(..)$/, ":$1"))


// //     const a = [1, 2, 3, 4].reduce((a, b) => a + b, 0)
  
// // console.log(a)

























// // const Graph = require('node-dijkstra');
// // const { Router } = require('express');

// // const cost_map = (source, destination) => {
// //     const cost = new Graph( {
// //         // BUS NO. 403
// //         'dwarka_B': {"rajori_MB": 5},
// //         'rajori_MB': {"NSP": 2,"dwarka_B":2,
// //                    "moti nagar_B":3, "mayapuri":3},
// //         'moti nagar_B': {'rajori_MB': 3, 
// //                          'jhande vala_B': 2},
// //         'jhande vala_B': {'moti nagar_B': 2, 
// //                           'rajiv chowk_B': 2},
// //         'rajiv chowk_B': {'jhande vala_B': 2, 
// //                           'mandi house_MB': 5,
// //                            CS_B:2, 'chandni chowk_MB':1},
// //         'mandi house_MB': {'rajiv chowk_B':5,
// //                           'indraprasth_B': 2},
// //         'indraprasth_B': {'mandi houe_MB': 2},
    
// //         // METRO RITHALA - SHAHEED SHTAL
// //         rithala: {NSP: 3},
// //         NSP: {'shalimar bagh': 2, rithala: 3,
// //                inderlok: 2, rajori_MB: 2},
// //         inderlok: {NSP: 2, 'shastri park': 2},
// //         'shastri park': {inderlok: 2, 'tiz hazari': 2},
// //         'tiz hazari': {'shastri park': 2,
// //                        'kashmiri gate_MB':3},
// //         'kashmiri gate_MB': {'tiz hazari': 3,
// //                           'civil lines_B':2, shahdra: 3, 'chandi chowk_MB': 2,
// //                            indraprasth_MB:10},
// //         shahdra: {'kashmiri gate_MB': 3,'dilshad garden':2},
// //         'dilshad garden': {shahdra: 2,'shaheed shtal':3},
    
// //         // BUS NO. 306
// //         'samayapur badli_B': {'azad nagar_MB':3},
// //         'azad nagar_MB': {'samayapur badli_B':3,
// //                          'mukund pur':2,
// //                          'vishwa vidhyalay_B':3,
// //                          'majis park':3},
// //         'vishwa vidhyalay_B': {'azad nagar_B':3, 
// //                                'civil lines_B':2},
// //         'civil lines_B': {'vishwa vidhyalay_B':2,
// //                           'kashmiri gate_MB':2},
// //         'kashmiri gate_MB': {'civil lines_B':2, 
// //                            'chandni chowk_MB':2,
// //                            'tiz hazari':3, shahdra:3, indraprasth_MB:10},
// //         'chandni chowk_MB': {'kashmiri gate_MB':2, 
// //                           'rajiv chowk_B':1},
// //         'rajiv chowk_B': {'chandni chowk_MB':1,
// //                           'jhande vala_B':2,
// //                           'mandi house_MB':5, CS_B:2},
// //         CS_B: {'rajiv chowk_B':2,indraprasth_MB:1, 
// //                 saket_B:3},
// //         saket_B: {CS_B:3},
            
// //         // METRO KG TO MOHAN ESTATE
// //         'kashmiri gate_MB': {indraprasth_MB:10,
// //                             'civil lines_B':2, 
// //                             'chandni chowk_MB':2,
// //                             'tiz hazari':3, shahdra:3},
// //         indraprasth_MB: {'kashmiri gate_MB':10, 
// //                         'mandi house_MB':2, 
// //                         'mohan estate':5},
    
// //         // METRO MAYAPURI TO MUKUND PUR
// //         mayapuri: {rajori_MB:3},
// //         rajori_MB: {"NSP": 2,"dwarka_B":2,
// //                     "moti nagar_B":3, "mayapuri":3},
// //         NSP: {'shalimar bagh': 2, rithala: 3,
// //                inderlok: 2, rajori_MB: 2},
// //         'shalimar bagh': {NSP: 2, 'majis park':2},
// //         'majis park': {'shalimar bagh':2, 
// //                        'azad nagar_MB':3},
// //         'azad nagar_MB': {'samayapur badli_B':3,
// //                          'mukund pur':2,
// //                          'vishwa vidhyalay_B':3,
// //                          'majis park':3},
// //     });
    
// //       return cost.path(source, destination, {cost:true})
// // }


// // module.exports.cost_map = cost_map;













// if(Cost_map.path[i].includes('_B')){
//     // bus.push(Cost_map.path[i])
//     bus_arr.push(price)
//     transport['bus'+i] = Cost_map.path[i].substring(0, Cost_map.path[i].indexOf("_"))
// }
// else if(Cost_map.path[i].includes('_MB')){
//     if(i == 0){
//         if(Cost_map.path[i+1].includes('_B')){
//             // bus.push(Cost_map.path[i])
//             bus_arr.push(price)
//             transport['bus'+i] = Cost_map.path[i].substring(0, Cost_map.path[i].indexOf("_"))
//         }else if(!Cost_map.path[i+1].includes('_B')){
//             // intermediatea.push(Cost_map.path[i])
//             bus_arr.push(price)
//             metro_arr.push(price)
//             transport['change'+1] = Cost_map.path[i].substring(0, Cost_map.path[i].indexOf("_"))
//         }
//     }else {
//         if(Cost_map.path[i+1].includes('_B') && Cost_map.path[i-1].includes('_B')){
//             // bus.push(Cost_map.path[i])
//             bus_arr.push(price)
//             transport['bus'+1] = Cost_map.path[i].substring(0, Cost_map.path[i].indexOf("_"))
//         }else if((Cost_map.path[i-1].includes('_B') && !Cost_map.path[i+1].includes('_B'))){
//             // intermediatea.push(Cost_map.path[i])
//             bus_arr.push(price)
//             metro_arr.push(price)
//             transport['change'+i] = (Cost_map.path[i].substring(0, Cost_map.path[i].indexOf("_"))+ " Bus --> " 
//                                 +  Cost_map.path[i].substring(0, Cost_map.path[i].indexOf("_"))+ " Metro")
//         }else if((!Cost_map.path[i-1].includes('_B') && Cost_map.path[i+1].includes('_B'))){
//             // intermediatea.push(Cost_map.path[i])
//             bus_arr.push(price)
//             metro_arr.push(price)
//             transport['change'+i] = (Cost_map.path[i].substring(0, Cost_map.path[i].indexOf("_"))+ " Metro --> " 
//                                 +  Cost_map.path[i].substring(0, Cost_map.path[i].indexOf("_"))+ " Bus")
//         }else if((!Cost_map.path[i-1].includes('_B') && !Cost_map.path[i+1].includes('_B'))){
//             // intermediatea.push(Cost_map.path[i])
//             metro_arr.push(price)
//             transport['metro'+i] = Cost_map.path[i].substring(0, Cost_map.path[i].indexOf("_"))
//         }
//     }

// }else if(!Cost_map.path[i].includes('_B') && !Cost_map.path[i].includes('_MB')){
//     // metro.push(Cost_map.path[i])
//     metro_arr.push(price)
//     transport['metro'+i] = Cost_map.path[i]
// }
// }

