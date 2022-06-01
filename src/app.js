let now = new Date();

let hours = now.getHours();
hours = hours <= 9 ? "0" + hours : hours;

let minutes = now.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let dateHeader = document.querySelector("#date");

dateHeader.innerHTML = `${day} ${hours}:${minutes}`;

function formatDate(timestamp) {
  let date = new date(timestamp);
  let hours = date.getHours();
  hours = hours <= 9 ? "0" + hours : hours;
  let minutes = date.getMinutes();
  minutes = minutes <= 9 ? "0" + minutes : minutes;

  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temp");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("headerIcon");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.innerHTML = response.data.weather[0].icon;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "37b42cfa7db9441892fa3c187b5aea44";
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function searchLocation(position) {
  let apiKey = "37b42cfa7db9441892fa3c187b5aea44";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", searchCity);

