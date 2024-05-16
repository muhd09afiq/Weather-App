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
      console.log(error.json());
    }
  }

  async showData() {
    try {
      const data = await this.getData();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}

const data = new WeatherData("fewe");
data.showData();
// console.log(data.getData());
