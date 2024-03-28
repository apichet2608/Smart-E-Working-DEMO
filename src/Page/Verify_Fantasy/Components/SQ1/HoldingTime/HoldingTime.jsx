import React, { useState, useEffect } from "react";

function HoldingTime(props) {
  const { response_API } = props;
  const [HoldingTimeData, setHoldingTimeData] = useState([]);
  const [HoldingTimeStatus, setHoldingTimeStatus] = useState([]);
  useEffect(() => {
    if (response_API && response_API.data.data.length > 0) {
      setHoldingTimeData(response_API.data.data);
      setHoldingTimeStatus(response_API.data.ewk_judge);
    }
  }, [response_API]);

  return (
    <div className="Paper_Contents">
      {response_API && response_API.data.data.length > 0 ? (
        <>
          {HoldingTimeData.map((item, index) => (
            <div key={index}>
              <div>
                <div>lot_no : </div>
                <div>{item.lot_no}</div>
                <div>prd_name : </div>
                <div>{item.prd_name}</div>
                <div>current_process : </div>
                <div>{item.current_process}</div>
                <div>condition_desc : </div>
                <div>{item.condition_desc}</div>
                <div>max_a2 : </div>
                <div>{item.max_a2}</div>
                <div>hold_time : </div>
                <div>{item.hold_time}</div>
                <div>lock_holding_time : </div>
                <div>{item.lock_holding_time}</div>
                <div>b : </div>
                <div>{item.b}</div>
                <div>status : </div>
                <div>{item.status}</div>
              </div>
              {/* "id": 553, "lot_no": "994035453", "prd_name": "RGPZ-490ML-0A",
                "current_process": "RXD#", "condition_desc": "EXP (Dry film
                laminate -> Exposure)", "max_a2": "2024-03-27T14:00:39",
                "hold_time": 165.15, "lock_holding_time": 1440.0, "b": "RXD#",
                "status": "PASS" */}
            </div>
          ))}
        </>
      ) : (
        <>
          <div>HoldingTime : </div>
          <div>{response_API.data.message}</div>
        </>
      )}
    </div>
  );
}

export default HoldingTime;
