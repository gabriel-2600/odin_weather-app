// utility-module
import { tempCategory } from "../utility-module/utility";

export function mainDisplay(result) {
  const headerOne = document.querySelector(".location");
  headerOne.textContent = `${result.resolvedAddress}`;

  const temperature = document.querySelector(".temperature");
  if (tempCategory.currentSystem === "metric") {
    temperature.textContent = `${result.days[0].temp}°C`;
  } else {
    temperature.textContent = `${result.days[0].temp}°F`;
  }

  const conditions = document.querySelector(".conditions");
  conditions.textContent = `${result.days[0].conditions}`;

  const minTemp = document.querySelector(".min-temp");
  const maxTemp = document.querySelector(".max-temp");
  if (tempCategory.currentSystem === "metric") {
    minTemp.textContent = `L: ${result.days[0].tempmin}°C`;

    maxTemp.textContent = `H: ${result.days[0].tempmax}°C`;
  } else {
    minTemp.textContent = `L: ${result.days[0].tempmin}°F`;

    maxTemp.textContent = `H: ${result.days[0].tempmax}°F`;
  }
}
