const apiKey = "8ea602e619456606de39551df27707a9";

const loader = document.getElementById("loader");

async function getWeather(){

const city = document.getElementById("cityInput").value;

const error = document.getElementById("error");

error.innerText = "";

if(city === ""){
error.innerText = "Please enter a city name";
return;
}

loader.style.display="block";

try{

const response = await fetch(
"https://api.openweathermap.org/data/2.5/weather?q=" 
+ city + 
"&units=metric&appid=" + apiKey
);

const data = await response.json();

loader.style.display="none";

if(data.cod != 200){
error.innerText = data.message;
return;
}

document.getElementById("city").innerText =
"City: " + data.name;

document.getElementById("temp").innerText =
"Temperature: " + data.main.temp + " °C";

document.getElementById("condition").innerText =
"Condition: " + data.weather[0].main;

document.getElementById("humidity").innerText =
"Humidity: " + data.main.humidity + "%";

document.getElementById("wind").innerText =
"Wind Speed: " + data.wind.speed + " km/h";

document.getElementById("icon").src =
"https://openweathermap.org/img/wn/" +
data.weather[0].icon +
"@2x.png";

}
catch(err){

loader.style.display="none";
error.innerText = "Unable to connect to weather server";

}

}

document.getElementById("cityInput")
.addEventListener("keypress", function(e){

if(e.key === "Enter"){
getWeather();
}

});

document.getElementById("themeBtn").onclick = function(){
document.body.classList.toggle("dark");
};