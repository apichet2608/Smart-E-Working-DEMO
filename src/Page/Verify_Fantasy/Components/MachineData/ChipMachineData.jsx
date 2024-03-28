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
        badgeContent={statusChipMain === "P" ? "P" : "F"}
        // color="primary"
        color={statusChipMain === "P" ? "success" : "error"}
      >
        <Chip
          label={title}
          onClick={handleClicked}
          sx={{
            maxWidth: "100%",
            fontFamily: "Inter Variable, sans-serif",
            fontWeight: "bold",
            bgcolor: statusChipMain === "P" ? "#66BB6A" : "#FFF176",
            "&:hover": {
              bgcolor: statusChipMain === "P" ? "#43A047" : "#FFEE58",
            },
            color: "#000",
            borderColor: statusChipMain === "P" ? "#33691E" : "#F57F17",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
        />
      </Badge>
    </div>
  );
}

export default ChipMachineData;
