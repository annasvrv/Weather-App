// Display current Date

let today = new Date();
let currentDate1 = document.querySelector("#weekDay");
let currentDate2 = document.querySelector("#clock");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weekDaysFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = weekDaysFull[today.getDay()];
currentDate1.innerHTML = `${weekDay}`;
let currentMonth = months[today.getMonth()];
let currentDay = today.getDate();
let currentYear = today.getFullYear();
let currentHour = today.getHours();
if (currentHour < 10) {
  currentHour = "0" + currentHour;
}
let currentMinutes = today.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = "0" + currentMinutes;
}
currentDate2.innerHTML = `${currentMonth} ${currentDay} ${currentYear} ${currentHour}:${currentMinutes}`;

// Forecast - Days of week

let weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

for (let i = 0; i <= 6; i++) {
  let x = today.getDay() + 1;
  let day = weekDaysShort[x + i];
  if (x + i > 6) {
    day = weekDaysShort[x + i - 7];
  }
  let week = document.getElementById("weekForecast").rows[0].cells;
  week[i].innerHTML = `${day}`;
}

// Display current city

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch-input").value;
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTempCity);
}

//  Display City and Weather Conditions

function showTempCity(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  // let iconID = response.data.weather[0].icon;
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let condition = response.data.weather[0].main;
  let wind = response.data.wind.speed;
  let realFeel = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let pressure = response.data.main.pressure;

  let newCity = document.querySelector("#currentCityDisplay");
  newCity.innerHTML = `${city}`;
  let tMain = document.querySelector("#currentTemp");
  tMain.innerHTML = `${temp}`;
  let highT = document.querySelector("#high");
  highT.innerHTML = `${high}º`;
  let lowT = document.querySelector("#low");
  lowT.innerHTML = `${low}º`;
  let conditionW = document.querySelector("#description");
  conditionW.innerHTML = `${condition}`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} m/s`;
  let realF = document.querySelector("#feel");
  realF.innerHTML = `${realFeel}ºC`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `${humidity} %`;
  let press = document.querySelector("#pressure");
  press.innerHTML = `${pressure} hPa`;
}

//  Current location search

function myLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyPosition);
}

function showMyPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}
&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTempCity);
}

// Converting C to F and F to C

function changeUnitC(event) {
  event.preventDefault();
  let x = document.getElementById("todaysTemp").rows[0].cells;
  x[0].innerHTML = `${fakeTemp}ºC`;
}

function changeUnitF(event) {
  event.preventDefault();
  let x = document.getElementById("todaysTemp").rows[0].cells;
  let newTempF = Math.round((fakeTemp * 9) / 5 + 32);
  x[0].innerHTML = `${newTempF}ºF`;
}

// newTempC = ((newTempF - 32) * 5) / 9;

let tempElement = document.querySelector("#currentTemp");
let fakeTemp = tempElement.innerHTML;

let buttonsUnitC = document.querySelector("#celsius-btn");
buttonsUnitC.addEventListener("click", changeUnitC);
let buttonsUnitF = document.querySelector("#fahrenheit-btn");
buttonsUnitF.addEventListener("click", changeUnitF);

// Forecast temperature

// user city search
let cityFormSearch = document.querySelector("#searchCity-form");
cityFormSearch.addEventListener("submit", displayCity);

// current location button
let currentLocationButton = document.querySelector(
  "#cityCurrent-location-button"
);
currentLocationButton.addEventListener("click", myLocation);
