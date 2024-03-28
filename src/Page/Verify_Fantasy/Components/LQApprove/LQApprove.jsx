import React, { useState, useEffect } from "react";
import ChipDataCheck from "./ChipDataCheck";

function LQApprove(props) {
  const { response_API, requestApprove } = props;
  const [GroupChipData, setGroupChipData] = useState([]);

  useEffect(() => {
    if (response_API !== null) {
      console.log("response_API", response_API);
      setGroupChipData(response_API.data.data);
    }
  }, [response_API]);

  useEffect(() => {
    if (GroupChipData.length > 0 && GroupChipData !== null) {
      console.log("GroupChipData", GroupChipData);
    }
  }, [GroupChipData]);
  return (
    <div>
      {response_API.status === "OK" ? (
        <>
          {GroupChipData.length > 0 && GroupChipData !== null && (
            <div className="flex gap-2">
              {GroupChipData.map((item, index) => {
                return (
                  <div key={index}>
                    <ChipDataCheck
                      title={
                        item.title === "lq approve"
                          ? "LQ Approve"
                          : item.title === "gr&r"
                          ? "Gr&R"
                          : item.title
                      }
                      data={item.data}
                      status={item.ewk_judge}
                      requestApprove={requestApprove}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <>
          <ChipError
            title={"LQ Approve & GR&R"}
            message={"-"}
            onClick={requestApprove}
          />
        </>
      )}
    </div>
  );
}

export default LQApprove;
