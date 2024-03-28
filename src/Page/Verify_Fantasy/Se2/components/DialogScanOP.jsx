import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function DialogScanOP() {
  return (
    <div>
      <Dialog open={false}>
        <DialogTitle id="scanOp">Scan OP</DialogTitle>
        <DialogContent>
          <DialogContentText>Demo</DialogContentText>
        </DialogContent>
        <DialogActions>
          <button>close</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
