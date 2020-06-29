const router = require('express').Router();
<<<<<<< HEAD
const {cost_map, time_map} = require('../calcs/graph');
=======
const {cost_map, time_map} = require('../calcs/graph')
>>>>>>> b0d44431a68b9098b714141a284b934c87e232b2
const verify = require('./user_verification');



// console.log(cost_map(source, destination))

<<<<<<< HEAD
router.post('/result', verify, (req, res) => {
=======
router.post('/result',verify, (req, res) => {
>>>>>>> b0d44431a68b9098b714141a284b934c87e232b2
    let time = 0
    let price = 0
    let cost_efficient_arr = []
    let time_efficient_arr = []

    const source = req.body.source
    const destination = req.body.destination

    const Cost_map = cost_map(source, destination);
    const Time_map = time_map(source, destination);

    // console.log(Cost_map.path.length, Time_map.path.length)

    // TIME TAKEN BY COST EFFICIENT ROUTE
    time = 0
    cost_efficient_arr = []
    for(i=0; i < (Cost_map.path.length) -1; i++){
        const first = Cost_map.path[i];
        const second = Cost_map.path[i+1];

        const time_taken = time_map(first, second)

        const distr_path = (first + `  --[${time_taken.cost} mins]-->  `+ second);

        cost_efficient_arr.push(distr_path);
        time += time_taken.cost
    }

    // PRICE OF TIME EFFICIENT ROUTE
    price = 0
    time_efficient_arr = []
    for(i=0; i < (Time_map.path.length) -1; i++){
        const first = Time_map.path[i];
        const second = Time_map.path[i+1];

        const amount = cost_map(first, second);
        
        const distr_path = (first + `  --[${amount.cost} mins]--> `+ second);

        time_efficient_arr.push(distr_path);
        price += amount.cost
    }


    res.json({
        cost_efficient_route: {
            path: Cost_map.path,
            price: Cost_map.cost,
            "time taken": time,
            "distributed path": cost_efficient_arr
        },
        time_efficient_route: {
            path: Time_map.path,
            price: price,
            "time taken": Time_map.cost,
            "distributed path": time_efficient_arr
        },
    })


})

module.exports = router;
