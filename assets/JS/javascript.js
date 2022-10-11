var apiKey = "1993e6905ca627dfda6bbc62bc9f8674"
var currentDay = moment().format("L");
var searchHistory = [];

function currentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}";

    $.ajax({
        url: queryURL,
        method: "GET"
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
        `);
    
        $("#cityDetail").append(currentCity);

        var lat = cityWeatherResponse.coord.lat;
        var lon = cityWeatherResponse.coord.lon;
        var uviQueryURL = 'https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}';

        $.ajax({
            url: uviQueryURL,
            method: "GET"
        })
        .then(function(uviResponse){
            console.log(uviResponse);

            var uvIndex = uviResponse.value;
        })
    })}

    function futureCondition(lat, lon) {

        var futureURL = "https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}";

        $.ajax({
            url: futureURL,
            method: "GET"
        })
        .then(function(futureResponse){
            console.log(futureResponse);
            $("#fiveDay").empty();

            for (let i = 1; i < 6; i++) {
                var cityInfo = {
                    date: futureResponse.daily[i].dt,
                    icon: futureResponse.daily[i].weather[0].icon,
                    temp: futureResponse.daily[i].temp.day,
                    humidity: futureResponse.daily[i].humidity
                };
                 
                var currDate = moment.unix(cityInfo.date).format("MM//DD/YYYY");
                var iconURL = '<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png"/>'
            }
        })
    }