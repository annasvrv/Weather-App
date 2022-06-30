// Display current Date

let today = new Date();
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
let currentDate1 = document.querySelector("#weekDay");
let currentDate2 = document.querySelector("#clock");
currentDate1.innerHTML = `${weekDay}`;
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

function defaultCity(city) {
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTempCity);
}

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch-input").value;
  defaultCity(city);
}

//  Display City and Weather Conditions

function showTempCity(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let iconID = response.data.weather[0].icon;
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let condition = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let realFeel = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let pressure = response.data.main.pressure;

  document.querySelector("#currentCityDisplay").innerHTML = `${city}`;
  document.querySelector("#currentTemp").innerHTML = `${temp}º`;
  document.querySelector("#high").innerHTML = `${high}º`;
  document.querySelector("#low").innerHTML = `${low}º`;
  document.querySelector("#description").innerHTML = `${condition}`;
  document.querySelector("#wind").innerHTML = `${wind} m/s`;
  document.querySelector("#feel").innerHTML = `${realFeel}ºC`;
  document.querySelector("#humidity").innerHTML = `${humidity} %`;
  document.querySelector("#pressure").innerHTML = `${pressure} hPa`;
  let iconEl = document.querySelector("#iconNow");
  iconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconID}@2x.png`
  );
  iconEl.setAttribute("alt", condition);
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

// Default city display

defaultCity("Los Angeles");
