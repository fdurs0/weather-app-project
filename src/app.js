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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
  forecastHTML = forecastHTML + `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                alt=""
                width="105"
              />
              <div class="weather-forecast-temperatures">
                <span class="forecast-temp-max" id="forecast-temp-max">
                  ${Math.round(forecastDay.temp.max)}°
                </span>
                <span class="forecast-temp-min" id="forecast-temp-min">
                  ${Math.round(forecastDay.temp.min)}°
                </span>
              </div>
            </div>`;}});
  forecastHTML = forecastHTML +`</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "37b42cfa7db9441892fa3c187b5aea44";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayDefaultWeather(response) {
  let defaultCityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temp");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  
  defaultCityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function retrievePosition(position) {
  let apiKey = "37b42cfa7db9441892fa3c187b5aea44";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayDefaultWeather);
}

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temp");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCityInput(event) {
  event.preventDefault();
  let apiKey = "37b42cfa7db9441892fa3c187b5aea44";
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", searchCityInput);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

navigator.geolocation.getCurrentPosition(retrievePosition);