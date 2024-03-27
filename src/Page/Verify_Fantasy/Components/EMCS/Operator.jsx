import React, { useState, useEffect } from "react";
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";
import Chip_Operator from "./Chip_Operator"; // Added this line
function Operator(props) {
  const { response_API, EWK_ID } = props;
  console.log(response_API);

  const [dataCheck, setDataCheck] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (response_API.status === "OK") {
      setTitle(response_API.data.data.tool_haed);
      setMessage(response_API.message);
      setDataCheck([response_API.data.data.tool_detile]); // Added this line
      console.log([response_API.data.data.tool_detile]); // Added this line
    } else {
      setTitle("EMCS");
      setMessage(response_API.message);
    }
  }, [response_API]);

  return (
    <>
      {dataCheck && dataCheck.length > 0 ? (
        <div>
          {response_API.status === "OK" ? (
            <Chip_Operator
              title={title}
              data={response_API.data.data.tool_detile}
              EWK_ID={EWK_ID}
            />
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

export default Operator;
