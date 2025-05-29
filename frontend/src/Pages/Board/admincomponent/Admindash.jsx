import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { AlertCircle, Users, FileText, Activity } from "lucide-react";
import { useData } from "../../../Components/Contextprovider/ContextProvider";
import NotificationPanel from "../../../Components/Notifications/NotificationPanel";

import "./Admindash.css";
import { useNotifications } from "../../../hooks/useNotifications";
import CustomAlertForm from "../../../Components/Notifications/CustomAlertForm";

const Admindash = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const { notifications } = useNotifications();
  const {
    loading,
    error,
    reportStats = { total: 0, critical: 0, new: 0, resolved: 0 },
    userStats = { total: 0, active: 0, newRegistrations: 0, healthcare: 0 },
    reportTrendData = [],
    regionData = [],
    illnessData = [],
  } = useData();

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const styles = {
    dashboardContainer: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      padding: "24px",
    },
    content: {
      maxWidth: "100%",
      margin: "0 auto",
    },
    title: {
      fontSize: "30px",
      fontWeight: "700",
      color: "#111827",
    },
    subtitle: {
      color: "#6B7280",
      marginTop: "4px",
    },
    navContainer: {
      marginTop: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    tabsContainer: {
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #E5E7EB",
    },
    activeTab: {
      padding: "8px 16px",
      borderBottom: "2px solid #3B82F6",
      color: "#2563EB",
      fontWeight: "500",
    },
    inactiveTab: {
      padding: "8px 16px",
      color: "#6B7280",
      fontWeight: "500",
    },
    controlsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    selectContainer: {
      position: "relative",
    },
    select: {
      appearance: "none",
      backgroundColor: "white",
      border: "1px solid #D1D5DB",
      borderRadius: "6px",
      padding: "8px 12px",
      paddingRight: "36px",
      color: "#374151",
    },
    refreshButton: {
      padding: "8px",
      borderRadius: "6px",
      backgroundColor: "transparent",
    },
    statsGrid: {
      marginTop: "24px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "24px",
    },
    statCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
    notificationSection: {
      position: "relative",
    },
    notificationButton: {
      padding: "8px",
      borderRadius: "6px",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    notificationBadge: {
      position: "absolute",
      top: "-4px",
      right: "-4px",
      backgroundColor: "#EF4444",
      color: "white",
      borderRadius: "9999px",
      padding: "2px 6px",
      fontSize: "12px",
    },
    notificationDropdown: {
      position: "absolute",
      top: "100%",
      right: "0",
      marginTop: "8px",
      zIndex: 1000,
    },
    customAlertContainer: {
      marginTop: "16px",
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
    statHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    statTitle: {
      color: "#4B5563",
      fontWeight: "500",
    },
    statValue: {
      fontSize: "30px",
      fontWeight: "700",
      marginTop: "8px",
    },
    statIncrease: {
      fontSize: "14px",
      color: "#10B981",
    },
    statInfo: {
      fontSize: "14px",
      color: "#6B7280",
    },
    progressBar: {
      marginTop: "16px",
      width: "100%",
      height: "8px",
      backgroundColor: "#DBEAFE",
      borderRadius: "9999px",
    },
    progress: {
      height: "8px",
      backgroundColor: "#3B82F6",
      borderRadius: "9999px",
    },
    chartsGrid: {
      marginTop: "24px",
      display: "flex",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "24px",
    },
    chartCard: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
    chartTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#1F2937",
    },
    chartSubtitle: {
      fontSize: "14px",
      color: "#6B7280",
    },
    chartContainer: {
      height: "256px",
      marginTop: "16px",
    },
    fullWidthCard: {
      marginTop: "24px",
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
    alertsContainer: {
      marginTop: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    redAlertCard: {
      border: "1px solid #FEE2E2",
      backgroundColor: "#FEF2F2",
      borderRadius: "8px",
      padding: "16px",
    },
    orangeAlertCard: {
      border: "1px solid #FFEDD5",
      backgroundColor: "#FFF7ED",
      borderRadius: "8px",
      padding: "16px",
    },
    blueAlertCard: {
      border: "1px solid #DBEAFE",
      backgroundColor: "#EFF6FF",
      borderRadius: "8px",
      padding: "16px",
    },
    alertContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    alertInfo: {
      flex: "1",
    },
    redAlertTitle: {
      fontWeight: "500",
      color: "#DC2626",
      display: "flex",
      alignItems: "center",
    },
    orangeAlertTitle: {
      fontWeight: "500",
      color: "#EA580C",
      display: "flex",
      alignItems: "center",
    },
    blueAlertTitle: {
      fontWeight: "500",
      color: "#2563EB",
      display: "flex",
      alignItems: "center",
    },
    redStatusDot: {
      width: "8px",
      height: "8px",
      backgroundColor: "#EF4444",
      borderRadius: "9999px",
      marginRight: "8px",
    },
    orangeStatusDot: {
      width: "8px",
      height: "8px",
      backgroundColor: "#F97316",
      borderRadius: "9999px",
      marginRight: "8px",
    },
    blueStatusDot: {
      width: "8px",
      height: "8px",
      backgroundColor: "#3B82F6",
      borderRadius: "9999px",
      marginRight: "8px",
    },
    alertDescription: {
      fontSize: "14px",
      color: "#4B5563",
      marginTop: "4px",
    },
    alertTimestamp: {
      fontSize: "12px",
      color: "#6B7280",
      marginTop: "4px",
      display: "flex",
      alignItems: "center",
    },
    alertActions: {
      display: "flex",
      gap: "8px",
    },
    viewDetailsButton: {
      padding: "4px 16px",
      backgroundColor: "#EF4444",
      color: "white",
      borderRadius: "6px",
      fontSize: "14px",
    },
    dismissButton: {
      padding: "4px 16px",
      backgroundColor: "#E5E7EB",
      color: "#374151",
      borderRadius: "6px",
      fontSize: "14px",
    },
    actionButtonsRow: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "16px",
    },
    secondaryButton: {
      padding: "8px 16px",
      border: "1px solid #D1D5DB",
      backgroundColor: "white",
      borderRadius: "6px",
      fontSize: "14px",
    },
    topActions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "16px",
      marginTop: "24px",
    },
    createAlertButton: {
      padding: "8px 16px",
      backgroundColor: "#3B82F6",
      color: "white",
      borderRadius: "6px",
      fontSize: "14px",
      border: "none",
      cursor: "pointer",
    },
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowCustomAlert(false);
  };

  const toggleCustomAlert = () => {
    setShowCustomAlert(!showCustomAlert);
    setShowNotifications(false);
  };

  return (
    <div className="dashboard-container">
      <div className="content">
        <div className="top-section">
          <h1 className="title">Admin Dashboard</h1>
          <div className="actions">
            <div className="notification-section">
              <button
                onClick={toggleNotifications}
                className="notification-button"
              >
                <AlertCircle size={20} />
                {notifications.length > 0 && (
                  <span className="notification-badge">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="notification-dropdown">
                  <NotificationPanel />
                </div>
              )}
            </div>
            <button onClick={toggleCustomAlert} className="create-alert-button">
              Create Custom Alert
            </button>
          </div>
        </div>

        {showCustomAlert && (
          <div className="custom-alert-container">
            <CustomAlertForm />
          </div>
        )}

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <h2 style={styles.statTitle}>Total Reports</h2>
              <FileText size={20} color="#6B7280" />
            </div>
            <div style={{ marginTop: "8px" }}>
              {" "}
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "700",
                  margin: "0",
                  color: "#111827",
                }}
              >
                {(reportStats?.total || 0).toLocaleString()}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#10B981",
                  margin: "4px 0 0 0",
                }}
              >
                {reportStats?.new || 0} new today
              </p>
            </div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progress,
                  width: `${Math.min((reportStats.total / 20000) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <h2 style={styles.statTitle}>Active Users</h2>
              <Users size={20} color="#6B7280" />
            </div>
            <div style={{ marginTop: "8px" }}>
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "700",
                  margin: "0",
                  color: "#111827",
                }}
              >
                {userStats.active.toLocaleString()}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#10B981",
                  margin: "4px 0 0 0",
                }}
              >
                +7% from last month
              </p>
            </div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progress,
                  width: `${Math.min((userStats.active / 5000) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <h2 style={styles.statTitle}>Critical Alerts</h2>
              <AlertCircle size={20} color="#6B7280" />
            </div>
            <div style={{ marginTop: "8px" }}>
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "700",
                  margin: "0",
                  color: "#111827",
                }}
              >
                7
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  margin: "4px 0 0 0",
                }}
              >
                Requiring immediate attention
              </p>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progress, width: "25%" }}></div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <h2 style={styles.statTitle}>System Health</h2>
              <Activity size={20} color="#6B7280" />
            </div>
            <div style={{ marginTop: "8px" }}>
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "700",
                  margin: "0",
                  color: "#111827",
                }}
              >
                98.6%
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  margin: "4px 0 0 0",
                }}
              >
                Uptime in last 30 days
              </p>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progress, width: "98.6%" }}></div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={styles.chartsGrid}>
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Report Submission Trends</h2>
            <p style={styles.chartSubtitle}>
              Daily report submissions over the past week
            </p>
            <div style={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={reportTrendData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4169E1"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                    fill="url(#colorUv)"
                  />{" "}
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4169E1" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#4169E1"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Distribution by Region</h2>
            <p style={styles.chartSubtitle}>
              Geographic distribution of reported cases
            </p>
            <div style={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData || []}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name || "Unknown"}: ${((percent || 0) * 100).toFixed(
                        0
                      )}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(regionData || []).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry?.color || "#8884d8"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Illness Trends Chart */}
        <div style={styles.fullWidthCard}>
          <h2 style={styles.chartTitle}>Illness Trends by Month</h2>
          <p style={styles.chartSubtitle}>
            Comparative view of different types of illnesses
          </p>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={illnessData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Respiratory" fill="#4169E1" />
                <Bar dataKey="Gastrointestinal" fill="#FF6B8B" />
                <Bar dataKey="Viral" fill="#39A9DB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Health Alerts */}
        <div style={styles.fullWidthCard}>
          <h2 style={styles.chartTitle}>Active Health Alerts</h2>
          <p style={styles.chartSubtitle}>
            Current alerts requiring attention or monitoring
          </p>

          <div style={styles.alertsContainer}>
            <div style={styles.redAlertCard}>
              <div style={styles.alertContent}>
                <div style={styles.alertInfo}>
                  <h3 style={styles.redAlertTitle}>
                    <span style={styles.redStatusDot}></span>
                    Respiratory Outbreak - North Region
                  </h3>
                  <p style={styles.alertDescription}>
                    Significant increase in respiratory infection cases
                    requiring immediate attention
                  </p>
                  <p style={styles.alertTimestamp}>
                    <span style={{ marginRight: "4px" }}>&#128337;</span> 2
                    hours ago
                  </p>
                </div>
                <div style={styles.alertActions}>
                  <button style={styles.viewDetailsButton}>View Details</button>
                  <button style={styles.dismissButton}>Dismiss</button>
                </div>
              </div>
            </div>

            <div style={styles.orangeAlertCard}>
              <div style={styles.alertContent}>
                <div style={styles.alertInfo}>
                  <h3 style={styles.orangeAlertTitle}>
                    <span style={styles.orangeStatusDot}></span>
                    Gastrointestinal Illness Cluster - Downtown District
                  </h3>
                  <p style={styles.alertDescription}>
                    Multiple related cases reported in central business area
                  </p>
                  <p style={styles.alertTimestamp}>
                    <span style={{ marginRight: "4px" }}>&#128337;</span> 6
                    hours ago
                  </p>
                </div>
                <div style={styles.alertActions}>
                  <button style={styles.viewDetailsButton}>View Details</button>
                  <button style={styles.dismissButton}>Dismiss</button>
                </div>
              </div>
            </div>

            <div style={styles.blueAlertCard}>
              <div style={styles.alertContent}>
                <div style={styles.alertInfo}>
                  <h3 style={styles.blueAlertTitle}>
                    <span style={styles.blueStatusDot}></span>
                    Seasonal Allergies Trending Higher
                  </h3>
                  <p style={styles.alertDescription}>
                    Higher than usual reports of allergy symptoms across all
                    regions
                  </p>
                  <p style={styles.alertTimestamp}>
                    <span style={{ marginRight: "4px" }}>&#128337;</span> 1 day
                    ago
                  </p>
                </div>
                <div style={styles.alertActions}>
                  <button style={styles.viewDetailsButton}>View Details</button>
                  <button style={styles.dismissButton}>Dismiss</button>
                </div>
              </div>
            </div>

            <div style={styles.actionButtonsRow}>
              <button style={styles.secondaryButton}>View All Alerts</button>
              <button
                style={{
                  ...styles.secondaryButton,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>Generate Report</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Top Actions */}
        <div style={styles.topActions}>
          <div
            className="notification-section"
            style={styles.notificationSection}
          >
            <button
              onClick={toggleNotifications}
              style={styles.notificationButton}
            >
              <AlertCircle size={20} />
              <span style={styles.notificationBadge}>
                {notifications.length}
              </span>
            </button>
            {showNotifications && (
              <div style={styles.notificationDropdown}>
                <NotificationPanel />
              </div>
            )}
          </div>
          <button onClick={toggleCustomAlert} style={styles.createAlertButton}>
            Create Custom Alert
          </button>
        </div>

        {showCustomAlert && (
          <div style={styles.customAlertContainer}>
            <CustomAlertForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admindash;
