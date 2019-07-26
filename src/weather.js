const weather = document.getElementById("temp");

const API_KEY = "bf406a24091acbd64f20aacde45a6848";
const weatherIcon = document.getElementById("weatherIcon");

navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

function getWeatherIcon(code) {
  console.log(code);
  let icon;
  if (code === "01d" || code === "01n") {
    icon = `<i class="fas fa-sun"></i>`;
  } else if (
    code === "02d" ||
    code === "02n" ||
    code === "03d" ||
    code === "03n"
  ) {
    icon = `<i class="fas fa-cloud-sun"></i>`;
  } else if (
    code === "50d" ||
    code === "50n" ||
    code === "04d" ||
    code === "04n"
  ) {
    icon = `<i class="fas fa-cloud"></i>`;
  } else if (
    code === "09d" ||
    code === "09n" ||
    code === "10d" ||
    code === "10n" ||
    code === "11d" ||
    code === "11n"
  ) {
    icon = `<i class="fas fa-cloud-sun-rain"></i>`;
  } else {
    icon = `<i class="fas fa-snowflake"></i>`;
  }
  document.getElementById("weatherIcon").innerHTML = icon;
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      const temperature = json.main.temp;
      const icon = json.weather[1].icon
        ? json.weather[1].icon
        : json.weather[0].icon;
      console.log(icon);
      weather.innerText = `${temperature}℃`;
      getWeatherIcon(icon);
    });
}

function handleSuccess(curLocation) {
  lat = curLocation.coords.latitude;
  lon = curLocation.coords.longitude;
  const coordsObj = {
    lat,
    lon
  };
  getWeather(lat, lon);
}

function handleError() {
  weatherIcon.innerHTML = `<i class="fas fa-tint-slash"></i>`;
}
