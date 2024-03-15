import React from "react";
import MachineCal from "../MachineCal/MachineCal";
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";

function MachineCalComponents({
  onClick,
  selectdatafromchip,
  title,
  statuscalibration_API,
  Messagecalibration,
  datacalibration,
  StatusDataCal,
}) {
  const bgcolorSelect =
    title === selectdatafromchip ? "bg-green-200" : "bg-red-200";

  return (
    <div className="flex gap-3">
      {/* MachineCalComponents */}
      {/* <p className={`${bgcolorSelect}`}>Machine CAL</p> */}
      {statuscalibration_API === "CATCH" ||
      statuscalibration_API === "ERROR" ? (
        <>
          <ChipError title={"Machine Cal"} message={Messagecalibration} />
        </>
      ) : (
        <>
          {datacalibration && datacalibration.length > 0 ? (
            <MachineCal
              data={datacalibration}
              StatusData={StatusDataCal}
              onClick={onClick}
              selectdatafromchip={selectdatafromchip}
            />
          ) : (
            // <ErrorBadge title={"Machine PM"} />
            <>
              <ChipNotFoundData
                title={"Machine Cal"}
                message={Messagecalibration}
              />
            </>
          )}
        </>
      )}
      {/* <MachineCal onClick={onClick} /> */}
    </div>
  );
}

export default MachineCalComponents;
