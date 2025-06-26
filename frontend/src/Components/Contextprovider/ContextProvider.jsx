import React, { createContext, useState, useEffect, useContext } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Query sickness_reports collection instead of reports
        const reportsQuery = query(
          collection(db, "sickness_reports"),
          orderBy("createdAt", "desc")
        );

        const usersQuery = query(
          collection(db, "users"),
          orderBy("createdAt", "desc")
        );

        const unsubscribeReports = onSnapshot(reportsQuery, (snapshot) => {
          const reportsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().createdAt?.toDate().toLocaleDateString(),
          }));
          setReports(reportsList);
        });

        const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
          const usersList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(usersList);
        });

        setLoading(false);
        return () => {
          unsubscribeReports();
          unsubscribeUsers();
        };
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate report stats
  const reportStats = {
    total: reports.length,
    critical: reports.filter((r) => r.severity === "Critical").length,
    new: reports.filter((r) => {
      if (!r.createdAt) return false;
      const reportDate = r.createdAt.toDate
        ? r.createdAt.toDate()
        : new Date(r.createdAt);
      const today = new Date();
      return reportDate.toDateString() === today.toDateString();
    }).length,
    resolved: reports.filter((r) => r.status === "Resolved").length,
  };

  // Calculate region data
  const regionData = reports.reduce((acc, report) => {
    const region = report.location || "Unknown";
    const existing = acc.find((item) => item.region === region);
    if (existing) {
      existing.active += report.status === "Active" ? 1 : 0;
      existing.resolved += report.status === "Resolved" ? 1 : 0;
      existing[report.severity.toLowerCase()] =
        (existing[report.severity.toLowerCase()] || 0) + 1;
      existing.total += 1;
    } else {
      acc.push({
        region,
        active: report.status === "Active" ? 1 : 0,
        resolved: report.status === "Resolved" ? 1 : 0,
        mild: report.severity === "Mild" ? 1 : 0,
        moderate: report.severity === "Moderate" ? 1 : 0,
        severe: report.severity === "Severe" ? 1 : 0,
        critical: report.severity === "Critical" ? 1 : 0,
        total: 1,
      });
    }
    return acc;
  }, []);

  // Calculate illness data
  const illnessData = reports.reduce((acc, report) => {
    const illnessType = report.illnessType || "Unknown";
    const existing = acc.find((item) => item.name === illnessType);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({
        name: illnessType,
        value: 1,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      });
    }
    return acc;
  }, []);

  return (
    <DataContext.Provider
      value={{
        reports,
        users,
        loading,
        error,
        reportStats,
        regionData,
        illnessData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProviderss");
  }
  return context;
};
