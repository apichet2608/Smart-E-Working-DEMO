import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setstatuslq } from "../../../../../Redux/Action/lqapprovestatus";

function LeaderApprove(props) {
  const { EWK_ID } = props;
  const [leaderapprove, setleaderapprove] = useState("7044497");
  const dispatchs = useDispatch();
  const state = useSelector((state) => state.lqapprovestatus);
  const fetchLeaderApprove = async () => {
    const body = {
      ewk_id: EWK_ID,
      leader_id: "7044497",
    };
    // const
    // http://10.17.66.242:7010/api/ewk/smart-ready-leader-approved/
    const url = `http://10.17.66.242:7010/api/ewk/smart-ready-leader-approved/`;
    try {
      const response1 = await axios.post(url, body);
      console.log(response1);
      dispatchs(setstatuslq({ ewk_item_seq: 6 }));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div> LeaderApprove</div>
      <div>{EWK_ID}</div>
      <div>
        <input type="text" placeholder={`${leaderapprove}`} />
        <button onClick={() => fetchLeaderApprove()}>Submit</button>
      </div>
    </div>
  );
}

export default LeaderApprove;
