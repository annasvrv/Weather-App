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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayData);
}

function displayCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#citySearch-input").value;
  searchCity(cityInputElement);
}

function myLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyPosition);
}

function showMyPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}
&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayData);
}

let currentTemp = null;
let currentHigh = null;
let currentLow = null;
let currentFeel = null;

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
