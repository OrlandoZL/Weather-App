var apiKey = "1993e6905ca627dfda6bbc62bc9f8674"
var currentDay = moment().format("L");
var searchHistory = [];

function currentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}";

    $.ajax({
        url: queryURL,
        method: "get"
    })
    .then(function(cityWeatherResponse){
        console.log(cityWeatherResponse);

        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/w/${iconCode}.png";

        var currentCity = $(`
        <h2 id="currentCity">
        ${cityWeatherResponse.name} ${today} <img src="$iconURL}"/>
        </h2>
        <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
        <p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
        <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>
        `)
    })
}