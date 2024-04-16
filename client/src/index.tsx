import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App.tsx";
import { ContextProvider } from "./contexts/ContextProvider";
import { AuthProvider } from "./pages/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
