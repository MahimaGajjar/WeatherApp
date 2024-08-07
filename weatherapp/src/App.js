import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./Components/searchBar/searchBar";
import WeatherContent from "./Components/weather/weatherContent";
import DisplayCard from "./Components/weather/displaycard";
const API_KEY = "1e3ac96213d60eb6b62abb3c103a28db";

const App = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = (newLocation) => {
    setLocation(newLocation);
    fetchWeatherData(newLocation);
    fetchForecastData(newLocation);
  };
  const fetchWeatherData = async (location) => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`
      )
      .then((res) => {
        if (res.data.success !== false) {
          setWeatherData(res.data.current);
          setError(null);
        } else {
          setWeatherData(null);
          setError({ message: res.data.error.info });
          setForecastData(null);
        }
      })
      .catch((error) => {
        setError(error);
        setWeatherData(null);
        setForecastData(null);
      });
  };
  console.log(weatherData);

  const fetchForecastData = async (location) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
      )
      .then((res) => {
        setForecastData(
          res.data.list.slice(0, 5).map((item) => ({
            date: item.dt_txt,
            temp: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          }))
        );
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setForecastData(null);
      });
  };
  const backgroundStyles = {
    clear: {
      backgroundColor: "#87CEEB", // Light sky blue
      color: "#000",
    },
    cloudy: {
      backgroundColor: "#D3D3D3", // Light grey
      color: "#000",
    },
    rainy: {
      backgroundColor: "#4682B4", // Steel blue
      color: "#FFF",
    },
    snow: {
      backgroundColor: "#FFF", // White
      color: "#000",
    },
  };
  const getBackgroundStyle = (condition) => {
    switch (condition) {
      case "Clear":
        return backgroundStyles.clear;
      case "Cloudy":
        return backgroundStyles.cloudy;
      case "Rain":
        return backgroundStyles.rainy;
      case "Snow":
        return backgroundStyles.snow;
      default:
        return backgroundStyles.clear;
    }
  };

  const [currentCondition, setCurrentCondition] = useState("");
  return (
    <section class="vh-100">
    <div
      className="container py-5 h-100"
      style={getBackgroundStyle(currentCondition)}
    >
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-8 col-lg-6 col-xl-4">
        <h3 class="mb-4 pb-2 fw-normal">Check the weather forecast</h3>

          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      {error && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="alert alert-danger mt-3">{error.message}</div>
          </div>
        </div>
      )}
      {weatherData && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <WeatherContent weatherData={weatherData} />
          </div>
        </div>
      )}
      {forecastData && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <DisplayCard forecastData={forecastData} />
          </div>
        </div>
      )}
    </div>
    </section>
  );

  // {loading && (
  //   <div className="row justify-content-center">
  //     <div className="col-12 col-md-8 col-lg-6 text-center">
  //       <div className="spinner-border mt-3" role="status">
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     </div>
  //   </div>
  // )}
};
export default App;
