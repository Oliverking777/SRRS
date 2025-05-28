import "./App.css";
import React from "react";
import AppProviders from "./Components/Providers/AppProviders";


function App() {
  return (
    <AppProviders>
      <Routes />
    </AppProviders>
  );
}

export default App;
