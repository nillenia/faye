// Time display
function updateTime() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('current-time').textContent = `${h}:${m}`;
}
setInterval(updateTime, 1000);
updateTime();

// Weather display (Open-Meteo API)
function updateWeather() {
    const weatherInfo = document.getElementById('weather-info');
    if (!navigator.geolocation) {
        weatherInfo.textContent = "Location unavailable";
        return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
            .then(res => res.json())
            .then(data => {
                if (data.current_weather) {
                    const temp = Math.round(data.current_weather.temperature);
                    const weather = data.current_weather.weathercode;
                    const desc = weatherDescription(weather);
                    weatherInfo.textContent = `${temp}°C, ${desc}`;
                } else {
                    weatherInfo.textContent = "Weather unavailable";
                }
            })
            .catch(() => {
                weatherInfo.textContent = "Weather unavailable";
            });
    }, () => {
        weatherInfo.textContent = "Location denied";
    });
}

function weatherDescription(code) {
    const map = {
        0: "Clear",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Drizzle",
        61: "Rain",
        71: "Snow",
        80: "Rain showers",
        95: "Thunderstorm"
    };
    return map[code] || "Unknown";
}
updateWeather();