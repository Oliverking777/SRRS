import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const fallbackReports = [
  {
    id: 1,
    type: "Respiratory Infection",
    reportedBy: "Olivia Martin",
    email: "olivia.martin@example.com",
    location: "North Region",
    date: "2025-07-06",
    severity: "Moderate",
    status: "Active",
  },
];

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [reportTrendData, setReportTrendData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [illnessData, setIllnessData] = useState([]);
  const [topRegionsData, setTopRegionsData] = useState([]);
  const [symptomsData, setSymptomsData] = useState([]);
  const [campaignsData, setCampaignsData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [adminRegionData, setAdminRegionData] = useState([]);
  const [severityData, setSeverityData] = useState([]);
  const [illnessDataAdmin, setIllnessDataAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const assets = {};
  const feature_list = [];
  const illnessTypes = [
    "Respiratory Infection",
    "Gastrointestinal Illness",
    "Viral Infection",
    "Allergic Reaction",
    "Bacterial Infection",
    "Food Poisoning",
  ];
  const symptoms = ["Fever", "Cough", "Fatigue", "Nausea", "Diarrhea", "Rash"];
  const severityLevels = ["Mild", "Moderate", "Severe", "Critical"];
  const commonIllnesses = ["Flu", "Food Poisoning", "COVID-19", "Allergies"];

  const reportStats = {
    total: reports.length,
    critical: reports.filter((r) => r.severity === "Critical").length,
    new: reports.filter((r) => {
      const reportDate = new Date(r.date);
      const today = new Date();
      return (
        reportDate.getFullYear() === today.getFullYear() &&
        reportDate.getMonth() === today.getMonth() &&
        reportDate.getDate() === today.getDate()
      );
    }).length,
    resolved: reports.filter((r) => r.status === "Resolved").length,
  };

  // Compute userStats dynamically from users
  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    newRegistrations: users.filter((u) => {
      const lastActive = new Date(u.lastActive);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastActive >= thirtyDaysAgo;
    }).length,
    healthcare: users.filter((u) => u.role === "Healthcare").length,
  };

  // Fetch data from Firestore with real-time updates
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Real-time listener for reports
    const unsubscribeReports = onSnapshot(
      collection(db, "reports"),
      (snapshot) => {
        const reportsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportsList.length ? reportsList : fallbackReports);

        // Update recentReports based on latest reports
        const recent = reportsList
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4)
          .map((report) => ({
            id: report.id,
            title: `${report.type} Report`,
            status:
              report.severity === "Severe"
                ? "Critical"
                : report.severity === "Moderate"
                ? "Warning"
                : "Normal",
            date: report.date,
          }));
        setRecentReports(recent);
      },
      (err) => {
        console.error("Error fetching reports:", err);
        setError("Failed to fetch reports");
        setReports(fallbackReports);
      }
    );

    // Real-time listener for users
    const unsubscribeUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      },
      (err) => {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
      }
    );

    // Fetch other collections (single fetch for static-like data)
    const fetchStaticData = async () => {
      try {
        // Trends
        const trendsSnapshot = await getDocs(collection(db, "trends"));
        trendsSnapshot.forEach((doc) => {
          if (doc.id === "report_trend_weekly")
            setReportTrendData(doc.data().data || []);
          if (doc.id === "admin_trend") setTrendData(doc.data().data || []);
        });

        // Regions
        const regionsSnapshot = await getDocs(collection(db, "regions"));
        regionsSnapshot.forEach((doc) => {
          if (doc.id === "region_data") setRegionData(doc.data().data || []);
          if (doc.id === "top_regions")
            setTopRegionsData(doc.data().data || []);
          if (doc.id === "admin_region_data")
            setAdminRegionData(doc.data().data || []);
        });

        // Illnesses
        const illnessesSnapshot = await getDocs(collection(db, "illnesses"));
        illnessesSnapshot.forEach((doc) => {
          if (doc.id === "illness_data") setIllnessData(doc.data().data || []);
          if (doc.id === "illness_data_admin")
            setIllnessDataAdmin(doc.data().data || []);
        });

        // Symptoms
        const symptomsSnapshot = await getDocs(collection(db, "symptoms"));
        symptomsSnapshot.forEach((doc) => {
          if (doc.id === "symptoms_data")
            setSymptomsData(doc.data().data || []);
        });

        // Campaigns
        const campaignsSnapshot = await getDocs(collection(db, "campaigns"));
        campaignsSnapshot.forEach((doc) => {
          if (doc.id === "campaigns_data")
            setCampaignsData(doc.data().data || []);
        });

        // Severity
        const severitySnapshot = await getDocs(collection(db, "severity"));
        severitySnapshot.forEach((doc) => {
          if (doc.id === "severity_data")
            setSeverityData(doc.data().data || []);
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching static data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchStaticData();

    // Cleanup listeners on unmount
    return () => {
      unsubscribeReports();
      unsubscribeUsers();
    };
  }, []);

  // Function to add a new report
  const addNewReport = async (newReport) => {
    try {
      const reportId = `report_${Date.now()}`; // Unique ID based on timestamp
      let formattedDate = newReport.date;
      if (formattedDate.includes("T")) {
        formattedDate = formattedDate.split("T")[0]; // Format as YYYY-MM-DD
      }

      const formattedReport = {
        id: reportId,
        type: newReport.illnessType,
        reportedBy: newReport.reportedBy || "Anonymous",
        email: newReport.email || "anonymous@example.com",
        location: newReport.location,
        date: formattedDate,
        severity: newReport.severity,
        status: "Active",
        symptoms: newReport.symptoms || [],
        otherSymptoms: newReport.otherSymptoms || "",
        description: newReport.description || "",
        contactInfected: newReport.contactInfected || false,
        travel: newReport.travel || false,
        medicalAttention: newReport.medicalAttention || false,
        coordinates: newReport.coordinates || [3.866667, 11.516667], // Default to Yaoundé
      };

      // Save to Firestore
      await setDoc(doc(db, "reports", reportId), formattedReport);
      // Note: onSnapshot will automatically update the reports state
    } catch (error) {
      console.error("Error adding new report:", error);
      setError("Failed to add report");
    }
  };

  // Function to add a new user
  const addNewUser = async (newUser) => {
    try {
      const userId = `user_${Date.now()}`; // Unique ID based on timestamp
      const formattedUser = {
        id: userId,
        name: newUser.fullName,
        email: newUser.email,
        role: newUser.role || "User",
        status: "Active",
        reports: 0,
        lastActive: new Date().toISOString().split("T")[0],
        location: newUser.location || "Unknown",
      };

      // Save to Firestore
      await setDoc(doc(db, "users", userId), formattedUser);
      // Note: onSnapshot will automatically update the users state
    } catch (error) {
      console.error("Error adding new user:", error);
      setError("Failed to add user");
    }
  };

  // Context value
  const data = {
    assets,
    feature_list,
    illnessTypes,
    symptoms,
    severityLevels,
    commonIllnesses,
    reportStats,
    userStats,
    recentReports,
    reportTrendData,
    regionData,
    illnessData,
    topRegionsData,
    symptomsData,
    campaignsData,
    users,
    reports,
    trendData,
    adminRegionData,
    severityData,
    illnessDataAdmin,
    addNewReport,
    addNewUser,
    loading,
    error,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

// Custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
