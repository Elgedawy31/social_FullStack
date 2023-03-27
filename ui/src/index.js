import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { DataContextPrivider } from "./context/fetchData";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <DataContextPrivider>
          <App />
        </DataContextPrivider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
