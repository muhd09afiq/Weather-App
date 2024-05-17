import "./css/reset.css";
import "./css/style.css";

class WeatherData {
  constructor(location) {
    //remove spaces and replace with underscore
    let result = location.trim().replace(/\s+/g, "_");
    this.location = result;
  }

  async getData() {
    try {
      const rawData = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=5ef8c53bb0564f36ab175755241305&q=${this.location}&aqi=no`,
        {
          mode: "cors",
        }
      );
      const weatherData = await rawData.json();
      return weatherData;
    } catch (error) {
      console.error(error);
    }
  }

  async showData() {
    const data = await this.getData();
    //error response {error:, messsage:}
    if (data.error) {
      console.error(data);
    } else {
      console.log(data);
    }
  }
}

// const data = new WeatherData("paris");
// data.showData();

const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.querySelector("#location");
  const locationData = new WeatherData(input.value);
  locationData.showData();
});
