import React from 'react';

const WeatherTable = ({ data, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>Country</th>
          <th>Date</th>
          <th>Weather</th>
          <th>Description</th>
          <th>Temperature</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>{entry.city}</td>
            <td>{entry.country}</td>
            <td>{entry.date}</td>
            <td>{entry.weather}</td>
            <td>{entry.description}</td>
            <td>{entry.temperature}°C</td>
            <td>
              <button onClick={() => onEdit(entry)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeatherTable;
