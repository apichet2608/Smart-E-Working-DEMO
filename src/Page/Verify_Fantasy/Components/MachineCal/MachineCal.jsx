import React, { useEffect, useState } from "react";
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";
import ChipCal from "./ChipCal";

function MachineCal(props) {
  const { response_API, state, requestApi_Cal_monthly_detail } = props;
  const [title, setTitle] = useState("Machine Cal");
  const [message, setMessage] = useState("");
  const [dataTable, setDataTable] = useState([]); // Added this line
  const [statusCal, setStatusCal] = useState(""); // Added this line

  useEffect(() => {
    if (response_API.status === "OK") {
      setTitle("Machine Cal");
      setMessage(response_API.message);
      setDataTable(response_API.data.data); // Added this line
      setStatusCal(response_API.data.ewk_judge); // Added this line
      //   setTitle("Machine Cal");
      //   setMessage(response_API.message);
      //   setDataTable(response_API.data.data); // Added this line
      //   setStatusCal(response_API.data.ewk_judge); // Added this line
    } else {
      setTitle("Machine Cal");
      setMessage(response_API.message);
      //   setTitle("Machine Cal");
      //   setMessage(response_API.message);
    }
  }, [response_API]);

  return (
    <div>
      {dataTable && dataTable.length > 0 ? (
        <div>
          {response_API.status === "OK" ? (
            <>
              {dataTable.length > 0 && (
                <>
                  <ChipCal
                    status={statusCal}
                    title={title}
                    data={dataTable}
                    state={state}
                    requestApi_Cal_monthly_detail={
                      requestApi_Cal_monthly_detail
                    }
                  />
                </>
              )}
            </>
          ) : (
            <ChipError title={title} message={message} />
          )}
        </div>
      ) : (
        <>
          <ChipNotFoundData title={title} message={message} />
        </>
      )}
    </div>
  );
}

export default MachineCal;
