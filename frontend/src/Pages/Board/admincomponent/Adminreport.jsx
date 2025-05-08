import React, { useState } from "react";
import { Search, Filter, MoreHorizontal, MapPin, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

import { useData } from "../../../Components/Contextprovider/ContextProvider";

const Adminreport = () => {
  const { reports, trendData, adminRegionData, severityData, illnessDataAdmin, reportStats } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Get unique statuses for filter
  const statuses = [...new Set(reports.map(report => report.status))];

  // Filter reports based on search term and status
  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? report.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Handle status filter
  const handleStatusFilter = (status) => {
    setStatusFilter(status === statusFilter ? "" : status);
    setIsStatusDropdownOpen(false);
  };

  const styles = {
    container: {
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: "24px",
    },
    content: {
      maxWidth: "100%",
      margin: "0 auto",
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
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "16px",
      marginBottom: "24px",
    },
    statCard: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    },
    statLabel: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#6b7280",
    },
    statValue: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#111827",
      marginTop: "4px",
    },
    statSubtext: {
      fontSize: "14px",
      color: "#6b7280",
    },
    chartCard: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      marginBottom: "24px",
    },
    chartTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "4px",
    },
    chartSubtitle: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "16px",
    },
    chartContainer: {
      height: "300px",
    },
    searchFilterBar: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "16px",
      flexWrap: "wrap",
      gap: "12px",
    },
    searchContainer: {
      position: "relative",
      flexGrow: 1,
      maxWidth: "500px",
    },
    searchInput: {
      width: "100%",
      padding: "8px 8px 8px 36px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
    },
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#9ca3af",
    },
    filterButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      backgroundColor: "#ffffff",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
    },
    dropdownMenu: {
      position: "absolute",
      right: "0",
      marginTop: "4px",
      width: "180px",
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
    },
    dropdownItem: {
      padding: "8px 12px",
      fontSize: "14px",
      cursor: "pointer",
      width: "100%",
      textAlign: "left",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    },
    tableHeader: {
      textAlign: "left",
      padding: "12px 16px",
      fontSize: "12px",
      fontWeight: "500",
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      borderBottom: "1px solid #e5e7eb",
    },
    tableRow: {
      borderBottom: "1px solid #e5e7eb",
    },
    tableCell: {
      padding: "16px",
      fontSize: "14px",
      color: "#374151",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 8px",
      borderRadius: "9999px",
      fontSize: "12px",
      fontWeight: "500",
    },
    activeBadge: {
      backgroundColor: "#dcfce7",
      color: "#16a34a",
    },
    resolvedBadge: {
      backgroundColor: "#d1d5db",
      color: "#374151",
    },
    verifiedBadge: {
      backgroundColor: "#dbeafe",
      color: "#2563eb",
    },
    flaggedBadge: {
      backgroundColor: "#fef2f2",
      color: "#dc2626",
    },
    actionButton: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: "#6b7280",
    },
    tableFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      borderTop: "1px solid #e5e7eb",
    },
    footerText: {
      fontSize: "14px",
      color: "#6b7280",
    },
    footerButtons: {
      display: "flex",
      gap: "8px",
    },
    footerButton: {
      padding: "6px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      backgroundColor: "#ffffff",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Report Management</h1>
        <p style={styles.subheading}>
          Monitor and manage health reports submitted by users.
        </p>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button style={{ ...styles.tabButton, ...styles.activeTab }}>
            All Reports
          </button>
          <button style={{ ...styles.tabButton, ...styles.inactiveTab }}>
            Active
          </button>
          <button style={{ ...styles.tabButton, ...styles.inactiveTab }}>
            Resolved
          </button>
          <button style={{ ...styles.tabButton, ...styles.inactiveTab }}>
            Flagged
          </button>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Reports</div>
            <div style={styles.statValue}>{reportStats.total.toLocaleString()}</div>
            <div style={{ ...styles.statSubtext, color: "#16a34a" }}>
              +18% from last month
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Active Reports</div>
            <div style={styles.statValue}>{reports.filter(r => r.status === 'Active').length.toLocaleString()}</div>
            <div style={styles.statSubtext}>
              {((reports.filter(r => r.status === 'Active').length / reportStats.total) * 100).toFixed(1)}% of total reports
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Resolved Reports</div>
            <div style={styles.statValue}>{reportStats.resolved.toLocaleString()}</div>
            <div style={styles.statSubtext}>
              {((reportStats.resolved / reportStats.total) * 100).toFixed(1)}% of total reports
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Flagged Reports</div>
            <div style={styles.statValue}>{reports.filter(r => r.status === 'Flagged').length.toLocaleString()}</div>
            <div style={styles.statSubtext}>Requiring review</div>
          </div>
        </div>

        {/* Charts */}
        <div style={styles.statsGrid}>
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Report Trends</h2>
            <p style={styles.chartSubtitle}>Weekly report submissions and resolutions</p>
            <div style={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="newReports"
                    stroke="#4263EB"
                    strokeWidth={2}
                    name="New Reports"
                  />
                  <Line
                    type="monotone"
                    dataKey="resolvedCases"
                    stroke="#4DABF7"
                    strokeWidth={2}
                    name="Resolved Cases"
                  />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Reports by Region</h2>
            <p style={styles.chartSubtitle}>Active and resolved cases by region</p>
            <div style={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={adminRegionData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="active" fill="#4263EB" name="Active" />
                  <Bar dataKey="resolved" fill="#4DABF7" name="Resolved" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Severity and Illness Distribution */}
        <div style={styles.statsGrid}>
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Severity Distribution</h2>
            <p style={styles.chartSubtitle}>Breakdown of report severity by region</p>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Region</th>
                    <th style={styles.tableHeader}>Mild</th>
                    <th style={styles.tableHeader}>Moderate</th>
                    <th style={styles.tableHeader}>Severe</th>
                    <th style={styles.tableHeader}>Critical</th>
                    <th style={styles.tableHeader}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {severityData.map((region, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={styles.tableCell}>{region.region}</td>
                      <td style={styles.tableCell}>{region.mild}</td>
                      <td style={styles.tableCell}>{region.moderate}</td>
                      <td style={styles.tableCell}>{region.severe}</td>
                      <td style={styles.tableCell}>{region.critical}</td>
                      <td style={styles.tableCell}>{region.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Illness Distribution</h2>
            <p style={styles.chartSubtitle}>Percentage of illness types reported</p>
            <div style={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={illnessDataAdmin}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Percentage">
                    {illnessDataAdmin.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>All Reports</h2>
          <p style={styles.chartSubtitle}>Detailed view of submitted reports</p>
          <div style={styles.searchFilterBar}>
            <div style={styles.searchContainer}>
              <div style={styles.searchIcon}>
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search reports..."
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ position: "relative" }}>
              <button
                style={styles.filterButton}
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              >
                <Filter size={16} />
                <span>{statusFilter || "Status"}</span>
              </button>
              {isStatusDropdownOpen && (
                <div style={styles.dropdownMenu}>
                  {statuses.map(status => (
                    <button
                      key={status}
                      style={{
                        ...styles.dropdownItem,
                        backgroundColor: statusFilter === status ? "#eff6ff" : "transparent",
                        color: statusFilter === status ? "#2563eb" : "#374151",
                      }}
                      onClick={() => handleStatusFilter(status)}
                    >
                      {status}
                    </button>
                  ))}
                  <button
                    style={{
                      ...styles.dropdownItem,
                      borderTop: "1px solid #e5e7eb",
                    }}
                    onClick={() => {
                      setStatusFilter("");
                      setIsStatusDropdownOpen(false);
                    }}
                  >
                    Clear filter
                  </button>
                </div>
              )}
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
                {filteredReports.map(report => (
                  <tr key={report.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{report.type}</td>
                    <td style={styles.tableCell}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: "500" }}>{report.reportedBy}</span>
                        <span style={{ color: "#6b7280", fontSize: "12px" }}>{report.email}</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <MapPin size={14} color="#6b7280" />
                        {report.location}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Calendar size={14} color="#6b7280" />
                        {report.date}
                      </div>
                    </td>
                    <td style={styles.tableCell}>{report.severity}</td>
                    <td style={styles.tableCell}>
                      <span
                        style={{
                          ...styles.badge,
                          ...(report.status === "Active"
                            ? styles.activeBadge
                            : report.status === "Resolved"
                            ? styles.resolvedBadge
                            : report.status === "Verified"
                            ? styles.verifiedBadge
                            : styles.flaggedBadge),
                        }}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <button style={styles.actionButton}>
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={styles.tableFooter}>
            <div style={styles.footerText}>
              Showing {filteredReports.length} of {reports.length} reports
            </div>
            <div style={styles.footerButtons}>
              <button style={styles.footerButton}>Export</button>
              <button style={styles.footerButton}>Archive</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminreport;