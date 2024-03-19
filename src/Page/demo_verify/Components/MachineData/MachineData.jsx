import React from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import MachineDataSelect from "./MachineDataSelect";
//   selectdatafromchip = { selectdatafromchip };
//   machineData = { machineData };
//   statusMachine = { statusMachine };
//   MessageMachine = { MessageMachine };
//   MachineActv = { MachineActv };
//   columnsactvData = { columnsactvData };
//   MachineAlm = { MachineAlm };
//   columnsAlmData = { columnsAlmData };
//   MachineSet = { MachineSet };
//   columnsSetData = { columnsSetData };
//   MachineStatus = { MachineStatus };
//   columnsStatusData = { columnsStatusData };
//   badgemachine = { badgemachine };
//   MessageAPImachinedata = { MessageAPImachinedata };
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";

function MachineData(props) {
  const {
    title,
    selectdatafromchip,
    machineData,
    statusMachine,
    MessageMachine,
    MachineActv,
    columnsactvData,
    MachineAlm,
    columnsAlmData,
    MachineSet,
    columnsSetData,
    MachineStatus,
    columnsStatusData,
    badgemachine,
    MessageAPImachinedata,
    onClick,
  } = props;

  const colorbg = statusMachine === false ? "red" : "green";
  return (
    <div>
      {MessageAPImachinedata === "CATCH" ||
      MessageAPImachinedata === "ERROR" ? (
        <>
          <ChipError title={"Machine Data"} message={MessageMachine} />
        </>
      ) : (
        <>
          {machineData && machineData.length > 0 ? (
            // <BadgeComponent_Machine_data
            //   machineData={machineData}
            //   statusMachine={statusMachine}
            //   label={"Machine Data"}
            //   // onClick={
            //   //   (() => fetchStatusMachine(),
            //   //   setselectdatafromchip("Machine Data"))
            //   // }
            //   onClick={() => {
            //     fetchStatusMachine();
            //     setselectdatafromchip("Machine Data");
            //   }}
            // />
            <Badge
              badgeContent={
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: colorbg,
                    borderRadius: "10px",
                    padding: "3px",
                    fontFamily: "Inter Variable, sans-serif",
                    fontWeight: 500,
                    width: "100%",
                    marginBottom: "14px",
                  }}
                >
                  {statusMachine === false ? "F" : "P"}
                </Typography>
              }
            >
              <Chip label={title} onClick={onClick} color="primary" />
            </Badge>
          ) : (
            // <ErrorBadge title={"Machine PM"} />
            <>
              <ChipNotFoundData
                title={"Machine Data"}
                message={MessageMachine}
              />
            </>
          )}
        </>
      )}

      {selectdatafromchip === "Machine Data" && machineData.length > 0 ? (
        <>
          <MachineDataSelect
            selectdatafromchip={selectdatafromchip}
            machineData={machineData}
            statusMachine={statusMachine}
            MessageMachine={MessageMachine}
            MachineActv={MachineActv}
            columnsactvData={columnsactvData}
            MachineAlm={MachineAlm}
            columnsAlmData={columnsAlmData}
            MachineSet={MachineSet}
            columnsSetData={columnsSetData}
            MachineStatus={MachineStatus}
            columnsStatusData={columnsStatusData}
            badgemachine={badgemachine}
            MessageAPImachinedata={MessageAPImachinedata}
          />
        </>
      ) : (
        <>X</>
      )}
    </div>
  );
}

export default MachineData;
