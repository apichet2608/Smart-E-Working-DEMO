import React, { useEffect } from "react";

function AlertOnScreenSize() {
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      alert(`ขนาดจอปัจจุบัน: ความกว้าง ${width} px, ความสูง ${height} px`);
    }

    // แสดงขนาดจอเมื่อโหลดหน้านี้
    handleResize();

    // เพิ่ม event listener เพื่อติดตามการเปลี่ยนแปลงขนาดหน้าต่าง
    window.addEventListener("resize", handleResize);

    // ฟังก์ชัน cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div>ขนาดจอปัจจุบันจะแสดงใน Alert</div>;
}

export default AlertOnScreenSize;
