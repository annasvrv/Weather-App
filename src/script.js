function formatWeek(day) {
  let date1 = new Date(day);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = days[date1.getDay()];
  return `${weekDay}`;
}

function formatDay(timestamp) {
  let date2 = new Date(timestamp);
  let hours = date2.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date2.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
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
  let month = months[date2.getMonth()];
  let day = date2.getDate();
  let year = date2.getFullYear();
  return `${month} ${day} ${year} ${hours}:${minutes}`;
}

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  console.log(response.data.daily.slice(1, 8));
  let forecast = response.data.daily.slice(1, 8);
  let weekDay = document.getElementById("weekForecast").rows[0].cells;
  let weekIcon = document.getElementsByClassName("iconForecast");
  let weekTemp = document.getElementById("weekForecast").rows[2].cells;

  forecast.forEach(function (forecastDay, i) {
    if (i < 7) {
      weekDay[i].innerHTML = `${formatWeekDay(forecastDay.dt)}`;
      weekIcon[i].setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`
      );
      weekIcon[i].setAttribute("alt", forecastDay.weather[0].description);
      weekTemp[i].innerHTML = `${Math.round(forecastDay.temp.day)}º`;
    }
  });

  forecastTemp = forecast;
}

function getForecast(coordinates) {
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayData(response) {
  let tempElement = document.querySelector("#currentTemp");
  let cityElement = document.querySelector("#currentCityDisplay");
  let highTemp = document.querySelector("#high");
  let lowTemp = document.querySelector("#low");
  let conditionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let feelElement = document.querySelector("#feel");
  let humidElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");
  let weekdayElement = document.querySelector("#weekDay");
  let dateElement = document.querySelector("#clock");
  let iconElement = document.querySelector("#iconNow");

  currentTemp = response.data.main.temp;
  currentHigh = response.data.main.temp_max;
  currentLow = response.data.main.temp_min;
  currentFeel = response.data.main.feels_like;

  tempElement.innerHTML = `${Math.round(currentTemp)}º`;
  cityElement.innerHTML = response.data.name;
  highTemp.innerHTML = `${Math.round(currentHigh)}º`;
  lowTemp.innerHTML = `${Math.round(currentLow)}º`;
  conditionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `${response.data.wind.speed} m/s`;
  feelElement.innerHTML = `${Math.round(currentFeel)}ºC`;
  humidElement.innerHTML = `${response.data.main.humidity}%`;
  pressureElement.innerHTML = `${response.data.main.pressure} hPa`;
  weekdayElement.innerHTML = formatWeek(response.data.dt * 1000);
  dateElement.innerHTML = formatDay(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayData);
}

function displayCity(event) {
  event.preventDefault();
  buttonUnitF.classList.remove("active");
  buttonUnitC.classList.add("active");
  let cityInputElement = document.querySelector("#citySearch-input").value;
  searchCity(cityInputElement);
}

function myLocation(event) {
  event.preventDefault();
  buttonUnitF.classList.remove("active");
  buttonUnitC.classList.add("active");
  navigator.geolocation.getCurrentPosition(showMyPosition);
}

function showMyPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}
&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayData);
}

function displayUnitFtemp(event) {
  event.preventDefault();
  buttonUnitC.classList.remove("active");
  buttonUnitF.classList.add("active");
  let newTempF = Math.round((currentTemp * 9) / 5 + 32);
  let temp = document.querySelector("#currentTemp");
  let high = document.querySelector("#high");
  let low = document.querySelector("#low");
  let feel = document.querySelector("#feel");
  let cells = document.getElementById("weekForecast").rows[2].cells;

  temp.innerHTML = `${newTempF}º`;
  high.innerHTML = `${Math.round((currentHigh * 9) / 5 + 32)}º`;
  low.innerHTML = `${Math.round((currentLow * 9) / 5 + 32)}º`;
  feel.innerHTML = `${Math.round((currentFeel * 9) / 5 + 32)}ºF`;
  for (i = 0; i < 7; i++) {
    cells[i].innerHTML = `${Math.round(
      (forecastTemp[i].temp.day * 9) / 5 + 32
    )}º`;
  }
}

function displayUnitCtemp(event) {
  event.preventDefault();
  buttonUnitF.classList.remove("active");
  buttonUnitC.classList.add("active");
  let temp = document.querySelector("#currentTemp");
  let high = document.querySelector("#high");
  let low = document.querySelector("#low");
  let feel = document.querySelector("#feel");
  let cells = document.getElementById("weekForecast").rows[2].cells;

  temp.innerHTML = `${Math.round(currentTemp)}º`;
  high.innerHTML = `${Math.round(currentHigh)}º`;
  low.innerHTML = `${Math.round(currentLow)}º`;
  feel.innerHTML = `${Math.round(currentFeel)}ºC`;
  for (i = 0; i < 7; i++) {
    cells[i].innerHTML = `${Math.round(forecastTemp[i].temp.day)}º`;
  }
}

let unit = "metric";

let currentTemp = null;
let currentHigh = null;
let currentLow = null;
let currentFeel = null;
let forecastTemp = [];

let buttonUnitF = document.querySelector("#fahrenheit-btn");
buttonUnitF.addEventListener("click", displayUnitFtemp);

let buttonUnitC = document.querySelector("#celsius-btn");
buttonUnitC.addEventListener("click", displayUnitCtemp);

let form = document.querySelector("#searchCity-form");
form.addEventListener("submit", displayCity);

let currentLocation = document.querySelector("#cityCurrent-location-button");
currentLocation.addEventListener("click", myLocation);

searchCity("Los Angeles");

// // Forecast - Days of week

// let weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// for (let i = 0; i <= 6; i++) {
//   let x = today.getDay() + 1;
//   let day = weekDaysShort[x + i];
//   if (x + i > 6) {
//     day = weekDaysShort[x + i - 7];
//   }
//   let week = document.getElementById("weekForecast").rows[0].cells;
//   week[i].innerHTML = `${day}`;
// }

// // Converting C to F and F to C

// function changeUnitC(event) {
//   event.preventDefault();
//   let x = document.getElementById("todaysTemp").rows[0].cells;
//   x[0].innerHTML = `${fakeTemp}ºC`;
// }

// function changeUnitF(event) {
//   event.preventDefault();
//   let x = document.getElementById("todaysTemp").rows[0].cells;
//   let newTempF = Math.round((fakeTemp * 9) / 5 + 32);
//   x[0].innerHTML = `${newTempF}ºF`;
// }

// // newTempC = ((newTempF - 32) * 5) / 9;

// let tempElement = document.querySelector("#currentTemp");
// let fakeTemp = tempElement.innerHTML;

// let buttonsUnitC = document.querySelector("#celsius-btn");
// buttonsUnitC.addEventListener("click", changeUnitC);
// let buttonsUnitF = document.querySelector("#fahrenheit-btn");
// buttonsUnitF.addEventListener("click", changeUnitF);

// // Forecast temperature
