// backend/SickNessForm/sicknessReportApi.js
const express = require("express");
const { initializeApp, getApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
require("dotenv").config();

const router = express.Router();

// Firebase config (use your .env values)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
let app;
try {
  app = getApp();
} catch {
  app = initializeApp(firebaseConfig);
}
const db = getFirestore(app);

// POST /api/sickness-report
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
    publicReport: publicReport !== false, // default true
    reportedBy: reportedBy || "",
    email: email || "",
    createdAt: new Date().toISOString(),
  };

  try {
    await addDoc(collection(db, "sicknessReports"), reportData);
    return res
      .status(201)
      .json({ success: true, message: "Report submitted successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to submit report.", details: err.message });
  }
});

module.exports = router;
