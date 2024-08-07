import React from "react";

const WeatherContent = ({ weatherData }) => {
  if (!weatherData) return null;
  console.log(weatherData);

  const { temp, description, wind_speed, humidity, icon, name, country } =
    weatherData;
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">
          {name} {country}
        </h2>
        <div className="d-flex align-items-center">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="mr-3"
          />
          <div>
            <h3 className="card-text">{temp}°C</h3>
            <p className="card-text text-capitalize">{description}</p>
            <p className="card-text">Wind Speed: {wind_speed} m/s</p>
            <p className="card-text">Humidity: {humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherContent;
