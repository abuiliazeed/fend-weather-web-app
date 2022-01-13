// Setup empty JS object to act as endpoint for all routes
projectData = {};


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
const port = 8013;
// Notice that i added process.env.PORT with or Port in order for this code to work on Heroku
const server = app.listen(process.env.PORT || port, listening);
function listening(){
    console.log('the server is running');
    console.log(`running on localhost http://127.0.0.1:${port}`)
}

// we will create an arrow function get data 
const getData = (req, res) => {
    res.send(projectData);
  };
  
  app.get("/projectData", getData);
  // creating post data arrow function that store the retrieved data newWeather to the projectData object
  const postData = (req, res) => {
    newWeather = {
      date: req.body.date,
      temp: req.body.temp,
      content: req.body.content,
      city: req.body.city,
      description: req.body.description,
    };
    projectData = newWeather;
    res.status(200).send({
      success: true,
      message: "All good, thanks for visiting :*",
      data: newWeather,
    });
  };
  
  app.post("/projectData", postData);

  