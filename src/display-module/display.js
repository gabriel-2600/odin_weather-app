import "./display.css";

import { mainDisplay } from "./main-display.js";
import { hourlyDisplay } from "./hourly-diplay.js";
import { tenDayDisplay } from "./ten-day-display.js";

const errorDisplayContainer = document.querySelector(
  ".error-display-container",
);
const errorDisplay = document.querySelector(".error-display");
const weatherDisplay = document.querySelector(".weather-info-container");

function displayWeather(result) {
  errorDisplayContainer.style.display = "none";
  weatherDisplay.style.display = "block";

  mainDisplay(result);
  hourlyDisplay(result);
  tenDayDisplay(result);
}

function displayError(error) {
  console.error(error.message);
  errorDisplay.textContent = `${error.message}`;

  errorDisplayContainer.style.display = "block";
  weatherDisplay.style.display = "none";
}

const loadingIndicator = document.querySelector("#loading");

function showLoading() {
  loadingIndicator.classList.remove("hidden");
  weatherDisplay.style.display = "none";
}

function hideLoading() {
  loadingIndicator.classList.add("hidden");
}

export { displayWeather, displayError, showLoading, hideLoading };
