import React, { useState, useEffect } from "react";
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";
import ChipPM from "./ChipPM";

function MachinePM(props) {
  const [title, setTitle] = useState("Machine PM");
  const [message, setMessage] = useState("");
  const [dataTable, setDataTable] = useState([]); // Added this line
  const [statuspm, setStatuspm] = useState(""); // Added this line
  const [isLoading, setIsLoading] = useState(false); // Added this line

  const { response_API, state, requestApi_PM } = props;

  useEffect(() => {
    if (response_API.status === "OK") {
      setTitle("Machine PM");
      setMessage(response_API.message);
      setDataTable(response_API.data.data); // Added this line
      setStatuspm(response_API.data.ewk_judge); // Added this line
    } else {
      setTitle("Machine PM");
      setMessage(response_API.message);
    }
  }, [response_API]);

  return (
    <>
      {dataTable && dataTable.length > 0 ? (
        <div>
          {response_API.status === "OK" ? (
            <>
              {dataTable.length > 0 && (
                <>
                  <ChipPM
                    status={statuspm}
                    title={title}
                    data={dataTable}
                    state={state}
                    requestApi_PM={requestApi_PM}
                  />
                </>
              )}
            </>
          ) : (
            <ChipError title={title} message={message} />
          )}
        </div>
      ) : (
        <ChipNotFoundData title={title} message={message} />
      )}
    </>
  );
}

export default MachinePM;
