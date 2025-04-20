import React, { useState } from "react";
import { Search, Filter, MoreHorizontal, MapPin, Calendar } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";

// Add CSS styles
const styles = {
  container: {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  content: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: "24px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "4px",
  },
  subheading: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
  },
  tabs: {
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "24px",
    display: "flex",
  },
  tabButton: {
    background: "none",
    border: "none",
    fontSize: "14px",
    padding: "12px 20px",
    marginRight: "10px",
    cursor: "pointer",
  },
  activeTab: {
    borderBottom: "2px solid #3b82f6",
    fontWeight: "600",
    color: "#3b82f6",
  },
  inactiveTab: {
    fontWeight: "400",
    color: "#6b7280",
  },
  statCardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    flexGrow: "1",
    flexBasis: "0",
    minWidth: "240px",
  },
  statCardTitle: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#4b5563",
    marginBottom: "4px",
  },
  statCardCount: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "4px",
  },
  statCardDescription: {
    fontSize: "12px",
    color: "#6b7280",
  },
  reportsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  reportsHeader: {
    marginBottom: "16px",
  },
  reportsTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "4px",
  },
  reportsSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
  },
  searchFilterContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    marginBottom: "24px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  searchContainer: {
    position: "relative",
    flexGrow: "1",
  },
  searchInput: {
    width: "100%",
    padding: "10px 12px 10px 40px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
  },
  filterContainer: {
    display: "flex",
    gap: "8px",
  },
  filterButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#374151",
    fontSize: "14px",
    cursor: "pointer",
  },
  filterIcon: {
    color: "#6b7280",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
  },
  tableHeader: {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#6b7280",
    borderBottom: "1px solid #e5e7eb",
  },
  tableRow: {
    borderBottom: "1px solid #f3f4f6",
    "&:hover": {
      backgroundColor: "#f9fafb",
    },
  },
  tableCell: {
    padding: "16px",
    fontSize: "14px",
    color: "#374151",
  },
  typeCell: {
    display: "flex",
    alignItems: "center",
  },
  pulseIcon: {
    marginRight: "8px",
    color: "#3b82f6",
  },
  reportedByCell: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#e5e7eb",
    marginRight: "12px",
  },
  nameEmail: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontWeight: "500",
    color: "#374151",
  },
  email: {
    fontSize: "12px",
    color: "#6b7280",
  },
  locationCell: {
    display: "flex",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: "4px",
    color: "#9ca3af",
  },
  dateCell: {
    display: "flex",
    alignItems: "center",
  },
  dateIcon: {
    marginRight: "4px",
    color: "#9ca3af",
  },
  severityBadge: {
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "500",
  },
  severityMild: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
  },
  severityModerate: {
    backgroundColor: "#ffedd5",
    color: "#ea580c",
  },
  severitySevere: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "500",
  },
  statusActive: {
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    border: "1px solid #bfdbfe",
  },
  statusResolved: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
  },
  statusVerified: {
    backgroundColor: "#22c55e",
    color: "#ffffff",
  },
  statusFlagged: {
    backgroundColor: "#ffedd5",
    color: "#ea580c",
    border: "1px solid #fed7aa",
  },
  actionButton: {
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    fontSize: "14px",
    color: "#6b7280",
  },
  footerButtons: {
    display: "flex",
    gap: "12px",
  },
  footerButton: {
    padding: "8px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    color: "#374151",
    fontSize: "14px",
    cursor: "pointer",
  },
};

