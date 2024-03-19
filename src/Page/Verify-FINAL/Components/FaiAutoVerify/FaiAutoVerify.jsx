import React, { useState, useEffect } from "react";
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";
import ChipFAI from "./Chip_Sub_FAI";
import Chip_FAI_MAIN from "../FaiAutoVerify/Chip_FAI";
function FaiAutoVerify(props) {
  const { response_API } = props;
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [dataTable, setDataTable] = useState([]); // Added this line

  useEffect(() => {
    if (response_API.status === "OK") {
      console.log(response_API);
      console.log(response_API.data.data.fai_verify_report);
      setTitle("Fai Auto Verify");
      setMessage(response_API.message);
      setDataTable(response_API.data.data.fai_verify_report); // Added this line
    } else {
      setTitle("Fai Auto Verify");
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
                <div className="flex gap-2">
                  <Chip_FAI_MAIN
                    datacheck={response_API.data.data.fai_verify_report}
                    title={title}
                    message={message}
                  />
                  {dataTable.map((item, index) => {
                    return <ChipFAI key={index} data={item} />;
                  })}
                </div>
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

export default FaiAutoVerify;
