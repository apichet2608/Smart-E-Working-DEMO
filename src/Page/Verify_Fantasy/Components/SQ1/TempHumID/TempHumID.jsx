import React, { useState, useEffect } from "react";
import ChipTempHumID from "./ChipTempHumID";
function TempHumID(props) {
  const { response_API } = props;
  const [TempHumIDData, setTempHumIDData] = useState([]);
  const [TempHumIDStatus, setTempHumIDStatus] = useState([]);

  useEffect(() => {
    if (response_API !== null) {
      setTempHumIDData(response_API.data.data);
      setTempHumIDStatus(response_API.data.ewk_judge);
    }
  }, [response_API]);

  return (
    <div>
      {TempHumIDData.length > 0 && TempHumIDData !== null ? (
        <ChipTempHumID
          TempHumIDData={TempHumIDData}
          TempHumIDStatus={TempHumIDStatus}
        />
      ) : (
        <>{response_API.data.message}</>
      )}
    </div>
  );
}

export default TempHumID;
