import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import "./Newreport.css";

const New_Report = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    illness: "",
    symptoms: [],
    otherSymptoms: "",
    severity: "",
    symptomStart: "",
    location: "",
    description: "",
    contactInfected: false,
    travel: false,
    medicalAttention: false,
    publicReport: true,
  });

  const toggleSymptom = (symptom) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const validateForm = () => {
    if (!formData.illness) {
      setError("Please select type of illness");
      return false;
    }
    if (formData.symptoms.length === 0) {
      setError("Please select at least one symptom");
      return false;
    }
    if (!formData.severity) {
      setError("Please select severity level");
      return false;
    }
    if (!formData.symptomStart) {
      setError("Please select when symptoms started");
      return false;
    }
    if (!formData.location) {
      setError("Please enter location");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "sickness_reports"), {
        ...formData,
        createdAt: Timestamp.now(),
      });
      alert("Report submitted successfully!");
      // Reset form
      setFormData({
        illness: "",
        symptoms: [],
        otherSymptoms: "",
        severity: "",
        symptomStart: "",
        location: "",
        description: "",
        contactInfected: false,
        travel: false,
        medicalAttention: false,
        publicReport: true,
      });
      setActiveTab("basic");
    } catch (error) {
      setError("Failed to submit report. Please try again.");
      console.error("Error adding document: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sickness-report-container">
      <div className="report-header">
        <h1>New Sickness Report</h1>
        <p>
          Submit a new report to record sickness information and help track
          regional health data.
        </p>
      </div>

      <div className="report-content">
        <div className="main-section">
          <div className="card">
            {activeTab === "basic" && (
              <>
                <div className="card-header">
                  <h2>Basic Information</h2>
                </div>

                <div className="form-group">
                  <label>Type of Illness</label>
                  <select
                    onChange={(e) =>
                      setFormData({ ...formData, illness: e.target.value })
                    }
                    value={formData.illness}
                  >
                    <option value="">Select type of illness</option>
                    <option value="covid19">COVID-19</option>
                    <option value="flu">Influenza</option>
                    <option value="cold">Common Cold</option>
                    <option value="foodPoisoning">Food Poisoning</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Symptoms</label>
                  <div className="symptoms-grid">
                    {[
                      "Fever",
                      "Headache",
                      "Body Aches",
                      "Loss of Taste/Smell",
                      "Cough",
                      "Sore Throat",
                      "Nausea",
                      "Rash",
                      "Fatigue",
                      "Shortness of Breath",
                      "Diarrhea",
                    ].map((symptom, index) => (
                      <div key={index} className="symptom-checkbox">
                        <input
                          type="checkbox"
                          id={symptom}
                          checked={formData.symptoms.includes(symptom)}
                          onChange={() => toggleSymptom(symptom)}
                        />
                        <label htmlFor={symptom}>{symptom}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Other Symptoms</label>
                  <textarea
                    placeholder="Enter any other symptoms"
                    value={formData.otherSymptoms}
                    onChange={(e) =>
                      setFormData({ ...formData, otherSymptoms: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Severity Level</label>
                  <select
                    onChange={(e) =>
                      setFormData({ ...formData, severity: e.target.value })
                    }
                    value={formData.severity}
                  >
                    <option value="">Select severity level</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>When did symptoms start?</label>
                  <input
                    type="date"
                    value={formData.symptomStart}
                    onChange={(e) =>
                      setFormData({ ...formData, symptomStart: e.target.value })
                    }
                  />
                </div>

                <div className="form-actions">
                  <button onClick={() => setActiveTab("location")}>Next</button>
                </div>
              </>
            )}

            {activeTab === "location" && (
              <>
                <div className="card-header">
                  <h2>Location & Additional Details</h2>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="City or region"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Additional details"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.contactInfected}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactInfected: e.target.checked,
                        })
                      }
                    />
                    Contact with infected person
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.travel}
                      onChange={(e) =>
                        setFormData({ ...formData, travel: e.target.checked })
                      }
                    />
                    Recent travel history
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.medicalAttention}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          medicalAttention: e.target.checked,
                        })
                      }
                    />
                    Sought medical attention
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.publicReport}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publicReport: e.target.checked,
                        })
                      }
                    />
                    Make report public (anonymized)
                  </label>
                </div>

                <div className="form-actions">
                  <button onClick={() => setActiveTab("basic")}>Back</button>
                  <button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </button>
                </div>

                {error && <div className="error-message">{error}</div>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default New_Report;
