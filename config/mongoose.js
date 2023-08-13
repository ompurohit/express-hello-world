// require the library 
require('dotenv').config();
const mongoose = require('mongoose');


const url = process.env.MONGO_CONNECTION_URL;

// connect to database 
mongoose.connect(url);

// acquire the conection (to check if it is connected)
const db = mongoose.connection;

// error
db.on('error',console.error.bind(console, 'error connecting to db'));

// up and running then print the message 
db.once('open', function () {
    console.log('Successfully connected to the database');
});