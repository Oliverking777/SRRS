import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  // ...existing code...
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Initialize notifications collection reference
const notificationsRef = collection(db, "notifications");

export { db, notificationsRef };
