import React, { createContext, useContext, useState, useEffect } from "react";
import { checkTokenValidity } from "../../Services/AuthService/AuthService"; // Moved API call logic to a separate file

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokenValid, setTokenValid] = useState(false);
  const [isVerifyTokenLoading, setIsVerifyTokenLoading] = useState(false); // Renamed for consistency
  const [userData, setUserData] = useState([]); // Renamed for clarity

  const verifyToken = async () => {
    setIsVerifyTokenLoading(true);
    try {
      const result = await checkTokenValidity();
      if (result.isValid) {
        setTokenValid(true);
        setUserData(result.data);
      } else {
        setTokenValid(false);
        // Optionally, handle user feedback here for invalid tokens
      }
    } catch (error) {
      console.error("An error occurred while verifying the token:", error);
      setTokenValid(false);
    } finally {
      setIsVerifyTokenLoading(false);
    }
  };

  useEffect(() => {
    // Removed console.log for production optimization
    verifyToken(); // Auto-verify token on component mount
  }, []);

  return (
    <AuthContext.Provider
      value={{ tokenValid, isVerifyTokenLoading, userData, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
