import json_parse_better_errors from 'json-parse-better-errors';
import './style.css';

const container = document.querySelector('#container');
const inputElem = document.querySelector('#city-input');

inputElem.addEventListener('change', (e) => {
    getWeatherAtLocation(e.target.value);
});

async function getWeatherAtLocation(cityName) {
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=db61859850a2a031c5e9a344174eee49`, { mode: 'cors' });

        if(response.status === 400)
            return;
        
        let data = await response.json();

        if(data )
        RenderToHTML(data);
    }
    catch(e){
        console.log(e);
    }
}('Durban');

const RenderToHTML = (data) => {

    console.log(data);

    let weatherElem = container.querySelector('#weather');
    let locationElem = container.querySelector('#location');
    let tempElem = container.querySelector('#temperature');
    let windElem = container.querySelector('#wind');
    let humidityElem = container.querySelector('#humidity');

    weatherElem.textContent = data.weather[0].description;
    locationElem.textContent = data.name + ', ' + data.sys.country;
    tempElem.textContent = data.main.temp  + '\u00B0C but feels like ' + data.main.feels_like + '\u00B0C';
    windElem.textContent = 'wind moving at ' + data.wind.speed + ' m/s';
    humidityElem.textContent = data.main.humidity + '% humidity';

    weatherElem.textContent = weatherElem.textContent.toUpperCase();
    locationElem.textContent = locationElem.textContent.toUpperCase();
    tempElem.textContent = tempElem.textContent.toUpperCase();
    windElem.textContent = windElem.textContent.toUpperCase();
    humidityElem.textContent = humidityElem.textContent.toUpperCase();

    tempElem.style = 'display: inline';

    document.querySelector('body').style = "color: white;";
};

getWeatherAtLocation('London');