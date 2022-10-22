const now = new Date();

const the_hour = now.getHours();

const full_date = new Intl.DateTimeFormat("en-US", {dateStyle: "full"}).format(now);

const currentTime = now.toLocaleTimeString("en-US");

const button = document.querySelector("button");

const input = document.querySelector("input");

let results = null;


async function getWeather(url) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    doStuff(data);
  }
}
function getWeatherIcon(icon){
	let icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return icon_url;
};

function doStuff(data) {
    results = data;
    let cityName = results.name;
    let condition = results.weather[0].description;
    condition = condition.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let icon = results.weather[0].icon;
    let weatherIcon = getWeatherIcon(icon);
    let temp = "Actual Temperature: "+results.main.temp+"°F";
    let feelsLike = "Feels Like: "+results.main.feels_like+"°F";
    let windChill = calcWindChill(results.main.temp, results.wind.speed);
    let tempMax = "High: "+results.main.temp_max+"°F";
    let tempMin = "Low: "+results.main.temp_min+"°F";
    let pressure = "Pressure: "+results.main.pressure+ " hPa";
    let humidity = "Humidity: "+results.main.humidity+"%";
    let windSpeed = "Wind Speed: "+results.wind.speed+" MPH";
    let windDirect = "Direction: "+results.wind.deg+"°";
    let sunrise = "Sunrise: "+new Date(results.sys.sunrise * 1000
        ).toLocaleTimeString("en-US");
    let sunset = "Sunset: "+new Date(results.sys.sunset * 1000
        ).toLocaleTimeString("en-US");

    document.querySelector(".locationSelected").textContent = cityName;
    document.querySelector("#weatherIcon").src = weatherIcon;
    document.querySelector("#condition").textContent = condition;
    document.querySelector("#temp").textContent = temp;
    document.querySelector("#feelsLike").textContent = feelsLike;
    document.querySelector("#windChill").textContent = windChill;
    document.querySelector("#tempMax").textContent = tempMax;
    document.querySelector("#tempMin").textContent = tempMin;
    document.querySelector("#pressure").textContent = pressure;
    document.querySelector("#humidity").textContent = humidity;
    document.querySelector("#windSpeed").textContent = windSpeed;
    document.querySelector("#windDirect").textContent = windDirect;
    document.querySelector("#currentTime")
        .textContent = "Time Ran: "+currentTime;
    document.querySelector("#sunrise").textContent = sunrise;
    document.querySelector("#sunset").textContent = sunset;
    
  };
function calcWindChill(t, s) {
  if (t <= 50 && s > 3){
      const wind_chill = Math.round(
          35.74 + 0.6215 * t - 35.75 * s **0.16 + 0.4275 * t * s ** 0.16);
      return "Wind Chill: "+wind_chill+"°F";
  } else {
      return "Wind Chill: N/A";
  };
};

button.addEventListener("click", function() {
  if (input.value == "") {
    return false;
  } else {
    const url = "https://api.openweathermap.org/data/2.5/weather?zip="+input.value+"&appid=f2cfbb52b6e01d3767725b983a37e017&units=imperial";
    getWeather(url);
    input = "";
    input.focus();
  };
});

