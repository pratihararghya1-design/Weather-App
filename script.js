async function getWeather() {
    const city = document.getElementById("cityInput").value;
    
    // Note: OpenWeatherMap par account banakar apni free API key yahan daalein
    const apiKey = "518d7f1082fbac45115f2e30e622a140"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const loader = document.getElementById("loader");
    const weatherData = document.getElementById("weatherData");

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    // Data fetch hone se pehle radar animation shuru karo
    loader.classList.remove("hidden");
    weatherData.classList.add("hidden");

    try {
        // API ko request bhejna
        const response = await fetch(url);
        const data = await response.json();

        // Agar city mil gayi (Status 200 OK)
        if (response.ok) {
            // DOM manipulation: Data ko screen par dikhana
            document.getElementById("cityName").innerText = `📍 ${data.name}`;
            document.getElementById("temp").innerText = `${Math.round(data.main.temp)} °C`;
            document.getElementById("description").innerText = data.weather[0].main;
            
            // Radar animation band karo, data dikhao
            loader.classList.add("hidden");
            weatherData.classList.remove("hidden");
        } else {
            // Agar city spelling galat hai
            alert("City not found! Please check the spelling.");
            loader.classList.add("hidden");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong with the connection!");
        loader.classList.add("hidden");
    }
}
