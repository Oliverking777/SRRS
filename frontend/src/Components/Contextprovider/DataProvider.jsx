import React, { createContext, useState, useEffect, useContext } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [reportStats, setReportStats] = useState({ total: 0, monthly: 0 });
  const [userStats, setUserStats] = useState({ active: 0, total: 0 });
  const [reportTrendData, setReportTrendData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [illnessData, setIllnessData] = useState([]);

  useEffect(() => {
    // Fetch Reports Stats
    const reportsQuery = query(
      collection(db, "sickness_reports"),
      orderBy("createdAt", "desc")
    );

    const unsubscribeReports = onSnapshot(reportsQuery, (snapshot) => {
      const reports = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Calculate stats
      const total = reports.length;
      const monthlyReports = reports.filter((report) => {
        const reportDate = report.createdAt.toDate();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return reportDate >= thirtyDaysAgo;
      });

      setReportStats({
        total,
        monthly: monthlyReports.length,
      });

      // Process region data
      const regionCounts = reports.reduce((acc, report) => {
        acc[report.location] = (acc[report.location] || 0) + 1;
        return acc;
      }, {});

      const regionColors = {
        "north-region": "#4169E1",
        "south-region": "#FF6B8B",
        "east-region": "#39A9DB",
        "west-region": "#10B981",
        "central-area": "#8B5CF6",
        "east-area": "#F59E0B",
      };

      setRegionData(
        Object.entries(regionCounts).map(([name, value]) => ({
          name,
          value,
          color: regionColors[name] || "#CBD5E1",
        }))
      );

      // Process illness trends
      const illnessCounts = reports.reduce((acc, report) => {
        acc[report.illnessType] = (acc[report.illnessType] || 0) + 1;
        return acc;
      }, {});

      setIllnessData(
        Object.entries(illnessCounts).map(([name, value]) => ({
          name,
          value,
        }))
      );

      // Process trend data (last 7 days)
      const last7Days = [...Array(7)]
        .map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split("T")[0];
        })
        .reverse();

      const trendData = last7Days.map((date) => ({
        name: date,
        value: reports.filter(
          (report) =>
            report.createdAt.toDate().toISOString().split("T")[0] === date
        ).length,
      }));

      setReportTrendData(trendData);
    });

    // Fetch User Stats
    const usersQuery = query(collection(db, "users"));
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const total = snapshot.size;
      const active = snapshot.docs.filter(
        (doc) =>
          doc.data().lastActive >= new Date(Date.now() - 24 * 60 * 60 * 1000)
      ).length;

      setUserStats({
        total,
        active,
      });
    });

    return () => {
      unsubscribeReports();
      unsubscribeUsers();
    };
  }, []);

  return (
    <DataContext.Provider
      value={{
        reportStats,
        userStats,
        reportTrendData,
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
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
