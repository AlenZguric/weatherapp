import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [cityName, setCityName] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (cityName.trim() !== '') {
      // Navigacija na "/myplaces" s unesenim gradom kao parametrom
      navigate(`/myplaces/${cityName.trim()}`);

      setCityName("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();

      setCityName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Unesite ime grada"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
