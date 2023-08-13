const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(expressLayouts);


// extract style and layouts from sub pages into layouts 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize routes 
app.use('/',require('./routes'));

module.exports = app;
