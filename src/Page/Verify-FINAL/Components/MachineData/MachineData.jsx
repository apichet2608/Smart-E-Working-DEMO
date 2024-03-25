import React, { useState, useEffect } from "react";
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";
import ChipMachineData from "./ChipMachineData";
import ChipMachineData_Sub from "./ChipmachineData_sub";
function MachineData(props) {
  const { fetchStatusMachine, response_API } = props;
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [dataTable, setDataTable] = useState([]); // Added this line'
  const [groupdataTable, setGroupDataTable] = useState([]); // Added this line
  const [statusChipMain, setStatusChipMain] = useState("");
  useEffect(() => {
    console.log(response_API);
    if (response_API.status === "OK") {
      setTitle("Machine Data");
      setMessage(response_API.message);
      if (
        response_API.data.data.data &&
        response_API.data.data.data.length > 0
      ) {
        setDataTable(response_API.data.data.data); // Added this line
        setStatusChipMain(response_API.data.judgment_machine);
        setGroupDataTable(response_API.data.data); // Added this line
        console.log("dataTable", dataTable);
        console.log("dataTable", response_API.data.data);
        const formattedData = Object.values(response_API.data.data).map(
          (group) => group.map((item) => item)
        );

        setGroupDataTable(formattedData);
      } else {
        setDataTable([]); // Added this line
      }
    } else {
      setTitle("Machine Data");
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
                  <ChipMachineData
                    title={title}
                    message={message}
                    statusChipMain={statusChipMain}
                    onClick={() => fetchStatusMachine()}
                  />

                  {groupdataTable && groupdataTable.length > 0 ? (
                    <>
                      {groupdataTable.slice(1).map((item, index) => {
                        if (item && item.length > 0) {
                          return (
                            <ChipMachineData_Sub
                              key={index}
                              data={item}
                              onClick={() => fetchStatusMachine()}
                            />
                          );
                        } else {
                          return null;
                        }
                      })}
                    </>
                  ) : null}
                </div>
              )}
            </>
          ) : (
            <ChipError title={title} message={message} />
          )}
        </div>
      ) : (
        <>
          {response_API.status === "OK" ? (
            <ChipNotFoundData title={title} message={message} />
          ) : (
            <ChipError title={title} message={message} />
          )}
        </>
      )}
    </>
  );
}

export default MachineData;
