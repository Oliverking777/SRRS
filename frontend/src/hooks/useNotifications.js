import { useContext } from "react";
import { NotificationsContext } from "../Components/NotificationsProvider/NotificationsContext";

export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (context === undefined) {
    console.error("NotificationsProvider not found in component tree");
    return {
      notifications: [],
      unreadCount: 0,
      createAutomatedAlert: () =>
        console.warn("NotificationsProvider not available"),
      createCustomAlert: () =>
        console.warn("NotificationsProvider not available"),
      markAsRead: () => console.warn("NotificationsProvider not available"),
    };
  }

  return context;
};
