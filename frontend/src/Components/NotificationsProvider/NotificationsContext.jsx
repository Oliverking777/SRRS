import React, { createContext, useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  Timestamp,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";


const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notificationsList);
      setUnreadCount(notificationsList.filter((n) => !n.read).length);
    });

    return () => unsubscribe();
  }, []);

  const createAutomatedAlert = async (sicknessReport) => {
    try {
      await addDoc(collection(db, "notifications"), {
        type: "AUTOMATED",
        title: "New Sickness Report",
        message: `New case of ${sicknessReport.illnessType} reported in ${sicknessReport.location}`,
        severity: sicknessReport.severity,
        createdAt: Timestamp.now(),
        read: false,
        reportId: sicknessReport.id,
      });
    } catch (error) {
      console.error("Error creating automated alert:", error);
    }
  };

  const createCustomAlert = async (alertData) => {
    try {
      await addDoc(collection(db, "notifications"), {
        type: "CUSTOM",
        title: alertData.title,
        message: alertData.message,
        severity: alertData.severity,
        createdAt: Timestamp.now(),
        scheduledFor: alertData.scheduledFor || null,
        read: false,
        adminId: alertData.adminId,
      });
    } catch (error) {
      console.error("Error creating custom alert:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await updateDoc(doc(db, "notifications", notificationId), {
        read: true,
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        createAutomatedAlert,
        createCustomAlert,
        markAsRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsProvider, NotificationsContext };
