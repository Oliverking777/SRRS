import React, { useState } from "react";
import {
  RefreshCw,
  Database,
  MessageSquare,
  Zap,
  HardDrive,
  RotateCcw,
} from "lucide-react";

const Adminsetting = () => {
  const [activeTab, setActiveTab] = useState("system");

  const [siteSettings, setSiteSettings] = useState({
    siteName: "Sickness Recording and Reporting System",
    adminEmail: "admin@srrs.example.com",
    dataRetention: "365",
    allowRegistration: true,
    requireApproval: false,
    enablePublicData: true,
    loggingLevel: "Information",
    maintenanceMode: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSiteSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (name) => {
    setSiteSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Settings saved:", siteSettings);
  };

  //maintainance
  const [backups] = useState([
    {
      date: "July 6, 2025 08:00",
      type: "Automatic",
      size: "2.4 GB",
      status: "Complete",
    },
    {
      date: "July 5, 2025 14:32",
      type: "Manual",
      size: "2.3 GB",
      status: "Complete",
    },
    {
      date: "July 4, 2025 08:00",
      type: "Automatic",
      size: "2.3 GB",
      status: "Complete",
    },
  ]);

  const [systemStatus] = useState({
    cpu: 24,
    memory: 42,
    disk: 61,
    database: { status: "Connected, Healthy", isOnline: true },
    notification: { status: "Active, Processing", isOnline: true },
    processingQueue: { items: 12, isActive: true },
  });

  const styles = {
    tabs: {
      display: "flex",
      marginBottom: "20px",
      borderBottom: "1px solid #e0e0e0",
    },
    tabButton: {
      padding: "10px 20px",
      border: "none",
      background: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      marginRight: "10px",
      position: "relative",
      transition: "all 0.3s ease",
    },
    activeTab: {
      color: "#4a77f5",
      borderBottom: "2px solid #4a77f5",
    },
    inactiveTab: {
      color: "#666",
    },
    container: {
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
      padding: "24px",
      width: "95%",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    wrapper: {
      maxWidth: "100%",
      margin: "0 auto",
    },
    header: {
      marginBottom: "16px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#111827",
      marginBottom: "4px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "24px",
    },

    //notification style
    notcontainer: {
      padding: "24px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
      maxWidth: "95%",
      margin: "0 auto",
    },
    notheader: {
      marginBottom: "24px",
    },
    headerTitle: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "4px",
    },
    noticon: {
      color: "#4B5563",
    },
    nottitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1F2937",
      margin: "0",
    },
    notsubtitle: {
      fontSize: "14px",
      color: "#6B7280",
      margin: "0",
    },
    notsection: {
      marginBottom: "32px",
    },
    notsectionTitle: {
      fontSize: "18px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "12px",
    },
    notificationRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #E5E7EB",
    },
    notificationRowLast: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
    },
    notificationInfo: {
      display: "flex",
      flexDirection: "column",
    },
    notificationTitle: {
      fontWeight: "500",
      color: "#374151",
      margin: "0 0 4px 0",
    },
    notificationDesc: {
      fontSize: "14px",
      color: "#6B7280",
      margin: "0",
    },
    toggleContainer: {
      position: "relative",
    },
    toggleInput: {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      borderWidth: "0",
    },
    toggleOn: {
      display: "block",
      width: "48px",
      height: "24px",
      borderRadius: "24px",
      backgroundColor: "#3B82F6",
      position: "relative",
    },
    toggleOff: {
      display: "block",
      width: "48px",
      height: "24px",
      borderRadius: "24px",
      backgroundColor: "#D1D5DB",
      position: "relative",
    },
    toggleKnobRight: {
      display: "block",
      position: "absolute",
      right: "4px",
      top: "4px",
      backgroundColor: "#FFFFFF",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
    },
    toggleKnobLeft: {
      display: "block",
      position: "absolute",
      left: "4px",
      top: "4px",
      backgroundColor: "#FFFFFF",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
    },
    inputGroup: {
      marginBottom: "16px",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #D1D5DB",
      borderRadius: "4px",
      marginBottom: "4px",
      fontSize: "14px",
    },
    inputHelp: {
      fontSize: "14px",
      color: "#6B7280",
      margin: "0",
    },
    emailGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginBottom: "16px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "8px",
    },
    buttonTest: {
      padding: "8px 12px",
      backgroundColor: "#F3F4F6",
      color: "#374151",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    buttonSave: {
      padding: "8px 16px",
      backgroundColor: "#3B82F6",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
    },
    saveIcon: {
      width: "18px",
      height: "18px",
    },

    //security
    seccontainer: {
      backgroundColor: "white",
      padding: "32px",
      maxWidth: "95%",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    headerSection: {
      marginBottom: "32px",
    },
    headerFlex: {
      display: "flex",
      alignItems: "center",
      marginBottom: "4px",
    },
    headerIcon: {
      width: "20px",
      height: "20px",
      marginRight: "8px",
    },
    secheaderTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
    },
    subText: {
      fontSize: "14px",
      color: "#666",
      marginLeft: "28px",
    },
    section: {
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "24px",
      marginBottom: "24px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "500",
      color: "#333",
      marginBottom: "16px",
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    settingTitle: {
      fontWeight: "500",
      marginBottom: "4px",
    },
    settingDescription: {
      fontSize: "14px",
      color: "#666",
    },
    sectoggleContainer: {
      position: "relative",
    },
    toggleBg: {
      width: "48px",
      height: "24px",
      backgroundColor: "#e5e7eb",
      borderRadius: "9999px",
    },
    toggleBgActive: {
      width: "48px",
      height: "24px",
      backgroundColor: "#3b82f6",
      borderRadius: "9999px",
    },
    toggleDot: {
      position: "absolute",
      right: "4px",
      top: "4px",
      backgroundColor: "white",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      marginBottom: "16px",
    },
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontWeight: "500",
      marginBottom: "8px",
    },
    secinput: {
      width: "100%",
      padding: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
    },
    secbuttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "24px",
    },
    saveButton: {
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      border: "none",
    },
    buttonIcon: {
      width: "20px",
      height: "20px",
      marginRight: "8px",
    },
    table: {
      width: "100%",
      textAlign: "left",
      borderCollapse: "collapse",
    },
    tableContainer: {
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      overflow: "hidden",
      marginBottom: "16px",
    },
    th: {
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#6b7280",
      borderBottom: "1px solid #e5e7eb",
    },
    td: {
      padding: "12px 16px",
      borderBottom: "1px solid #e5e7eb",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
    },
    avatar: {
      width: "32px",
      height: "32px",
      backgroundColor: "#e5e7eb",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#4b5563",
      marginRight: "12px",
    },
    userName: {
      fontWeight: "500",
    },
    userEmail: {
      fontSize: "14px",
      color: "#6b7280",
    },
    roleAdmin: {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
      padding: "4px 12px",
      borderRadius: "9999px",
      fontSize: "14px",
      display: "inline-block",
    },
    roleSuperAdmin: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
      padding: "4px 12px",
      borderRadius: "9999px",
      fontSize: "14px",
      display: "inline-block",
    },
    editButton: {
      color: "#3b82f6",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    manageButton: {
      border: "1px solid #d1d5db",
      color: "#4b5563",
      padding: "8px 16px",
      borderRadius: "4px",
      background: "none",
      cursor: "pointer",
    },
    //maintainance
    maincontainer: {
      backgroundColor: "#ffffff",
      padding: "24px",
      fontFamily: "sans-serif",
      color: "#333",
      maxWidth: "95%",
      margin: "0 auto",
    },
    sectionContainer: {
      marginBottom: "32px",
    },
    mainheaderFlex: {
      display: "flex",
      alignItems: "center",
      marginBottom: "4px",
    },
    sectionIcon: {
      marginRight: "8px",
      color: "#4a5568",
    },
    mainsectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      margin: 0,
    },
    sectionSubtitle: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "16px",
      marginTop: "4px",
    },
    panelsContainer: {
      display: "flex",
      gap: "16px",
      marginBottom: "16px",
    },
    panel: {
      width: "50%",
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      padding: "20px",
    },
    panelTitle: {
      fontSize: "18px",
      fontWeight: "500",
      marginBottom: "8px",
    },
    panelDescription: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "16px",
    },
    blueButton: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontWeight: "500",
    },
    whiteButton: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
      color: "#4b5563",
      padding: "8px 16px",
      borderRadius: "4px",
      border: "1px solid #d1d5db",
      cursor: "pointer",
      fontWeight: "500",
    },
    mainbuttonIcon: {
      marginRight: "8px",
    },
    refreshButton: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
      color: "#4b5563",
      padding: "8px 16px",
      borderRadius: "4px",
      border: "1px solid #d1d5db",
      cursor: "pointer",
      fontWeight: "500",
      marginTop: "16px",
    },
    maintableContainer: {
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      overflow: "hidden",
    },
    maintable: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f9fafb",
      borderBottom: "1px solid #e5e7eb",
    },
    tableHeaderCell: {
      textAlign: "left",
      padding: "12px 16px",
      fontWeight: "500",
      color: "#6b7280",
      fontSize: "14px",
    },
    tableHeaderCellRight: {
      textAlign: "right",
      padding: "12px 16px",
      fontWeight: "500",
      color: "#6b7280",
      fontSize: "14px",
    },
    tableRow: {
      borderBottom: "1px solid #e5e7eb",
    },
    tableCell: {
      padding: "12px 16px",
      color: "#374151",
    },
    tableCellRight: {
      padding: "12px 16px",
      textAlign: "right",
    },
    statusBadge: {
      backgroundColor: "#dcfce7",
      color: "#16a34a",
      borderRadius: "9999px",
      padding: "4px 12px",
      fontSize: "12px",
    },
    activeBadge: {
      backgroundColor: "#dcfce7",
      color: "#16a34a",
      borderRadius: "9999px",
      padding: "4px 12px",
      fontSize: "12px",
    },
    downloadButton: {
      color: "#2563eb",
      fontWeight: "500",
      marginRight: "16px",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    deleteButton: {
      color: "#4b5563",
      fontWeight: "500",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    usageContainer: {
      marginBottom: "16px",
    },
    usageHeader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "4px",
    },
    usageLabel: {
      fontWeight: "500",
    },
    progressBarContainer: {
      backgroundColor: "#e5e7eb",
      borderRadius: "9999px",
      height: "8px",
      width: "100%",
    },
    progressBar: {
      backgroundColor: "#3b82f6",
      height: "8px",
      borderRadius: "9999px",
    },
    serviceCard: {
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      padding: "16px",
      marginBottom: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    serviceCardTitle: {
      display: "flex",
      alignItems: "center",
    },
    serviceCardTitleText: {
      fontWeight: "500",
    },
    serviceCardIcon: {
      marginRight: "8px",
      color: "#6b7280",
    },
    serviceCardDescription: {
      fontSize: "14px",
      color: "#6b7280",
      marginTop: "4px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Settings</h1>
          <p style={styles.subtitle}>
            Configure system-wide settings, notifications, and security
            preferences.
          </p>
        </div>
        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "system"
                ? styles.activeTab
                : styles.inactiveTab),
            }}
            onClick={() => setActiveTab("system")}
          >
            System
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "notification"
                ? styles.activeTab
                : styles.inactiveTab),
            }}
            onClick={() => setActiveTab("notification")}
          >
            Notifications
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "security"
                ? styles.activeTab
                : styles.inactiveTab),
            }}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "maintainance"
                ? styles.activeTab
                : styles.inactiveTab),
            }}
            onClick={() => setActiveTab("maintainance")}
          >
            Maintainance
          </button>
        </div>
        {activeTab === "system" ? (
          //system
          <>
            <div
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                padding: "20px",
                maxWidth: "95%",
                margin: "9px auto",
                color: "#333",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M19.4 15C19.1277 15.8031 19.2583 16.6718 19.746 17.3916C20.2338 18.1114 21.0231 18.5798 21.8899 18.6972C22.7567 18.8146 23.6353 18.5717 24.3099 18.0252C24.9846 17.4786 25.4 16.6793 25.4 15.84V8.16C25.4 7.32074 24.9846 6.52144 24.3099 5.97485C23.6353 5.42825 22.7567 5.18539 21.8899 5.30279C21.0231 5.4202 20.2338 5.88865 19.746 6.60843C19.2583 7.32821 19.1277 8.19687 19.4 9M4.6 15C4.87233 15.8031 4.74166 16.6718 4.25397 17.3916C3.76628 18.1114 2.97692 18.5798 2.11012 18.6972C1.24331 18.8146 0.3647 18.5717 -0.309908 18.0252C-0.984516 17.4786 -1.4 16.6793 -1.4 15.84V8.16C-1.4 7.32074 -0.984516 6.52144 -0.309908 5.97485C0.364699 5.42825 1.24331 5.18539 2.11012 5.30279C2.97692 5.4202 3.76628 5.88865 4.25397 6.60843C4.74166 7.32821 4.87233 8.19687 4.6 9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <h1 style={{ fontSize: "24px", fontWeight: "600", margin: 0 }}>
                  System Settings
                </h1>
              </div>
              <p
                style={{
                  margin: "0 0 25px 0",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Configure general system settings and behavior
              </p>

              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {/* Site Name */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      Site Name
                    </label>
                    <input
                      type="text"
                      name="siteName"
                      value={siteSettings.siteName}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      The name displayed in the header and emails
                    </p>
                  </div>

                  {/* Administrator Email */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      Administrator Email
                    </label>
                    <input
                      type="email"
                      name="adminEmail"
                      value={siteSettings.adminEmail}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      Primary contact for system notifications
                    </p>
                  </div>
                </div>

                {/* Data Retention Period */}
                <div style={{ marginBottom: "30px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Data Retention Period (days)
                  </label>
                  <input
                    type="number"
                    name="dataRetention"
                    value={siteSettings.dataRetention}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    How long to keep inactive data in the system (minimum 30
                    days)
                  </p>
                </div>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #eee",
                    margin: "30px 0",
                  }}
                />

                {/* The rest of the form remains the same */}
                <div style={{ marginBottom: "20px" }}>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "20px",
                    }}
                  >
                    User Registration and Access
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Allow User Registration
                      </p>
                      <p
                        style={{
                          margin: "3px 0 0 0",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        Enable new users to create accounts
                      </p>
                    </div>
                    <div
                      style={{
                        width: "48px",
                        height: "24px",
                        backgroundColor: siteSettings.allowRegistration
                          ? "#4a77f5"
                          : "#e0e0e0",
                        borderRadius: "12px",
                        position: "relative",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onClick={() => handleToggleChange("allowRegistration")}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          position: "absolute",
                          top: "2px",
                          left: siteSettings.allowRegistration ? "26px" : "2px",
                          transition: "left 0.3s",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Require Admin Approval
                      </p>
                      <p
                        style={{
                          margin: "3px 0 0 0",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        New accounts must be approved by an administrator
                      </p>
                    </div>
                    <div
                      style={{
                        width: "48px",
                        height: "24px",
                        backgroundColor: siteSettings.requireApproval
                          ? "#4a77f5"
                          : "#e0e0e0",
                        borderRadius: "12px",
                        position: "relative",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onClick={() => handleToggleChange("requireApproval")}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          position: "absolute",
                          top: "2px",
                          left: siteSettings.requireApproval ? "26px" : "2px",
                          transition: "left 0.3s",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Enable Public Data Sharing
                      </p>
                      <p
                        style={{
                          margin: "3px 0 0 0",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        Allow anonymous access to aggregated health data
                      </p>
                    </div>
                    <div
                      style={{
                        width: "48px",
                        height: "24px",
                        backgroundColor: siteSettings.enablePublicData
                          ? "#4a77f5"
                          : "#e0e0e0",
                        borderRadius: "12px",
                        position: "relative",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onClick={() => handleToggleChange("enablePublicData")}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          position: "absolute",
                          top: "2px",
                          left: siteSettings.enablePublicData ? "26px" : "2px",
                          transition: "left 0.3s",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #eee",
                    margin: "30px 0",
                  }}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "30px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Logging Level
                    </label>
                    <select
                      name="loggingLevel"
                      value={siteSettings.loggingLevel}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                        appearance: "none",
                        backgroundImage:
                          'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                        backgroundSize: "12px",
                        paddingRight: "30px",
                      }}
                    >
                      <option value="Information">Information</option>
                      <option value="Warning">Warning</option>
                      <option value="Error">Error</option>
                      <option value="Debug">Debug</option>
                    </select>
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      How detailed system logs should be
                    </p>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Maintenance Mode
                    </label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <p
                        style={{ margin: "0", fontSize: "12px", color: "#666" }}
                      >
                        Temporarily restrict access to administrators only
                      </p>
                      <div
                        style={{
                          width: "48px",
                          height: "24px",
                          backgroundColor: siteSettings.maintenanceMode
                            ? "#4a77f5"
                            : "#e0e0e0",
                          borderRadius: "12px",
                          position: "relative",
                          cursor: "pointer",
                          transition: "background-color 0.3s",
                        }}
                        onClick={() => handleToggleChange("maintenanceMode")}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "2px",
                            left: siteSettings.maintenanceMode ? "26px" : "2px",
                            transition: "left 0.3s",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#4a77f5",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "10px 20px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      style={{
                        marginRight: "8px",
                        width: "16px",
                        height: "16px",
                      }}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                        fill="currentColor"
                      />
                    </svg>
                    Save System Settings
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : activeTab === "notification" ? (
          //notification
          <>
            <div style={styles.notcontainer}>
              <header style={styles.notheader}>
                <div style={styles.headerTitle}>
                  <svg
                    style={styles.noticon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h1 style={styles.nottitle}>Notification Settings</h1>
                </div>
                <p style={styles.notsubtitle}>
                  Configure system notifications and alerts
                </p>
              </header>

              <section style={styles.notsection}>
                <h2 style={styles.notsectionTitle}>Notification Channels</h2>

                <div style={styles.notificationRow}>
                  <div style={styles.notificationInfo}>
                    <p style={styles.notificationTitle}>Email Notifications</p>
                    <p style={styles.notificationDesc}>
                      Send notifications via email
                    </p>
                  </div>
                  <div style={styles.toggleContainer}>
                    <input
                      style={styles.toggleInput}
                      type="checkbox"
                      id="email-toggle"
                      defaultChecked
                    />
                    <label style={styles.toggleOn} htmlFor="email-toggle">
                      <span style={styles.toggleKnobRight}></span>
                    </label>
                  </div>
                </div>

                <div style={styles.notificationRowLast}>
                  <div style={styles.notificationInfo}>
                    <p style={styles.notificationTitle}>SMS Notifications</p>
                    <p style={styles.notificationDesc}>
                      Send critical alerts via SMS
                    </p>
                  </div>
                  <div style={styles.toggleContainer}>
                    <input
                      style={styles.toggleInput}
                      type="checkbox"
                      id="sms-toggle"
                    />
                    <label style={styles.toggleOff} htmlFor="sms-toggle">
                      <span style={styles.toggleKnobLeft}></span>
                    </label>
                  </div>
                </div>
              </section>

              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Notification Triggers</h2>

                <div style={styles.inputGroup}>
                  <p style={styles.notificationTitle}>
                    Critical Alert Threshold
                  </p>
                  <input style={styles.input} type="text" defaultValue="10" />
                  <p style={styles.inputHelp}>
                    Number of similar reports required to trigger a critical
                    alert
                  </p>
                </div>

                <div style={styles.notificationRow}>
                  <div style={styles.notificationInfo}>
                    <p style={styles.notificationTitle}>
                      New User Registrations
                    </p>
                    <p style={styles.notificationDesc}>
                      Notify admins when new users register
                    </p>
                  </div>
                  <div style={styles.toggleContainer}>
                    <input
                      style={styles.toggleInput}
                      type="checkbox"
                      id="reg-toggle"
                      defaultChecked
                    />
                    <label style={styles.toggleOn} htmlFor="reg-toggle">
                      <span style={styles.toggleKnobRight}></span>
                    </label>
                  </div>
                </div>

                <div style={styles.notificationRow}>
                  <div style={styles.notificationInfo}>
                    <p style={styles.notificationTitle}>System Issues</p>
                    <p style={styles.notificationDesc}>
                      Notify admins about system errors and warnings
                    </p>
                  </div>
                  <div style={styles.toggleContainer}>
                    <input
                      style={styles.toggleInput}
                      type="checkbox"
                      id="sys-toggle"
                      defaultChecked
                    />
                    <label style={styles.toggleOn} htmlFor="sys-toggle">
                      <span style={styles.toggleKnobRight}></span>
                    </label>
                  </div>
                </div>

                <div style={styles.notificationRowLast}>
                  <div style={styles.notificationInfo}>
                    <p style={styles.notificationTitle}>Daily Report Summary</p>
                    <p style={styles.notificationDesc}>
                      Send a daily summary of new reports
                    </p>
                  </div>
                  <div style={styles.toggleContainer}>
                    <input
                      style={styles.toggleInput}
                      type="checkbox"
                      id="daily-toggle"
                      defaultChecked
                    />
                    <label style={styles.toggleOn} htmlFor="daily-toggle">
                      <span style={styles.toggleKnobRight}></span>
                    </label>
                  </div>
                </div>
              </section>

              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Email Configuration</h2>

                <div style={styles.emailGrid}>
                  <div>
                    <p style={styles.notificationTitle}>From Email Address</p>
                    <input
                      style={styles.input}
                      type="text"
                      defaultValue="notifications@srrs.example.com"
                    />
                    <p style={styles.inputHelp}>
                      The email address notifications will be sent from
                    </p>
                  </div>

                  <div>
                    <p style={styles.notificationTitle}>SMTP Server</p>
                    <input
                      style={styles.input}
                      type="text"
                      defaultValue="smtp.example.com"
                    />
                    <p style={styles.inputHelp}>
                      Your outgoing mail server address
                    </p>
                  </div>
                </div>

                <div style={styles.buttonContainer}>
                  <button style={styles.buttonTest}>Test Email</button>
                  <button style={styles.buttonSave}>
                    <svg
                      style={styles.saveIcon}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H16M15 11L12 14M12 14L9 11M12 14V4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Save Notification Settings
                  </button>
                </div>
              </section>
            </div>
          </>
        ) : activeTab === "security" ? (
          //security
          <>
            <div style={styles.seccontainer}>
              <div style={styles.headerSection}>
                <div style={styles.headerFlex}>
                  <svg
                    style={styles.headerIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h1 style={styles.secheaderTitle}>Security Settings</h1>
                </div>
                <p style={styles.subText}>
                  Configure system security and access controls
                </p>
              </div>

              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Authentication Settings</h2>

                <div style={styles.flexBetween}>
                  <div>
                    <p style={styles.settingTitle}>
                      Require Two-Factor Authentication
                    </p>
                    <p style={styles.settingDescription}>
                      Require all users to set up 2FA for their accounts
                    </p>
                  </div>
                  <div style={styles.toggleContainer}>
                    <div style={styles.toggleBg}></div>
                    <div style={styles.toggleDot}></div>
                  </div>
                </div>

                <div style={styles.grid}>
                  <div>
                    <label style={styles.label} htmlFor="minPasswordLength">
                      Minimum Password Length
                    </label>
                    <input
                      type="text"
                      id="minPasswordLength"
                      style={styles.input}
                      defaultValue="10"
                    />
                    <p style={styles.settingDescription}>
                      Minimum characters required for passwords
                    </p>
                  </div>
                  <div>
                    <label style={styles.label} htmlFor="passwordExpiry">
                      Password Expiry (days)
                    </label>
                    <input
                      type="text"
                      id="passwordExpiry"
                      style={styles.input}
                      defaultValue="90"
                    />
                    <p style={styles.settingDescription}>
                      Days before users must change passwords (0 for never)
                    </p>
                  </div>
                </div>
              </div>

              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Session and Access Controls</h2>

                <div style={styles.grid}>
                  <div>
                    <label style={styles.label} htmlFor="sessionTimeout">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="text"
                      id="sessionTimeout"
                      style={styles.input}
                      defaultValue="60"
                    />
                    <p style={styles.settingDescription}>
                      How long before inactive users are logged out
                    </p>
                  </div>
                  <div>
                    <label style={styles.label} htmlFor="failedAttempts">
                      Failed Login Attempts
                    </label>
                    <input
                      type="text"
                      id="failedAttempts"
                      style={styles.secinput}
                      defaultValue="5"
                    />
                    <p style={styles.settingDescription}>
                      Number of attempts before account is locked
                    </p>
                  </div>
                </div>

                <div style={styles.flexBetween}>
                  <div>
                    <p style={styles.settingTitle}>Enable IP Blocking</p>
                    <p style={styles.settingDescription}>
                      Automatically block suspicious IP addresses
                    </p>
                  </div>
                  <div style={styles.sectoggleContainer}>
                    <div style={styles.toggleBgActive}></div>
                    <div style={styles.toggleDot}></div>
                  </div>
                </div>
              </div>

              <div style={styles.secbuttonContainer}>
                <button style={styles.saveButton}>
                  <svg
                    style={styles.buttonIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  Save Security Settings
                </button>
              </div>

              <div style={styles.section}>
                <div style={styles.headerFlex}>
                  <svg
                    style={styles.headerIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h2 style={styles.sectionTitle}>Administrative Access</h2>
                </div>
                <p style={{ ...styles.subText, marginBottom: "16px" }}>
                  Manage administrative access and permissions
                </p>

                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>User</th>
                        <th style={styles.th}>Role</th>
                        <th style={styles.th}>Last Login</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={styles.td}>
                          <div style={styles.userInfo}>
                            <div style={styles.avatar}>SR</div>
                            <div>
                              <p style={styles.userName}>Sofia Rodriguez</p>
                              <p style={styles.userEmail}>
                                sofia.rodriguez@example.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.roleSuperAdmin}>Super Admin</span>
                        </td>
                        <td style={styles.td}>Just now</td>
                        <td style={styles.td}>
                          <button style={styles.editButton}>Edit</button>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.td}>
                          <div style={styles.userInfo}>
                            <div style={styles.avatar}>WC</div>
                            <div>
                              <p style={styles.userName}>William Chen</p>
                              <p style={styles.userEmail}>
                                william.chen@example.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.roleAdmin}>Admin</span>
                        </td>
                        <td style={styles.td}>2 days ago</td>
                        <td style={styles.td}>
                          <button style={styles.editButton}>Edit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button style={styles.manageButton}>
                  Manage Administrators
                </button>
              </div>
            </div>
          </>
        ) : (
          // Maintainace
          <>
            <div style={styles.maincontainer}>
              {/* Backup and Restore Section */}
              <div style={styles.sectionContainer}>
                <div style={styles.mainheaderFlex}>
                  <HardDrive style={styles.sectionIcon} size={20} />
                  <h2 style={styles.mainsectionTitle}>Backup and Restore</h2>
                </div>
                <p style={styles.sectionSubtitle}>
                  Manage system data backups and restoration
                </p>

                <div style={styles.panelsContainer}>
                  {/* Create Backup Panel */}
                  <div style={styles.panel}>
                    <h3 style={styles.panelTitle}>Create Backup</h3>
                    <p style={styles.panelDescription}>
                      Create a complete backup of all system data
                    </p>
                    <button style={styles.blueButton}>
                      <HardDrive style={styles.mainbuttonIcon} size={16} />
                      Backup System
                    </button>
                  </div>

                  {/* Restore Panel */}
                  <div style={styles.panel}>
                    <h3 style={styles.panelTitle}>Restore from Backup</h3>
                    <p style={styles.panelDescription}>
                      Restore the system from a previous backup
                    </p>
                    <button style={styles.whiteButton}>
                      <RotateCcw style={styles.buttonIcon} size={16} />
                      Restore System
                    </button>
                  </div>
                </div>

                {/* Backup List */}
                <div style={styles.maintableContainer}>
                  <table style={styles.maintable}>
                    <thead style={styles.tableHeader}>
                      <tr>
                        <th style={styles.tableHeaderCell}>Backup Date</th>
                        <th style={styles.tableHeaderCell}>Type</th>
                        <th style={styles.tableHeaderCell}>Size</th>
                        <th style={styles.tableHeaderCell}>Status</th>
                        <th style={styles.tableHeaderCellRight}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {backups.map((backup, index) => (
                        <tr key={index} style={styles.tableRow}>
                          <td style={styles.tableCell}>{backup.date}</td>
                          <td style={styles.tableCell}>{backup.type}</td>
                          <td style={styles.tableCell}>{backup.size}</td>
                          <td style={styles.tableCell}>
                            <span style={styles.statusBadge}>
                              {backup.status}
                            </span>
                          </td>
                          <td style={styles.tableCellRight}>
                            <button style={styles.downloadButton}>
                              Download
                            </button>
                            <button style={styles.deleteButton}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* System Status Section */}
              <div style={styles.sectionContainer}>
                <div style={styles.headerFlex}>
                  <Database style={styles.sectionIcon} size={20} />
                  <h2 style={styles.sectionTitle}>System Status</h2>
                </div>
                <p style={styles.sectionSubtitle}>
                  Current system performance and resource usage
                </p>

                <div style={styles.panelsContainer}>
                  {/* Resource Usage */}
                  <div style={{ width: "50%" }}>
                    <div style={styles.usageContainer}>
                      <div style={styles.usageHeader}>
                        <span style={styles.usageLabel}>CPU Usage</span>
                        <span>{systemStatus.cpu}%</span>
                      </div>
                      <div style={styles.progressBarContainer}>
                        <div
                          style={{
                            ...styles.progressBar,
                            width: `${systemStatus.cpu}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div style={styles.usageContainer}>
                      <div style={styles.usageHeader}>
                        <span style={styles.usageLabel}>Memory Usage</span>
                        <span>{systemStatus.memory}%</span>
                      </div>
                      <div style={styles.progressBarContainer}>
                        <div
                          style={{
                            ...styles.progressBar,
                            width: `${systemStatus.memory}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div style={styles.usageContainer}>
                      <div style={styles.usageHeader}>
                        <span style={styles.usageLabel}>Disk Space</span>
                        <span>{systemStatus.disk}%</span>
                      </div>
                      <div style={styles.progressBarContainer}>
                        <div
                          style={{
                            ...styles.progressBar,
                            width: `${systemStatus.disk}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <button style={styles.refreshButton}>
                      <RefreshCw style={styles.buttonIcon} size={16} />
                      Refresh Status
                    </button>
                  </div>

                  {/* Service Status */}
                  <div style={{ width: "50%" }}>
                    <div style={styles.serviceCard}>
                      <div>
                        <div style={styles.serviceCardTitle}>
                          <Database style={styles.serviceCardIcon} size={16} />
                          <span style={styles.serviceCardTitleText}>
                            Database Status
                          </span>
                        </div>
                        <div style={styles.serviceCardDescription}>
                          {systemStatus.database.status}
                        </div>
                      </div>
                      <div>
                        <span style={styles.statusBadge}>Online</span>
                      </div>
                    </div>

                    <div style={styles.serviceCard}>
                      <div>
                        <div style={styles.serviceCardTitle}>
                          <MessageSquare
                            style={styles.serviceCardIcon}
                            size={16}
                          />
                          <span style={styles.serviceCardTitleText}>
                            Notification Service
                          </span>
                        </div>
                        <div style={styles.serviceCardDescription}>
                          {systemStatus.notification.status}
                        </div>
                      </div>
                      <div>
                        <span style={styles.statusBadge}>Online</span>
                      </div>
                    </div>

                    <div style={styles.serviceCard}>
                      <div>
                        <div style={styles.serviceCardTitle}>
                          <Zap style={styles.serviceCardIcon} size={16} />
                          <span style={styles.serviceCardTitleText}>
                            Processing Queue
                          </span>
                        </div>
                        <div style={styles.serviceCardDescription}>
                          {systemStatus.processingQueue.items} items pending
                        </div>
                      </div>
                      <div>
                        <span style={styles.activeBadge}>Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Adminsetting;
