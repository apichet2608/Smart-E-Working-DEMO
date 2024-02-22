// CheckMode.js
import React, { useEffect } from "react";
import { useTheme } from "../ThemeContext"; // Import the custom hook from ThemeContext
import { applyThemeStyles } from "./applyThemeStyles"; // Import the applyThemeStyles function

function CheckMode() {
  const { isDarkMode } = useTheme(); // Use the isDarkMode function from Context

  useEffect(() => {
    applyThemeStyles(isDarkMode); // Use the function to apply theme styles based on the mode
  }, [isDarkMode]);

  return null; // This component does not render anything to the UI
}

export default CheckMode;
