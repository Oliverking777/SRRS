const express = require("express");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} = require("firebase/auth");
const { getFirestore, doc, setDoc, getDoc } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
require("dotenv").config();

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const router = express.Router();

// Signup endpoint
router.post("/signup", async (req, res) => {
  const { email, password, role = "user" } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Add role to Firestore
    await setDoc(doc(db, "users", user.uid), { role });

    // Send email verification
    await sendEmailVerification(user);

    res
      .status(200)
      .json({
        success: true,
        message: "Signup successful. Please verify your email.",
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Check email verification
    if (!user.emailVerified) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please verify your email before logging in.",
        });
    }

    // Get role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.exists() ? userDoc.data().role : "user";

    res.status(200).json({ success: true, role, message: "Login successful." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
