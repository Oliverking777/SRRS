import React, { useState, useEffect } from "react";
import "./Geo_distri.css";

const Geo_distri = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRegions, setFilteredRegions] = useState([]);

  // Sample data for Yaoundé neighborhoods
  const yaoundeNeighborhoods = [
    { id: "bastos", name: "Bastos", reports: 124, position: { top: "30%", left: "45%" } },
    { id: "mvog-mbi", name: "Mvog-Mbi", reports: 98, position: { top: "55%", left: "60%" } },
    { id: "biyem-assi", name: "Biyem-Assi", reports: 156, position: { top: "65%", left: "35%" } },
    { id: "mfoundassi", name: "Mfoundassi", reports: 87, position: { top: "45%", left: "45%" } },
    { id: "ngoa-ekelle", name: "Ngoa-Ekelle", reports: 112, position: { top: "55%", left: "42%" } },
    { id: "omnisport", name: "Omnisport", reports: 65, position: { top: "40%", left: "65%" } },
    { id: "mvan", name: "Mvan", reports: 42, position: { top: "75%", left: "50%" } },
    { id: "mimboman", name: "Mimboman", reports: 78, position: { top: "40%", left: "75%" } },
    { id: "mfoundi", name: "Mfoundi", reports: 93, position: { top: "50%", left: "50%" } },
    { id: "ekounou", name: "Ekounou", reports: 59, position: { top: "55%", left: "70%" } },
    { id: "tsinga", name: "Tsinga", reports: 73, position: { top: "30%", left: "40%" } },
    { id: "mendong", name: "Mendong", reports: 89, position: { top: "70%", left: "25%" } },
    { id: "ahala", name: "Ahala", reports: 45, position: { top: "80%", left: "42%" } },
    { id: "emana", name: "Emana", reports: 62, position: { top: "20%", left: "55%" } },
    { id: "nkolbisson", name: "Nkolbisson", reports: 39, position: { top: "35%", left: "20%" } }
  ];

  useEffect(() => {
    setFilteredRegions(
      yaoundeNeighborhoods.filter(region => 
        region.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Function to determine marker color based on report count
  const getMarkerColor = (reports) => {
    if (reports >= 120) return "#e2492d";
    if (reports >= 90) return "#ff5533";
    if (reports >= 70) return "#ff8a75";
    if (reports >= 50) return "#ffad9f";
    return "#ffcec5";
  };

  // Function to determine marker size based on report count
  const getMarkerSize = (reports) => {
    const baseSize = 20;
    const factor = reports / 40;
    return Math.max(baseSize, baseSize * factor);
  };

  // Handle region selection
  const handleRegionClick = (region) => {
    setSelectedRegion(region.id === selectedRegion ? null : region.id);
  };

  return (
    <div className="geo-distribution-container">
      <div className="geo-header">
        <h1>Geographical Distribution - Yaoundé</h1>
        <p>Distribution of reports across neighborhoods in Yaoundé</p>
      </div>

      <div className="map-controls">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search for a neighborhood..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="map-legend">
          <h3>Reports</h3>
          <div className="legend-scale">
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#ffcec5" }}></div>
                <span>0-50</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#ffad9f" }}></div>
                <span>50-70</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#ff8a75" }}></div>
                <span>70-90</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#ff5533" }}></div>
                <span>90-120</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#e2492d" }}></div>
                <span>120+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="map-container">
        {/* Map background */}
        <div className="map-background">
          <img src="/api/placeholder/800/600" alt="Yaoundé Map" className="map-image" />
          <div className="map-overlay">
            <h2 className="map-title">Yaoundé</h2>
            {yaoundeNeighborhoods.map((region) => {
              const isFiltered = filteredRegions.find(r => r.id === region.id);
              const isSelected = selectedRegion === region.id;
              const size = isSelected ? getMarkerSize(region.reports) * 1.3 : getMarkerSize(region.reports);
              
              return isFiltered ? (
                <div 
                  key={region.id}
                  className={`map-marker ${isSelected ? 'selected' : ''}`}
                  style={{
                    top: region.position.top,
                    left: region.position.left,
                    backgroundColor: getMarkerColor(region.reports),
                    width: `${size}px`,
                    height: `${size}px`
                  }}
                  onClick={() => handleRegionClick(region)}
                  title={`${region.name}: ${region.reports} reports`}
                >
                  <span className="marker-label">{region.name}</span>
                  {isSelected && <span className="marker-count">{region.reports}</span>}
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Region details */}
        <div className="region-details">
          {selectedRegion && (
            <div className="selected-region-details">
              {(() => {
                const region = yaoundeNeighborhoods.find(r => r.id === selectedRegion);
                return (
                  <>
                    <h2>{region.name}</h2>
                    <div className="details-grid">
                      <div className="detail-item">
                        <h3>Total Reports</h3>
                        <p>{region.reports}</p>
                      </div>
                      <div className="detail-item">
                        <h3>Percentage of Total</h3>
                        <p>
                          {(
                            (region.reports / yaoundeNeighborhoods.reduce((sum, n) => sum + n.reports, 0)) * 100
                          ).toFixed(1)}%
                        </p>
                      </div>
                      <div className="detail-item">
                        <h3>Status</h3>
                        <p>
                          {region.reports > 100 ? "High Activity" : 
                           region.reports > 50 ? "Moderate Activity" : "Low Activity"}
                        </p>
                      </div>
                      <div className="detail-item">
                        <h3>Trend</h3>
                        <p>+8% from previous month</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
          {!selectedRegion && (
            <div className="summary-stats">
              <h2>Summary Statistics</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Reports</h3>
                  <p>{yaoundeNeighborhoods.reduce((sum, item) => sum + item.reports, 0)}</p>
                </div>
                <div className="stat-card">
                  <h3>Neighborhoods</h3>
                  <p>{yaoundeNeighborhoods.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Highest Reports</h3>
                  <p>
                    {yaoundeNeighborhoods.reduce((max, item) => item.reports > max.reports ? item : max, yaoundeNeighborhoods[0]).name} 
                    ({yaoundeNeighborhoods.reduce((max, item) => item.reports > max.reports ? item : max, yaoundeNeighborhoods[0]).reports})
                  </p>
                </div>
                <div className="stat-card">
                  <h3>Average per Area</h3>
                  <p>
                    {(yaoundeNeighborhoods.reduce((sum, item) => sum + item.reports, 0) / yaoundeNeighborhoods.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="neighborhood-list">
        <h2>All Neighborhoods</h2>
        <div className="list-container">
          {filteredRegions.map(region => (
            <div 
              key={region.id} 
              className={`list-item ${selectedRegion === region.id ? 'selected' : ''}`}
              onClick={() => handleRegionClick(region)}
            >
              <div className="list-item-color" style={{ backgroundColor: getMarkerColor(region.reports) }}></div>
              <div className="list-item-details">
                <h3>{region.name}</h3>
                <p>{region.reports} reports</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Geo_distri;