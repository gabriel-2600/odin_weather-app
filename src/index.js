import "./styles.css";

// geolocation-module
import { getCity } from "./geolocation-module/location.js";

// display-module
import { mainDisplay } from "./display-module/main-display.js";

// utility-module
import { tempCategory } from "./utility-module/utility.js";

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=AYKK3FEX3X9GL3A8W37ABF8VG

async function getWeatherData(location = "Baguio", unitGroup = "metric") {
  const errorDisplayContainer = document.querySelector(
    ".error-display-container",
  );
  const errorDisplay = document.querySelector(".error-display");

  const weatherDisplay = document.querySelector(".weather-info-container");

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=AYKK3FEX3X9GL3A8W37ABF8VG`,
      {
        mode: "cors",
      },
    );

    handleError(response, location);
    errorDisplayContainer.style.display = "none";
    weatherDisplay.style.display = "block";

    const result = await response.json();
    mainDisplay(result);

    console.log(result);

    return result;
  } catch (error) {
    errorDisplay.textContent = `${error.message}`;
    errorDisplayContainer.style.display = "block";

    weatherDisplay.style.display = "none";
  }
}

function handleError(response, location) {
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(`No location found for "${location}"`);
    }

    throw new Error(`HTTP Error: ${response.status}`);
  }
}

const form = document.querySelector(".form");
const locationInput = document.querySelector("#location");
let locationInputValue;
form.addEventListener("submit", (event) => {
  event.preventDefault();

  locationInputValue = locationInput.value.trim();
  if (locationInputValue === "" || !locationInputValue) {
    return;
  }

  getWeatherData(locationInputValue, tempCategory.currentSystem);
});

const toggleMetricBtn = document.querySelector(".toggle-system-btn");
toggleMetricBtn.addEventListener("click", (event) => {
  if (tempCategory.currentSystem === "metric") {
    toggleMetricBtn.textContent = "°F";

    tempCategory.changeSystem();
    getWeatherData(locationInputValue, "us");
  } else {
    toggleMetricBtn.textContent = "°C";

    tempCategory.changeSystem();
    getWeatherData(locationInputValue, "metric");
  }
});

async function initialDisplay() {
  const city = await getCity();

  city ? getWeatherData(city) : getWeatherData();
}

initialDisplay();
