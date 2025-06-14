const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Alert thresholds (can be moved to Firestore settings collection)
const CRITICAL_THRESHOLD = 10; // From your AdminSettings component
const HIGH_THRESHOLD = 7;
const MEDIUM_THRESHOLD = 4;

exports.monitorRegionAlerts = functions.firestore
  .document('reports/{reportId}')
  .onCreate(async (snapshot, context) => {
    const newReport = snapshot.data();
    const region = newReport.location;
    
    try {
      // Get reports from the same region in the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const reportsQuery = await admin.firestore()
        .collection('reports')
        .where('location', '==', region)
        .where('date', '>=', sevenDaysAgo.toISOString())
        .get();
      
      const reportsCount = reportsQuery.size;
      
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
      
      return null;
    } catch (error) {
      console.error('Error monitoring region alerts:', error);
      return null;
    }
  });

async function createAlert(region, level, count, illnessType) {
  try {
    // Create alert document
    const alertRef = admin.firestore().collection('alerts').doc();
    
    await alertRef.set({
      region: region,
      level: level,
      count: count,
      illnessType: illnessType,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
      notifiedUsers: false
    });
    
    // Trigger notification to users in the region
    await notifyUsersInRegion(region, level, illnessType);
    
    return alertRef.id;
  } catch (error) {
    console.error('Error creating alert:', error);
    throw error;
  }
}

async function notifyUsersInRegion(region, level, illnessType) {
  try {
    // Get all users in the affected region
    const usersQuery = await admin.firestore()
      .collection('users')
      .where('region', '==', region)
      .get();
    
    const tokens = [];
    usersQuery.forEach(doc => {
      const userData = doc.data();
      if (userData.fcmToken) {
        tokens.push(userData.fcmToken);
      }
    });
    
    if (tokens.length === 0) return;
    
    // Create notification message
    const message = {
      notification: {
        title: `${level.charAt(0).toUpperCase() + level.slice(1)} Health Alert in ${region}`,
        body: `Increased ${illnessType} cases reported in your area. Take precautions.`
      },
      data: {
        type: 'health_alert',
        region: region,
        level: level,
        illnessType: illnessType
      },
      tokens: tokens
    };
    
    // Send notification
    await admin.messaging().sendMulticast(message);
    
    // Update alert as notified
    await admin.firestore()
      .collection('alerts')
      .where('region', '==', region)
      .where('status', '==', 'active')
      .where('notifiedUsers', '==', false)
      .get()
      .then(snapshot => {
        const batch = admin.firestore().batch();
        snapshot.forEach(doc => {
          batch.update(doc.ref, { notifiedUsers: true });
        });
        return batch.commit();
      });
      
  } catch (error) {
    console.error('Error notifying users:', error);
  }
}