import React from "react";
import InfoIcon from "@mui/icons-material/Info";
function info({ datacChip }) {
  return (
    <div style={{ display: "grid", gap: "4px" }} className="Paper_Contents">
      <div className="flex gap-2 ">
        <p className="w-36 text-nowrap m-auto">P_SCAN_TYPE :</p>
        <p className="Paper_Contents_info w-full">{datacChip.p_scan_type}</p>
      </div>
      <div className="flex gap-2">
        <p className="w-36 text-nowrap m-auto">P_PROCESS :</p>
        <p className="Paper_Contents_info w-full">{datacChip.p_process}</p>
      </div>
      <div className="flex gap-2">
        <p className="w-36 text-nowrap m-auto">P_TOOLS_TYPE :</p>
        <p className="Paper_Contents_info w-full">{datacChip.p_tools_type}</p>
      </div>
      <div className="flex gap-2">
        <p className="w-36 text-nowrap m-auto">P_MACHINE :</p>
        <p className="Paper_Contents_info w-full">{datacChip.p_machine}</p>
      </div>
      <div className="flex gap-2">
        <p className="w-36 text-nowrap m-auto">P_USER :</p>
        <p className="Paper_Contents_info w-full">{datacChip.p_user}</p>
      </div>
    </div>
  );
}

export default info;
