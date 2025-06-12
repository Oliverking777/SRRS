import { addDoc, Timestamp, doc, updateDoc } from "firebase/firestore";
import { notificationsRef } from "../firebase";

export const createAutomatedAlert = async (sicknessReport) => {
  const notificationData = {
    type: "AUTOMATED",
    title: `New ${sicknessReport.severity} Case Reported`,
    message: `A new case of ${sicknessReport.illnessType} has been reported in ${sicknessReport.location}`,
    severity: sicknessReport.severity,
    createdAt: Timestamp.now(),
    read: false,
    reportId: sicknessReport.id,
  };

  try {
    await addDoc(notificationsRef, notificationData);
  } catch (error) {
    console.error("Error creating automated alert:", error);
  }
};

export const createCustomAlert = async (alertData) => {
  const notificationData = {
    type: "CUSTOM",
    ...alertData,
    createdAt: Timestamp.now(),
    read: false,
  };

  try {
    await addDoc(notificationsRef, notificationData);
  } catch (error) {
    console.error("Error creating custom alert:", error);
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const notificationRef = doc(notificationsRef, notificationId);
    await updateDoc(notificationRef, { read: true });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};
