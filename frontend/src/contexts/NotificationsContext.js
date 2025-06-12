import { createContext } from "react";

export const NotificationsContext = createContext({
  notifications: [],
  unreadCount: 0,
  createAutomatedAlert: () => {},
  createCustomAlert: () => {},
  markAsRead: () => {},
});
