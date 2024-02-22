// setCookie.js

export const setCookie = (name, value, days) => {
  let expires = ""; // ตัวแปรสำหรับเก็บวันหมดอายุของคุกกี้
  if (days) {
    const date = new Date(); // สร้างวัตถุ Date
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ตั้งค่าเวลาหมดอายุ
    expires = "; expires=" + date.toUTCString(); // สร้างสตริงของวันหมดอายุ
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"; // ตั้งค่าคุกกี้ในเบราว์เซอร์
};
