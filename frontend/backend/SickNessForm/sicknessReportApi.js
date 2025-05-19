import express from "express";
import { initializeApp, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const router = express.Router();

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app;
try {
  app = getApp();
} catch {
  app = initializeApp(firebaseConfig);
}
const db = getFirestore(app);

router.post("/sickness-report", async (req, res) => {
  const {
    illnessType,
    symptoms,
    otherSymptoms,
    severity,
    startDate,
    location,
    description,
    contactInfected,
    travel,
    medicalAttention,
    publicReport,
    reportedBy,
    email,
  } = req.body;

  // Validate required fields
  if (!illnessType)
    return res.status(400).json({ error: "Type of illness is required." });
  if ((!symptoms || symptoms.length === 0) && !otherSymptoms) {
    return res
      .status(400)
      .json({ error: "At least one symptom or other symptoms is required." });
  }
  if (!severity)
    return res.status(400).json({ error: "Severity level is required." });
  if (!startDate)
    return res.status(400).json({ error: "Start date is required." });
  if (!location)
    return res.status(400).json({ error: "Location is required." });

  // Prepare data for Firestore
  const reportData = {
    illnessType,
    symptoms: symptoms || [],
    otherSymptoms: otherSymptoms || "",
    severity,
    startDate,
    location,
    description: description || "",
    contactInfected: !!contactInfected,
    travel: !!travel,
    medicalAttention: !!medicalAttention,
    publicReport: publicReport !== false,
    reportedBy: reportedBy || "",
    email: email || "",
    createdAt: new Date().toISOString(),
  };

  try {
    const docRef = await addDoc(collection(db, "sicknessReports"), reportData);
    return res.status(201).json({
      success: true,
      message: "Report submitted successfully.",
      reportId: docRef.id,
    });
  } catch (err) {
    console.error("Error submitting report:", err);
    return res.status(500).json({
      error: "Failed to submit report.",
      details: err.message,
    });
  }
});

export default router;
