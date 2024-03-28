import React from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";

function ChipHoldingTime(props) {
  const { HoldingTimeData } = props;

  return (
    <div>
      <Badge badgeContent={4} color="primary">
        <Chip label="Holding Time" color="primary" />
      </Badge>
      {HoldingTimeData.map((item, index) => (
        <div key={index}>
          <div>
            <div>lot_no : </div>
            <div>{item.lot_no}</div>
            <div>prd_name : </div>
            <div>{item.prd_name}</div>
            <div>current_process : </div>
            <div>{item.current_process}</div>
            <div>condition_desc : </div>
            <div>{item.condition_desc}</div>
            <div>max_a2 : </div>
            <div>{item.max_a2}</div>
            <div>hold_time : </div>
            <div>{item.hold_time}</div>
            <div>lock_holding_time : </div>
            <div>{item.lock_holding_time}</div>
            <div>b : </div>
            <div>{item.b}</div>
            <div>status : </div>
            <div>{item.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChipHoldingTime;
