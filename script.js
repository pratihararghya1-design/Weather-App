const apiKey = "518d7f1082fbac45115f2e30e622a140"; 

// Fetch weather by city name
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchData(url);
}

// Fetch weather by current GPS location
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchData(url);
        }, () => {
            alert("Location access denied by user.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Common function to fetch data and update the UI
async function fetchData(url) {
    const loader = document.getElementById("loader");
    const weatherData = document.getElementById("weatherData");

    loader.classList.remove("hidden");
    weatherData.classList.add("hidden");

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            document.getElementById("cityName").innerText = `📍 ${data.name}`;
            document.getElementById("temp").innerText = `${Math.round(data.main.temp)} °C`;
            document.getElementById("description").innerText = data.weather[0].main;
            
            changeBackground(data.weather[0].main);

            loader.classList.add("hidden");
            weatherData.classList.remove("hidden");
        } else {
            alert("City not found!");
            loader.classList.add("hidden");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong!");
        loader.classList.add("hidden");
    }
}

// Change background based on weather condition
function changeBackground(weatherCondition) {
    const body = document.body;
    let bgGradient = "";

    switch(weatherCondition.toLowerCase()) {
        case "clear":
            bgGradient = "linear-gradient(to bottom, #f2c94c, #f2994a)";
            break;
        case "clouds":
            bgGradient = "linear-gradient(to bottom, #757f9a, #d7dde8)";
            break;
        case "rain":
        case "drizzle":
            bgGradient = "linear-gradient(to bottom, #2b5876, #4e4376)";
            break;
        case "thunderstorm":
            bgGradient = "linear-gradient(to bottom, #141e30, #243b55)";
            break;
        case "snow":
            bgGradient = "linear-gradient(to bottom, #e6dada, #274046)";
            break;
        default:
            bgGradient = "linear-gradient(to bottom, #0a2342, #175676)";
    }
    body.style.background = bgGradient;
}
