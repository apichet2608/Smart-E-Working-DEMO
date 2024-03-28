import React, { useState, useEffect } from "react";
import ChipDailyCheck from "./ChipDailyCheck";
import ChipError from "../Chip_Error/ErrorBadge";

function DailyCheck(props) {
  const { response_API, featchDailyCheck } = props;
  const [DailyCheckData, setDailyCheckData] = useState([]);
  const [DailyStatus, setDailyStatus] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (response_API !== null) {
      console.log("response_API", response_API);
      setDailyCheckData(response_API.data.data);
      setDailyStatus(response_API.data.ewk_judge);
      setMessage(response_API.data.message);
      setStatus(response_API.data.ewk_judge);
    }
  }, [response_API]);

  console.log("response_API", response_API);

  return (
    <div>
      {response_API.status === "OK" ? (
        <ChipDailyCheck
          DailyCheckData={DailyCheckData}
          DailyStatus={DailyStatus}
          message={message}
          status={status}
          featchDailyCheck={featchDailyCheck}
        />
      ) : (
        <>
          <ChipError
            title={"Daily Check"}
            message={"-"}
            onClick={featchDailyCheck}
          />
        </>
      )}
    </div>
  );
}

export default DailyCheck;
