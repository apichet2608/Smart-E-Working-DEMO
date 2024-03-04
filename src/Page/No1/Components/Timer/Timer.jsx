import React, { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;
    const TimeOn = localStorage.getItem("TimeOn");

    if (timerOn || TimeOn) {
      const startTime = localStorage.getItem("startTime");
      if (startTime) {
        const updateTime = () => {
          const currentTime = Date.now();
          const elapsedTime = Math.floor(
            (currentTime - parseInt(startTime)) / 1000
          );
          setTime(elapsedTime);
        };
        updateTime(); // อัปเดตเวลาทันทีก่อนเริ่ม interval
        interval = setInterval(updateTime, 1000);
      } else {
        localStorage.setItem("startTime", Date.now().toString());
      }
    } else if (!timerOn && time !== 0) {
      clearInterval(interval);
      alert(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn, time]);

  const handleStart = () => {
    alert(time);
    localStorage.setItem("startTime", Date.now().toString() - time * 1000); // คำนวณเวลาเริ่มต้นใหม่ตามเวลาที่หยุด
    localStorage.setItem("TimeOn", true); // คำนวณเวลาเริ่มต้นใหม่ตามเวลาที่หยุด
    setTimerOn(true);
  };

  const handleStop = () => {
    // localStorage.removeItem("startTime"); // ลบเวลาเริ่มต้นออกจาก local storage
    localStorage.setItem("TimeOn", false); // คำนวณเวลาเริ่มต้นใหม่ตามเวลาที่หยุด
    localStorage.setItem("stopTime", Date.now().toString() * 1000); // คำนวณเวลาเริ่มต้นใหม่ตามเวลาที่หยุด
    setTimerOn(false);
  };

  const handleReset = () => {
    localStorage.removeItem("startTime"); // ลบเวลาเริ่มต้นออกจาก local storage
    localStorage.removeItem("TimeOn"); // คำนวณเวลาเริ่มต้นใหม่ตามเวลาที่หยุด
    setTime(0);
    setTimerOn(false);
  };

  return (
    <div className="pt-10 flex gap-2">
      <div>Elapsed time: {time} seconds</div>
      <button onClick={handleStart} className="bg-blue-200 p-4 rounded-xl">
        Start
      </button>
      <button onClick={handleStop} className="bg-blue-200 p-4 rounded-xl">
        Stop
      </button>
      <button onClick={handleReset} className="bg-blue-200 p-4 rounded-xl">
        Reset
      </button>
    </div>
  );
};

export default Timer;
