const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Monitor for disease outbreaks (10+ cases in same area)
exports.monitorDiseaseOutbreaks = functions.firestore
  .document('cases/{caseId}')
  .onCreate(async (snapshot, context) => {
    const newCase = snapshot.data();
    const { disease, area } = newCase;
    
    // Count cases with same disease in same area
    const casesRef = admin.firestore().collection('cases');
    const query = casesRef
      .where('disease', '==', disease)
      .where('area', '==', area);
    
    const snapshot = await query.get();
    const caseCount = snapshot.size;
    
    // If 10+ cases, create alert
    if (caseCount >= 10) {
      // Create alert document
      const alertRef = admin.firestore().collection('alerts').doc();
      await alertRef.set({
        type: 'outbreak',
        disease,
        area,
        caseCount,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'active'
      });
      
      // Send notification to users in that area
      await sendAreaAlert(disease, area);
    }
  });

// Process scheduled manual alerts
exports.processManualAlerts = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    
    // Get all scheduled alerts that should be sent now
    const alertsRef = admin.firestore().collection('manualAlerts');
    const query = alertsRef
      .where('status', '==', 'scheduled')
      .where('alertTime', '<=', now);
    
    const snapshot = await query.get();
    
    if (snapshot.empty) return null;
    
    // Process each alert
    const batch = admin.firestore().batch();
    
    for (const doc of snapshot.docs) {
      const alert = doc.data();
      
      // Mark as sent
      batch.update(doc.ref, { status: 'sent', sentAt: now });
      
      // Send notification to users in the specified area
      if (alert.area) {
        await sendAreaAlert(alert.title, alert.description, alert.area, alert.severity);
      }
    }
    
    await batch.commit();
    return null;
  });

async function sendAreaAlert(title, body, area, severity) {
  // Get users in the affected area
  const usersRef = admin.firestore().collection('users');
  const areaUsers = await usersRef.where('area', '==', area).get();
  
  if (areaUsers.empty) return;
  
  // Prepare notification
  const message = {
    notification: {
      title,
      body
    },
    data: {
      type: 'manual',
      area,
      severity
    }
  };
  
  // Send to each user with FCM token
  const tokens = [];
  areaUsers.forEach(doc => {
    const user = doc.data();
    if (user.fcmToken) tokens.push(user.fcmToken);
  });
  
  if (tokens.length > 0) {
    await admin.messaging().sendMulticast({
      tokens,
      ...message
    });
  }
}


