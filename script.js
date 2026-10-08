// Insert your OpenWeatherMap API key here
const apiKey = "518d7f1082fbac45115f2e30e622a140"; 

// Fetch weather by typed city name
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchData(url);
}

// Fetch weather by user's GPS location
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchData(url);
        }, () => {
            alert("Location access denied by user. Please allow location permissions in your browser.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Main function to fetch data and update the UI
async function fetchData(url) {
    const loader = document.getElementById("loader");
    const weatherData = document.getElementById("weatherData");

    // Show loader, hide data
    loader.classList.remove("hidden");
    weatherData.classList.add("hidden");

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Update City Name, Temperature, and Description
            document.getElementById("cityName").innerText = `📍 ${data.name}`;
            document.getElementById("temp").innerText = `${Math.round(data.main.temp)} °C`;
            document.getElementById("description").innerText = data.weather[0].main;
            
            // Fetch and set Dynamic Weather Icon from API
            const iconCode = data.weather[0].icon;
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            
            // Update Humidity and Wind Speed (converted from m/s to km/h)
            document.getElementById("humidity").innerText = `${data.main.humidity} %`;
            document.getElementById("wind").innerText = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
            
            // Update Background Image
            changeBackground(data.weather[0].main);

            // Hide loader, show data
            loader.classList.add("hidden");
            weatherData.classList.remove("hidden");
        } else {
            alert("City not found! Please check the spelling.");
            loader.classList.add("hidden");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong while fetching the data!");
        loader.classList.add("hidden");
    }
// Change background instantly using premium CSS gradients (No external images)
function changeBackground(weatherCondition) {
    const body = document.body;
    let bgGradient = "";

    switch(weatherCondition.toLowerCase()) {
        case "clear":
            bgGradient = "linear-gradient(to bottom, #56CCF2, #2F80ED)"; // Sunny blue sky
            break;
        case "clouds":
            bgGradient = "linear-gradient(to bottom, #757F9A, #D7DDE8)"; // Moody grey clouds
            break;
        case "rain":
        case "drizzle":
            bgGradient = "linear-gradient(to bottom, #2C3E50, #3498DB)"; // Dark blue rain
            break;
        case "thunderstorm":
            bgGradient = "linear-gradient(to bottom, #141E30, #243B55)"; // Midnight thunderstorm
            break;
        case "snow":
            bgGradient = "linear-gradient(to bottom, #E6DADA, #274046)"; // Frosty snow
            break;
        default:
            bgGradient = "linear-gradient(to bottom, #0a2342, #175676)"; // Default night blue
    }
    
    // Safely apply the gradient background
    body.style.background = bgGradient;
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "cover";
}
    body.style.backgroundImage = `url('${bgUrl}')`;
}
