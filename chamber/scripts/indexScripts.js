document.addEventListener('DOMContentLoaded', () => {
    const currentTemp = document.getElementById('current-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const forecastContainer = document.getElementById('forecast');
    const spotlightContainer = document.querySelector('.spotlight-container');

    const apiKey = "ac1b94347b8a7250eafc022a3f51ea94";
    const latitude = 5.6148; // Latitude of Accra, Ghana
    const longitude = -0.2059; // Longitude of Accra, Ghana

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&cnt=3`;

    async function fetchWeatherData() {
        try {
            const currentWeatherResponse = await fetch(currentWeatherURL);
            const currentWeather = await currentWeatherResponse.json();
            displayCurrentWeather(currentWeather);

            const forecastResponse = await fetch(forecastURL);
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData.list);

        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherDesc.textContent = 'Error fetching weather.';
        }
    }

    function displayCurrentWeather(data) {
        currentTemp.textContent = Math.round(data.main.temp);
        weatherDesc.textContent = data.weather[0].description;
    }

    function displayForecast(forecastList) {
        forecastContainer.innerHTML = ''; // Clear previous forecast if any
        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
            const temp = Math.round(item.main.temp);
            const forecastDay = document.createElement('div');
            forecastDay.classList.add('forecast-day');
            forecastDay.innerHTML = `<p>${dayName}</p><p>${temp}&deg;C</p>`;
            forecastContainer.appendChild(forecastDay);
        });
    }

    async function getSpotlights() {
        try {
            const response = await fetch('data/members.json');
            const data = await response.json();

            const goldOrSilver = data.filter(member => member.membership_level === 3 || member.membership_level === 2);
            const numSpotlights = Math.min(goldOrSilver.length, 3);
            const spotlightIndices = [];

            while (spotlightIndices.length < numSpotlights) {
                const randomIndex = Math.floor(Math.random() * goldOrSilver.length);
                if (!spotlightIndices.includes(randomIndex)) {
                    spotlightIndices.push(randomIndex);
                }
            }

            spotlightIndices.forEach((index, i) => {
                const member = goldOrSilver[index];
                const spotlightCard = document.getElementById(`spotlight-${i + 1}`);
                if (spotlightCard) {
                    spotlightCard.innerHTML = `
                        <img src="images/${member.image}" alt="${member.name} logo">
                        <h3>${member.name}</h3>
                        <p>${member.description}</p>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <a href="${member.website}" target="_blank">Visit Website</a>
                    `;
                }
            });

           
            for (let i = numSpotlights; i < 3; i++) {
                const spotlightCard = document.getElementById(`spotlight-${i + 1}`);
                if (spotlightCard) {
                    spotlightCard.style.display = 'none';
                }
            }

        } catch (error) {
            console.error("Error loading spotlights:", error);
        }
    }

    // Fetch data and update footer
    fetchWeatherData();
    getSpotlights();
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});


