const apiKey= "832f96a19a047d9fbbf7afe53c18072f"

const btn = document.getElementById("btn");
const currentTemperature = document.querySelector("#currentTemperature");
const loc = document.querySelector('#loc');
const weatherDescription = document.getElementById("weatherDescription");
const feelsLike = document.querySelector("#feelsLike");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const icon = document.querySelector("#icon");
let lat;
let long;
let wData; 
let temperature;

const getLocation = function(){
    currentLocation=navigator.geolocation.getCurrentPosition(getData);}

const showWeather = function(wData){
    loc.innerHTML=`Current Location: ${wData.name},${wData.sys.country}`;
    loc.style.display = "block";
    temperature= wData.main;
    console.log(wData);
    currentTemperature.textContent= `${temperature.temp}°C`
    
    let descFormatted = wData.weather[0].description.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
    console.log(descFormatted);
    weatherDescription.textContent=descFormatted;
    feelsLike.textContent= `Feels like ${temperature.feels_like}°C`;
    humidity.textContent=`Humidity: ${temperature.humidity}%`;
    windSpeed.textContent=`Wind Speed: ${Math.round(wData.wind.speed/1000*60*60)} km/h `;
    document.querySelector('.flexbox-item-1').style.display = "block";
    
}


const getData = function(position){
    [lat,long]=[position.coords.latitude,position.coords.longitude];
    console.log(lat,long);
    getWeather();
}

const getWeather =  function () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric
    `).
    then(response => response.json())
    .then(wData => showWeather(wData));
}


btn.addEventListener("click", getLocation);


   



