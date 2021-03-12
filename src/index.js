let now = new Date();

let h4 = document.querySelector("h4");

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h4.innerHTML = `${day} ${hours}:${minutes} `;

function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let h2 = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  h2.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "a06569d1dceff8eaf6d3eaf85c4585eb";
  let apiURl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURl).then(displayWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showCelsiusTemp(response) {
  let celsiusTemp = document.querySelector("#temp");
  celsiusTemp.innerHTML = Math.round(response.data.main.temp);
}
function convertToCelsius() {
  let cityInput = document.querySelector("#city");

  let city = cityInput.innerHTML;
  let apiKey = "a06569d1dceff8eaf6d3eaf85c4585eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCelsiusTemp);
}
function showFahrenheitTemp(response) {
  let fahrenheitTemp = document.querySelector("#temp");
  fahrenheitTemp.innerHTML = Math.round(response.data.main.temp);
}
function convertToFahrenheit() {
  let cityInput = document.querySelector("#city");

  let city = cityInput.innerHTML;
  let units = "imperial";
  let apiKey = "a06569d1dceff8eaf6d3eaf85c4585eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showFahrenheitTemp);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function displayWeather(response) {
  console.log(response);
  console.log(response.data.name);
  console.log(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}


function displayForecast (response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast=null;

for (let index = 0; index < 6; index++){
  forecast = response.data.list[index];
  forecastElement.innerHTML += `  
                <div class="col-2">
                <h3 id="time">${formatHours(forecast.dt*1000)}</h3>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
                <h5 class="degrees"><strong>${Math.round(forecast.main.temp_max)}°</strong>/ ${Math.round(forecast.main.temp_min)}°</h5>
            </div>`;

}
}

function getCurrentLocation (event){
  event.preventDefault();
   navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation (position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "adfd65ee729dfdb8d93f0ffbb4c5f25e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`

  axios.get(apiUrl).then(showWeatherSearch);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
  axios.get(apiUrl).then(displayForecast);
}

  let currentLocationButton = document.querySelector("#currentButton")
  currentLocationButton.addEventListener("click", getCurrentLocation)

searchCity("Copenhagen");