const Adminreport = () => {
  const [activeTab, setActiveTab] = useState("report_list");
  //report area
  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Respiratory Infection",
      reportedBy: "Olivia Martin",
      email: "olivia.martin@example.com",
      location: "North Region",
      date: "July 6, 2025",
      severity: "Moderate",
      status: "Active",
    },
    {
      id: 2,
      type: "Gastrointestinal Illness",
      reportedBy: "Jackson Lee",
      email: "jackson.lee@example.com",
      location: "East Region",
      date: "July 5, 2025",
      severity: "Mild",
      status: "Active",
    },
    {
      id: 3,
      type: "Viral Infection",
      reportedBy: "Isabella Nguyen",
      email: "isabella.nguyen@example.com",
      location: "South Region",
      date: "July 4, 2025",
      severity: "Severe",
      status: "Verified",
    },
    {
      id: 4,
      type: "Allergic Reaction",
      reportedBy: "William Chen",
      email: "william.chen@example.com",
      location: "West Region",
      date: "July 3, 2025",
      severity: "Moderate",
      status: "Resolved",
    },
    {
      id: 5,
      type: "Bacterial Infection",
      reportedBy: "Sofia Rodriguez",
      email: "sofia.rodriguez@example.com",
      location: "Central Area",
      date: "July 2, 2025",
      severity: "Severe",
      status: "Active",
    },
    {
      id: 6,
      type: "Food Poisoning",
      reportedBy: "Ethan Johnson",
      email: "ethan.johnson@example.com",
      location: "North Region",
      date: "July 1, 2025",
      severity: "Moderate",
      status: "Resolved",
    },
    {
      id: 7,
      type: "Respiratory Infection",
      reportedBy: "Mia Williams",
      email: "mia.williams@example.com",
      location: "East Region",
      date: "June 30, 2025",
      severity: "Mild",
      status: "Flagged",
    },
  ]);
  //end report

  //analytics
  const trendData = [
    { date: "Jun 1", newReports: 23, resolvedCases: 15 },
    { date: "Jun 8", newReports: 28, resolvedCases: 22 },
    { date: "Jun 15", newReports: 35, resolvedCases: 25 },
    { date: "Jun 22", newReports: 42, resolvedCases: 30 },
    { date: "Jun 29", newReports: 38, resolvedCases: 32 },
    { date: "Jul 6", newReports: 50, resolvedCases: 35 },
  ];

  // Data for region comparison chart
  const regionData = [
    { region: "North", active: 45, resolved: 30 },
    { region: "South", active: 30, resolved: 20 },
    { region: "East", active: 25, resolved: 15 },
    { region: "West", active: 20, resolved: 10 },
    { region: "Central", active: 15, resolved: 5 },
  ];

  // Severity distribution data
  const severityData = [
    {
      region: "North Region",
      mild: 421,
      moderate: 238,
      severe: 87,
      critical: 12,
      total: 758,
    },
    {
      region: "South Region",
      mild: 356,
      moderate: 185,
      severe: 62,
      critical: 8,
      total: 611,
    },
    {
      region: "East Region",
      mild: 312,
      moderate: 165,
      severe: 54,
      critical: 5,
      total: 536,
    },
    {
      region: "West Region",
      mild: 287,
      moderate: 142,
      severe: 42,
      critical: 3,
      total: 474,
    },
    {
      region: "Central Area",
      mild: 264,
      moderate: 128,
      severe: 35,
      critical: 2,
      total: 429,
    },
  ];

  // Calculate totals for severity data
  const totalMild = severityData.reduce((sum, region) => sum + region.mild, 0);
  const totalModerate = severityData.reduce(
    (sum, region) => sum + region.moderate,
    0
  );
  const totalSevere = severityData.reduce(
    (sum, region) => sum + region.severe,
    0
  );
  const totalCritical = severityData.reduce(
    (sum, region) => sum + region.critical,
    0
  );
  const grandTotal = severityData.reduce(
    (sum, region) => sum + region.total,
    0
  );

  // Data for illness type pie chart
  const illnessData = [
    { name: "Respiratory", value: 62, color: "#4263EB" },
    { name: "Gastrointestinal", value: 19, color: "#4DABF7" },
    { name: "Viral", value: 10, color: "#5F3DC4" },
    { name: "Allergic", value: 5, color: "#FA5252" },
    { name: "Other", value: 5, color: "#7950F2" },
  ];

  // Simple SVG pie chart component
  const PieChart = ({ data, size = 200 }) => {
    let currentAngle = 0;
    const radius = size / 2;
    const centerX = radius;
    const centerY = radius;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((item, index) => {
          // Convert percentage to angle
          const angle = (item.value / 100) * 360;

          // Calculate arc path
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;

          // Convert angles to radians for calculations
          const startAngleRad = (startAngle - 90) * (Math.PI / 180);
          const endAngleRad = (endAngle - 90) * (Math.PI / 180);

          // Calculate points
          const x1 = centerX + radius * Math.cos(startAngleRad);
          const y1 = centerY + radius * Math.sin(startAngleRad);
          const x2 = centerX + radius * Math.cos(endAngleRad);
          const y2 = centerY + radius * Math.sin(endAngleRad);

          // Generate arc path
          const largeArcFlag = angle > 180 ? 1 : 0;
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z",
          ].join(" ");

          // Update current angle for next slice
          currentAngle = endAngle;

          return <path key={index} d={pathData} fill={item.color} />;
        })}
      </svg>
    );
  };
  //end analytics

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "Mild":
        return { ...styles.severityBadge, ...styles.severityMild };
      case "Moderate":
        return { ...styles.severityBadge, ...styles.severityModerate };
      case "Severe":
        return { ...styles.severityBadge, ...styles.severitySevere };
      default:
        return styles.severityBadge;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return { ...styles.statusBadge, ...styles.statusActive };
      case "Resolved":
        return { ...styles.statusBadge, ...styles.statusResolved };
      case "Verified":
        return { ...styles.statusBadge, ...styles.statusVerified };
      case "Flagged":
        return { ...styles.statusBadge, ...styles.statusFlagged };
      default:
        return styles.statusBadge;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Reports Management</h1>
        <p style={styles.subheading}>
          View, verify, and manage sickness reports from all users in the
          system.
        </p>
        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "report_list"
                ? styles.activeTab
                : styles.inactiveTab),
            }}
            onClick={() => setActiveTab("report_list")}
          >
            Report List
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "analytics"
                ? styles.activeTab
                : styles.inactiveTab),
            }}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </div>
        {activeTab === "report_list" ? (
          <>
            <div style={styles.statCardsContainer}>
              <StatCard
                title="Total Reports"
                count="16,532"
                description="All time"
              />
              <StatCard
                title="Active Cases"
                count="2,841"
                description="Currently being tracked"
              />
              <StatCard
                title="Flagged Reports"
                count="147"
                description="Require review"
              />
              <StatCard
                title="Recent Submissions"
                count="432"
                description="In the last 7 days"
              />
            </div>

            <div style={styles.reportsContainer}>
              <div style={styles.reportsHeader}>
                <h2 style={styles.reportsTitle}>Sickness Reports</h2>
                <p style={styles.reportsSubtitle}>
                  Review and manage all submitted reports in the system
                </p>
              </div>

              <div style={styles.searchFilterContainer}>
                <div style={styles.searchContainer}>
                  <Search size={18} style={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    style={styles.searchInput}
                  />
                </div>
                <div style={styles.filterContainer}>
                  <FilterButton label="Type" />
                  <FilterButton label="Status" />
                  <FilterButton label="Severity" />
                </div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Type</th>
                      <th style={styles.tableHeader}>Reported By</th>
                      <th style={styles.tableHeader}>Location</th>
                      <th style={styles.tableHeader}>Date</th>
                      <th style={styles.tableHeader}>Severity</th>
                      <th style={styles.tableHeader}>Status</th>
                      <th style={styles.tableHeader}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>
                          <div style={styles.typeCell}>
                            <PulseIcon style={styles.pulseIcon} />
                            <span style={{ fontWeight: 500 }}>
                              {report.type}
                            </span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.reportedByCell}>
                            <div style={styles.avatar}></div>
                            <div style={styles.nameEmail}>
                              <div style={styles.name}>{report.reportedBy}</div>
                              <div style={styles.email}>{report.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.locationCell}>
                            <MapPin size={16} style={styles.locationIcon} />
                            {report.location}
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.dateCell}>
                            <Calendar size={16} style={styles.dateIcon} />
                            {report.date}
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <span style={getSeverityStyle(report.severity)}>
                            {report.severity}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          <span style={getStatusStyle(report.status)}>
                            {report.status}
                          </span>
                        </td>
                        <td style={{ ...styles.tableCell, textAlign: "right" }}>
                          <button style={styles.actionButton}>
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={styles.footerContainer}>
                <div>Showing 7 of 7 reports</div>
                <div style={styles.footerButtons}>
                  <button style={styles.footerButton}>Export</button>
                  <button style={styles.footerButton}>Generate Analysis</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Analytics tab content would go here
          <>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f9fafb",
                minHeight: "100vh",
              }}
            >
              {/* Top metrics row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontWeight: "500",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Active Reports
                  </h3>
                  <p
                    style={{
                      fontSize: "30px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "4px",
                    }}
                  >
                    2,841
                  </p>
                  <p style={{ fontSize: "12px", color: "#6b7280" }}>
                    Across all regions
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontWeight: "500",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Verified Reports
                  </h3>
                  <p
                    style={{
                      fontSize: "30px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "4px",
                    }}
                  >
                    1,465
                  </p>
                  <p style={{ fontSize: "12px", color: "#6b7280" }}>
                    Confirmed by healthcare professionals
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontWeight: "500",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Resolution Rate
                  </h3>
                  <p
                    style={{
                      fontSize: "30px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "4px",
                    }}
                  >
                    78.3%
                  </p>
                  <p style={{ fontSize: "12px", color: "#6b7280" }}>
                    Average time: 8.2 days
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontWeight: "500",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Reporting Compliance
                  </h3>
                  <p
                    style={{
                      fontSize: "30px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "4px",
                    }}
                  >
                    92.6%
                  </p>
                  <p style={{ fontSize: "12px", color: "#6b7280" }}>
                    Of users submit complete reports
                  </p>
                </div>
              </div>

              {/* Middle row - charts */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3
                    style={{
                      color: "#111827",
                      fontSize: "20px",
                      fontWeight: "500",
                      marginBottom: "4px",
                    }}
                  >
                    Reports by Illness Type
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "16px",
                    }}
                  >
                    Distribution of reports by illness category
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "50%" }}>
                      <PieChart data={illnessData} size={220} />
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {illnessData.map((item, index) => (
                          <div
                            key={index}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              style={{
                                width: "16px",
                                height: "16px",
                                marginRight: "8px",
                                backgroundColor: item.color,
                              }}
                            ></div>
                            <span
                              style={{ color: "#374151", fontSize: "14px" }}
                            >
                              {item.name}: {item.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3
                    style={{
                      color: "#111827",
                      fontSize: "24px",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    Region Comparison
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "16px",
                    }}
                  >
                    Active vs. resolved reports by region
                  </p>

                  <div style={{ height: "250px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={regionData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis domain={[0, 60]} />
                        <Bar
                          dataKey="active"
                          name="Active"
                          fill="#4263EB"
                          barSize={20}
                        />
                        <Bar
                          dataKey="resolved"
                          name="Resolved"
                          fill="#4DABF7"
                          barSize={20}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: "#4263EB",
                          marginRight: "6px",
                        }}
                      ></div>
                      <span style={{ fontSize: "14px", color: "#374151" }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: "#4DABF7",
                          marginRight: "6px",
                        }}
                      ></div>
                      <span style={{ fontSize: "14px", color: "#374151" }}>
                        Resolved
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trend chart */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    color: "#111827",
                    fontSize: "20px",
                    fontWeight: "500",
                    marginBottom: "4px",
                  }}
                >
                  Report Trends
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "16px",
                  }}
                >
                  New reports vs. resolved cases over time
                </p>

                <div style={{ height: "250px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 60]} />
                      <Line
                        type="monotone"
                        dataKey="newReports"
                        stroke="#4263EB"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="New Reports"
                      />
                      <Line
                        type="monotone"
                        dataKey="resolvedCases"
                        stroke="#FA5252"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Resolved Cases"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Severity table */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <h3
                  style={{
                    color: "#111827",
                    fontSize: "20px",
                    fontWeight: "500",
                    marginBottom: "4px",
                  }}
                >
                  Severity Distribution Analysis
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "16px",
                  }}
                >
                  Breakdown of cases by severity level and region
                </p>

                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      minWidth: "100%",
                      borderCollapse: "separate",
                      borderSpacing: "0",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            padding: "12px 24px",
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#6b7280",
                            borderBottom: "1px solid #e5e7eb",
                          }}
                        >
                          Region
                        </th>
                        <th
                          style={{
                            padding: "12px 24px",
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#6b7280",
                            borderBottom: "1px solid #e5e7eb",
                          }}
                        >
                          Mild
                        </th>
                        <th
                          style={{
                            padding: "12px 24px",
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#6b7280",
                            borderBottom: "1px solid #e5e7eb",
                          }}
                        >
                          Moderate
                        </th>
                        <th
                          style={{
                            padding: "12px 24px",
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#6b7280",
                            borderBottom: "1px solid #e5e7eb",
                          }}
                        >
                          Severe
                        </th>
                        <th
                          style={{
                            padding: "12px 24px",
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#6b7280",
                            borderBottom: "1px solid #e5e7eb",
                          }}
                        >
                          Critical
                        </th>
                        <th
                          style={{
                            padding: "12px 24px",
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#6b7280",
                            borderBottom: "1px solid #e5e7eb",
                          }}
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {severityData.map((row, index) => (
                        <tr
                          key={index}
                          style={{ borderBottom: "1px solid #f3f4f6" }}
                        >
                          <td
                            style={{
                              padding: "16px 24px",
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#3b82f6",
                            }}
                          >
                            {row.region}
                          </td>
                          <td
                            style={{
                              padding: "16px 24px",
                              fontSize: "14px",
                              color: "#374151",
                            }}
                          >
                            {row.mild}
                          </td>
                          <td
                            style={{
                              padding: "16px 24px",
                              fontSize: "14px",
                              color: "#374151",
                            }}
                          >
                            {row.moderate}
                          </td>
                          <td
                            style={{
                              padding: "16px 24px",
                              fontSize: "14px",
                              color: "#374151",
                            }}
                          >
                            {row.severe}
                          </td>
                          <td
                            style={{
                              padding: "16px 24px",
                              fontSize: "14px",
                              color: "#374151",
                            }}
                          >
                            {row.critical}
                          </td>
                          <td
                            style={{
                              padding: "16px 24px",
                              fontSize: "14px",
                              color: "#374151",
                            }}
                          >
                            {row.total}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ backgroundColor: "#f9fafb" }}>
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#374151",
                          }}
                        >
                          Total
                        </td>
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: "14px",
                            color: "#374151",
                          }}
                        >
                          {totalMild}
                        </td>
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: "14px",
                            color: "#374151",
                          }}
                        >
                          {totalModerate}
                        </td>
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: "14px",
                            color: "#374151",
                          }}
                        >
                          {totalSevere}
                        </td>
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: "14px",
                            color: "#374151",
                          }}
                        >
                          {totalCritical}
                        </td>
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: "14px",
                            color: "#374151",
                          }}
                        >
                          {grandTotal}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>
                    Data last updated: July 6, 2025
                  </p>
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "6px",
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <svg
                      style={{
                        height: "16px",
                        width: "16px",
                        marginRight: "4px",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, count, description }) => (
  <div style={styles.statCard}>
    <h3 style={styles.statCardTitle}>{title}</h3>
    <div style={styles.statCardCount}>{count}</div>
    <div style={styles.statCardDescription}>{description}</div>
  </div>
);

const FilterButton = ({ label }) => (
  <button style={styles.filterButton}>
    <Filter size={16} style={styles.filterIcon} />
    <span>{label}</span>
  </button>
);

const PulseIcon = ({ style }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M22 12H18L15 21L9 3L6 12H2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Adminreport;
