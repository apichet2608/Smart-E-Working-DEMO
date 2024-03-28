import React, { useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { data } from "autoprefixer";
import { setstatuslq } from "../../../../../Redux/Action/lqapprovestatus";

const Timer = ({ EWK_ID, datainfimation, mc_code }) => {
  // State to keep track of time elapsed and whether the timer is on.
  // timeon ===  seq 7
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const state = useSelector((state) => state.lqapprovestatus);
  // state.ewk_item_seq
  // This useEffect runs only once when the component mounts.
  // It is responsible for initializing the timer based on values in localStorage.
  const [StartTimer, setStartTimer] = useState("");
  const [StopTimer, setStopTimer] = useState("");
  const dispatchs = useDispatch();

  useEffect(() => {
    const finctionapi = async () => {
      // Retrieve the timer state from localStorage.
      // const timerOn = localStorage.getItem("TimeOn") === "true";
      let startTime = "";
      let stopTime = "";
      let timestampstart = "";
      let timestampstop = "";
      const timerOn = state.ewk_item_seq === 7;
      if (state.ewk_item_seq === 7) {
        // Retrieve startTime and stopTime from localStorage.
        // const startTime = parseInt(localStorage.getItem("startTime"), 10);
        const body = {
          ewk_id: EWK_ID,
        };
        const response = await axios.post(
          `http://10.17.66.242:3000/smart_ewk/test/gettimeON`,
          body
        );
        console.log(response.data.data[0].ewk_result);
        startTime = response.data.data[0].ewk_result || "";
        timestampstart = new Date(startTime).getTime();
        console.log(timestampstart);
        setStartTimer(timestampstart);
      } else if (state.ewk_item_seq === 8) {
        // stopTime = "2024-03-26 14:00:00.000";

        const body = {
          ewk_id: EWK_ID,
        };
        const response = await axios.post(
          `http://10.17.66.242:3000/smart_ewk/test/gettimeSTOP`,
          body
        );
        console.log(response.data.data[0].ewk_result);
        stopTime = response.data.data[0].ewk_result || "";
        timestampstop = new Date(stopTime).getTime();
        console.log(timestampstop);
        setStopTimer(timestampstop);
      }

      // // const stopTime = parseInt(localStorage.getItem("stopTime"), 10);
      // if (timerOn && timestampstart) {
      //   // If the timer was running, calculate the time since it started.
      //   const currentTime = Date.now();
      //   setTime(Math.floor((currentTime - timestampstart) / 1000));
      // } else if (!timerOn && timestampstart && stopTime) {
      //   // If the timer was stopped, calculate the elapsed time until it was stopped.
      //   setTime(Math.floor((stopTime - timestampstart) / 1000));
      // }
      setTimerOn(timerOn);
    };
    finctionapi();
  }, [state]);

  useEffect(() => {
    if (StartTimer !== "") {
      const currentTime = Date.now();
      setTime(Math.floor((currentTime - StartTimer) / 1000));
    }
  }, [StartTimer]);

  useEffect(() => {
    const funcTimeStart = async () => {
      const body = {
        ewk_id: EWK_ID,
      };
      const response = await axios.post(
        `http://10.17.66.242:3000/smart_ewk/test/gettimeON`,
        body
      );
      console.log(response.data.data[0].ewk_result);
      console.log(StopTimer);
      // return response.data.data[0].ewk_result || "";
      let timestampstart = new Date(response.data.data[0].ewk_result).getTime();
      console.log(timestampstart);
      console.log(StopTimer);

      setTime(Math.floor((StopTimer - timestampstart) / 1000));
    };
    if (StopTimer !== "") {
      // call get data start time
      // const StartTimerAPI = "2024-03-26 12:00:00.000";
      funcTimeStart();

      // setTime(Math.floor((StopTimer - start) / 1000));
    }
  }, [StopTimer]);

  // This useEffect handles the timer tick when the timer is on.
  // It updates the elapsed time every second.
  useEffect(() => {
    let interval = null;

    if (timerOn) {
      // alert("timerOn");
      // If the timer is on, start an interval to update the elapsed time every second.
      interval = setInterval(() => {
        // const startTime = parseInt(localStorage.getItem("startTime"), 10);
        const startTime = StartTimer;
        let timestampstart = "";

        timestampstart = new Date(startTime).getTime();
        const currentTime = Date.now();
        setTime(Math.floor((currentTime - timestampstart) / 1000));
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
    dispatchs(setstatuslq({ ewk_item_seq: 7 }));

    console.log(Date.now());
    const startTime = Date.now() - time * 1000;
    // localStorage.setItem("startTime", startTime.toString());
    // localStorage.setItem("TimeOn", "true");

    setStartTimer(startTime);
    funcinputstarttime();
    // call api start time
    // reload components
    setTimerOn(true);
  };

  const handleStop = () => {
    // Save the stopTime in localStorage and update the timer state.
    dispatchs(setstatuslq({ ewk_item_seq: 8 }));
    const stopTime = Date.now();
    // localStorage.setItem("stopTime", stopTime.toString());
    // localStorage.setItem("TimeOn", "false");

    setStopTimer(stopTime);
    // call api stop time
    // update seq status
    setTimerOn(false);
  };

  const funcinputstarttime = async () => {
    console.log(datainfimation);
    const startTime = Date.now() - time * 1000;
    console.log(startTime);

    const date = new Date(startTime); // สร้างวัตถุ Date จาก timestamp

    const year = date.getFullYear(); // ดึงปี
    const month = String(date.getMonth() + 1).padStart(2, "0"); // ดึงเดือน (เพิ่ม 1 เนื่องจากมกราคมเป็นเลข 0)
    const day = String(date.getDate()).padStart(2, "0"); // ดึงวัน
    const hours = String(date.getHours()).padStart(2, "0"); // ดึงชั่วโมง
    const minutes = String(date.getMinutes()).padStart(2, "0"); // ดึงนาที
    const seconds = String(date.getSeconds()).padStart(2, "0"); // ดึงวินาที
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0"); // ดึงมิลลิวินาที

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    console.log(formattedDateTime); // ผลลัพธ์: "2024-03-25 08:43:26.883"
    console.log(datainfimation[0]);
    const body = {
      p_roll_lot: datainfimation[0].lot,
      p_shelf_machine_line: mc_code,
      p_man_qty: "0",
      p_user: "RCSC",
      p_station: "004", // mc in

      ewk_id: EWK_ID,
      create_date: formattedDateTime,
    };
    console.log(body);
    const response = await axios.post(
      `http://10.17.66.242:7011/api/ewk/smart-start/`,
      body
    );
    console.log(response);
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
    <div className="gap-2 bg-red-400 p-2 Paper_Contents w-fit mb-2">
      {/* ลบคำว่า 'seconds' เนื่องจากเราแสดงผลในรูปแบบ hh:mm:ss แล้ว */}
      {/* <div className="flex justify-between gap-2 w-full">{" "} */}
      {/* เพิ่ม className สำหรับ flex layout และ gap */}
      {/* <button
          onClick={handleStart}
          className="bg-green-200 p-0.5 rounded-xl w-fit"
        >
          <PlayCircleIcon />
        </button> */}
      <div className="w-full text-nowrap m-auto">
        Run Time : {formatTime(time)}
      </div>
      {/* <button
          onClick={handleStop}
          className="bg-red-200 p-0.5 rounded-xl w-fit"
        >
          <StopCircleIcon />
        </button> */}
      {/* <button
          onClick={handleReset}
          className="bg-orange-200 p-2 rounded-xl w-fit"
        >
          <RotateLeftIcon />
        </button> */}
      {/* </div> */}
      <div className="flex justify-between gap-2 w-full">
        {state.ewk_item_seq === 6 && (
          <>
            <div className="flex justify-between gap-2 w-full">
              <button
                onClick={handleStart}
                className="bg-green-200 p-0.5 rounded-xl w-full"
              >
                <PlayCircleIcon />
              </button>
              {/* <button
                onClick={handleStop}
                className="bg-red-200 p-0.5 rounded-xl w-full"
              >
                <StopCircleIcon />
              </button>
              <button
                onClick={handleReset}
                className="bg-orange-200 p-2 rounded-xl w-fit"
              >
                <RotateLeftIcon />
              </button> */}
            </div>
          </>
        )}
        {state.ewk_item_seq === 7 && (
          <>
            <div className="flex justify-between gap-2 w-full">
              <button
                onClick={handleStop}
                className="bg-red-200 p-0.5 rounded-xl w-full"
              >
                <StopCircleIcon />
              </button>
            </div>
          </>
        )}
        {state.ewk_item_seq === 8 && (
          <>
            <div className="flex justify-between gap-2 w-full">
              <button
                onClick={handleStart}
                className="bg-green-200 p-0.5 rounded-xl w-full"
              >
                <PlayCircleIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
