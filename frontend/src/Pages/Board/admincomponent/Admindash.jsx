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
import {
  RefreshCw,
  AlertCircle,
  Users,
  FileText,
  Activity,
} from "lucide-react";

const Admindash = () => {
  const [timeframe, setTimeframe] = useState("This Week");

  // Data for Report Submission Trends
  const reportTrendData = [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 160 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 210 },
    { name: "Fri", value: 280 },
    { name: "Sat", value: 160 },
    { name: "Sun", value: 140 },
  ];

  // Data for Distribution by Region
  const regionData = [
    { name: "North Region", value: 35, color: "#4169E1" },
    { name: "South Region", value: 25, color: "#39A9DB" },
    { name: "East Region", value: 20, color: "#6B5B95" },
    { name: "West Region", value: 15, color: "#FF6B8B" },
    { name: "Central Area", value: 5, color: "#8A2BE2" },
  ];

  // Data for Illness Trends
  const illnessData = [
    { name: "Jan", Respiratory: 380, Gastrointestinal: 240, Viral: 320 },
    { name: "Feb", Respiratory: 300, Gastrointestinal: 220, Viral: 280 },
    { name: "Mar", Respiratory: 500, Gastrointestinal: 340, Viral: 220 },
    { name: "Apr", Respiratory: 450, Gastrointestinal: 260, Viral: 290 },
    { name: "May", Respiratory: 380, Gastrointestinal: 280, Viral: 230 },
    { name: "Jun", Respiratory: 410, Gastrointestinal: 320, Viral: 270 },
    { name: "Jul", Respiratory: 580, Gastrointestinal: 350, Viral: 300 },
  ];

  // Data for Top Reporting Regions
  const topRegionsData = [
    { name: "North Region", value: 34 },
    { name: "South Region", value: 26 },
    { name: "East Region", value: 22 },
    { name: "West Region", value: 18 },
  ];

  // Data for Most Common Symptoms
  const symptomsData = [
    { name: "Fever", value: 64 },
    { name: "Cough", value: 52 },
    { name: "Fatigue", value: 38 },
    { name: "Headache", value: 27 },
  ];

  // Data for Active Health Campaigns
  const campaignsData = [
    { name: "Respiratory Awareness", value: 75 },
    { name: "Handwashing Initiative", value: 90 },
    { name: "Vaccination Outreach", value: 60 },
    { name: "Health Screenings", value: 40 },
  ];

  // Custom styles to match the screenshots
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
    bottomStatsGrid: {
      marginTop: "24px",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "24px",
    },
    statsListContainer: {
      marginTop: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    statsListItem: {
      marginBottom: "16px",
    },
    statsListHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statsListItemName: {
      color: "#374151",
    },
    statsListItemValue: {
      color: "#6B7280",
    },
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.content}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.subtitle}>
          Overview of system activity, user reports, and health data analytics.
        </p>

        <div style={styles.navContainer}>
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <button
                style={{
                  padding: "8px 16px",
                  borderBottom: "2px solid #3B82F6",
                  color: "#2563EB",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Overview
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  color: "#6B7280",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Reports
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  color: "#6B7280",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Users
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <select
                style={{
                  appearance: "none",
                  backgroundColor: "white",
                  border: "1px solid #D1D5DB",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  paddingRight: "36px",
                  color: "#374151",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <button
              style={{
                padding: "8px",
                borderRadius: "6px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RefreshCw size={20} color="#6B7280" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            marginTop: "24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <h2
                style={{
                  color: "#4B5563",
                  fontWeight: "500",
                  fontSize: "16px",
                  margin: 0,
                }}
              >
                Total Reports
              </h2>
              <FileText size={20} color="#6B7280" />
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
                16,532
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#10B981",
                  margin: "4px 0 0 0",
                }}
              >
                +18% from last month
              </p>
            </div>
            <div
              style={{
                marginTop: "16px",
                width: "100%",
                height: "8px",
                backgroundColor: "#DBEAFE",
                borderRadius: "9999px",
              }}
            >
              <div
                style={{
                  height: "8px",
                  width: "75%",
                  backgroundColor: "#3B82F6",
                  borderRadius: "9999px",
                }}
              ></div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <h2
                style={{
                  color: "#4B5563",
                  fontWeight: "500",
                  fontSize: "16px",
                  margin: 0,
                }}
              >
                Active Users
              </h2>
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
                2,841
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
            <div
              style={{
                marginTop: "16px",
                width: "100%",
                height: "8px",
                backgroundColor: "#DBEAFE",
                borderRadius: "9999px",
              }}
            >
              <div
                style={{
                  height: "8px",
                  width: "80%",
                  backgroundColor: "#3B82F6",
                  borderRadius: "9999px",
                }}
              ></div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <h2
                style={{
                  color: "#4B5563",
                  fontWeight: "500",
                  fontSize: "16px",
                  margin: 0,
                }}
              >
                Critical Alerts
              </h2>
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
            <div
              style={{
                marginTop: "16px",
                width: "100%",
                height: "8px",
                backgroundColor: "#DBEAFE",
                borderRadius: "9999px",
              }}
            >
              <div
                style={{
                  height: "8px",
                  width: "25%",
                  backgroundColor: "#3B82F6",
                  borderRadius: "9999px",
                }}
              ></div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <h2
                style={{
                  color: "#4B5563",
                  fontWeight: "500",
                  fontSize: "16px",
                  margin: 0,
                }}
              >
                System Health
              </h2>
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
            <div
              style={{
                marginTop: "16px",
                width: "100%",
                height: "8px",
                backgroundColor: "#DBEAFE",
                borderRadius: "9999px",
              }}
            >
              <div
                style={{
                  height: "8px",
                  width: "98.6%",
                  backgroundColor: "#3B82F6",
                  borderRadius: "9999px",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div
          style={{
            
            marginTop: "24px",
            display: "flex",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "24px",
            "@media (min-width: 100%)": {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          }}
        >
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
                  />
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
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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

        {/* Bottom Stats Row */}
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "24px",
            "@media (min-width: 768px)": {
              gridTemplateColumns: "repeat(3, 1fr)",
            },
          }}
        >
          <div style={styles.chartCard}>
            <h2
              style={{ fontSize: "18px", fontWeight: "700", color: "#1F2937" }}
            >
              Top Reporting Regions
            </h2>
            <div style={styles.statsListContainer}>
              {topRegionsData.map((region, index) => (
                <div key={index} style={styles.statsListItem}>
                  <div style={styles.statsListHeader}>
                    <span style={styles.statsListItemName}>{region.name}</span>
                    <span style={styles.statsListItemValue}>
                      {region.value}%
                    </span>
                  </div>
                  <div style={{ ...styles.progressBar, marginTop: "4px" }}>
                    <div
                      style={{ ...styles.progress, width: `${region.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.chartCard}>
            <h2
              style={{ fontSize: "18px", fontWeight: "700", color: "#1F2937" }}
            >
              Most Common Symptoms
            </h2>
            <div style={styles.statsListContainer}>
              {symptomsData.map((symptom, index) => (
                <div key={index} style={styles.statsListItem}>
                  <div style={styles.statsListHeader}>
                    <span style={styles.statsListItemName}>{symptom.name}</span>
                    <span style={styles.statsListItemValue}>
                      {symptom.value}%
                    </span>
                  </div>
                  <div style={{ ...styles.progressBar, marginTop: "4px" }}>
                    <div
                      style={{ ...styles.progress, width: `${symptom.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.chartCard}>
            <h2
              style={{ fontSize: "18px", fontWeight: "700", color: "#1F2937" }}
            >
              Active Health Campaigns
            </h2>
            <div style={styles.statsListContainer}>
              {campaignsData.map((campaign, index) => (
                <div key={index} style={styles.statsListItem}>
                  <div style={styles.statsListHeader}>
                    <span style={styles.statsListItemName}>
                      {campaign.name}
                    </span>
                    <span style={styles.statsListItemValue}>
                      {campaign.value}%
                    </span>
                  </div>
                  <div style={{ ...styles.progressBar, marginTop: "4px" }}>
                    <div
                      style={{
                        ...styles.progress,
                        width: `${campaign.value}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindash;
