const router = require('express').Router();
const verify = require('./authority_verify');

router.get('/dashboard',verify, (req, res)=>{
    res.send('hello')
})

module.exports = router;