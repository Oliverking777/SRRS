import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { checkAndCreateAlert } from '../services/AlertService';

const ReportForm = () => {
  // Your existing form state and handlers...

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create the report object
      const newReport = {
        // Your existing report fields...
        location: region, // Make sure you have this field
        illnessType: illness, // Make sure you have this field
        date: new Date().toISOString(),
        // Other fields...
      };
      
      // Add the report to Firestore
      const docRef = await addDoc(collection(db, 'reports'), newReport);
      
      // Check if this report triggers an alert
      const alertLevel = await checkAndCreateAlert(newReport);
      
      if (alertLevel) {
        console.log(`Created a ${alertLevel} alert for ${region}`);
        // Optionally show a notification to the user
        alert(`A ${alertLevel} alert has been created for ${region} due to increased ${illness} cases.`);
      }
      
      // Reset form or navigate away...
      
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  // Rest of your component...
}