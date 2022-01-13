// Setup empty JS object to act as endpoint for all routes
projectData = {};
const apiKey = 'f72063edaa945717be8af75412558d92&units=imperial';

// Require Express to run server and routes
const express = require ('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const {response} = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8001;
const server = app.listen(process.env.PORT || port, listening);
function listening(){
    console.log('the server is running');
    console.log(`running on localhost http://127.0.0.1:${port}`)
}