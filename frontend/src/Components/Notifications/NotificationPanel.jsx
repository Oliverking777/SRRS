import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import "./NotificationPanel.css";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const notificationsQuery = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      notificationsQuery,
      (snapshot) => {
        const notificationsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notifications", id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleView = (notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "severity-high";
      case "medium":
        return "severity-medium";
      default:
        return "severity-low";
    }
  };

  const formatDate = (timestamp) => {
    try {
      if (!timestamp) return "";
      const date = timestamp.toDate();
      return format(date, "MMM d, h:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  if (loading) {
    return (
      <div className="notification-panel">
        <div className="notification-loading">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="notification-panel">
      <div className="notification-header">
        <h3>Notifications</h3>
        <span className="notification-count">{notifications.length}</span>
      </div>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.read ? "read" : ""
              } ${getSeverityColor(notification.severity)}`}
            >
              <div className="notification-content">
                <div className="notification-header">
                  <h4>{notification.title}</h4>
                  <span className="notification-time">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
                <p>{notification.message}</p>
                {notification.type === "AUTOMATED" && (
                  <span className="notification-type">System Alert</span>
                )}
                <div className="notification-actions">
                  <button
                    onClick={() => handleView(notification)}
                    className="btn-view"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedNotification && (
        <div className="notification-modal">
          <div className="modal-content">
            <h2>{selectedNotification.title}</h2>
            <p className="modal-time">
              {formatDate(selectedNotification.createdAt)}
            </p>
            <p className="modal-message">{selectedNotification.message}</p>
            {selectedNotification.type === "AUTOMATED" && (
              <span className="notification-type">System Alert</span>
            )}
            <div className="modal-actions">
              <button onClick={closeModal} className="btn-close">
                Close
              </button>
              <button
                onClick={() => handleDelete(selectedNotification.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
