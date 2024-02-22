// getCookie.js

export const getCookie = (name) => {
  const value = `; ${document.cookie}`; // สร้างสตริงของคุกกี้ทั้งหมดจาก document.cookie
  const parts = value.split(`; ${name}=`); // แยกคุกกี้ด้วยชื่อเพื่อค้นหาคุกกี้ที่ต้องการ
  if (parts.length === 2) return parts.pop().split(";").shift(); // ถ้าพบคุกกี้, คืนค่าของคุกกี้นั้น
};
