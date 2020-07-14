const router = require('express').Router();
const Ticket = require('../model/booked_ticket')
const User = require('../model/User')
const bcrypt = require("bcryptjs");


router.post('/booking',async (req,res) =>{

    // const id = req.body.id
    const email = req.body.email
    const source = req.body.source
    const destination = req.body.destination
    const price = req.body.price

    // const user = await User.findById(id);

    //     if(!user) 
    //         return res.status(400).send("email does not exist!!")

    const email_exist = await User.findOne({email: req.body.email});

    if(!email_exist)
        res.send('nope')
    // }

    var name =  email_exist.first_name + " " + email_exist.last_name 
    var age = email_exist.age

    // console.log(email_exist.contact)
    console.log(name,age)

 


    const ticket = new Ticket({
        name: name,
        age: age,
        source: source,
        destination: destination,
        price: price 
    })
    try{
        const booked = await ticket.save();
        // res.json({ticket: ticket.price});
        console.log("ticket booked")
    }catch(err){
        res.status(400).send(err)
        console.log(err)
    }

    let ticket_id = (ticket._id).toString()

    const salt = await bcrypt.genSalt(10);
    const hashed_Ticket = await bcrypt.hash(ticket_id, salt)
    

    res.send(hashed_Ticket)

})
module.exports = router;