import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function ChipMachineData(props) {
  const { title, message, statusChipMain, onClick } = props;
  return (
    <div>
      <Badge
        badgeContent={statusChipMain === "PASS" ? "P" : "F"}
        color="primary"
      >
        <Chip label={title} onClick={onClick} />
      </Badge>
    </div>
  );
}

export default ChipMachineData;
