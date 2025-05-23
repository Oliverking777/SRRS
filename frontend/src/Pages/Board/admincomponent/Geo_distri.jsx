import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Geo_distri.css';

import { useData } from '../../../Components/Contextprovider/ContextProvider';

// IMPORTANT: Replace with your actual Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGluZmVoNzc3NyIsImEiOiJjbWF3cXNxdTgwaWFtMmxvc2E3dng5OTJ6In0.wUnDqWyBUZXXuQe4oEKdQA';

const Geo_distri = () => {
  const { reports, reportStats } = useData();
  const [locationData, setLocationData] = useState([]);
  const [stats, setStats] = useState({
    totalCount: 0,
    highDensity: 0,
    mediumDensity: 0,
    lowDensity: 0
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  // Process reports to generate location-based data for the last 30 days
  useEffect(() => {
    if (!reports || reports.length === 0) return;

    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

      // Group reports by location, counting only those from the last 30 days
      const locationCounts = {};
      reports.forEach(report => {
        const reportDate = new Date(report.date);
        if (reportDate >= oneMonthAgo && report.location) {
          if (!locationCounts[report.location]) {
            locationCounts[report.location] = {
              name: report.location,
              count: 0,
              reports: []
            };
          }
          locationCounts[report.location].count += 1;
          locationCounts[report.location].reports.push(report);
        }
      });

      // Convert to array and assign density levels based on count
      const locationsArray = Object.values(locationCounts).map(location => {
        let density;
        if (location.count >= 20) {
          density = "High";
        } else if (location.count >= 10) {
          density = "Medium";
        } else {
          density = "Low";
        }

        return {
          id: location.name.replace(/\s+/g, '-').toLowerCase(),
          name: location.name,
          count: location.count,
          density: density,
          reports: location.reports
        };
      });

      setLocationData(locationsArray);

      // Calculate density stats
      const newStats = {
        totalCount: reportStats?.total || 0,
        highDensity: locationsArray.filter(d => d.density === "High").length,
        mediumDensity: locationsArray.filter(d => d.density === "Medium").length,
        lowDensity: locationsArray.filter(d => d.density === "Low").length
      };

      setStats(newStats);
    } catch (error) {
      console.error("Error processing location data:", error);
    }
  }, [reports, reportStats]);

  // Keep this function for backwards compatibility
  const getApproximateCoordinates = (locationName) => {
    // Predefined coordinates for known locations
    const locationMap = {
      "North Region": [3.966667, 11.616667],
      "South Region": [3.766667, 11.516667],
      "East Region": [3.866667, 11.616667],
      "West Region": [3.866667, 11.416667],
      "Central Area": [3.866667, 11.516667],
      "East Area": [3.8600704, 11.5212288]
    };

    // Return known coordinates or null if not found
    return locationMap[locationName] || null;
  };

  // Function to get coordinates for a location from geocoding service
  const getLocationCoordinates = async (locationName) => {
    try {
      // First check if we have cached coordinates for this location
      const cachedCoordinates = getApproximateCoordinates(locationName);
      if (cachedCoordinates) return cachedCoordinates;
      
      // If we don't have cached coordinates, default to center of Yaoundé
      return [3.866667, 11.516667]; // Default to Yaoundé center
    } catch (error) {
      console.error(`Error getting coordinates for ${locationName}:`, error);
      return [3.866667, 11.516667]; // Default to Yaoundé center
    }
  };

  // Fetch coordinates for each location
  useEffect(() => {
    if (!locationData || locationData.length === 0) return;

    const fetchCoordinates = async () => {
      const updatedLocationData = [];
      
      for (const location of locationData) {
        const coordinates = await getLocationCoordinates(location.name);
        updatedLocationData.push({
          ...location,
          coordinates
        });
      }
      
      setLocationData(updatedLocationData);
    };
    
    fetchCoordinates();
  }, []);

  // Get marker color based on density
  const getMarkerColor = (density) => {
    switch(density) {
      case "High":
        return "#ef342f "; 
      case "Medium":
        return "#f4b420 "; 
      case "Low":
        return "#40c861 "; 
      default:
        return "#cce6ff"; 
    }
  };

  useEffect(() => {
    if (!mapboxgl.supported()) {
      console.error('Your browser does not support Mapbox GL');
      return;
    }

    if (map.current) return; 

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [11.516667, 3.866667],
        zoom: 10,
        minZoom: 9,
        maxZoom: 15
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        map.current.resize();
        setMapInitialized(true);
      });

      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, []);

  useEffect(() => {
    if (!map.current || !mapInitialized || !locationData?.length) return;

    try {
      // Remove previous markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add markers for each location
      locationData.forEach(async (location) => {
        if (!location.coordinates) {
          const coordinates = await getLocationCoordinates(location.name);
          location.coordinates = coordinates;
        }
        
        if (!location.coordinates || location.coordinates.length !== 2) {
          console.error(`Invalid coordinates for location: ${location.name}`, location.coordinates);
          return;
        }

        // Calculate marker size based on count (increased size range from 30 to 80)
        const size = Math.min(Math.max(location.count / 3, 30), 80);

        // Create marker element
        const el = document.createElement('div');
        el.className = 'location-marker';
        el.style.backgroundColor = getMarkerColor(location.density);
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '50%'; // Make markers circular
        
        // Add location name as a label
        const label = document.createElement('div');
        label.className = 'marker-label';
        label.textContent = location.name;
        el.appendChild(label);

        // Create and add the marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([location.coordinates[1], location.coordinates[0]]) // Mapbox uses [lng, lat]
          .setPopup(
            new mapboxgl.Popup({ offset: size * 0.7 }).setHTML(`
              <div class="location-popup">
                <h3>${location.name}</h3>
                <p>Reports: ${location.count}</p>
                <p>Density: ${location.density}</p>
              </div>
            `)
          )
          .addTo(map.current);

        markersRef.current.push(marker);

        // Add click event to marker
        el.onclick = () => {
          setSelectedLocation(location);
        };
      });
    } catch (error) {
      console.error("Error adding markers:", error);
    }
  }, [locationData, mapInitialized]);

  useEffect(() => {
    if (selectedLocation && map.current && mapInitialized) {
      try {
        map.current.flyTo({
          center: [selectedLocation.coordinates[1], selectedLocation.coordinates[0]],
          zoom: 14,
          essential: true
        });
      } catch (error) {
        console.error("Error flying to location:", error);
      }
    }
  }, [selectedLocation, mapInitialized]);

  return (
    <div className="geo-distribution-container">
      <div className="geo-header">
        <h2>Geographical Distribution - Yaoundé</h2>
        <div className="geo-stats">
          <div className="stat-card">
            <span className="stat-value">{stats.totalCount.toLocaleString()}</span>
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
          <span className="legend-color" style={{backgroundColor: "#ef342f", borderRadius: "50%"}}></span>
          <span>High Density (≥20 reports)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{backgroundColor: "#f4b420", borderRadius: "50%"}}></span>
          <span>Medium Density (10–19 reports)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{backgroundColor: "#40c861", borderRadius: "50%"}}></span>
          <span>Low Density (0-9 reports)</span>
        </div>
      </div>

      <div className="geo-map-container" ref={mapContainer}>
        {!mapInitialized && <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5'
        }}>Loading map...</div>}
      </div>

      <div className="geo-district-list">
        <h3>Location Details</h3>
        <div className="location-list-container">
          {locationData && locationData.length > 0 ? (
            locationData.map(location => (
              <div
                key={location.id}
                className={`location-item ${selectedLocation && selectedLocation.id === location.id ? 'selected' : ''}`}
                onClick={() => setSelectedLocation(location)}
              >
                <div className="location-name">
                  <div
                    className="location-indicator"
                    style={{backgroundColor: getMarkerColor(location.density), borderRadius: "50%"}}
                  ></div>
                  <span>{location.name}</span>
                </div>
                <div className="location-count">{location.count} reports</div>
              </div>
            ))
          ) : (
            <div>No location data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Geo_distri;