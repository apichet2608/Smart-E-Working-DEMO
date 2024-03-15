import React from "react";
import MachinePM from "./MachinePM";
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";

function MachineComponents({
  statuspm_api,
  Messagepm_api,
  datapm,
  StatusDataPM,
  onClick,
  title,
  selectdatafromchip,
}) {
  const bgcolorSelect =
    title === selectdatafromchip ? "bg-green-200" : "bg-red-200";
  return (
    <div className="flex gap-3">
      {/* <p className={`${bgcolorSelect}`}>Machine PM</p> */}
      {statuspm_api === "CATCH" || statuspm_api === "ERROR" ? (
        <>
          <ChipError title={"Machine PM"} message={Messagepm_api} />
        </>
      ) : (
        <>
          {datapm && datapm.length > 0 ? (
            <MachinePM
              message={Messagepm_api}
              data={datapm}
              StatusData={StatusDataPM}
              onClick={onClick}
              // selectdatafromchip={selectdatafromchip}
            />
          ) : (
            // <ErrorBadge title={"Machine PM"} />
            <>
              <ChipNotFoundData title={"Machine PM"} message={Messagepm_api} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MachineComponents;
