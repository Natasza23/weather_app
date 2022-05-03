function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = months[now.getMonth()];
  let day = days[now.getDay()];
  let currentDate = `${day}, ${date} ${month},${hour}:${minutes}, ${year}`;
  return currentDate;
}
let now = new Date();
let fullDate = document.querySelector("#current-date");
fullDate.innerHTML = formatDate(now);
function searchEngine(city) {
  let apiKey = "e4b1ea9acfb1d163969f182813152c6e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function typeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchEngine(city);
}
let search = document.querySelector("#new-city");
search.addEventListener("submit", typeCity);

function showTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}°C`;

  let loc = response.data.name;
  let chosenCity = document.querySelector("#current-city");
  chosenCity.innerHTML = `${loc}`;

  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${description}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityLevel = document.querySelector("#city-humidity");
  humidityLevel.innerHTML = `Humidity: ${humidity}% `;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
}
function getYourLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "60d6c7645117d27721f091cb48cb8b98";
  let units = "metric";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(urlApi).then(getCurrentTemp);
}
navigator.geolocation.getCurrentPosition(getYourLocation);

function getCurrentTemp(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${currentTemperature}°C`;
  let location = response.data.name;
  let chosenCity = document.querySelector("#current-city");
  chosenCity.innerHTML = `${location}`;
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${description}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityLevel = document.querySelector("#city-humidity");
  humidityLevel.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
}

function currentPosition(events) {
  events.preventDefault();
  navigator.geolocation.getCurrentPosition(getYourLocation);
}
let currentLocationWeather = document.querySelector("#your-weather");
currentLocationWeather.addEventListener("click", currentPosition);
