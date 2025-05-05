import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Geo_distri.css';

const Geo_distri = () => {
  // Sample data for Yaoundé neighborhoods with distribution metrics
  // In a real application, this would come from your API or database
  const [districtsData, setDistrictsData] = useState([
    { 
      id: 1, 
      name: "Yaoundé 1 (Centre)", 
      coordinates: [3.866667, 11.516667], 
      count: 245, 
      density: "High"
    },
    { 
      id: 8, 
      name: "Ngousso (Centre)", 
      coordinates: [4.866667, 8.516667], 
      count: 500, 
      density: "High"
    },
    { 
      id: 2, 
      name: "Yaoundé 2 (Tsinga)", 
      coordinates: [3.883333, 11.500000], 
      count: 187, 
      density: "Medium"
    },
    { 
      id: 3, 
      name: "Yaoundé 3 (Efoulan)", 
      coordinates: [3.833333, 11.483333], 
      count: 213, 
      density: "High" 
    },
    { 
      id: 4, 
      name: "Yaoundé 4 (Kondengui)", 
      coordinates: [3.850000, 11.533333], 
      count: 156, 
      density: "Medium" 
    },
    { 
      id: 5, 
      name: "Yaoundé 5 (Essos)", 
      coordinates: [3.883333, 11.533333], 
      count: 178, 
      density: "Medium" 
    },
    { 
      id: 6, 
      name: "Yaoundé 6 (Biyem-Assi)", 
      coordinates: [3.816667, 11.483333], 
      count: 267, 
      density: "High" 
    },
    { 
      id: 7, 
      name: "Yaoundé 7 (Nkolbisson)", 
      coordinates: [3.866667, 11.450000], 
      count: 132, 
      density: "Low" 
    }
  ]);

  // Stats summary
  const [stats, setStats] = useState({
    totalCount: 0,
    highDensity: 0,
    mediumDensity: 0,
    lowDensity: 0
  });

  // Calculate summary stats when district data changes
  useEffect(() => {
    const newStats = {
      totalCount: districtsData.reduce((sum, district) => sum + district.count, 0),
      highDensity: districtsData.filter(d => d.density === "High").length,
      mediumDensity: districtsData.filter(d => d.density === "Medium").length,
      lowDensity: districtsData.filter(d => d.density === "Low").length
    };
    setStats(newStats);
  }, [districtsData]);

  // Get circle color based on density
  const getMarkerColor = (density) => {
    switch(density) {
      case "High":
        return "#ff5252"; // Red
      case "Medium":
        return "#ffb142"; // Orange
      case "Low":
        return "#33d9b2"; // Green
      default:
        return "#34ace0"; // Blue
    }
  };

  // Get circle size based on count
  const getMarkerSize = (count) => {
    return Math.min(Math.max(count / 10, 10), 30);
  };

  return (
    <div className="geo-distribution-container">
      <div className="geo-header">
        <h2>Geographical Distribution - Yaoundé</h2>
        <div className="geo-stats">
          <div className="stat-card">
            <span className="stat-value">{stats.totalCount}</span>
            <span className="stat-label">Total Reports</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.highDensity}</span>
            <span className="stat-label">High Density Areas</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.mediumDensity}</span>
            <span className="stat-label">Medium Density Areas</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.lowDensity}</span>
            <span className="stat-label">Low Density Areas</span>
          </div>
        </div>
      </div>

      <div className="geo-map-legend">
        <div className="legend-item">
          <span className="legend-color" style={{backgroundColor: "#ff5252"}}></span>
          <span>High Density</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{backgroundColor: "#ffb142"}}></span>
          <span>Medium Density</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{backgroundColor: "#33d9b2"}}></span>
          <span>Low Density</span>
        </div>
      </div>

      <div className="geo-map-container">
        <MapContainer 
          center={[3.866667, 11.516667]} 
          zoom={12} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {districtsData.map(district => (
            <CircleMarker
              key={district.id}
              center={district.coordinates}
              radius={getMarkerSize(district.count)}
              fillColor={getMarkerColor(district.density)}
              color="#fff"
              weight={1}
              fillOpacity={0.8}
            >
              <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent>
                {district.name}
              </Tooltip>
              <Popup>
                <div className="district-popup">
                  <h3>{district.name}</h3>
                  <p>Reports: {district.count}</p>
                  <p>Density: {district.density}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="geo-district-list">
        <h3>District Details</h3>
        <div className="district-list-container">
          {districtsData.map(district => (
            <div key={district.id} className="district-item">
              <div className="district-name">
                <div 
                  className="district-indicator" 
                  style={{backgroundColor: getMarkerColor(district.density)}}
                ></div>
                <span>{district.name}</span>
              </div>
              <div className="district-count">{district.count} reports</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Geo_distri;