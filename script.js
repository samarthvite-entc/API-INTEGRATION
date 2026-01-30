function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        document.getElementById("weatherData").innerText =
            "Please enter a city name";
        return;
    }

    // Step 1: Get latitude & longitude from city name
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(geoData => {
            if (!geoData.results) {
                document.getElementById("weatherData").innerText =
                    "City not found";
                return;
            }

            const latitude = geoData.results[0].latitude;
            const longitude = geoData.results[0].longitude;
            const location = geoData.results[0].name;

            // Step 2: Fetch weather using latitude & longitude
            const weatherUrl =
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

            return fetch(weatherUrl).then(response => response.json())
                .then(weatherData => {
                    const temp = weatherData.current_weather.temperature;
                    const wind = weatherData.current_weather.windspeed;

                    document.getElementById("weatherData").innerHTML = `
                        📍 City: ${location} <br>
                        🌡 Temperature: ${temp} °C <br>
                        💨 Wind Speed: ${wind} km/h
                    `;
                });
        })
        .catch(error => {
            document.getElementById("weatherData").innerText =
                "Error fetching data";
        });
}
