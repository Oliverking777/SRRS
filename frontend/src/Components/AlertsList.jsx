import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function AlertsList() {
  const [alerts, setAlerts] = useState([]);
  
  useEffect(() => {
    // Get active alerts
    const alertsQuery = query(
      collection(db, 'alerts'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(alertsQuery, (snapshot) => {
      const alertsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlerts(alertsList);
    });
    
    return () => unsubscribe();
  }, []);
  
  return (
    <div className="alerts-container">
      <h2>Active Health Alerts</h2>
      {alerts.length === 0 ? (
        <p>No active alerts at this time.</p>
      ) : (
        <div className="alerts-list">
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`alert-card ${alert.type === 'outbreak' ? 'outbreak-alert' : ''}`}
            >
              <div className="alert-header">
                <h3>
                  {alert.type === 'outbreak' 
                    ? `${alert.disease} Outbreak Alert` 
                    : alert.title}
                </h3>
                <span className="alert-badge">{alert.area}</span>
              </div>
              <p className="alert-description">
                {alert.type === 'outbreak'
                  ? `${alert.caseCount} cases of ${alert.disease} detected in ${alert.area}. Take precautions.`
                  : alert.description}
              </p>
              <div className="alert-footer">
                <span className="alert-timestamp">
                  {alert.createdAt?.toDate().toLocaleString() || 'Recent'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlertsList;