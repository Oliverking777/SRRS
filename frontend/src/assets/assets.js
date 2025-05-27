import heart_rate from './icons8-heart-rate-100.png'
import arrow_right from './icons8-arrow-right-100.png'
import analytics from './icons8-analytics-100.png'
import document from './icons8-document-100.png'
import security from './icons8-security-shield-100.png'
import location from './icons8-location-100.png'
import tick from './icons8-tick-48.png'
import tickred from './icons8-tick1-48.png'
import cross from './cross_icon.png'

export const assets = {
    heart_rate,
    arrow_right,
    tick,
    tickred,
    cross
};

export const feature_list = [
    {
        feature_name: "Easy Data Collection",
        feature_image: document,
        feature_description: "Simple forms to record sickness information and track symptoms in real-time."
    },
    {
        feature_name: "Geographic Mapping",
        feature_image: location,
        feature_description: "Visualize sickness data by region to identify patterns and outbreaks."
    },
    {
        feature_name: "Advanced Analytics",
        feature_image: analytics,
        feature_description: "Comprehensive reporting tools to analyze trends and generate insights."
    },
    {
        feature_name: "Secure & Private",
        feature_image: security,
        feature_description: "Your health data is secured with the latest encryption and privacy controls."
    }
];

export const reportStats = {
    total: 124,
    critical: 12,
    new: 5,
    resolved: 95
};

export const recentReports = [
    { id: 1, title: 'Flu Outbreak', status: 'Critical', date: '2024-07-08' },
    { id: 2, title: 'Food Poisoning', status: 'Warning', date: '2024-07-07' },
    { id: 3, title: 'COVID-19 Cases', status: 'Normal', date: '2024-07-06' },
    { id: 4, title: 'New Virus Strain', status: 'Critical', date: '2024-07-05' }
];

export const illnessTypes = [
    { value: 'covid19', label: 'COVID-19' },
    { value: 'flu', label: 'Influenza' },
    { value: 'cold', label: 'Common Cold' },
    { value: 'foodPoisoning', label: 'Food Poisoning' },
    { value: 'other', label: 'Other' }
];

export const symptoms = [
    { id: 'fever', label: 'Fever' },
    { id: 'headache', label: 'Headache' },
    { id: 'bodyAches', label: 'Body Aches' },
    { id: 'tasteSmell', label: 'Loss of Taste/Smell' },
    { id: 'cough', label: 'Cough' },
    { id: 'soreThroat', label: 'Sore Throat' },
    { id: 'nausea', label: 'Nausea' },
    { id: 'rash', label: 'Rash' },
    { id: 'fatigue', label: 'Fatigue' },
    { id: 'shortnessBreath', label: 'Shortness of Breath' },
    { id: 'diarrhea', label: 'Diarrhea' }
];

export const severityLevels = [
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' },
    { value: 'critical', label: 'Critical' }
];

export const commonIllnesses = [
    { name: 'Respiratory Infections', percentage: 65 },
    { name: 'Gastrointestinal', percentage: 42 },
    { name: 'Viral Infections', percentage: 28 },
    { name: 'Allergic Reactions', percentage: 15 }
];

// Admin Dashboard Data
export const reportTrendData = [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 160 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 210 },
    { name: "Fri", value: 280 },
    { name: "Sat", value: 160 },
    { name: "Sun", value: 140 },
];

export const regionData = [
    { name: "North Region", value: 35, color: "#4169E1" },
    { name: "South Region", value: 25, color: "#39A9DB" },
    { name: "East Region", value: 20, color: "#6B5B95" },
    { name: "West Region", value: 15, color: "#FF6B8B" },
    { name: "Central Area", value: 5, color: "#8A2BE2" },
];

export const illnessData = [
    { name: "Jan", Respiratory: 380, Gastrointestinal: 240, Viral: 320 },
    { name: "Feb", Respiratory: 300, Gastrointestinal: 220, Viral: 280 },
    { name: "Mar", Respiratory: 500, Gastrointestinal: 340, Viral: 220 },
    { name: "Apr", Respiratory: 450, Gastrointestinal: 260, Viral: 290 },
    { name: "May", Respiratory: 380, Gastrointestinal: 280, Viral: 230 },
    { name: "Jun", Respiratory: 410, Gastrointestinal: 320, Viral: 270 },
    { name: "Jul", Respiratory: 580, Gastrointestinal: 350, Viral: 300 },
];

export const topRegionsData = [
    { name: "North Region", value: 34 },
    { name: "South Region", value: 26 },
    { name: "East Region", value: 22 },
    { name: "West Region", value: 18 },
];

export const symptomsData = [
    { name: "Fever", value: 64 },
    { name: "Cough", value: 52 },
    { name: "Fatigue", value: 38 },
    { name: "Headache", value: 27 },
];

