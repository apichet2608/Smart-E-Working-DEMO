import React, { useState, useEffect } from "react";
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";
import ChipHoldingTime from "./ChipHoldingTime";
function HoldingTime(props) {
  const { response_API, requestholdingtime } = props;
  const [HoldingTimeData, setHoldingTimeData] = useState([]);
  const [HoldingTimeStatus, setHoldingTimeStatus] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (response_API && response_API.data.data.length > 0) {
      setHoldingTimeData(response_API.data.data);
      setHoldingTimeStatus(response_API.data.ewk_judge);
      setMessage(response_API.data.message);
    } else {
      setHoldingTimeData([]);
      setHoldingTimeStatus(response_API.data.ewk_judge);
      setMessage(response_API.data.message);
    }
  }, [response_API]);

  return (
    <>
      {response_API.status === "OK" ? (
        <>
          {HoldingTimeData && HoldingTimeData.length > 0 ? (
            <>
              <ChipHoldingTime HoldingTimeData={HoldingTimeData} />
            </>
          ) : (
            <ChipNotFoundData
              title={"Holding Time"}
              message={"-"}
              status={HoldingTimeStatus}
              onClick={requestholdingtime}
            />
          )}
        </>
      ) : (
        <>
          <ChipError
            title={"Holding Time"}
            message={message}
            onClick={requestholdingtime}
          />
        </>
      )}
    </>
  );
}

export default HoldingTime;
