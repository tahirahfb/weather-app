const API_KEY = '38293972e6bab4d9c7c71218b93bd231';

const getCityName = document.getElementById('city');
const getTempFahrenheit = document.getElementById('temp_fahrenheit');
const getFeelsLike = document.getElementById('feels_like_current');
const getClouds = document.getElementById('clouds_current');
const getPressure = document.getElementById('pressure_current');
const getHumidity = document.getElementById('humidity_current');
const getWind = document.getElementById('wind_current');
const getVisibility = document.getElementById('visibility_current');
const getSunrise = document.getElementById('sunrise_current');
const getSunset = document.getElementById('sunset_current')
const getHighTemp = document.getElementById('high');
const getLowTemp = document.getElementById('low');
const getConditions = document.getElementById('current_conditions');
const getCurrentIcon = document.getElementById('current_icon');

const curr_time = document.getElementById('current_time');
const curr_date = document.getElementById('current_date');

const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
setInterval (()=>{
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const format_hour = hour == 0 ? 12 : hour >=13 ? hour%12 : hour;
    const minutes = time.getMinutes();
    const am_pm = hour>=12 ? 'PM' : 'AM';
    curr_time.innerHTML =  `${format_hour}:${(minutes < 10? '0'+minutes : minutes)} ${am_pm}`;
    curr_date.innerHTML =  `${days[day]}, ${months[month]} ${date}, ${year} `;
}
);

const country_code = 'US';

const submitButton = document.querySelector('form');
submitButton.addEventListener('submit', function getWeatherData(e){
    e.preventDefault()
    var zip = document.getElementById('zipcode').value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},${country_code}&units=imperial&appid=${API_KEY}`)
    .then((response) => response.json())
    .then(data => {
            console.log(data);
            console.log(data.weather[1]);
            displayWeatherData(data);
})

function displayWeatherData (data){
    let {name, visibility} = data;
    let {feels_like, humidity, pressure, temp, temp_max, temp_min}= data.main;
    let {sunrise, sunset} = data.sys;
    let {speed} = data.wind;
    let {all} = data.clouds;
    let {main, description, icon} = data.weather[0];
    

    getCityName.innerHTML = `${name}`;
    getTempFahrenheit.innerHTML =  `${Math.round(temp)} &deg;F`;
    getCurrentIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">`;
    getConditions.innerHTML = `${main} (${description})`;
    getHighTemp.innerHTML = `H: ${Math.round(temp_max)} &deg;F`;
    getLowTemp.innerHTML = `L: ${Math.round(temp_min)} &deg;F`;
    getFeelsLike.innerHTML = `${Math.round(feels_like)} &deg;F`;
    getClouds.innerHTML = `${all} %`;
    getPressure.innerHTML = `${pressure} hPa`;
    getHumidity.innerHTML = `${humidity} %`;
    getWind.innerHTML = `${speed} mph`;
    getVisibility.innerHTML = `${visibility} m`;
    const rise = new Date(sunrise * 1000);
    const set = new Date (sunset * 1000);
    const sunriseHour = rise.getHours();
    const sunriseMin = rise.getMinutes();
    const sunsetHour = set.getHours();
    const sunsetMin = set.getMinutes();
    const formatSunriseHr = sunriseHour >=13 ? sunriseHour%12 : sunriseHour;
    const formatSunsetHr = sunsetHour >=13 ? sunsetHour%12 : sunsetHour;
    const am_pm1 = sunriseHour>=12 ? 'PM' : 'AM';
    const am_pm2 = sunsetHour>=12 ? 'PM' : 'AM';
    getSunrise.innerHTML = `${formatSunriseHr}:${sunriseMin} ${am_pm1}`;
    getSunset.innerHTML = `${formatSunsetHr}:${sunsetMin} ${am_pm2}`;

//Conversion: Fahrenheit to Celsius
const convert_to_celsius = document.getElementById('celsius');

convert_to_celsius.addEventListener('click', () => {
    const degrees_celsius = (temp - 32) / 1.8;
    getTempFahrenheit.innerHTML = `${Math.round(degrees_celsius)} &deg;C`;
})    

}

})



