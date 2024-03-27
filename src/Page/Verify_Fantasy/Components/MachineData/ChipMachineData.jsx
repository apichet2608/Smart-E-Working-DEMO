import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function ChipMachineData(props) {
  const { title, message, statusChipMain, onClick, state } = props;

  const handleClicked = async () => {
    if (state.ewk_item_seq <= 1) {
      await onClick();
    }
  };
  return (
    <div>
      <Badge
        badgeContent={statusChipMain === "PASS" ? "P" : "F"}
        color="primary"
      >
        <Chip label={title} onClick={handleClicked} />
      </Badge>
    </div>
  );
}

export default ChipMachineData;
