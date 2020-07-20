const {cost_map} = require('../calcs/graph');
const router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
const {bus_fare, metro_fare} = require('../calcs/fare')
const fs = require('fs');
const verify = require('../routes/user_verification')

var url = "mongodb://localhost:27017/";


router.post('/result', (req,res)=>{

    const bus_array = ['dwarka','moti nagar', 'jhande vala', 'saket', 'CS', 'chandni chowk',
                         'civil lines', 'vishwa vidhyalay', 'samaypur badli', 'mandi house']

    const interchange = ['rajori', 'rajiv chowk', 'kashmiri gate', 'azad nagar', 'NSP', 'indraprasth']
    const metro_array = ['mayapyri', 'shalimar bagh', 'majis park', 'mukund pur', 'rithala', 'inderlok',
                         'tiz hazari', 'shahdra', 'dilshad garden', 'shaheed shtal', 'mohan estate']
    
    let time = 0
    let distr_arr = []
    let transport = {}

   
    const source = req.body.source
    const destination = req.body.destination
    const reach_timee = req.body.reach_time

    const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');
      
        let [hours, minutes] = time.split(':');
      
        if (hours === '12') {
          hours = '00';
        }
      
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }
      
        return `${hours}:${minutes}`;
      }
      
    const rtime = convertTime12to24(reach_timee)
    const reach_time = Number((rtime).replace(":",""))

    const Cost_map = cost_map(source, destination);

    time = 0
    distr_arr = []
    for(i=0; i < (Cost_map.path.length) -1; i++){
        const first = Cost_map.path[i];
        const second = Cost_map.path[i+1];

        const speed = 50
        const time_taken = (cost_map(first, second).cost/50)*60 
        
        const distr_path = (first + `  --[${time_taken.toFixed(2)} mins]-->  `+ second);

        distr_arr.push(distr_path);
        time += time_taken
    }


    transport = {}
    bus_arr = []
    metro_arr = []
   
    for(i=0;i<Cost_map.path.length;i++){
        const first = Cost_map.path[i];
        const second = Cost_map.path[i+1];
    

        let price = cost_map(first, second).cost



        if(bus_array.includes(Cost_map.path[i])){
            bus_arr.push(price)
            transport['bus'+i] = Cost_map.path[i] + ' (Bus Stop)'
        }
        else if(interchange.includes(Cost_map.path[i])){
            if(i == 0){
                if(bus_array.includes(Cost_map.path[i+1])){
                    bus_arr.push(price)
                    transport['bus'+i] = Cost_map.path[i] + ' (Bus Stop)'
                }else if(!bus_array.includes(Cost_map.path[i+1])){
                    bus_arr.push(price)
                    metro_arr.push(price)
                    transport['change'+1] = (Cost_map.path[i]+ " Metro Station --[interchange]--> " 
                                        +  Cost_map.path[i]+ " Bus Stop")
                }
            }else {
                if(bus_array.includes(Cost_map.path[i+1]) && bus_array.includes(Cost_map.path[i-1])){
                    bus_arr.push(price)
                    transport['bus'+1] = Cost_map.path[i] + ' (Bus Stop)'
                }else if((bus_array.includes(Cost_map.path[i-1]) && !bus_array.includes(Cost_map.path[i+1]))){
                    bus_arr.push(price)
                    metro_arr.push(price)
                    transport['change'+i] = (Cost_map.path[i]+ " (Bus Stop) --[interchange]--> " 
                                        +  Cost_map.path[i]+ " (Metro Station)")
                }else if((!bus_array.includes(Cost_map.path[i-1]) && bus_array.includes(Cost_map.path[i+1]))){
                    bus_arr.push(price)
                    metro_arr.push(price)
                    transport['change'+i] = (Cost_map.path[i]+ " (Metro Station) --[interchange]--> " 
                                        +  Cost_map.path[i]+ " (Bus Stop)")
                }else if((!bus_array.includes(Cost_map.path[i-1]) && !bus_array.includes(Cost_map.path[i+1]))){
                    metro_arr.push(price)
                    transport['metro'+i] = Cost_map.path[i] + ' (Metro Station)'
                }
            }

        }else if(!bus_array.includes(Cost_map.path[i]) && !interchange.includes(Cost_map.path[i])){
            metro_arr.push(price)
            transport['metro'+i] = Cost_map.path[i] + ' (Metro Station)'
        }
    }

    bus_arr.pop()
    metro_arr.pop()

    //PARTICULAR BUS AND METRO DISTANCE
    bus_p = bus_arr.reduce((a, b) => a + b, 0)
    metro_p = metro_arr.reduce((a, b) => a + b, 0)


    const total_price = bus_fare(bus_p) + metro_fare(metro_p)

    function timeConvert(n) {
        const num = n;
        const hours = (num / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        return rhours + ":" + rminutes;
        }
        
        String.prototype.splice = function(idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };

        const time_taken_hr = Number(timeConvert(time).replace(":",""))
        const arrival_time = String(reach_time-time_taken_hr).replace(/(..)$/, ":$1")
        console.log(arrival_time,time_taken_hr)


        let newarr = []
        for(i=0;i<Object.keys(transport).length-1;i++){
            if(Object.keys(transport)[i].includes('bus') && Object.keys(transport)[i+1].includes('bus' || 'change')){
                const z = Object.keys(transport)[i]
                newarr.push(transport[z])
            }
        }

        console.log(transport)
        console.log(newarr)

    res.json({
            path: transport,
            total_distance: `${Cost_map.cost}km`,
            time_taken: `${time.toFixed(2)} mins`,
            total_price: `₹${total_price}`,
            arrival_time: arrival_time,
            distributed_path: distr_arr,
            source: source,
            destination: destination,
            reach_time: reach_timee
    })


})

module.exports = router;