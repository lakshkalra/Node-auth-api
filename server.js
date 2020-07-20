const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const cors = require('cors')


// import routes
const authRoute = require('./routes/user_auth');
const authoritiesRoute = require('./routes/authorities_auth');
const reschedule = require('./routes/reschedule')
const result = require('./routes/result')
const booking = require('./routes/booking')
const auth_info = require('./routes/autho-info')
const dashboard = require('./routes/dashboard')

dotenv.config();


// connect db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify:true ,useCreateIndex: true } ,
    ()=>(console.log('connect to db')));


// middleware
app.use(express.json());
app.use(cors())

// ROute middleware
app.use('/user', authRoute);
app.use('/user', result);
app.use('/user', booking)
app.use('/authorities', authoritiesRoute);
app.use('/authorities', reschedule);
app.use('/authorities', auth_info)
app.use('/authorities', dashboard)

const port = 8080
app.listen(port, () => console.log(`server on port ${port}`));