export const campaignsData = [
    { name: "Respiratory Awareness", value: 75 },
    { name: "Handwashing Initiative", value: 90 },
    { name: "Vaccination Outreach", value: 60 },
    { name: "Health Screenings", value: 40 },
];

// Geo Distribution Data
export const districtsData = [
    { 
        id: 1, 
        name: "Yaoundé 1 (Centre)", 
        coordinates: [3.866667, 11.516667], 
        count: 245, 
        density: "High"
    },
    { 
        id: 8, 
        name: "Ngousso (Centre)", 
        coordinates: [4.866667, 8.516667], 
        count: 500, 
        density: "High"
    },
    { 
        id: 2, 
        name: "Yaoundé 2 (Tsinga)", 
        coordinates: [3.883333, 11.500000], 
        count: 187, 
        density: "Medium"
    },
    { 
        id: 3, 
        name: "Yaoundé 3 (Efoulan)", 
        coordinates: [3.833333, 11.483333], 
        count: 213, 
        density: "High" 
    },
    { 
        id: 4, 
        name: "Yaoundé 4 (Kondengui)", 
        coordinates: [3.850000, 11.533333], 
        count: 156, 
        density: "Medium" 
    },
    { 
        id: 5, 
        name: "Yaoundé 5 (Essos)", 
        coordinates: [3.883333, 11.533333], 
        count: 178, 
        density: "Medium" 
    },
    { 
        id: 6, 
        name: "Yaoundé 6 (Biyem-Assi)", 
        coordinates: [3.816667, 11.483333], 
        count: 267, 
        density: "High" 
    },
    { 
        id: 7, 
        name: "Yaoundé 7 (Nkolbisson)", 
        coordinates: [3.866667, 11.450000], 
        count: 132, 
        density: "Low" 
    }
];

// Admin Users Data
export const initialUsers = [
    {
        id: 1,
        name: 'Olivia Martin',
        email: 'olivia.martin@example.com',
        role: 'User',
        status: 'Active',
        reports: 24,
        lastActive: '2 hours ago',
        location: 'North Region'
    },
    {
        id: 2,
        name: 'Jackson Lee',
        email: 'jackson.lee@example.com',
        role: 'User',
        status: 'Active',
        reports: 13,
        lastActive: '4 hours ago',
        location: 'East Region'
    },
    {
        id: 3,
        name: 'Isabella Nguyen',
        email: 'isabella.nguyen@example.com',
        role: 'Researcher',
        status: 'Active',
        reports: 42,
        lastActive: '1 day ago',
        location: 'South Region'
    },
    {
        id: 4,
        name: 'William Chen',
        email: 'william.chen@example.com',
        role: 'Healthcare',
        status: 'Active',
        reports: 31,
        lastActive: '2 days ago',
        location: 'West Region'
    },
    {
        id: 5,
        name: 'Sofia Rodriguez',
        email: 'sofia.rodriguez@example.com',
        role: 'Admin',
        status: 'Active',
        reports: 56,
        lastActive: 'Just now',
        location: 'Central Area'
    },
    {
        id: 6,
        name: 'Ethan Johnson',
        email: 'ethan.johnson@example.com',
        role: 'User',
        status: 'Inactive',
        reports: 7,
        lastActive: '2 weeks ago',
        location: 'North Region'
    },
    {
        id: 7,
        name: 'Mia Williams',
        email: 'mia.williams@example.com',
        role: 'Researcher',
        status: 'Pending',
        reports: 0,
        lastActive: 'Never',
        location: 'East Region'
    }
];

// Admin Reports Data
export const reports = [
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

export const trendData = [
    { date: "Jun 1", newReports: 23, resolvedCases: 15 },
    { date: "Jun 8", newReports: 28, resolvedCases: 22 },
    { date: "Jun 15", newReports: 35, resolvedCases: 25 },
    { date: "Jun 22", newReports: 42, resolvedCases: 30 },
    { date: "Jun 29", newReports: 38, resolvedCases: 32 },
    { date: "Jul 6", newReports: 50, resolvedCases: 35 },
];

export const adminRegionData = [
    { region: "North", active: 45, resolved: 30 },
    { region: "South", active: 30, resolved: 20 },
    { region: "East", active: 25, resolved: 15 },
    { region: "West", active: 20, resolved: 10 },
    { region: "Central", active: 15, resolved: 5 },
];

export const severityData = [
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

export const illnessDataAdmin = [
    { name: "Respiratory", value: 62, color: "#4263EB" },
    { name: "Gastrointestinal", value: 19, color: "#4DABF7" },
    { name: "Viral", value: 10, color: "#5F3DC4" },
    { name: "Allergic", value: 5, color: "#FA5252" },
    { name: "Other", value: 5, color: "#7950F2" },
];