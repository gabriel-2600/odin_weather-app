import {
  tempCategory,
  importWeatherIcon,
  getDayOfTheWeek,
  formatTimeHourAndMinute,
} from "../utility-module/utility";

function dayDisplay(result) {
  const day = document.createElement("p");
  day.classList.add("day");
  day.textContent = `${getDayOfTheWeek(result)}`;

  return day;
}

function dayTemperatureDisplay(result) {
  const dayTemperature = document.createElement("p");
  dayTemperature.classList.add("day-temperature");
  dayTemperature.textContent = `${Math.round(result)}°`;

  return dayTemperature;
}

async function createAndLoadWeatherIcon(resultImage) {
  const weatherIcon = document.createElement("img");
  weatherIcon.classList.add("weather-icon");
  const iconSrc = await importWeatherIcon(resultImage);
  if (iconSrc) {
    weatherIcon.src = iconSrc;
  } else {
    weatherIcon.alt = "No icon found";
  }

  return weatherIcon;
}

async function precipitationDisplay(result, resultImage) {
  const precipitationContainer = document.createElement("div");
  precipitationContainer.classList.add("precipitation-container", "day-info");

  const weatherIcon = await createAndLoadWeatherIcon(resultImage);

  const precipitation = document.createElement("p");
  precipitation.classList.add("precipitation");
  precipitation.textContent = `${Math.round(result / 5) * 5}%`;

  precipitationContainer.appendChild(weatherIcon);
  precipitationContainer.appendChild(precipitation);

  return precipitationContainer;
}

async function sunriseDisplay(result) {
  const sunriseContainer = document.createElement("div");
  sunriseContainer.classList.add("sunrise-container", "day-info");

  const sunriseIcon = await createAndLoadWeatherIcon("sunrise");

  const sunrise = document.createElement("p");
  sunrise.classList.add("sunrise");
  sunrise.textContent = `${formatTimeHourAndMinute(result)}`;

  sunriseContainer.appendChild(sunriseIcon);
  sunriseContainer.appendChild(sunrise);

  return sunriseContainer;
}

async function sunsetDisplay(result) {
  const sunsetContainer = document.createElement("div");
  sunsetContainer.classList.add("sunset-container", "day-info");

  const sunsetIcon = await createAndLoadWeatherIcon("sunset");

  const sunset = document.createElement("p");
  sunset.classList.add("sunset");
  sunset.textContent = `${formatTimeHourAndMinute(result)}`;

  sunsetContainer.appendChild(sunsetIcon);
  sunsetContainer.appendChild(sunset);

  return sunsetContainer;
}

async function uvDisplay(result) {
  const uvContainer = document.createElement("div");
  uvContainer.classList.add("uv-container", "day-info");

  const uvIcon = await createAndLoadWeatherIcon("uv");

  const uv = document.createElement("p");
  uv.classList.add("uv");
  uv.textContent = `${result}`;

  uvContainer.appendChild(uvIcon);
  uvContainer.appendChild(uv);

  return uvContainer;
}

async function windGustDisplay(result) {
  const windGustContainer = document.createElement("div");
  windGustContainer.classList.add("wind-gust-container", "day-info");

  const windGustIcon = await createAndLoadWeatherIcon("windgust");

  const windGust = document.createElement("p");
  windGust.classList.add("wind-gust");

  if (tempCategory.currentSystem === "metric") {
    windGust.textContent = `${result} km/h`;
  } else {
    windGust.textContent = `${result} mph`;
  }

  windGustContainer.appendChild(windGustIcon);
  windGustContainer.appendChild(windGust);

  return windGustContainer;
}

async function tenDayDisplay(result) {
  const tenDayContainer = document.querySelector(".ten-day-container");
  tenDayContainer.textContent = "";

  for (let i = 0; i < 10; i++) {
    const dayCard = document.createElement("div");
    dayCard.classList.add("day-card");

    const displayPrecipitation = await precipitationDisplay(
      result.days[i].precipcover,
      result.days[i].icon,
    );

    const displaySunrise = await sunriseDisplay(result.days[i].sunrise);
    const displaySunset = await sunsetDisplay(result.days[i].sunset);
    const displayUV = await uvDisplay(result.days[i].uvindex);
    const displayWindGust = await windGustDisplay(result.days[i].windgust);

    dayCard.appendChild(dayDisplay(result.days[i].datetime));
    dayCard.appendChild(dayTemperatureDisplay(result.days[i].temp));
    dayCard.appendChild(displayPrecipitation);
    dayCard.appendChild(displaySunrise);
    dayCard.appendChild(displaySunset);
    dayCard.appendChild(displayUV);
    dayCard.appendChild(displayWindGust);

    tenDayContainer.appendChild(dayCard);
  }
}

export { tenDayDisplay };
