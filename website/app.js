/* Global Variables */
const apiKey = 'f72063edaa945717be8af75412558d92';
const baseURL = `http://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// the retrieve weather function capture the user zip, feelings and add internaly our api key and base Url
const retrieveWeather = () => {
  const zip = document.getElementById("zip").value;
  const url = `${baseURL}&zip=${zip}&APPID=${apiKey}`;
  let feelings = document.getElementById("feelings").value;

// we also need to check if the user forgot to enter the zip or his feelings
  if (!zip) feelings = "Please enter a zip code";
  if (!feelings) feelings = "Please Type Your Feelings";
// after that we will wait for the apu to send us the data then we will store it in the project data object and update the ui with it
  getWeather(url).then((data) => {
    postData("/projectData", {
      date: newDate,
      temp: Math.round(data.list[0].main.temp),
      content: feelings,
      city: data.city.name,
      description: data.list[0].weather[0].description,
    }).then(updateUi("/projectData"));
  });
};

// in case we got an error we will tell the user to try a correct zip code.
const getWeather = async (url) => {
  const res = await fetch(url);
  if (res.status === 404 || res.status === 400) {
    document.getElementById("content").innerHTML =
      "Please write a valid zip code!";
  }
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

//this is the post data async funtion 
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

// the update Ui function will update the home page with root url
const updateUi = async (url) => {
  const request = await fetch(url);
  try {
    const allData = await request.json();
    // we will add the date retrieved from the API to the Date Div
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    // We will add the temp retrieved from the API to the temp div
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature in C°: ${allData.temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `Content: ${allData.content}`;
    // we will add the city retrieved from the API to the city field
    document.getElementById("city").innerHTML = `City: ${allData.city}`;
    document.getElementById(
      "description"
    ).innerHTML = `Description: ${allData.description}`;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const button = document.getElementById("generate");
// we will create an event listener on the button that will execute the retrieve Weather function
button.addEventListener("click", retrieveWeather);