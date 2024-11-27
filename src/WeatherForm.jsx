import React, { useState, useEffect } from 'react';
import "./WeatherForm.css"

const WeatherForm = ({ weatherData, onSubmit }) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [description, setDescription] = useState('');
  const [temperature, setTemperature] = useState('');
  const [error, setError] = useState('');

  // Fetch weather from OpenWeather API
  const apiKey = 'd595807af4903c201e15236de912fd0b';

  const fetchWeatherData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.cod === 200) {
        // Set weather data
        setWeather(data.weather[0].main);
        setDescription(data.weather[0].description);
        setTemperature(data.main.temp);
        setCountry(data.sys.country);

        // Convert API date (dt) to a human-readable format (YYYY-MM-DD)
        const apiDate = new Date(data.dt * 1000); // Convert from UNIX timestamp to Date
        const formattedDate = apiDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        setDate(formattedDate);

        setError('');
      } else {
        setError('City not found');
      }
    } catch (error) {
      setError('Error fetching weather data');
    }
  };

  useEffect(() => {
    if (city && !weatherData) {
      fetchWeatherData(city); // Fetch weather if a new city is entered
    }

    // If weatherData is passed (editing an existing entry), populate the fields
    if (weatherData) {
      setCity(weatherData.city);
      setCountry(weatherData.country);
      setDate(weatherData.date); // Use the passed date if editing
      setWeather(weatherData.weather);
      setDescription(weatherData.description);
      setTemperature(weatherData.temperature);
    }
  }, [city, weatherData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { city, country, date, weather, description, temperature };
    onSubmit(newData); // Pass the data back to App component
    setCity('');
    setCountry('');
    setDate('');
    setWeather('');
    setDescription('');
    setTemperature('');
  };

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      {error && <p className="error">{error}</p>}
      {temperature && <p>Temperature: {temperature}°C</p>}
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Weather"
        value={weather}
        onChange={(e) => setWeather(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">{weatherData ? 'Update' : 'Add'} Weather</button>
    </form>
  );
};

export default WeatherForm;
