const mongoose = require('mongoose')

const booked_ticket = new mongoose.Schema({
    name:{
        type: String
    },
    age:{
        type:Number
    },
    email:{
        type:String
    },
    source:{
        type:String
    },
    destination:{
        type: String
    },
    price:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('Ticket', booked_ticket)