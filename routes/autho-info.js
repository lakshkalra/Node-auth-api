const router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
const Ticket = require('../model/booked_ticket');
const buses = require('../model/bus')
const User = require('../model/User')


var url = "mongodb://localhost:27017/";

router.post('/bus/information', (req,res)=>{
     
    const bus = Number(req.body.bus_no)
    console.log(bus)

    
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ibm6");
        dbo.collection("buses").findOne({number: bus}, function(err, result) {
          if (err) throw err;
          res.status(200).json(result)
        console.log(result)
          db.close();
        });
      }); 

    
})

router.post('/train/information', (req,res)=>{
     
    const train = req.body.train_no

    
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ibm6");
        dbo.collection("trains").findOne({number: train}, function(err, result) {
          if (err) throw err;
          res.status(200).json(result)
          db.close();
        });
      }); 

    
})



module.exports = router;