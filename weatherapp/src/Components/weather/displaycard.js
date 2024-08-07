import React from "react";

const DisplayCard = ({ forecastData }) => {
  if (!forecastData) return null;
  console.log(forecastData);
  return (
    <div className="row mt-4">
      {forecastData.map((day, index) => (
        <div key={index} className="col-12 col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <p className="card-text font-weight-bold">
                {new Date(day.date).toLocaleDateString()}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="mb-2"
              />
              <h4 className="card-title">{day.temp}°C</h4>
              <p className="card-text text-capitalize">{day.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayCard;
