const { Router } = require("express");
const User = require('../model/User');
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {user_register_validation, user_login_validation} = require('../validations')



// USER REGISTER
router.post('/register',async (req, res) => {

    // validate b4 make user
    const { error } = user_register_validation(req.body);

        if(error) return res.status(400).send(error.details[0].message);

    // checking if email already exist
    const email_exist = await User.findOne({email: req.body.email});

        if(email_exist) 
            return res.status(400).send("email already exist!!")

    // Password hashing with bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        contact: req.body.contact,
        email: req.body.email,
        password: hashedpassword,
    });
    try{
        const savedUser = await user.save();
        res.send({user: user.email});
    }catch(err){
        res.status(400).send(err);
    }
});


// USER LOGIN
router.post('/login', async(req, res) =>{

    // validate b4 make user
    const { error } = user_login_validation(req.body);

        if(error) return res.status(400).send(error.details[0].message);

    // checking if email already exist
    const user = await User.findOne({email: req.body.email});

        if(!user) 
            return res.status(400).send("email does not exist!!")
    // CHECK IF PASSWORD IS CORRECT
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) 
        return res.status(400).send('Invalid password');

    // CREATE AND ASSIGN TOKEN
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);


    // res.send('Logged in');
    

})
module.exports = router;