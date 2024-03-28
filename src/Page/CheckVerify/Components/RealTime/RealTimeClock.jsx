import React, { useState, useEffect } from "react";

const RealTimeClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedTime = time.toLocaleString("th-TH", options);

  return (
    <div>
      <p className=" font-bold">Work Date: {formattedTime}</p>
    </div>
  );
};

export default RealTimeClock;
