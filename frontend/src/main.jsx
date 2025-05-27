
import ReactDOM from 'react-dom/client'
import "./index.css";
import App from "./App.jsx";
import Router from './Components/Router.jsx';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './Components/Contextprovider/ContextProvider.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    
    <DataProvider>
      <Router />
    </DataProvider>
  </BrowserRouter>
);
