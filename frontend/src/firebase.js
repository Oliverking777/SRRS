// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyeFea-GyKwhyK1LWtLNpoo84Aj0RZ4V0",
  authDomain: "record-9587f.firebaseapp.com",
  projectId: "record-9587f",
  storageBucket: "record-9587f.firebasestorage.app",
  messagingSenderId: "1070266167737",
  appId: "1:1070266167737:web:a42c8162425794c818c668",
  measurementId: "G-TWG9P67NR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);