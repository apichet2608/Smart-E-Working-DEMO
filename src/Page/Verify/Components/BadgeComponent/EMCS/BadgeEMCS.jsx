import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function BadgeTooling({ data, onClick }) {
  console.log(data);
  const colorchip = data && data.length > 0 ? "primary" : undefined;
  return (
    <div>
      <Chip label={"EMCS"} onClick={onClick} color={colorchip} />

      {/* {data.map((item, index) => (
        <>
          <Chip label={item.tool_haed} />
        </>
      ))} */}
    </div>
  );
}

export default BadgeTooling;
