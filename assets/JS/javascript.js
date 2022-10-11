var apiKey = "1993e6905ca627dfda6bbc62bc9f8674"
var currentDay = (moment().format("dddd, MMMM Do YYYY"))
var searchHistoryList = [];

function currentCondition(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(queryURL);
        
        console.log(response);

        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        var windSpeed = response.wind.speed;
        $(".wind").html("<p>Wind Speed: " +  windSpeed + "</p>");
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      });
    
        $("#cityDetail").append(currentCity);

        var lat = cityWeatherResponse.coord.lat;
        var lon = cityWeatherResponse.coord.lon;
        var uviQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";

        $.ajax({
            url: uviQueryURL,
            method: "GET"
        })
        .then(function(uviResponse){
            console.log(uviResponse);

            var uvIndex = uviResponse.value;
        })
    };

    function futureCondition(lat, lon) {

        var futureURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

        $.ajax({
            url: futureURL,
            method: "GET"
        })
        .then(function(Response){
            console.log(Response);
            $("#fiveDay").empty();

            for (let i = 1; i < 6; i++) {
                var cityInfo = {
                    date: futureResponse.daily[i].dt,
                    icon: futureResponse.daily[i].weather[0].icon,
                    temp: futureResponse.daily[i].temp.day,
                    humidity: futureResponse.daily[i].humidity
                }
                 
                var currDate = moment.unix(cityInfo.date).format("MM//DD/YYYY");
                var iconURL = '<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png"/>'
            
                

                $("#fiveDay").append(futureCard);
            }
        });
    }

    $("#searchBtn").on("click", function(event){
        event.preventDefault();

        var city = $("#enterCity").val().trim();
        currentCondition(city);
        if (!searchHistoryList.includes(city)){
            searchHistoryList.push(city);
             var searchedCity = $(`
             <li class="list-group-item">${city}</li>`)
             $("#searchHistory").append(searchedCity);
        }

        localStorage.setItem("city", JSON.stringify(searchHistoryList));
        console.log(searchHistoryList);
    });

    $(document).on("click", ".list-group-item", function(){
        var listCity = $(this).text();
        currentCondition(listCity);
    });

    $(document).ready(function(){
        var searchHistoryArr = JSON.parse(localStorage.getItem("city"));

        if (searchHistoryArr !== null) {
            var lastSearchedIndex = searchHistoryArr.length - 1;
            var lastSearchedCity = searchHistoryArr[lastSearchedIndex];
            currentCondition(lastSearchedCity);
            console.log(`last searched city: ${lastSearchedCity}`);
        }
    });



    