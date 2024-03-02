import React, { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0); // สร้าง state เพื่อเก็บค่าเวลาที่ผ่านไป (วินาที)
  const [startTime, setStartTime] = useState(null); // สร้าง state เพื่อเก็บค่าเวลาเริ่มต้นของนาฬิกาจับเวลา

  // เริ่มนับเวลา
  const startTimer = () => {
    const currentTime = new Date().getTime(); // รับค่าเวลาปัจจุบันเป็นมิลลิวินาที
    setStartTime(currentTime); // เซ็ตค่าเวลาเริ่มต้นให้กับ state
    localStorage.setItem("startTime", JSON.stringify(currentTime)); // บันทึกค่าเวลาเริ่มต้นใน localStorage
  };

  // รีเซ็ตเวลา
  const resetTimer = () => {
    localStorage.removeItem("startTime"); // ลบค่าเวลาเริ่มต้นออกจาก localStorage
    setStartTime(null); // เซ็ตค่าเวลาเริ่มต้นเป็น null
    localStorage.setItem("timer", JSON.stringify(0)); // รีเซ็ตค่าเวลาที่ผ่านไปใน localStorage เป็น 0
    setSeconds(0); // เซ็ตค่าเวลาที่ผ่านไปเป็น 0
  };

  useEffect(() => {
    const storedStartTime = localStorage.getItem("startTime"); // อ่านค่าเวลาเริ่มต้นจาก localStorage
    if (storedStartTime) {
      setStartTime(JSON.parse(storedStartTime)); // ถ้ามีค่าเวลาเริ่มต้นใน localStorage ให้เซ็ตค่าใน state
    }

    // นับเวลาทุกวินาที
    const interval = setInterval(() => {
      if (startTime) {
        // เช็คว่า startTime ไม่เป็นค่า null หรือ undefined
        const currentTime = new Date().getTime(); // รับค่าเวลาปัจจุบันเป็นมิลลิวินาที
        const elapsedTime = Math.floor((currentTime - startTime) / 1000); // คำนวณหาค่าระยะเวลาที่ผ่านมาในหน่วยวินาที
        localStorage.setItem("timer", JSON.stringify(elapsedTime)); // บันทึกค่าระยะเวลาใน localStorage
        setSeconds(elapsedTime); // อัปเดตค่าระยะเวลาที่แสดงบนหน้าเว็บ
      }
    }, 1000); // นับเวลาทุก 1 วินาที

    return () => clearInterval(interval); // กำจัด interval เมื่อ component ถูก unmount
  }, [startTime]); // useEffect จะรันเมื่อค่า startTime เปลี่ยนแปลง

  // บันทึกเวลาปัจจุบัน (ไม่ได้ใช้ในโค้ดปัจจุบัน)
  // const saveCurrentTime = () => {
  //   const currentTime = new Date().getTime();
  //   localStorage.setItem("initialTime", currentTime);
  //   resetTimer();
  // };

  // ตรวจสอบว่ามีเวลาเริ่มต้นหรือไม่และเรียกใช้ resetTimer ถ้าไม่มี
  useEffect(() => {
    const initialTime = localStorage.getItem("initialTime"); // อ่านค่าเวลาเริ่มต้นจาก localStorage
    if (!initialTime) {
      resetTimer(); // ถ้าไม่มีค่าเวลาเริ่มต้น ให้รีเซ็ตเวลา
    }
  }, []);

  return (
    <div>
      <h1>Time: {seconds} seconds</h1>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={resetTimer}>Reset Timer</button>
      {/* <button onClick={saveCurrentTime}>Save Current Time</button> */}
      {startTime && (
        <p>
          Time started: {new Date(startTime).toLocaleString()} ({seconds}{" "}
          seconds since the timer started)
        </p>
      )}
    </div>
  );
};

export default Timer;
