import React from "react";
import TableData from "../TableData/TableData"; // Ensure the path is correct

function MachineData(props) {
  const {
    selectdatafromship_mcData,
    datamachineActv,
    datamachineAlm,
    datamachineSet,
    datamachineStatus,
    columnsactvData,
    columnsAlmData,
    columnsSetData,
    columnsStatusData,
  } = props;

  console.log(props);

  // Function to check if data and columns are not empty
  const isValidDataAndColumns = (data, columns) => {
    return data && data.length > 0 && columns && columns.length > 0;
  };

  // Function to render the data based on the selection
  const renderData = () => {
    switch (selectdatafromship_mcData) {
      case "actv":
        if (isValidDataAndColumns(datamachineActv, columnsactvData)) {
          return (
            <TableData Datas={datamachineActv} columns={columnsactvData} />
          );
        }
        break;
      case "alm":
        if (isValidDataAndColumns(datamachineAlm, columnsAlmData)) {
          return <TableData Datas={datamachineAlm} columns={columnsAlmData} />;
        }
        break;
      case "set":
        if (isValidDataAndColumns(datamachineSet, columnsSetData)) {
          return <TableData Datas={datamachineSet} columns={columnsSetData} />;
        }
        break;
      case "status":
        if (isValidDataAndColumns(datamachineStatus, columnsStatusData)) {
          return (
            <TableData Datas={datamachineStatus} columns={columnsStatusData} />
          );
        }
        break;
      default:
        // This will show up if the selection is invalid or data/columns are missing
        return (
          <div>
            Please select a valid dataset and ensure data/columns are not empty.
          </div>
        );
    }
    // This will show up if data or columns are empty for a valid selection
    return <div>Data or columns are missing for the selected dataset.</div>;
  };

  return <div className="Paper_Contents mt-2">{renderData()}</div>;
}

export default MachineData;
