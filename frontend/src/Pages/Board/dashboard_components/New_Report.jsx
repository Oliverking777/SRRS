import React, { useState } from 'react';
import './Newreport.css';
import { illnessTypes, symptoms, severityLevels, commonIllnesses } from '../../../assets/assets';
import { useData } from '../../../Components/Contextprovider/ContextProvider';

const New_Report = () => {
  const { addNewReport } = useData();
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    illnessType: '',
    symptoms: [],
    otherSymptoms: '',
    severity: '',
    startDate: '',
    location: '',
    description: '',
    contactInfected: false,
    travel: false,
    medicalAttention: false,
    publicReport: true,
    reportedBy: '',
    email: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSymptomChange = (symptomId) => {
    setFormData(prev => {
      const symptoms = prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(id => id !== symptomId)
        : [...prev.symptoms, symptomId];
      return { ...prev, symptoms };
    });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.illnessType) {
      setError('Please select a type of illness.');
      return;
    }
    if (formData.symptoms.length === 0 && !formData.otherSymptoms) {
      setError('Please select at least one symptom or describe other symptoms.');
      return;
    }
    if (!formData.severity) {
      setError('Please select a severity level.');
      return;
    }
    if (!formData.startDate) {
      setError('Please specify when symptoms started.');
      return;
    }
    if (!formData.location) {
      setError('Please provide a location.');
      return;
    }

    // Prepare report data
    const reportData = {
      illnessType: illnessTypes.find(illness => illness.value === formData.illnessType)?.label || formData.illnessType,
      reportedBy: formData.reportedBy,
      email: formData.email,
      location: formData.location,
      date: new Date(formData.startDate).toISOString(),
      severity: severityLevels.find(level => level.value === formData.severity)?.label || formData.severity,
      symptoms: formData.symptoms.map(id => symptoms.find(s => s.id === id)?.label).filter(Boolean),
      otherSymptoms: formData.otherSymptoms,
      description: formData.description,
      contactInfected: formData.contactInfected,
      travel: formData.travel,
      medicalAttention: formData.medicalAttention,
      publicReport: formData.publicReport,
    };

    // Submit report
    addNewReport(reportData);
    setError('');
    // Reset form
    setFormData({
      illnessType: '',
      symptoms: [],
      otherSymptoms: '',
      severity: '',
      startDate: '',
      location: '',
      description: '',
      contactInfected: false,
      travel: false,
      medicalAttention: false,
      publicReport: true,
      reportedBy: '',
      email: '',
    });
    setActiveTab('basic');
    alert('Report submitted successfully!');
  };

  return (
    <div className="sickness-report-container">
      <div className="report-header">
        <h1>New Sickness Report</h1>
        <p>Submit a new report to record sickness information and help track regional health data.</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      
      <div className="report-content">
        <div className="main-section">
          <div className="card">
            {activeTab === "basic" && (
              <>
                <div className="card-header">
                  <h2>Basic Information</h2>
                  <p>Provide information about the type of illness and symptoms</p>
                </div>
                
                <div className="form-group">
                  <label>Type of Illness</label>
                  <div className="select-wrapper">
                    <select
                      name="illnessType"
                      value={formData.illnessType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select type of illness</option>
                      {illnessTypes.map(illness => (
                        <option key={illness.value} value={illness.value}>{illness.label}</option>
                      ))}
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Symptoms</label>
                  <p className="small-text">Select all symptoms that apply</p>
                  
                  <div className="symptoms-grid">
                    {symptoms.map(symptom => (
                      <div key={symptom.id} className="symptom-checkbox">
                        <input
                          type="checkbox"
                          id={symptom.id}
                          checked={formData.symptoms.includes(symptom.id)}
                          onChange={() => handleSymptomChange(symptom.id)}
                        />
                        <label htmlFor={symptom.id}>{symptom.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Other Symptoms</label>
                  <textarea
                    name="otherSymptoms"
                    value={formData.otherSymptoms}
                    onChange={handleInputChange}
                    placeholder="Enter any other symptoms"
                  ></textarea>
                  <p className="helper-text">If you have any symptoms not listed above</p>
                </div>
                
                <div className="form-group">
                  <label>Severity Level</label>
                  <div className="select-wrapper">
                    <select
                      name="severity"
                      value={formData.severity}
                      onChange={handleInputChange}
                    >
                      <option value="">Select severity level</option>
                      {severityLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>When did symptoms start?</label>
                  <div className="date-picker">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      placeholder="Pick a date"
                    />
                    <span className="calendar-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button className="btn-next" onClick={() => setActiveTab("location")}>Next</button>
                </div>
              </>
            )}
            
            {activeTab === "location" && (
              <>
                <div className="card-header">
                  <h2>Location & Additional Details</h2>
                  <p>Provide information about where the illness occurred and other relevant details</p>
                </div>
                
                <div className="form-group">
                  <label>Name (Optional)</label>
                  <input
                    type="text"
                    name="reportedBy"
                    value={formData.reportedBy}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter city, region or area"
                  />
                  <p className="helper-text">Where the illness was likely contracted or where you are currently located</p>
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide additional details about your illness"
                  ></textarea>
                  <p className="helper-text">Any additional information that might be relevant</p>
                </div>
                
                <div className="checkbox-group">
                  <div className="checkbox-with-description">
                    <input
                      type="checkbox"
                      id="contactInfected"
                      name="contactInfected"
                      checked={formData.contactInfected}
                      onChange={handleInputChange}
                    />
                    <div>
                      <label htmlFor="contactInfected">Contact with infected person</label>
                      <p className="helper-text">Have you been in contact with someone known to have similar symptoms?</p>
                    </div>
                  </div>
                  
                  <div className="checkbox-with-description">
                    <input
                      type="checkbox"
                      id="travel"
                      name="travel"
                      checked={formData.travel}
                      onChange={handleInputChange}
                    />
                    <div>
                      <label htmlFor="travel">Recent travel history</label>
                      <p className="helper-text">Have you traveled outside your region in the last 14 days?</p>
                    </div>
                  </div>
                  
                  <div className="checkbox-with-description">
                    <input
                      type="checkbox"
                      id="medicalAttention"
                      name="medicalAttention"
                      checked={formData.medicalAttention}
                      onChange={handleInputChange}
                    />
                    <div>
                      <label htmlFor="medicalAttention">Sought medical attention</label>
                      <p className="helper-text">Have you consulted a healthcare provider regarding this illness?</p>
                    </div>
                  </div>
                </div>
                
                <div className="privacy-section">
                  <h2>Privacy Settings</h2>
                  <div className="checkbox-with-description">
                    <input
                      type="checkbox"
                      id="publicReport"
                      name="publicReport"
                      checked={formData.publicReport}
                      onChange={handleInputChange}
                    />
                    <div>
                      <label htmlFor="publicReport">Public Report</label>
                      <p className="helper-text">Make this report available for public health analysis (anonymized)</p>
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button className="btn-back" onClick={() => setActiveTab("basic")}>Back</button>
                  <button className="btn-cancel" onClick={() => {
                    setFormData({
                      illnessType: '',
                      symptoms: [],
                      otherSymptoms: '',
                      severity: '',
                      startDate: '',
                      location: '',
                      description: '',
                      contactInfected: false,
                      travel: false,
                      medicalAttention: false,
                      publicReport: true,
                      reportedBy: '',
                      email: '',
                    });
                    setActiveTab('basic');
                  }}>Cancel</button>
                  <button className="btn-submit" onClick={handleSubmit}>Submit Report</button>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="sidebar">
          <div className="sidebar-card">
            <div className="sidebar-header">
              <span className="icon-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <h3>Reporting Guidelines</h3>
            </div>
            
            <div className="guideline-item">
              <h4>Why Report?</h4>
              <p>Your reports help track disease patterns and inform public health responses in your community.</p>
            </div>
            
            <div className="guideline-item">
              <h4>Accurate Information</h4>
              <p>Please provide as accurate information as possible, including symptom onset date and location.</p>
            </div>
            
            <div className="guideline-item">
              <h4>Privacy</h4>
              <p>Your personal information is protected. Public reports are anonymized before being included in analyses.</p>
            </div>
            
            <div className="guideline-item">
              <h4>Medical Attention</h4>
              <p>This report is not a substitute for medical care. Please seek appropriate healthcare if needed.</p>
            </div>
          </div>
          
          <div className="sidebar-card">
            <h3>Common Illnesses in Your Area</h3>
            
            {commonIllnesses.map(illness => (
              <div key={illness.name} className="illness-stat">
                <div className="illness-header">
                  <span>{illness.name}</span>
                  <span>{illness.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${illness.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default New_Report;