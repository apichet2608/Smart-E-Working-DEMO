import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableData from "./Components/TableData/TableData";

function ChipTempHumID(props) {
  const {
    TempHumIDData,
    TempHumIDStatus,
    title,
    status,
    featchTempHumID,
    state,
  } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = async () => {
    // alert(state.ewk_item_seq);
    // if (state.ewk_item_seq <= 1) {
    await featchTempHumID();
    // }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="flex gap-2">
        <Badge
          badgeContent={<p>{status}</p>}
          color={status === "P" ? "success" : "error"}
        >
          <Chip
            label={title}
            color="primary"
            sx={{
              bgcolor: status === "P" ? "#66BB6A" : "#FFF176",
              "&:hover": {
                bgcolor: status === "P" ? "#43A047" : "#FFEE58",
              },
              color: "#000",
              fontWeight: "bold",
              borderColor: status === "P" ? "#33691E" : "#F57F17",
              borderStyle: "solid",
              borderWidth: "1px",
            }}
            onClick={handleClickOpen}
          />
        </Badge>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullScreen
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              <>
                {TempHumIDData && TempHumIDData.length > 0 && (
                  <>
                    <TableData Datas={TempHumIDData} />
                  </>
                )}
              </>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ChipTempHumID;
