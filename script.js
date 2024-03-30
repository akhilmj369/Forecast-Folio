function getweather(){

    const apikey = '720f3f4ba4ce55465ac225479ee9bf8b';
    const city = document.getElementById('city').value;

    if (!city){
        alert('please enter a city');
        return;
    }

    const currentweatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    fetch(currentweatherurl)
        .then(response => response.json())
        .then(data => {
            displayweather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data.Please try again.');
        });

    fetch(forecasturl)
        .then(response => response.json())
        .then(data => {
            displayhourlyforecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data.Please try again.');
        });
}

function displayweather(data){

    const tempdivinfo = document.getElementById('temp-div');
    const weatherinfodiv = document.getElementById('weather-info');
    const weathericon = document.getElementById('weather-icon');
    const hourlyforecastdiv = document.getElementById('hourly-forecast');

    //clear previous content
    weatherinfodiv.innerHTML = '';
    hourlyforecastdiv.innerHTML = '';
    tempdivinfo.innerHTML = '';

    if(data.cod === '404'){
        weatherinfodiv.innerHTML = `<p>${data.message}</p>`;
    }else{
        const cityname = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconcode = data.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;

        const temperatureHtml = `
            <p>${temperature}°C</p>
            `;
        
        const weatherHtml = `
            <p>${cityname}</p>
            <p>${description}</p>
            `;

        tempdivinfo.innerHTML = temperatureHtml;
        weatherinfodiv.innerHTML = weatherHtml;
        weathericon.src = iconurl;
        weathericon.alt = description;

        showimage();
    }
}

function displayhourlyforecast(hourlydata) {

    const hourlyforecastdiv = document.getElementById('hourly-forecast');
    const next24hours = hourlydata.slice(0, 8);

    next24hours.forEach(item => {
        const datetime = new Date(item.dt * 1000);
        const hour = datetime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconcode = item.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;

        const hourlyitemhtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src = "${iconurl}" alt="Hourly Weather Icon">
                <span> ${temperature}°C</span >
            </div >
            `;
        hourlyforecastdiv.innerHTML += hourlyitemhtml;
    });
}

function showimage(){
    const weathericon = document.getElementById('weather-icon');
    weathericon.style.display = 'block';
}