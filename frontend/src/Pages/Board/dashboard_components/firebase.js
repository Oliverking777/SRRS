// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyeFea-GyKwhyK1LWtLNpoo84Aj0RZ4V0",
  authDomain: "record-9587f.firebaseapp.com",
  projectId: "record-9587f",
  storageBucket: "record-9587f.appspot.com", // fixed typo: storageBucket must end with .app**spot**.com
  messagingSenderId: "1070266167737",
  appId: "1:1070266167737:web:a42c8162425794c818c668",
  measurementId: "G-TWG9P67NR1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
