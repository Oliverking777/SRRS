import { db } from "./firebase.js";
import { collection, setDoc, doc } from "firebase/firestore";

const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // Seed reports collection
    await setDoc(doc(db, "reports", "report_001"), {
      id: "report_001",
      type: "Respiratory Infection",
      reportedBy: "John Doe",
      email: "john@example.com",
      location: "North Region",
      date: "2025-05-20",
      severity: "Moderate",
      status: "Active",
      symptoms: ["Fever", "Cough", "Fatigue"],
      otherSymptoms: "",
      description: "Patient experiencing persistent cough and mild fever",
      contactInfected: false,
      travel: false,
      medicalAttention: true,
      coordinates: [3.966667, 11.616667],
    });

    await setDoc(doc(db, "reports", "report_002"), {
      id: "report_002",
      type: "Gastrointestinal Illness",
      reportedBy: "Jane Smith",
      email: "jane@example.com",
      location: "South Region",
      date: "2025-05-21",
      severity: "Severe",
      status: "Active",
      symptoms: ["Nausea", "Diarrhea", "Fever"],
      otherSymptoms: "Severe dehydration",
      description: "Acute gastroenteritis with severe symptoms",
      contactInfected: true,
      travel: true,
      medicalAttention: true,
      coordinates: [2.916667, 11.500000],
    });

    await setDoc(doc(db, "reports", "report_003"), {
      id: "report_003",
      type: "Viral Infection",
      reportedBy: "Mike Johnson",
      email: "mike@example.com",
      location: "East Region",
      date: "2025-05-19",
      severity: "Mild",
      status: "Resolved",
      symptoms: ["Fatigue", "Fever"],
      otherSymptoms: "",
      description: "Common viral infection, recovered quickly",
      contactInfected: false,
      travel: false,
      medicalAttention: false,
      coordinates: [4.050000, 12.350000],
    });

    // Seed users collection
    await setDoc(doc(db, "users", "user_001"), {
      id: "user_001",
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@health.gov",
      role: "Healthcare",
      status: "Active",
      reports: 15,
      lastActive: "2025-05-25",
      location: "North Region",
    });

    await setDoc(doc(db, "users", "user_002"), {
      id: "user_002",
      name: "Mark Thompson",
      email: "mark.thompson@example.com",
      role: "User",
      status: "Active",
      reports: 3,
      lastActive: "2025-05-24",
      location: "South Region",
    });

    await setDoc(doc(db, "users", "user_003"), {
      id: "user_003",
      name: "Dr. Alex Chen",
      email: "alex.chen@hospital.org",
      role: "Healthcare",
      status: "Active",
      reports: 22,
      lastActive: "2025-05-26",
      location: "East Region",
    });

    // Seed trends collection
    await setDoc(doc(db, "trends", "report_trend_weekly"), {
      data: [
        { name: "Mon", value: 45 },
        { name: "Tue", value: 52 },
        { name: "Wed", value: 38 },
        { name: "Thu", value: 61 },
        { name: "Fri", value: 55 },
        { name: "Sat", value: 42 },
        { name: "Sun", value: 48 },
      ],
    });

    await setDoc(doc(db, "trends", "admin_trend"), {
      data: [
        { name: "Jan", reports: 120, users: 890 },
        { name: "Feb", reports: 135, users: 920 },
        { name: "Mar", reports: 158, users: 1050 },
        { name: "Apr", reports: 142, users: 1180 },
        { name: "May", reports: 165, users: 1250 },
      ],
    });

    // Seed regions collection
    await setDoc(doc(db, "regions", "region_data"), {
      data: [
        { name: "North Region", value: 35, color: "#FF6B8B" },
        { name: "South Region", value: 28, color: "#39A9DB" },
        { name: "East Region", value: 22, color: "#4169E1" },
        { name: "West Region", value: 15, color: "#32CD32" },
      ],
    });

    await setDoc(doc(db, "regions", "top_regions"), {
      data: [
        { name: "North Region", cases: 185, change: "+12%" },
        { name: "South Region", cases: 142, change: "+8%" },
        { name: "East Region", cases: 98, change: "-3%" },
        { name: "West Region", cases: 67, change: "+15%" },
      ],
    });

    await setDoc(doc(db, "regions", "admin_region_data"), {
      data: [
        { name: "North", value: 180, color: "#FF6B8B" },
        { name: "South", value: 145, color: "#39A9DB" },
        { name: "East", value: 120, color: "#4169E1" },
        { name: "West", value: 85, color: "#32CD32" },
        { name: "Center", value: 95, color: "#FFD700" },
      ],
    });

    // Seed illnesses collection
    await setDoc(doc(db, "illnesses", "illness_data"), {
      data: [
        { name: "Respiratory", value: 40, color: "#FF6B8B" },
        { name: "Gastrointestinal", value: 25, color: "#39A9DB" },
        { name: "Viral", value: 20, color: "#4169E1" },
        { name: "Bacterial", value: 10, color: "#32CD32" },
        { name: "Allergic", value: 5, color: "#FFD700" },
      ],
    });

    await setDoc(doc(db, "illnesses", "illness_data_admin"), {
      data: [
        { name: "Respiratory Infection", cases: 245, percentage: 38.2 },
        { name: "Gastrointestinal Illness", cases: 156, percentage: 24.3 },
        { name: "Viral Infection", cases: 134, percentage: 20.9 },
        { name: "Food Poisoning", cases: 78, percentage: 12.2 },
        { name: "Allergic Reaction", cases: 28, percentage: 4.4 },
      ],
    });

    // Seed symptoms collection
    await setDoc(doc(db, "symptoms", "symptoms_data"), {
      data: [
        { name: "Fever", count: 320, percentage: 45.2 },
        { name: "Cough", count: 285, percentage: 40.3 },
        { name: "Fatigue", count: 198, percentage: 28.0 },
        { name: "Nausea", count: 156, percentage: 22.1 },
        { name: "Diarrhea", count: 134, percentage: 18.9 },
        { name: "Rash", count: 89, percentage: 12.6 },
      ],
    });

    // Seed campaigns collection
    await setDoc(doc(db, "campaigns", "campaigns_data"), {
      data: [
        {
          id: 1,
          title: "Respiratory Health Awareness",
          description: "Campaign to raise awareness about respiratory infections",
          startDate: "2025-05-01",
          endDate: "2025-06-30",
          status: "Active",
          reach: 12500,
          engagement: "8.5%",
        },
        {
          id: 2,
          title: "Food Safety Initiative",
          description: "Educational campaign on preventing food-borne illnesses",
          startDate: "2025-04-15",
          endDate: "2025-05-31",
          status: "Active",
          reach: 8900,
          engagement: "12.3%",
        },
        {
          id: 3,
          title: "Vaccination Drive",
          description: "Promoting seasonal flu vaccination",
          startDate: "2025-03-01",
          endDate: "2025-04-30",
          status: "Completed",
          reach: 15600,
          engagement: "15.7%",
        },
      ],
    });

    // Seed severity collection
    await setDoc(doc(db, "severity", "severity_data"), {
      data: [
        { name: "Mild", value: 45, color: "#32CD32" },
        { name: "Moderate", value: 35, color: "#FFD700" },
        { name: "Severe", value: 15, color: "#FF8C00" },
        { name: "Critical", value: 5, color: "#FF4500" },
      ],
    });

    console.log("Database seeded successfully!");
    console.log("Seeded collections:");
    console.log("- reports: 3 documents");
    console.log("- users: 3 documents");
    console.log("- trends: 2 documents");
    console.log("- regions: 3 documents");
    console.log("- illnesses: 2 documents");
    console.log("- symptoms: 1 document");
    console.log("- campaigns: 1 document");
    console.log("- severity: 1 document");

  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
