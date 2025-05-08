import React, { createContext, useContext, useState } from 'react';
import {
  assets,
  feature_list,
  illnessTypes,
  symptoms,
  severityLevels,
  commonIllnesses,
  reportTrendData,
  regionData,
  illnessData,
  topRegionsData,
  symptomsData,
  campaignsData,
  districtsData,
  initialUsers,
  trendData,
  adminRegionData,
  severityData,
  illnessDataAdmin
} from '../../assets/assets';

// Initial reports data (from assets)
const initialReports = [
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
];

// Create the context
const DataContext = createContext();

// Create the provider component
export const DataProvider = ({ children }) => {
  const [reports, setReports] = useState(initialReports);
  const [recentReports, setRecentReports] = useState([
    { id: 1, title: 'Flu Outbreak', status: 'Critical', date: '2024-07-08' },
    { id: 2, title: 'Food Poisoning', status: 'Warning', date: '2024-07-07' },
    { id: 3, title: 'COVID-19 Cases', status: 'Normal', date: '2024-07-06' },
    { id: 4, title: 'New Virus Strain', status: 'Critical', date: '2024-07-05' }
  ]);
  const [users, setUsers] = useState(initialUsers);

  // Compute reportStats dynamically from reports
  const reportStats = {
    total: reports.length,
    critical: reports.filter(r => r.severity === 'Critical').length,
    new: reports.filter(r => {
      const reportDate = new Date(r.date);
      const today = new Date();
      return (
        reportDate.getFullYear() === today.getFullYear() &&
        reportDate.getMonth() === today.getMonth() &&
        reportDate.getDate() === today.getDate()
      );
    }).length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
  };

  // Compute userStats dynamically from users
  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    newRegistrations: users.filter(u => {
      const lastActive = new Date(u.lastActive);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastActive >= thirtyDaysAgo;
    }).length,
    healthcare: users.filter(u => u.role === 'Healthcare').length,
  };

  // Function to add a new report
  const addNewReport = (newReport) => {
    const reportId = reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1;
    const formattedReport = {
      id: reportId,
      type: newReport.illnessType,
      reportedBy: newReport.reportedBy || 'Anonymous',
      email: newReport.email || 'anonymous@example.com',
      location: newReport.location,
      date: newReport.date,
      severity: newReport.severity,
      status: 'Active', // Default status for new reports
    };

    // Update reports
    setReports(prev => [formattedReport, ...prev]);

    // Update recentReports (limit to 4 most recent)
    const recentReportEntry = {
      id: reportId,
      title: `${newReport.illnessType} Report`,
      status: newReport.severity === 'Critical' ? 'Critical' : 'Normal',
      date: newReport.date.split('T')[0], // Format date as YYYY-MM-DD
    };
    setRecentReports(prev => {
      const updated = [recentReportEntry, ...prev].slice(0, 4);
      return updated;
    });
  };

  // Function to add a new user
  const addNewUser = (newUser) => {
    const userId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const formattedUser = {
      id: userId,
      name: newUser.fullName,
      email: newUser.email,
      role: newUser.role || 'User', // Default to 'User' if not specified
      status: 'Active', // Default status for new users
      reports: 0, // New users start with 0 reports
      lastActive: new Date().toISOString().split('T')[0], // Current date as YYYY-MM-DD
      location: newUser.location || 'Unknown', // Default to 'Unknown' if not provided
    };

    // Update users
    setUsers(prev => [formattedUser, ...prev]);
  };

  const data = {
    assets,
    feature_list,
    reportStats,
    recentReports,
    illnessTypes,
    symptoms,
    severityLevels,
    commonIllnesses,
    reportTrendData,
    regionData,
    illnessData,
    topRegionsData,
    symptomsData,
    campaignsData,
    districtsData,
    initialUsers,
    users,
    userStats,
    reports,
    trendData,
    adminRegionData,
    severityData,
    illnessDataAdmin,
    addNewReport,
    addNewUser,
  };

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};