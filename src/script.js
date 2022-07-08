
function formatWeek(day) {
  let date1 = new Date (day);
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
  highTemp.innerHTML = Math.round(currentHigh);
  lowTemp.innerHTML = Math.round(currentLow);
  conditionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  feelElement.innerHTML = Math.round(currentFeel);
  humidElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
  weekdayElement.innerHTML = formatWeek(response.data.dt *1000);
  dateElement.innerHTML = formatDay(response.data.dt *1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

}

function search(city) {
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayData);
}


function displayCity (event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchCity-form").value;
  search(cityInputElement)
}



let currentTemp = null;
let currentHigh = null;
let currentLow = null;
let currentFeel = null;



let form = document.querySelector("#searchCity-form");
form.addEventListener("submit", displayCity);

search("Los Angeles");
























// // Display current Date

// let today = new Date();
// let currentDate1 = document.querySelector("#weekDay");
// let currentDate2 = document.querySelector("#clock");
// let months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// let weekDaysFull = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
// let weekDay = weekDaysFull[today.getDay()];
// currentDate1.innerHTML = `${weekDay}`;
// let currentMonth = months[today.getMonth()];
// let currentDay = today.getDate();
// let currentYear = today.getFullYear();
// let currentHour = today.getHours();
// if (currentHour < 10) {
//   currentHour = "0" + currentHour;
// }
// let currentMinutes = today.getMinutes();
// if (currentMinutes < 10) {
//   currentMinutes = "0" + currentMinutes;
// }
// currentDate2.innerHTML = `${currentMonth} ${currentDay} ${currentYear} ${currentHour}:${currentMinutes}`;

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

// // Display current city

// function defaultCity(city) {
//   let apiKey = "74a1988810687be79d98c8fd17e5884a";
//   let units = "metric";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
//   axios.get(`${apiUrl}&appid=${apiKey}`).then(showTempCity);
// }

// function displayCity(event) {
//   event.preventDefault();
//   let city = document.querySelector("#citySearch-input").value;
//   defaultCity(city);
// }

// //  Display City and Weather Conditions

// function showTempCity(response) {
//   console.log(response.data);
//   let temp = Math.round(response.data.main.temp);
//   let city = response.data.name;
//   // let iconID = response.data.weather[0].icon;
//   let high = Math.round(response.data.main.temp_max);
//   let low = Math.round(response.data.main.temp_min);
//   let condition = response.data.weather[0].description;
//   let wind = response.data.wind.speed;
//   let realFeel = Math.round(response.data.main.feels_like);
//   let humidity = response.data.main.humidity;
//   let pressure = response.data.main.pressure;

//   let newCity = document.querySelector("#currentCityDisplay");
//   newCity.innerHTML = `${city}`;
//   let tMain = document.querySelector("#currentTemp");
//   tMain.innerHTML = `${temp}º`;
//   let highT = document.querySelector("#high");
//   highT.innerHTML = `${high}º`;
//   let lowT = document.querySelector("#low");
//   lowT.innerHTML = `${low}º`;
//   let conditionW = document.querySelector("#description");
//   conditionW.innerHTML = `${condition}`;
//   let windSpeed = document.querySelector("#wind");
//   windSpeed.innerHTML = `${wind} m/s`;
//   let realF = document.querySelector("#feel");
//   realF.innerHTML = `${realFeel}ºC`;
//   let humid = document.querySelector("#humidity");
//   humid.innerHTML = `${humidity} %`;
//   let press = document.querySelector("#pressure");
//   press.innerHTML = `${pressure} hPa`;
// }

// //  Current location search

// function myLocation(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(showMyPosition);
// }

// function showMyPosition(position) {
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;
//   let apiKey = "74a1988810687be79d98c8fd17e5884a";
//   let units = "metric";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}
// &lon=${lon}&units=${units}&appid=${apiKey}`;

//   axios.get(apiUrl).then(showTempCity);
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

// // user city search
// let cityFormSearch = document.querySelector("#searchCity-form");
// cityFormSearch.addEventListener("submit", displayCity);

// // current location button
// let currentLocationButton = document.querySelector(
//   "#cityCurrent-location-button"
// );
// currentLocationButton.addEventListener("click", myLocation);

// // Default city display

// defaultCity("Los Angeles");
