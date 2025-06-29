import "./styles.css";

// geolocation-module
import { getCityOfUser } from "./location-module/location.js";

// display-module
import {
  displayWeather,
  displayError,
  showLoading,
  hideLoading,
} from "./display-module/display.js";

// utility-module
import { tempCategory } from "./utility-module/utility.js";

const API_KEY = "AYKK3FEX3X9GL3A8W37ABF8VG";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

async function getWeatherData(location = "Baguio", unitGroup = "metric") {
  try {
    showLoading();
    const result = await fetchWeatherData(location, unitGroup);
    displayWeather(result);
  } catch (error) {
    displayError(error);
  } finally {
    hideLoading();
  }
}

async function fetchWeatherData(location, unitGroup) {
  const response = await fetch(
    `${BASE_URL}/${location}?unitGroup=${unitGroup}&key=${API_KEY}`,
    {
      mode: "cors",
    },
  );

  handleError(response, location);
  return await response.json();
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
  try {
    const userCurrentCity = await getCityOfUser();

    getWeatherData(userCurrentCity);
  } catch (error) {
    console.error("Falling back to default city: ", error.message);

    getWeatherData();
  }
}

initialDisplay();
