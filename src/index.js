import "./css/reset.css";
import "./css/style.css";

async function getWeatherData() {
  const rawData = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=5ef8c53bb0564f36ab175755241305&q=kuala_lumpur&aqi=no",
    {
      mode: "cors",
    }
  );
  const weatherData = await rawData.json();
  console.log(weatherData.current.condition.text);

  showWeatherData(weatherData);
}

getWeatherData();

async function showWeatherData(weatherData) {
  const conditionData = await weatherData.current.condition.text;
  const iconData = await weatherData.current.condition.icon;

  const p = document.createElement("p");
  p.textContent = conditionData;
  document.body.appendChild(p);

  const icon = document.createElement("img");
  icon.src = iconData;
  p.appendChild(icon);
}
