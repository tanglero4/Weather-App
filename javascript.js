let now = new Date();

let h2 = document.querySelector("h2");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

h2.innerHTML = `${day} ${hour}:${minute}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `
              <div class="col-2">
                    <div class="weather-forecast-date">Thu</div>
                        <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="36">
                        <div class="weather-forcast-temperature">
                          <span class="weather-forecast-max">18°</span>
                          <span class="weather-forecast-min">12°</span>
                        </div>
                </div>
                </div>
                  `;
  forecastHTML = `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let footer = document.querySelector("footer");
  let apiKey = "f811ab7997433dcd9d82103a06077507";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;
  footer.innerHTML = `${searchInput.value}`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let iconElement = document.querySelector("#icon");

  h1.innerHTML = `${temperature}°`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);
