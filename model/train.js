const mongoose  = require("mongoose");

const bus_schema = new mongoose.Schema({
    number: Number,
    source: String,
    destination: String,
    capacity: Number,
    quantity: Number,
    path: Array
})



module.exports = mongoose.model('Trains', bus_schema)





