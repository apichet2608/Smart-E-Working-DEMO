import React, { useEffect, useState } from "react";

const Timer = () => {
  // State to keep track of time elapsed and whether the timer is on.
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  // This useEffect runs only once when the component mounts.
  // It is responsible for initializing the timer based on values in localStorage.
  useEffect(() => {
    // Retrieve the timer state from localStorage.
    const timerOn = localStorage.getItem("TimeOn") === "true";
    setTimerOn(timerOn);

    // Retrieve startTime and stopTime from localStorage.
    const startTime = parseInt(localStorage.getItem("startTime"), 10);
    const stopTime = parseInt(localStorage.getItem("stopTime"), 10);

    if (timerOn && startTime) {
      // If the timer was running, calculate the time since it started.
      const currentTime = Date.now();
      setTime(Math.floor((currentTime - startTime) / 1000));
    } else if (!timerOn && startTime && stopTime) {
      // If the timer was stopped, calculate the elapsed time until it was stopped.
      setTime(Math.floor((stopTime - startTime) / 1000));
    }
  }, []);

  // This useEffect handles the timer tick when the timer is on.
  // It updates the elapsed time every second.
  useEffect(() => {
    let interval = null;

    if (timerOn) {
      // If the timer is on, start an interval to update the elapsed time every second.
      interval = setInterval(() => {
        const startTime = parseInt(localStorage.getItem("startTime"), 10);
        const currentTime = Date.now();
        setTime(Math.floor((currentTime - startTime) / 1000));
      }, 1000);
    } else {
      // If the timer is not on, clear the interval.
      clearInterval(interval);
    }

    // Cleanup function to clear the interval when the component unmounts or the timer stops.
    return () => clearInterval(interval);
  }, [timerOn]);

  const handleStart = () => {
    // Calculate and save the startTime in localStorage.
    // Adjust the startTime based on the elapsed time to continue from the current time.
    const startTime = Date.now() - time * 1000;
    localStorage.setItem("startTime", startTime.toString());
    localStorage.setItem("TimeOn", "true");
    setTimerOn(true);
  };

  const handleStop = () => {
    // Save the stopTime in localStorage and update the timer state.
    const stopTime = Date.now();
    localStorage.setItem("stopTime", stopTime.toString());
    localStorage.setItem("TimeOn", "false");
    setTimerOn(false);
  };

  const handleReset = () => {
    // Remove startTime and stopTime from localStorage, reset the timer state.
    localStorage.removeItem("startTime");
    localStorage.removeItem("stopTime");
    localStorage.setItem("TimeOn", "false");
    setTime(0);
    setTimerOn(false);
  };

  // Utility function to convert seconds into hh:mm:ss format
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Pad each time component to ensure it has two digits
    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div className="gap-2 bg-red-400 p-2 Paper_Contents w-64">
      <div>Elapsed time: {formatTime(time)}</div>
      {/* ลบคำว่า 'seconds' เนื่องจากเราแสดงผลในรูปแบบ hh:mm:ss แล้ว */}
      <div className="flex justify-between gap-2">
        {" "}
        {/* เพิ่ม className สำหรับ flex layout และ gap */}
        <button
          onClick={handleStart}
          className="bg-blue-200 p-2 rounded-xl w-full"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className="bg-blue-200 p-2 rounded-xl w-full"
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="bg-blue-200 p-2 rounded-xl w-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
