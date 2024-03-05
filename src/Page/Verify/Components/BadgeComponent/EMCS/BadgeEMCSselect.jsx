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
import EditNoteIcon from "@mui/icons-material/EditNote";
function BadgeToolingSelect({ data }) {
  const [selectchip, setselectchip] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [datacChip, setDataChip] = React.useState([]);

  const onClickChipselect = (tool_haed, tool_detile) => {
    setOpenDialog(true);
    console.log(tool_haed);
    console.log(tool_detile);
    setDataChip(tool_detile);
  };

  const handleClose = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <div>
      {data.map((item, index) => (
        <>
          <Chip
            label={item.tool_haed}
            onClick={() => {
              onClickChipselect(item.tool_haed, item.tool_detile);
            }}
            icon={<EditNoteIcon />}
          />
        </>
      ))}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        fullWidth={fullWidth}
        className="animate-fade"
      >
        <DialogTitle>{datacChip.ttt_tools_type}</DialogTitle>
        <DialogContent>
          <div style={{ display: "grid", gap: "4px" }}>wait</div>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-blue-50 p-4 rounded-xl hover:bg-blue-200"
            // onClick={handleClose}
          >
            Save
          </button>
          <button
            className="bg-orange-50 p-4 rounded-xl hover:bg-orange-200"
            onClick={handleClose}
          >
            Concel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BadgeToolingSelect;
