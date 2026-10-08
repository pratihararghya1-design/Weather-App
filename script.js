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
// Update the background with optimized HD images
function changeBackground(weatherCondition) {
    const body = document.body;
    let bgUrl = "";

    // Changed image widths to 1080 for lightning-fast mobile loading
    switch(weatherCondition.toLowerCase()) {
        case "clear":
            bgUrl = "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1080"; 
            break;
        case "clouds":
            bgUrl = "https://images.unsplash.com/photo-1534088568595-a066f410cbda?q=80&w=1080"; 
            break;
        case "rain":
        case "drizzle":
            bgUrl = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1080"; 
            break;
        case "thunderstorm":
            bgUrl = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cecb?q=80&w=1080"; 
            break;
        case "snow":
            bgUrl = "https://images.unsplash.com/photo-1516431883709-a75d506d7389?q=80&w=1080"; 
            break;
        default:
            bgUrl = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1080"; 
    }
    
    // Forcefully override all CSS background properties
    body.style.background = `url('${bgUrl}') no-repeat center center fixed`;
    body.style.backgroundSize = "cover";
}

    
    body.style.backgroundImage = `url('${bgUrl}')`;
}
