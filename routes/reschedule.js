const router = require('express').Router();
const verify = require('./authority_verify');
const MongoClient = require('mongodb').MongoClient;
const buses = require('../model/bus');
const { ReadStream } = require('fs');
const { Mongoose } = require('mongoose');


router.post('/reschedule/bus', async(req, res) => {

  var url = "mongodb://localhost:27017/";

  const new_bus_no = Number(req.body.new_bus_no);
  const prev_bus_no = Number(req.body.prev_bus_no);
  const quantitys = Number(req.body.quantity);
  // console.log(new_bus_no,prev_bus_no,quantitys)


  await buses.find({number: prev_bus_no}, async(err, doc)=>{
    if(err) throw err;

    // console.log(prev_bus_no)
    // console.log(doc)
    if(doc[0].quantity - quantitys < 0){
      res.status(400).json({er: 'not available',
                            qty: doc[0].quantity})
    }else{
  
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("ibm6");
      var myquery = { number: prev_bus_no };
      var newvalues = { $inc: { quantity: -quantitys } };
      dbo.collection("buses").updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        res.status(200)
      });

      var myquerys = { number: new_bus_no };
      var newvaluess = { $inc: { quantity: +quantitys } };
      dbo.collection("buses").updateOne(myquerys, newvaluess, function (err, result) {
        if (err) throw err;
        res.status(200).json('Document updated')
        db.close();
      });
    });
  }
  })
});


router.post('/reschedule/train',  (req, res) => {

  var url = "mongodb://localhost:27017/";

  const number = Number(req.body.number);
  const time = String(req.body.time);
  const name = String(req.body.name);

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("ibm6");
      var myquery = { number: number  };
      var newvalues = { $set: { time: time } };
      dbo.collection("trains").updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        res.status(200).json('Document updated')
        db.close();
      });
    });
});
  

    
module.exports = router