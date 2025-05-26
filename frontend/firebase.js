// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP7VYV_Ta0Px3hc8E4VhdliG9U8cbdKIk",
  authDomain: "geodata-d0f72.firebaseapp.com",
  projectId: "geodata-d0f72",
  storageBucket: "geodata-d0f72.firebasestorage.app",
  messagingSenderId: "89747535779",
  appId: "1:89747535779:web:92f993dcf2b8abe4000c16",
  measurementId: "G-WN2B7KP4L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export {db}