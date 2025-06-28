function retrieveLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getLocationDetails(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    const city =
      result.address.city || result.address.town || result.address.village;

    if (!city) {
      throw new Error("Error fetching city");
    }

    return city;
  } catch (error) {
    console.error(`Error fetching location: ${error.message}`);
    throw error;
  }
}

async function getCityOfUser() {
  try {
    const position = await retrieveLocation();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const city = await getLocationDetails(latitude, longitude);

    return city;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export { getCityOfUser };
