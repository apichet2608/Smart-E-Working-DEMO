import React, { useState, useEffect } from "react";
import ChipDailyCheck from "./ChipDailyCheck";

function DailyCheck(props) {
  const { response_API } = props;
  const [DailyCheckData, setDailyCheckData] = useState([]);
  const [DailyStatus, setDailyStatus] = useState([]);
  useEffect(() => {
    if (response_API !== null) {
      console.log("response_API", response_API);
      setDailyCheckData(response_API.data.data);
      setDailyStatus(response_API.data.ewk_judge);
    }
  }, [response_API]);

  console.log("response_API", response_API);

  return (
    <div>
      <ChipDailyCheck
        DailyCheckData={DailyCheckData}
        DailyStatus={DailyStatus}
      />
    </div>
  );
}

export default DailyCheck;
