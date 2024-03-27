import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Timer from "../Timer/Timer";
import { useSelector, useDispatch } from "react-redux";
import { setstatuslq } from "../../../../../Redux/Action/lqapprovestatus";
import axios from "axios";

function LearderApprove(props) {
  const { EWK_ID } = props;
  const dispatchs = useDispatch();
  const [timeon, settimeon] = useState("");
  const [timeoff, settimeoff] = useState("");
  const [ison, setison] = useState(false);

  const state = useSelector((state) => state.lqapprovestatus);
  console.log("state", state);
  // // alert(state);
  // useEffect(() => {
  //   let value = EWK_ID || " ";
  //   dispatchs(setstatuslq(value));
  // }, [EWK_ID]);

  useEffect(() => {
    if (state && state.ewk_id_status === "Ready") {
      console.log("state", state);
      // แปลงค่าวันที่และเวลาให้เป็น timestamp
      var timestamp = new Date(state.create_at).getTime();

      // เก็บค่า timestamp ใน localStorage
      localStorage.setItem("startTime", timestamp.toString());
      localStorage.setItem("TimeOn", "true");
      settimeon(state.create_at);
      settimeoff("");
      setison(true);
    }
  }, [state]);

  // const getddata = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:3001/api/ewk/ewk_id_status?ewk_id=${EWK_ID}`
  //     );
  //     dispatchs(setstatuslq(res.data[0].ewk_id_status));
  //     // alert(res.data[0].ewk_id_status);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     console.log("end");
  //   }
  // };
  return (
    <div>
      <Chip label={"state"} />
      <Timer state={state} timeron={timeon} timeoff={timeoff} ison={ison} />
    </div>
  );
}

export default LearderApprove;
