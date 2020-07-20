const router = require('express').Router();
const Ticket = require('../model/booked_ticket');
const buses = require('../model/bus')
const User = require('../model/User')
const Train = require('../model/train')


router.get('/bus/dashboard', async(req,res)=>{

    await Ticket.find({},(err,result)=>{
  
      a = 'tickets:'+JSON.stringify(result.length)
      res.write(a);
      
      var totalPrice = 0
      for(let i=0; i<result.length;i++){
  
      const p = Number((result[i].price).slice(1));
      totalPrice += p
      }
      console.log(totalPrice)
      res.write('totalPrice:'+totalPrice)
    })
  
  
    await buses.find({},(err,result)=>{
  
      a = "buses:"+JSON.stringify(result.length)
      res.write(a);
    })
  
    await User.find({},(err,result)=>{
  
      a = "Users:" + JSON.stringify(result.length)
      res.write(a);
      res.end()
    })
  
  })



router.get('/train/dashboard', async(req,res)=>{

    await Ticket.find({},(err,result)=>{
  
      a = 'tickets:'+JSON.stringify(result.length)
      res.write(a);
      
      var totalPrice = 0
      for(let i=0; i<result.length;i++){
  
      const p = Number((result[i].price).slice(1));
      totalPrice += p
      }
      console.log(totalPrice)
      res.write('totalPrice:'+totalPrice)
    })
  
  
    await Train.find({},(err,result)=>{
  
      a = "buses:"+JSON.stringify(result.length)
      res.write(a);
    })
  
    await User.find({},(err,result)=>{
  
      a = "Users:" + JSON.stringify(result.length)
      res.write(a);
      res.end()
    })
  
  })


module.exports = router;