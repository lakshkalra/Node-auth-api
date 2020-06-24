const router = require('express').Router();
const User = require('../model/User');
const verify = require('./private_route');

router.get("/dashboard",verify, (req, res)=> {
    res.json({post: {title: "first post"},
                     description: "random"})
});

module.exports = router;