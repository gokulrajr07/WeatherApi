import React, { useState } from 'react';
import WeatherForm from './WeatherForm';
import WeatherTable from './WeatherTable';
import './App.css';

const App = () => {
  const [weatherEntries, setWeatherEntries] = useState([]);
  const [editingWeather, setEditingWeather] = useState(null);

  const handleAddWeather = (newData) => {
    if (editingWeather) {
      // Update the entry if editing
      const updatedEntries = weatherEntries.map((entry) =>
        entry.date === editingWeather.date ? newData : entry
      );
      setWeatherEntries(updatedEntries);
      setEditingWeather(null); // Reset editing state after update
    } else {
      // Add new weather entry
      setWeatherEntries([...weatherEntries, newData]);
    }
  };

  const handleEditWeather = (entry) => {
    setEditingWeather(entry); // Set the entry to edit
  };

  const handleDeleteWeather = (index) => {
    const updatedEntries = weatherEntries.filter((_, i) => i !== index);
    setWeatherEntries(updatedEntries);
  };

  return (
    <div className="app-container">
      <h1>Weather Forecast</h1>
      <WeatherForm weatherData={editingWeather} onSubmit={handleAddWeather} />
      <WeatherTable data={weatherEntries} onEdit={handleEditWeather} onDelete={handleDeleteWeather} />
    </div>
  );
};

export default App;
