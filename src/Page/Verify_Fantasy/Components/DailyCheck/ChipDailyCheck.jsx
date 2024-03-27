import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";

function ChipDailyCheck(props) {
  const { DailyCheckData } = props;

  if (DailyCheckData.length > 0 && DailyCheckData !== null) {
    return (
      <div className="flex gap-2">
        <h1>Daily Check</h1>
        {DailyCheckData.map((item, index) => {
          return (
            <div key={index} className="flex gap-2">
              <p className="bg-slate-200"> {item.approve_date}</p>
              <p className="bg-slate-200"> {item.check_by}</p>
              <p className="bg-slate-200"> {item.check_date}</p>
              <p className="bg-slate-200"> {item.check_sheet_code}</p>
              <p className="bg-slate-200"> {item.check_sheet_desc}</p>
              <p className="bg-slate-200"> {item.create_at}</p>
              <p className="bg-slate-200"> {item.dept}</p>
              <p className="bg-slate-200"> {item.job_id}</p>
              <p className="bg-slate-200"> {item.lock_ewk}</p>
              <p className="bg-slate-200"> {item.machine}</p>
              <p className="bg-slate-200"> {item.proc_grp}</p>
              <p className="bg-slate-200"> {item.record_code}</p>
              <p className="bg-slate-200"> {item.ref_is}</p>
              <p className="bg-slate-200"> {item.ref_record}</p>
              <p className="bg-slate-200"> {item.work_status}</p>
            </div>
          );
        })}
      </div>
    );
  }
  return <div>ChipDailyCheck : No Data</div>;
}

export default ChipDailyCheck;
