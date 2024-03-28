import React, { useState, useEffect } from "react";
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";
import ChipPM from "./ChipPM";

function MachinePM(props) {
  const [title, setTitle] = useState("Machine PM");
  const [message, setMessage] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const [statuspm, setStatuspm] = useState("");

  const { response_API, state, requestApi_PM } = props;

  useEffect(() => {
    if (response_API.status === "OK") {
      setTitle("Machine PM");
      setMessage(response_API.message);
      setDataTable(response_API.data.data);
      setStatuspm(response_API.data.ewk_judge);
    } else {
      setDataTable([]);
      setTitle("Machine PM");
      setMessage(response_API.message);
      setStatuspm("F");
    }
  }, [response_API]);

  return (
    <>
      {response_API.status === "OK" ? (
        <>
          {dataTable.length > 0 ? (
            <>
              <ChipPM
                data={dataTable}
                status={statuspm}
                title={title}
                state={state}
                requestApi_PM={requestApi_PM}
              />
            </>
          ) : (
            <>
              <ChipNotFoundData
                title={title}
                message={message}
                status={statuspm}
                onClick={requestApi_PM}
              />
            </>
          )}
        </>
      ) : (
        <ChipError title={title} message={message} />
      )}
    </>
  );
}

export default MachinePM;
