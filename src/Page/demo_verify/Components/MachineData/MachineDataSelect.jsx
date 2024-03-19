import React from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import MachineDATATable from "./TableMachineData";
function MachineDataSelect(props) {
  const {
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
  } = props;

  const getBadgeDetails = (status) => {
    if (status === true) {
      return { backgroundColor: "rgba(0, 255, 0, 1)", text: "SCADA" };
    } else if (status === false || ["No Data"].includes(status)) {
      return { backgroundColor: "#ECEE81", text: "FAIL" };
    }
    return { backgroundColor: "initial", text: "FAIL" }; // Default case
  };

  const { backgroundColor, text } = getBadgeDetails(statusMachine);
  const [selectfromsubmc_data, setselectfromsubmc_data] = React.useState("");

  const setselectdatafromship_mcData = (value) => {
    alert(value);
    setselectfromsubmc_data(value);
  };
  return (
    <div>
      {selectdatafromchip === "Machine Data" ? (
        <div>
          {badgemachine.map((item, index) => (
            // <BadgeComponent_Machine_data_sub
            //   key={index}
            //   status={item.status}
            //   label={item.name}
            //   onClick={() => setselectdatafromship_mcData(item.name)}
            //   selectvalue={selectdatafromship_mcData}
            // />
            <>
              <Badge
                badgeContent={
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor,
                      borderRadius: "10px",
                      padding: "2px",
                      fontSize: "12px",
                      fontFamily: "Inter Variable, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {text}
                  </Typography>
                }
                sx={{ marginRight: 2 }}
              >
                <Chip
                  label={item.name}
                  //   onClick={onClick}
                  onClick={() => setselectdatafromship_mcData(item.name)}
                  color="primary"
                  variant="outlined"
                  sx={{
                    maxWidth: "100%",
                    fontFamily: "Inter Variable, sans-serif",
                    fontWeight: 500,
                    backgroundColor:
                      selectdatafromchip === item.label ? "#a2d2ff" : "initial",
                  }}
                />
              </Badge>
            </>
          ))}
        </div>
      ) : null}
      <MachineDATATable
        selectdatafromship_mcData={selectfromsubmc_data}
        datamachineActv={MachineActv}
        datamachineAlm={MachineAlm}
        datamachineSet={MachineSet}
        datamachineStatus={MachineStatus}
        columnsactvData={columnsactvData}
        columnsAlmData={columnsAlmData}
        columnsSetData={columnsSetData}
        columnsStatusData={columnsStatusData}
      />
    </div>
  );
}

export default MachineDataSelect;
//   key={index}
//                             status={item.status}
//                             label={item.name}
//                             onClick={() =>
//                               setselectdatafromship_mcData(item.name)
//                             }
//                             selectvalue={selectdatafromship_mcData}
