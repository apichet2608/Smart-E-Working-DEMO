import React from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableData from "./Components/TableData/TableData";
function ChipPM(props) {
  const { status, title, data, state, requestApi_PM } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = async () => {
    // alert(state.ewk_item_seq);
    if (state.ewk_item_seq <= 1) {
      await requestApi_PM();
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Badge badgeContent={status} color="primary">
        <Chip label={title} onClick={handleClickOpen} />
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
              {data && data.length > 0 && (
                <>
                  <TableData Datas={data} />
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
  );
}

export default ChipPM;
