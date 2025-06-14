import { collection, query, where, getDocs, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

// Alert thresholds
const CRITICAL_THRESHOLD = 10;
const HIGH_THRESHOLD = 7;
const MEDIUM_THRESHOLD = 4;

export const checkAndCreateAlert = async (newReport) => {
  try {
    const region = newReport.location;
    
    // Get reports from the same region in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const reportsQuery = query(
      collection(db, 'reports'),
      where('location', '==', region),
      where('date', '>=', sevenDaysAgo.toISOString())
    );
    
    const reportsSnapshot = await getDocs(reportsQuery);
    const reportsCount = reportsSnapshot.size;
    
    // Determine alert level based on count
    let alertLevel = null;
    if (reportsCount >= CRITICAL_THRESHOLD) {
      alertLevel = 'critical';
    } else if (reportsCount >= HIGH_THRESHOLD) {
      alertLevel = 'high';
    } else if (reportsCount >= MEDIUM_THRESHOLD) {
      alertLevel = 'medium';
    }
    
    // If alert threshold reached, create alert
    if (alertLevel) {
      await createAlert(region, alertLevel, reportsCount, newReport.illnessType);
    }
    
    return alertLevel;
  } catch (error) {
    console.error('Error checking for alerts:', error);
    return null;
  }
};

const createAlert = async (region, level, count, illnessType) => {
  try {
    // Create alert document
    await addDoc(collection(db, 'alerts'), {
      region: region,
      level: level,
      count: count,
      illnessType: illnessType,
      createdAt: serverTimestamp(),
      status: 'active',
      notifiedUsers: false
    });
    
    // In a real app, you'd handle notifications here
    // Since we can't use Firebase Functions for push notifications,
    // we'll use browser notifications if available
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`${level.charAt(0).toUpperCase() + level.slice(1)} Health Alert in ${region}`, {
        body: `Increased ${illnessType} cases reported in your area. Take precautions.`
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error creating alert:', error);
    return false;
  }
};


