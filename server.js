const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();


// import routes
const authRoute = require('./routes/auth');
const userroute = require('./routes/dashboard')

dotenv.config();
// connect db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true,useUnifiedTopology: true   } ,
    ()=>(console.log('connect to db')));


// middleware
app.use(express.json());

// ROute middleware
app.use('/user', authRoute);
app.use('/user', userroute);


app.listen(4655, () => console.log("server on port 4655"));