import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import NoDataBadge from "../Chip_Nodata/NoDataBadge";

function ChipDailyCheck(props) {
  const { DailyCheckData, DailyStatus, message, status, featchDailyCheck } =
    props;

  if (DailyCheckData.length > 0 && DailyCheckData !== null) {
    return (
      <>
        <Badge
          badgeContent={DailyStatus}
          color={status === "P" ? "success" : "error"}
        >
          <Chip
            label="Daily Check"
            sx={{
              maxWidth: "100%",
              fontFamily: "Inter Variable, sans-serif",
              fontWeight: "bold",
              bgcolor: status === "P" ? "#66BB6A" : "#FFF176",
              "&:hover": {
                bgcolor: status === "P" ? "#43A047" : "#FFEE58",
              },
              color: "#000",
              borderColor: status === "P" ? "#33691E" : "#F57F17",
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          />
        </Badge>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Checked By</th>
                  <th>Check Date</th>
                  <th>Check Sheet Code</th>
                  <th>Check Sheet Description</th>
                  <th>Created At</th>
                  <th>Department</th>
                  <th>Job ID</th>
                  <th>Lock EWK</th>
                  <th>Machine</th>
                  <th>Process Group</th>
                  <th>Record Code</th>
                  <th>Ref IS</th>
                  <th>Ref Record</th>
                  <th>Work Status</th>
                </tr>
              </thead>
              <tbody>
                {DailyCheckData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.approve_date}</td>
                    <td>{item.check_by}</td>
                    <td>{item.check_date}</td>
                    <td>{item.check_sheet_code}</td>
                    <td>{item.check_sheet_desc}</td>
                    <td>{item.create_at}</td>
                    <td>{item.dept}</td>
                    <td>{item.job_id}</td>
                    <td>{item.lock_ewk}</td>
                    <td>{item.machine}</td>
                    <td>{item.proc_grp}</td>
                    <td>{item.record_code}</td>
                    <td>{item.ref_is}</td>
                    <td>{item.ref_record}</td>
                    <td>{item.work_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <NoDataBadge
        title={"Daily Check"}
        message={"-"}
        status={status}
        onClick={featchDailyCheck}
      />
    </div>
  );
}

export default ChipDailyCheck;
