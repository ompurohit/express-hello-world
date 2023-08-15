const app = require('express')();
const session = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();


app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));
  
app.use(flash());