const router = require('express').Router;
import { request } from 'graphql-request'

const query = `{
    user{ 
        email
    }
}`



request('http://localhost:', query)
    .then((data) => console.log(data))


module.exports = router;