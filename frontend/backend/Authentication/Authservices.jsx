import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { initializeApp, getApp } from "firebase/app";

// Ensure the Firebase configuration is correctly using environment variables
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

const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
export const signup = async (email, password, role = "user") => {
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

    return {
      success: true,
      message: "Signup successful. Please verify your email.",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Check email verification
    if (!user.emailVerified) {
      return {
        success: false,
        message: "Please verify your email before logging in.",
      };
    }

    // Get role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.exists() ? userDoc.data().role : "user";

    return { success: true, role, message: "Login successful." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
