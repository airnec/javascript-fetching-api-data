// latitude = prompt('Enter the latitude of your location');
// longitude = prompt('Enter the longitude of your location');

latitude = 40.7128;
longitude = -74.006;

async function getAPIKey() {
  try {
    const response = await fetch('./config.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const config = await response.json();
    // console.log(config);
    return config.APIKey;
  } catch (error) {
    console.log(error);
  }
}

async function fetchData(url) {
  try {
    console.log('fetching data...');
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  const APIKey = await getAPIKey();
  // console.log(APIKey);

  // Define your endpoint and parameters
  const OWM_Endpoint = 'https://api.openweathermap.org/data/2.5/weather';
  const weatherParams = {
    lat: latitude,
    lon: longitude,
    appid: APIKey,
  };

  const url = `${OWM_Endpoint}?lat=${weatherParams.lat}&lon=${weatherParams.lon}&appid=${weatherParams.appid}`;
  const data = await fetchData(url);

  document.querySelector(
    '.temp'
  ).textContent = `Temperature will be ${data.main.temp}`;
  document.querySelector(
    '.feels-like'
  ).textContent = `It will feel like ${data.main.feels_like}`;
}

document.getElementById('fetch').addEventListener('click', main);
