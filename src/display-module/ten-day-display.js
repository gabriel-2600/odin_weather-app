import { loadWeatherIcon, getWeekDay } from "../utility-module/utility";

async function tenDayDisplay(result) {
  const tenDayContainer = document.querySelector(".ten-day-container");
  tenDayContainer.textContent = "";

  for (let i = 0; i < 10; i++) {
    const dayCard = document.createElement("div");
    dayCard.classList.add("day-card");

    const day = document.createElement("p");
    day.classList.add("day");
    day.textContent = `${getWeekDay(result.days[i].datetime)}`;

    const precipitationContainer = document.createElement("div");
    precipitationContainer.classList.add("precipitation-container");

    const weatherIcon = document.createElement("img");
    weatherIcon.classList.add("weather-icon");
    const iconSrc = await loadWeatherIcon(result.days[i].icon);
    if (iconSrc) {
      weatherIcon.src = iconSrc;
    } else {
      weatherIcon.alt = "No icon found";
    }

    const precipitation = document.createElement("p");
    precipitation.classList.add("precipitation");
    precipitation.textContent = `${Math.round(result.days[i].precipcover / 5) * 5}%`;

    precipitationContainer.appendChild(weatherIcon);
    precipitationContainer.appendChild(precipitation);

    const dayTemperature = document.createElement("p");
    dayTemperature.classList.add("day-temperature");
    dayTemperature.textContent = `${Math.round(result.days[i].temp)}°`;

    dayCard.appendChild(day);
    dayCard.appendChild(precipitationContainer);
    dayCard.appendChild(dayTemperature);

    tenDayContainer.appendChild(dayCard);
  }
}

export { tenDayDisplay };
