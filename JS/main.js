// General Variables
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const todayTemp = document.getElementById("todayTemp");
const todayIcon = document.getElementById("todayIcon");
const CurrentConditionText = document.getElementById("CurrentConditionText");
const currentHumi = document.getElementById("currentHumi");
const currentWSpeed = document.getElementById("currentWSpeed");
const currentWSDir = document.getElementById("currentWSDir");
const locationField = document.getElementById("locationField");
const secondDayIcon = document.getElementById("secondDayIcon");
const secondDayDegree = document.getElementById("secondDayDegree");
const minTempSecond = document.getElementById("minTempSecond");
const secondCondition = document.getElementById("secondCondition");
const thirdDayIcon = document.getElementById("thirdDayIcon");
const thirdDayDegree = document.getElementById("thirdDayDegree");
const minTempThird = document.getElementById("minTempThird");
const thirdCondition = document.getElementById("thirdCondition");
// ***************************************************************
// Get Country Name from the field
function getCountry() {
  let country = search.value;
  return country;
}
// ***************************************************************
// Get Current Weather from API
async function getCurrentWeather(url) {
  let response = await fetch(url);
  if (response.ok) {
    let jsonRes = await response.json();
    // Catching data
    let currentLocation = jsonRes.location.name;
    let currentTempC = jsonRes.current.temp_c;
    let currentConditionText = jsonRes.current.condition.text;
    let currentConditionIcon = jsonRes.current.condition.icon;
    let wind_kph = jsonRes.current.wind_kph;
    let wind_dir = jsonRes.current.wind_dir;
    let humidity = jsonRes.current.humidity;

    // Setting it up to HTML
    locationField.innerHTML = currentLocation;
    todayTemp.innerHTML = `${currentTempC}<sup>o</sup>C`;
    CurrentConditionText.innerHTML = `${currentConditionText}`;
    todayIcon.src = currentConditionIcon;
    currentHumi.innerHTML = `<img src="./imgs/icon-umberella.png" alt="" width="21" height="21" >${humidity}%`;
    currentWSpeed.innerHTML = `<img src="./imgs/icon-wind.png" alt="" width="23" height="21" >${wind_kph}km/h`;
    currentWSDir.innerHTML = `<img src="./imgs/icon-compass.png" alt="" width="21" height="21">${wind_dir}`;
  }
}
// ***************************************************************
// Get Second Day Weather from API
async function getSecondDayWeather(url) {
  let response = await fetch(url);
  if (response.ok) {
    let jsonRes = await response.json();
    // Catching data
    let mintemp_c = jsonRes.forecast.forecastday[1].day.mintemp_c;
    let maxtemp_c = jsonRes.forecast.forecastday[1].day.maxtemp_c;
    let secondConditionText =
      jsonRes.forecast.forecastday[1].day.condition.text;
    let secondConditionIcon =
      jsonRes.forecast.forecastday[1].day.condition.icon;

    // Setting it up to HTML
    secondDayIcon.src = secondConditionIcon;
    secondDayDegree.innerHTML = `
    ${maxtemp_c}<sup>o</sup>C</div>`;
    minTempSecond.innerHTML = `${mintemp_c}<sup>o</sup>`;
    secondCondition.innerHTML = `${secondConditionText}`;
  }
}
// ***************************************************************
// Get Third Day Weather from API
async function getThirdDayWeather(url) {
  let response = await fetch(url);
  if (response.ok) {
    let jsonRes = await response.json();
    // Catching data
    let mintemp_c = jsonRes.forecast.forecastday[2].day.mintemp_c;
    let maxtemp_c = jsonRes.forecast.forecastday[2].day.maxtemp_c;
    let thirdConditionText = jsonRes.forecast.forecastday[2].day.condition.text;
    let thirdConditionIcon = jsonRes.forecast.forecastday[2].day.condition.icon;

    // Setting it up to HTML
    thirdDayIcon.src = thirdConditionIcon;
    thirdDayDegree.innerHTML = `
    ${maxtemp_c}<sup>o</sup>C</div>`;
    minTempThird.innerHTML = `${mintemp_c}<sup>o</sup>`;
    thirdCondition.innerHTML = `${thirdConditionText}`;
  }
}

// ***************************************************************
// Function to get the current day and date
function getCurrentDayAndDate() {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getDay()];
  const secondDay = daysOfWeek[currentDate.getDay() + 1];
  const thirdDay = daysOfWeek[currentDate.getDay() + 2];
  const dayNumber = currentDate.getDate();
  const monthName = months[currentDate.getMonth()];

  return { currentDay,secondDay,thirdDay, dayNumber, monthName };
}

// Function to update the day and date in the forecast header
function updateForecastDayAndDate() {
  const todayHeader = document.querySelector("#today .day");
  const todayDate = document.querySelector("#today .date");
  const secondDayHeader = document.querySelector("#secondDay .day");
  const thirdDayHeader = document.querySelector("#thirdDay .day");

  const { currentDay,secondDay,thirdDay, dayNumber, monthName } = getCurrentDayAndDate();

  todayHeader.textContent = currentDay;
  todayDate.textContent = `${dayNumber} ${monthName}`;
  secondDayHeader.textContent = secondDay;
  thirdDayHeader.textContent = thirdDay;
}

// Call the function to update the day and date on page load
updateForecastDayAndDate();
// ***************************************************************
function displayForecastForCairo() {
  const defaultForecastUrl =
    "https://api.weatherapi.com/v1/forecast.json?key=3039a70094fb4892b71210105232912&q=Cairo&days=3";
  getCurrentWeather(defaultForecastUrl);
  getSecondDayWeather(defaultForecastUrl);
  getThirdDayWeather(defaultForecastUrl);
}
// ***************************************************************
// Event listener for page reload
window.addEventListener("load", displayForecastForCairo);
// ***************************************************************
// On Click Event
submit.addEventListener("click", () => {
  let country = getCountry();
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=3039a70094fb4892b71210105232912&q=${country}&days=3`;
  getCurrentWeather(forecastUrl);
  getSecondDayWeather(forecastUrl);
  getThirdDayWeather(forecastUrl);
});
