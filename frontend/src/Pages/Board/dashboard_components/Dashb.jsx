import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useData } from "../../../Components/Contextprovider/ContextProvider";
import "./Dashb.css";

// Mapbox token
mapboxgl.accessToken =
  "pk.eyJ1IjoidGluZmVoNzc3NyIsImEiOiJjbWF3cXNxdTgwaWFtMmxvc2E3dng5OTJ6In0.wUnDqWyBUZXXuQe4oEKdQA";

const Dashb = ({ onNavigate }) => {
  const { reportStats, recentReports = [] } = useData();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    // Create new map instance
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [11.516667, 3.866667], // Yaoundé center
      zoom: 12,
    });

    map.current = mapInstance;

    // Add navigation control
    mapInstance.addControl(new mapboxgl.NavigationControl());

    // Function to add markers
    const addMarkers = () => {
      // Clear existing markers
      markersRef.current.forEach((marker) => {
        if (marker && typeof marker.remove === "function") {
          marker.remove();
        }
      });
      markersRef.current = [];

      // Add new markers
      recentReports.forEach((report) => {
        if (report.location) {
          const coordinates = getCoordinatesForLocation(report.location);
          const el = document.createElement("div");
          el.className = `marker ${report.severity?.toLowerCase() || "normal"}`;

          const marker = new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div class="report-popup">
                  <h3>${report.title || "Report"}</h3>
                  <p><strong>Location:</strong> ${report.location}</p>
                  <p><strong>Severity:</strong> ${report.severity || "N/A"}</p>
                  <p><strong>Status:</strong> ${report.status || "N/A"}</p>
                  <p><strong>Date:</strong> ${report.date || "N/A"}</p>
                </div>
              `)
            )
            .addTo(mapInstance);

          markersRef.current.push(marker);
        }
      });
    };

    // Add markers when map loads
    mapInstance.on("load", addMarkers);

    // Cleanup function
    return () => {
      const currentMarkers = [...markersRef.current];
      currentMarkers.forEach((marker) => {
        if (marker && typeof marker.remove === "function") {
          marker.remove();
        }
      });
      markersRef.current = [];

      if (mapInstance && !mapInstance._removed) {
        mapInstance.remove();
      }
    };
  }, [recentReports]); // Only re-run when reports change

  // Helper function to get coordinates for a location
  const getCoordinatesForLocation = (location) => {
    const locationMap = {
      "Yaounde 1": [11.5199, 3.8942],
      "Yaounde 2": [11.5297, 3.8684],
      "Yaounde 3": [11.5013, 3.8544],
      "Yaounde 4": [11.5107, 3.8857],
      "Yaounde 5": [11.4897, 3.8719],
      "Yaounde 6": [11.4977, 3.823],
      "Yaounde 7": [11.5392, 3.9271],
    };
    return locationMap[location] || [11.516667, 3.866667]; // Default to Yaoundé center
  };

  return (
    <>
      <div className="dashboard-header">
        <div className="dashboard-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <h1>Dashboard</h1>
        </div>
        <p>Track and manage health-related reports in your area.</p>
        <button
          className="new-report-btn"
          onClick={() => onNavigate("newReport")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          New Report
        </button>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Reports</h3>
            <p>All submitted reports</p>
            <div className="stat-number">
              {reportStats.total.toLocaleString()}
            </div>
          </div>
          <div className="progress-bar blue">
            <div
              className="progress"
              style={{
                width: `${Math.min((reportStats.total / 200) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Critical Reports</h3>
            <p>Reports requiring immediate attention</p>
            <div className="stat-number">
              {reportStats.critical.toLocaleString()}
            </div>
          </div>
          <div className="progress-bar red">
            <div
              className="progress"
              style={{
                width: `${Math.min((reportStats.critical / 20) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>New Reports Today</h3>
            <p>Reports submitted in the last 24 hours</p>
            <div className="stat-number">
              {reportStats.new.toLocaleString()}
            </div>
          </div>
          <div className="progress-bar blue">
            <div
              className="progress"
              style={{
                width: `${Math.min((reportStats.new / 10) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Resolved Reports</h3>
            <p>Reports marked as resolved</p>
            <div className="stat-number">
              {reportStats.resolved.toLocaleString()}
            </div>
          </div>
          <div className="progress-bar green">
            <div
              className="progress"
              style={{
                width: `${Math.min((reportStats.resolved / 200) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="recent-reports">
        <h2>Recent Reports</h2>
        <p>List of recently submitted reports</p>

        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.title}</td>
                <td>
                  <span
                    className={`status-badge ${report.status.toLowerCase()}`}
                  >
                    {report.status}
                  </span>
                </td>
                <td>{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="map-container" ref={mapContainer}></div>
    </>
  );
};

export default Dashb;
