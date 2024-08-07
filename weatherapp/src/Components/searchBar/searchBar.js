import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      onSearch(location);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-inline justify-content-center mt-3"
    >
      <div className="form-group mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city or zip code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-2 ml-2" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
