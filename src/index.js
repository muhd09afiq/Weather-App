import "./css/reset.css";
import "./css/style.css";

async function getWeatherData(locationValue) {
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
  console.log(weatherData.current.condition.text);
  loadingText.remove();
  showWeatherData(weatherData);
}

async function showWeatherData(weatherData) {
  const conditionData = await weatherData.current.condition.text;
  const iconData = await weatherData.current.condition.icon;
  const locationName = await weatherData.location.name;
  const locationTime = await weatherData.location.localtime;

  const icon = document.createElement("img");
  icon.src = iconData;
  p.appendChild(icon);

  const p = document.createElement("p");
  p.textContent = `Weather in ${locationName} is ${conditionData} at local time of ${locationTime}`;
  document.body.appendChild(p);
}

let formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", function (e) {
  e.preventDefault();
  let locationValue = document.querySelector("#location").value;
  getWeatherData(locationValue);
});
