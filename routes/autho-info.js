const router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const Ticket = require('../model/booked_ticket');
const { any } = require('@hapi/joi');



router.post('/bus/information', (req,res)=>{
     
    const bus = req.body.bus_no

    
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ibm6");
        dbo.collection("buses").findOne({number: bus}, function(err, result) {
          if (err) throw err;
          res.status(200).send(result)
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
          res.status(200).send(result)
          db.close();
        });
      }); 

    
})

router.get('/dashh', (req,res)=>{


    // Ticket.find({}, function (err, docs) {
    //     if(err) throw err;
    //     res.status(200).send(docs)
    // });

    var tickets = 0

    Ticket.countDocuments({}, function(error, numOfDocs) {
        tickets = numOfDocs
    });

    res.status(200).json(tickets)
})

module.exports = router;