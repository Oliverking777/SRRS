import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../../../firebase";
import "./Newreport.css";
import {
  illnessTypes,
  symptoms,
  severityLevels,
  commonIllnesses,
} from "../../../assets/assets";
import { createAutomatedAlert } from "../../../utils/notifications";

const availableRegions = [
  { value: "north-region", label: "North Region" },
  { value: "south-region", label: "South Region" },
  { value: "east-region", label: "East Region" },
  { value: "west-region", label: "West Region" },
  { value: "central-area", label: "Central Area" },
  { value: "east-area", label: "East Area" },
];

const New_Report = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    illnessType: "",
    symptoms: [],
    otherSymptoms: "",
    severity: "",
    startDate: "",
    location: "",
    description: "",
    contactInfected: false,
    travel: false,
    medicalAttention: false,
    publicReport: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSymptomChange = (symptomId) => {
    setFormData((prev) => {
      const updatedSymptoms = prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter((id) => id !== symptomId)
        : [...prev.symptoms, symptomId];
      return { ...prev, symptoms: updatedSymptoms };
    });
  };

  const validateForm = () => {
    if (!formData.illnessType) {
      setError("Please select type of illness");
      return false;
    }
    if (formData.symptoms.length === 0 && !formData.otherSymptoms) {
      setError("Please select at least one symptom or describe other symptoms");
      return false;
    }
    if (!formData.severity) {
      setError("Please select severity level");
      return false;
    }
    if (!formData.startDate) {
      setError("Please specify when symptoms started");
      return false;
    }
    if (!formData.location) {
      setError("Please select a location");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const reportData = {
        ...formData,
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(
        collection(db, "sickness_reports"),
        reportData
      );
      const newReport = { id: docRef.id, ...reportData };

      // Create automated notification
      await createAutomatedAlert(newReport);
      alert("Report submitted successfully!");

      setFormData({
        illnessType: "",
        symptoms: [],
        otherSymptoms: "",
        severity: "",
        startDate: "",
        location: "",
        description: "",
        contactInfected: false,
        travel: false,
        medicalAttention: false,
        publicReport: true,
      });
      setActiveTab("basic");
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      illnessType: "",
      symptoms: [],
      otherSymptoms: "",
      severity: "",
      startDate: "",
      location: "",
      description: "",
      contactInfected: false,
      travel: false,
      medicalAttention: false,
      publicReport: true,
    });
    setActiveTab("basic");
  };

  return (
    <div className="sickness-report-container">
      <div className="report-header">
        <h1>New Sickness Report</h1>
        <p>
          Submit a new report to record sickness information and help track
          regional health data.
        </p>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="report-content">
        <div className="main-section">
          <div className="card">
            {activeTab === "basic" && (
              <>
                <div className="card-header">
                  <h2>Basic Information</h2>
                  <p>
                    Provide information about the type of illness and symptoms
                  </p>
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
                      {illnessTypes.map((illness) => (
                        <option key={illness.value} value={illness.value}>
                          {illness.label}
                        </option>
                      ))}
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Symptoms</label>
                  <p className="small-text">Select all symptoms that apply</p>
                  <div className="symptoms-grid">
                    {symptoms.map((symptom) => (
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
                  />
                  <p className="helper-text">
                    If you have any symptoms not listed above
                  </p>
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
                      {severityLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
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
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    className="btn-next"
                    onClick={() => setActiveTab("location")}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {activeTab === "location" && (
              <>
                <div className="card-header">
                  <h2>Location & Additional Details</h2>
                  <p>Provide information about where the illness occurred</p>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <div className="select-wrapper">
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    >
                      <option value="">Select location</option>
                      {availableRegions.map((region) => (
                        <option key={region.value} value={region.value}>
                          {region.label}
                        </option>
                      ))}
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                  <p className="helper-text">
                    Where the illness was likely contracted or where you are
                    currently located
                  </p>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide additional details about your illness"
                  />
                  <p className="helper-text">
                    Any additional information that might be relevant
                  </p>
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
                      <label htmlFor="contactInfected">
                        Contact with infected person
                      </label>
                      <p className="helper-text">
                        Have you been in contact with someone known to have
                        similar symptoms?
                      </p>
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
                      <p className="helper-text">
                        Have you traveled outside your region in the last 14
                        days?
                      </p>
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
                      <label htmlFor="medicalAttention">
                        Sought medical attention
                      </label>
                      <p className="helper-text">
                        Have you consulted a healthcare provider regarding this
                        illness?
                      </p>
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
                      <p className="helper-text">
                        Make this report available for public health analysis
                        (anonymized)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    className="btn-back"
                    onClick={() => setActiveTab("basic")}
                  >
                    Back
                  </button>
                  <button className="btn-cancel" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button
                    className="btn-submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-card">
            <div className="sidebar-header">
              <h3>Reporting Guidelines</h3>
            </div>

            <div className="guideline-item">
              <h4>Why Report?</h4>
              <p>
                Your reports help track disease patterns and inform public
                health responses.
              </p>
            </div>

            <div className="guideline-item">
              <h4>Privacy</h4>
              <p>
                Your personal information is protected. Public reports are
                anonymized.
              </p>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Common Illnesses in Your Area</h3>
            {commonIllnesses.map((illness) => (
              <div key={illness.name} className="illness-stat">
                <div className="illness-header">
                  <span>{illness.name}</span>
                  <span>{illness.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${illness.percentage}%` }}
                  />
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
