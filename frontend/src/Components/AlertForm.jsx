import React, { useState } from 'react';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have auth context

function AlertForm() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    alertTime: '',
    area: '',
    severity: 'medium'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create a new alert document
      const alertRef = doc(collection(db, 'manualAlerts'));
      await setDoc(alertRef, {
        ...formData,
        createdBy: currentUser.uid,
        createdAt: new Date(),
        status: 'scheduled',
        alertTime: new Date(formData.alertTime)
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        alertTime: '',
        area: '',
        severity: 'medium'
      });
      
      alert('Alert scheduled successfully!');
    } catch (error) {
      console.error('Error creating alert:', error);
      alert('Failed to schedule alert');
    }
  };
  
  return (
    <div className="alert-form-container">
      <h2>Schedule Health Alert</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Alert Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Alert Time</label>
          <input 
            type="datetime-local" 
            name="alertTime" 
            value={formData.alertTime} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Area</label>
          <input 
            type="text" 
            name="area" 
            value={formData.area} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Severity</label>
          <select 
            name="severity" 
            value={formData.severity} 
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <button type="submit" className="submit-btn">Schedule Alert</button>
      </form>
    </div>
  );
}

export default AlertForm;