import "./css/reset.css";
import "./css/style.css";

async function getWeatherData(locationValue) {
  //remove previous dataDOM
  if (document.querySelector("p")) {
    const p = document.querySelector("p");
    p.remove();
  }
  //show loading
  const loadingText = document.createElement("p");
  loadingText.textContent = "LOADING DATA";
  document.body.appendChild(loadingText);

  const rawData = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=5ef8c53bb0564f36ab175755241305&q=${locationValue}&aqi=no`,
    {
      mode: "cors",
    }
  );
  const weatherData = await rawData.json();

  loadingText.remove();
  showWeatherData(weatherData);
}

async function showWeatherData(weatherData) {
  const conditionData = await weatherData.current.condition.text;
  const iconData = await weatherData.current.condition.icon;
  const locationName = await weatherData.location.name;
  const locationTime = await weatherData.location.localtime;
  const currentTemperature = await weatherData.current.temp_c;

  const icon = document.createElement("img");
  icon.src = iconData;

  const p = document.createElement("p");
  p.textContent = `Weather in ${locationName} is ${conditionData} with a temperature of ${currentTemperature}°C at local time of ${locationTime}`;
  document.body.appendChild(p);
  p.appendChild(icon);
}

let formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", function (e) {
  e.preventDefault();
  let locationValue = document.querySelector("#location").value;
  getWeatherData(locationValue);
  document.querySelector("#location").value = "";
});
