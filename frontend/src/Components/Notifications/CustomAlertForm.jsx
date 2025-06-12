import React, { useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";

import "./CustomAlertForm.css";

const CustomAlertForm = () => {
  const { createCustomAlert } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    severity: "low",
    scheduledFor: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await createCustomAlert({
        ...formData,
        scheduledFor: formData.scheduledFor
          ? new Date(formData.scheduledFor)
          : null,
      });

      setFormData({
        title: "",
        message: "",
        severity: "low",
        scheduledFor: "",
      });
    } catch (err) {
      setError("Failed to create alert. Please try again.");
      console.error("Error creating alert:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="custom-alert-form">
      <h2>Create Custom Alert</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Severity</label>
          <select
            value={formData.severity}
            onChange={(e) =>
              setFormData({ ...formData, severity: e.target.value })
            }
            disabled={isSubmitting}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Schedule (Optional)</label>
          <input
            type="datetime-local"
            value={formData.scheduledFor}
            onChange={(e) =>
              setFormData({ ...formData, scheduledFor: e.target.value })
            }
            disabled={isSubmitting}
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Alert"}
        </button>
      </form>
    </div>
  );
};
export default CustomAlertForm;
