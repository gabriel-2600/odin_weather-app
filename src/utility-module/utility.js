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

async function loadWeatherIcon(condition) {
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

function formatTime(timeString) {
  const [hourString] = timeString.split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + (hour < 12 ? "AM" : "PM");
}

function timeConverter(time) {
  const [timeString] = time.split(":");
  const formattedTime = Number(timeString);

  return formattedTime;
}

export {
  tempCategory,
  loadWeatherIcon,
  loadBackgroundImage,
  formatTime,
  timeConverter,
};
