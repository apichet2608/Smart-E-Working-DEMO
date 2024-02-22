import React, { createContext, useContext, useState, useEffect } from "react";

// ฟังก์ชันสำหรับอ่านค่าคุกกี้
function getCookie(name) {
  const value = `; ${document.cookie}`; // สร้างสตริงของคุกกี้ทั้งหมดจาก document.cookie
  const parts = value.split(`; ${name}=`); // แยกคุกกี้ด้วยชื่อเพื่อค้นหาคุกกี้ที่ต้องการ
  if (parts.length === 2) return parts.pop().split(";").shift(); // ถ้าพบคุกกี้, คืนค่าของคุกกี้นั้น
}

// ฟังก์ชันสำหรับตั้งค่าคุกกี้
function setCookie(name, value, days) {
  let expires = ""; // ตัวแปรสำหรับเก็บวันหมดอายุของคุกกี้
  if (days) {
    const date = new Date(); // สร้างวัตถุ Date
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ตั้งค่าเวลาหมดอายุ
    expires = "; expires=" + date.toUTCString(); // สร้างสตริงของวันหมดอายุ
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"; // ตั้งค่าคุกกี้ในเบราว์เซอร์
}

const ThemeContext = createContext(); // สร้าง Context สำหรับการจัดการธีม

// คอมโพเนนต์ Provider สำหรับ ThemeContext
export const ThemeProvider = ({ children }) => {
  // ตั้งค่าสถานะธีมเริ่มต้นจากคุกกี้หรือการตั้งค่าธีมของระบบ
  const [isDarkMode, setIsDarkMode] = useState(
    getCookie("theme") === "true"
      ? true
      : getCookie("theme") === "false"
      ? false
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // ฟังก์ชันสำหรับสลับระหว่างโหมดมืดและโหมดสว่าง
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // สลับค่า isDarkMode
    setCookie("theme", !isDarkMode, 30); // อัปเดตคุกกี้ด้วยสถานะธีมใหม่
  };

  // ตรวจสอบการเปลี่ยนแปลงธีมของระบบและอัปเดตสถานะ
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)"); // สร้าง Media Query สำหรับตรวจสอบธีมระบบ
    const handleChange = (e) => {
      const newTheme = e.matches; // ตรวจสอบว่าระบบเป็นโหมดมืดหรือไม่
      setIsDarkMode(newTheme); // อัปเดตสถานะธีม
      setCookie("theme", newTheme, 30); // อัปเดตคุกกี้
    };

    mediaQuery.addListener(handleChange); // เพิ่มตัวแล้วฟังการเปลี่ยนแปลงของ Media Query
    return () => mediaQuery.removeListener(handleChange); // ลบตัวแล้วฟังเมื่อคอมโพเนนต์ถูกถอน
  }, []);

  // ให้บริการค่าสถานะธีมและฟังก์ชันสลับธีมผ่าน Provider
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
      {/* // แสดงคอมโพเนนต์ลูกที่รับค่าจาก ThemeProvider */}
    </ThemeContext.Provider>
  );
};

// สร้าง Hook ที่กำหนดเองสำหรับใช้งาน Theme Context
export const useTheme = () => useContext(ThemeContext);
