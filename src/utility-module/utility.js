const tempCategory = {
  currentSystem: "metric",
  changeSystem() {
    if (this.currentSystem === "metric") {
      this.currentSystem = "us";
    } else {
      this.currentSystem = "metric";
    }
  },
};

async function importWeatherIcon(condition) {
  try {
    const icon = await import(`../display-module/assets/${condition}.png`);
    return icon.default;
  } catch (error) {
    console.error(`Icon for condition "${condition}" not found.`, error);
    return null;
  }
}

async function loadBackgroundImage(condition) {
  try {
    const image = await import(`../display-module/assets/${condition}-bg.jpg`);
    return image.default;
  } catch (error) {
    console.error(`Image not found`, error);
    return null;
  }
}

function formatTimeHourOnly(timeString) {
  const [hourString] = timeString.split(":");
  const hour = +hourString % 24;
  return `${hour % 12 || 12}${hour < 12 ? "AM" : "PM"}`;
}

function formatTimeHourAndMinute(timeString) {
  if (!timeString) {
    return "N/A";
  }

  const [hourString, minuteString] = timeString.split(":");
  const hour = +hourString % 24;
  return `${hour % 12 || 12}:${minuteString}${hour < 12 ? "AM" : "PM"}`;
}

function convertTo24Hour(time) {
  const [timeString] = time.split(":");
  const formattedTime = Number(timeString);

  return formattedTime;
}

function getDayOfTheWeek(givenDate) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(givenDate);
  const dateToday = new Date();

  if (dateToday.getDate() === date.getDate()) {
    return "Today";
  }

  return weekday[date.getDay()];
}

export {
  tempCategory,
  importWeatherIcon,
  loadBackgroundImage,
  formatTimeHourOnly,
  formatTimeHourAndMinute,
  convertTo24Hour,
  getDayOfTheWeek,
};
