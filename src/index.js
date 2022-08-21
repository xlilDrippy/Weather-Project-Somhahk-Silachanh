function displayWeatherCondition(response) {
  document.querySelector("#state").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  intialSearch(city);
}

function intialSearch(city) {
  let apiKey = "e9fb2a9a6df791c5c71eb9635363af89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function searchCurrentLocation(position) {
  let apiKey = "e9fb2a9a6df791c5c71eb9635363af89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let days = [
  "Sunday,",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let now = new Date();
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

let dates = document.querySelector("#todayDate");
dates.innerHTML = `${day} ${hour}:${minute}`;

let search = document.querySelector("#searchBar");
search.addEventListener("submit", searchLocation);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

intialSearch("New York");
