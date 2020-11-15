import React, { useState } from "react";
import axios from "axios";
import "./Search.css";
import Loading from "./Loading";
import Forecast from "./Forecast";

export default function Search() {
  const [city, setCity] = useState("");
  let [weather, setWeather] = useState({});
  let [ready, setReady] = useState(false);

  function displayWeather(response) {
    setReady(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=33b9889a2520a43a8c73d715b7b85a96&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCityInfo(event) {
    setCity(event.target.value);
  }

  function AutoCities() {
    navigator.geolocation.getCurrentPosition(currentLocation);

    function currentLocation(position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let apiKey = "33b9889a2520a43a8c73d715b7b85a96";
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      axios.get(url).then(displayWeather);
    }
  }

  // The search bar and buttons ///////////
  let form = (
    <div className="topButtons">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter your City"
          onChange={updateCityInfo}
          className="searchBar"
        />
        <button className="button" type="submit">Search</button>
      </form>
      <button className="button" onClick={AutoCities}>Get Current Location</button>
    </div>
  );

  //When we have the location -------\\\\\\\\
  if (ready) {
    return (
      <div className="searchedForm">
        {form}
        <h2> {city} </h2>
        <ul className="list">
          <li>Temperature: {Math.round(weather.temperature)}•C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img className="icon" src={weather.icon} alt="weather icon" />
          </li>
        </ul>
        <Forecast />
      </div>
    );
  } else {
    return (
      <div className="notSearchedForm">
        <div className="form">{form}</div>
        <Loading className="loader" />
      </div>
    );
  }
}
