import React, { useState } from 'react';
import './Newreport.css'

const New_Report = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="sickness-report-container">
      <div className="report-header">
        <h1>New Sickness Report</h1>
        <p>Submit a new report to record sickness information and help track regional health data.</p>
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
                    <select>
                      <option>Select type of illness</option>
                      <option value="covid19">COVID-19</option>
                      <option value="flu">Influenza</option>
                      <option value="cold">Common Cold</option>
                      <option value="foodPoisoning">Food Poisoning</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Symptoms</label>
                  <p className="small-text">Select all symptoms that apply</p>
                  
                  <div className="symptoms-grid">
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="fever" />
                      <label htmlFor="fever">Fever</label>
                    </div>
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="headache" />
                      <label htmlFor="headache">Headache</label>
                    </div>
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="bodyAches" />
                      <label htmlFor="bodyAches">Body Aches</label>
                    </div>
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="tasteSmell" />
                      <label htmlFor="tasteSmell">Loss of Taste/Smell</label>
                    </div>
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="cough" />
                      <label htmlFor="cough">Cough</label>
                    </div>
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="soreThroat" />
                      <label htmlFor="soreThroat">Sore Throat</label>
                    </div>
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="nausea" />
                      <label htmlFor="nausea">Nausea</label>
                    </div>
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="rash" />
                      <label htmlFor="rash">Rash</label>
                    </div>
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="fatigue" />
                      <label htmlFor="fatigue">Fatigue</label>
                    </div>
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="shortnessBreath" />
                      <label htmlFor="shortnessBreath">Shortness of Breath</label>
                    </div>
                    <div className="symptom-checkbox">
                      <input type="checkbox" id="diarrhea" />
                      <label htmlFor="diarrhea">Diarrhea</label>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Other Symptoms</label>
                  <textarea placeholder="Enter any other symptoms"></textarea>
                  <p className="helper-text">If you have any symptoms not listed above</p>
                </div>
                
                <div className="form-group">
                  <label>Severity Level</label>
                  <div className="select-wrapper">
                    <select>
                      <option>Select severity level</option>
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                      <option value="critical">Critical</option>
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>When did symptoms start?</label>
                  <div className="date-picker">
                    <input type="text" placeholder="Pick a date" />
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
                  <label>Location</label>
                  <input type="text" placeholder="Enter city, region or area" />
                  <p className="helper-text">Where the illness was likely contracted or where you are currently located</p>
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea placeholder="Provide additional details about your illness"></textarea>
                  <p className="helper-text">Any additional information that might be relevant</p>
                </div>
                
                <div className="checkbox-group">
                  <div className="checkbox-with-description">
                    <input type="checkbox" id="contactInfected" />
                    <div>
                      <label htmlFor="contactInfected">Contact with infected person</label>
                      <p className="helper-text">Have you been in contact with someone known to have similar symptoms?</p>
                    </div>
                  </div>
                  
                  <div className="checkbox-with-description">
                    <input type="checkbox" id="travel" />
                    <div>
                      <label htmlFor="travel">Recent travel history</label>
                      <p className="helper-text">Have you traveled outside your region in the last 14 days?</p>
                    </div>
                  </div>
                  
                  <div className="checkbox-with-description">
                    <input type="checkbox" id="medicalAttention" />
                    <div>
                      <label htmlFor="medicalAttention">Sought medical attention</label>
                      <p className="helper-text">Have you consulted a healthcare provider regarding this illness?</p>
                    </div>
                  </div>
                </div>
                
                <div className="privacy-section">
                  <h2>Privacy Settings</h2>
                  <div className="checkbox-with-description">
                    <input type="checkbox" id="publicReport" defaultChecked />
                    <div>
                      <label htmlFor="publicReport">Public Report</label>
                      <p className="helper-text">Make this report available for public health analysis (anonymized)</p>
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button className="btn-back" onClick={() => setActiveTab("basic")}>Back</button>
                  <button className="btn-cancel">Cancel</button>
                  <button className="btn-submit">Submit Report</button>
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
            
            <div className="illness-stat">
              <div className="illness-header">
                <span>Respiratory Infections</span>
                <span>65%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: "65%" }}></div>
              </div>
            </div>
            
            <div className="illness-stat">
              <div className="illness-header">
                <span>Gastrointestinal</span>
                <span>42%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: "42%" }}></div>
              </div>
            </div>
            
            <div className="illness-stat">
              <div className="illness-header">
                <span>Viral Infections</span>
                <span>28%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: "28%" }}></div>
              </div>
            </div>
            
            <div className="illness-stat">
              <div className="illness-header">
                <span>Allergic Reactions</span>
                <span>15%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: "15%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New_Report;