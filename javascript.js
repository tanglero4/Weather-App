let now = new Date();

let h2 = document.querySelector("h2");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let hour = now.getHours();
let minute = now.getMinutes();

h2.innerHTML = `${day} ${hour}:${minute}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let footer = document.querySelector("footer");
  let apiKey = "f811ab7997433dcd9d82103a06077507";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  footer.innerHTML = `${searchInput.value}`;
  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

function convert(event) {
  event.preventDefault();
  let temperatureF = temperature[Math.round(temperature * 9) / 5 + 32];
  let searchInput = document.querySelector("#farenheit");
}
let temperature = document.querySelector("#farenheit-converter");
temperature.addEventListener("submit", convert);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let iconElement = document.querySelector("#icon");

  h1.innerHTML = `${temperature}°C`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
