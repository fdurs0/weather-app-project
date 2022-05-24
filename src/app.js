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

let h4 = document.querySelector("h4#date");

h4.innerHTML = `${day} ${hours}:${minutes}`;



function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "37b42cfa7db9441892fa3c187b5aea44";
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "37b42cfa7db9441892fa3c187b5aea44";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
