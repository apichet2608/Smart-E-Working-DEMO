// Auth.js
import { getCookie } from "../Cookie/getCookie";

export const checkTokenValidity = async () => {
  try {
    const token = getCookie("TokenWeb");

    if (token) {
      const response = await fetch(
        "http://127.0.0.1:3001/protected-route/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return { isValid: true, data };
      } else {
        return { isValid: false, data };
      }
    } else {
      return { isValid: false, data: null };
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการตรวจสอบโทเค็น:", error);
    return { isValid: false, data: null };
  }
};
