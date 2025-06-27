import {
  loadWeatherIcon,
  formatTime,
  timeConverter,
} from "../utility-module/utility";

const date = new Date();
const now = date.getHours();

async function hourlyDisplay(result) {
  const description = document.querySelector(".description");
  description.textContent = `${result.description}`;

  const hourlyContainer = document.querySelector(".hourly-container");
  hourlyContainer.textContent = "";

  for (const hour of result.days[0].hours) {
    if (now <= timeConverter(hour.datetime)) {
      const hourCard = document.createElement("div");
      hourCard.classList.add("hour-card");

      const time = document.createElement("p");
      time.classList.add("time");
      if (now === timeConverter(hour.datetime)) {
        time.textContent = `Now`;
      } else {
        time.textContent = `${formatTime(hour.datetime)}`;
      }

      const weatherIcon = document.createElement("img");
      weatherIcon.classList.add("weather-icon");
      const iconSrc = await loadWeatherIcon(hour.icon);
      if (iconSrc) {
        weatherIcon.src = iconSrc;
      } else {
        weatherIcon.alt = "No icon found";
      }

      const hourTemperature = document.createElement("p");
      hourTemperature.classList.add("hour-temperature");
      hourTemperature.textContent = `${hour.temp}°`;

      hourCard.appendChild(time);
      hourCard.appendChild(weatherIcon);
      hourCard.appendChild(hourTemperature);

      hourlyContainer.appendChild(hourCard);
    }
  }
}

export { hourlyDisplay };
