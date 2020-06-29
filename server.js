const express = require("express")
const ejs = require('ejs');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require('cors')


// import routes
const authRoute = require('./routes/user_auth');
const userroute = require('./routes/dashboard');
const authoritiesRoute = require('./routes/authorities_auth');
const resutRoute = require('./routes/result');

dotenv.config();

// SET EJS
app.set("view engine", "ejs")

// connect db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true,useUnifiedTopology: true   } ,
    ()=>(console.log('connect to db')));


// middleware
app.use(express.json());
app.use(cors())

// ROute middleware
app.use('/user', authRoute);
app.use('/user', userroute);
app.use('/user', resutRoute)
app.use('/authorities', authoritiesRoute);
app.use('/authorities', require('./routes/new'))

const port = 8080
app.listen(port, () => console.log(`server on port ${port}`));