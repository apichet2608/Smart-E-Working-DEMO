import React, { useState, useEffect } from "react";
import ChipTempHumID from "./ChipTempHumID";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import ChipNodata from "../Chip_Nodata/NoDataBadge";
import ChipERROR from "../Chip_Error/ErrorBadge";
function TempHumID(props) {
  const { response_API, featchTempHumID, state } = props;
  const [TempHumIDData, setTempHumIDData] = useState([]);
  const [TempHumIDStatus, setTempHumIDStatus] = useState([]);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (response_API !== null) {
      setTempHumIDData(response_API.data.data);
      setTempHumIDStatus(response_API.data.ewk_judge);
      setMessage(response_API.data.message);
      setStatus(response_API.data.ewk_judge);
    }
  }, [response_API]);

  return (
    <div>
      {response_API.status === "OK" ? (
        <>
          {TempHumIDData.length > 0 && TempHumIDData !== null ? (
            <ChipTempHumID
              TempHumIDData={TempHumIDData}
              TempHumIDStatus={TempHumIDStatus}
              title={"Temp & HumID"}
              status={status}
              featchTempHumID={featchTempHumID}
              state={state}
            />
          ) : (
            // <>{response_API.data.message}</>
            <ChipNodata
              title={"Temp & HumID"}
              message={response_API.data.message}
              status={status}
            />
          )}
        </>
      ) : (
        <ChipERROR
          title={"Temp & HumID"}
          message={response_API.data.message}
          onClick={featchTempHumID}
        />
      )}
    </div>
  );
}

export default TempHumID;
