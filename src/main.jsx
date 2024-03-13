import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./Contexts/ThemeContext/ThemeContext.jsx"; // นำเข้า ThemeProvider
import CheckMode from "./Contexts/ThemeContext/SetColorMode/CheckMode.jsx";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "@fontsource/press-start-2p";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext/AuthContext.jsx"; // Adjust the import path as necessary
import "animate.css";
// Supports weights 100-900
import "@fontsource-variable/inter";
import { NextUIProvider } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <ThemeProvider>
      <AuthProvider>
        <CheckMode />
        <React.StrictMode>
          <Router>
            <App />
          </Router>
        </React.StrictMode>
      </AuthProvider>
    </ThemeProvider>
  </NextUIProvider>
);
