const router = require('express').Router();
const Ticket = require('../model/booked_ticket')
const User = require('../model/User')
const bcrypt = require("bcryptjs");
const { date } = require('@hapi/joi');


router.post('/booking',async (req,res) =>{

    const email = req.body.email
    const source = req.body.source
    const destination = req.body.destination
    const price = req.body.price


    // FETCHING USER DETAILS FROM DB
    const email_exist = await User.findOne({email: req.body.email});

    if(!email_exist)
        res.send('nope')
    var name =  email_exist.first_name + " " + email_exist.last_name 
    var age = email_exist.age


    // CREATING TICKET
    const ticket = new Ticket({
        name: name,
        age: age,
        source: source,
        destination: destination,
        price: price 
    })
    try{
        const booked = await ticket.save();
    }catch(err){
        res.status(400).send(err)
    }

    let ticket_id = (ticket._id).toString()

    const salt = await bcrypt.genSalt(10);
    const hashed_Ticket = await bcrypt.hash(ticket_id, salt)

    let Ddate = ((ticket.date).toString()).split(" ")

    // SENDING JSON TO FRONTEND
    res.json({ticket:hashed_Ticket,
              day: Ddate[0],
              date: Ddate[1] + " " + Ddate[2]+ " "+ Ddate[3],
              time: Ddate[4]})

})
module.exports = router;