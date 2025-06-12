import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "../NotificationsProvider/NotificationsContext";

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <NotificationsProvider>{children}</NotificationsProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
