import React, { useState, useEffect } from "react";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableCheck from "./Components/TableData/TableData";
function ChipFAI(props) {
  const { data } = props;

  const [open, setOpen] = React.useState(false);
  const [dataCheck, setDataCheck] = useState([]);
  const [titleselect, setTitleSelect] = useState("");
  const handleClickOpen = (value) => {
    console.log(value);
    setDataCheck(value);
    setTitleSelect(data.jwpv_job_type);
  };
  const handleClose = () => {
    setDataCheck([]);
    setOpen(false);
  };

  useEffect(() => {
    console.log(dataCheck);
    if (dataCheck && dataCheck.length > 0) {
      setOpen(true);
    }
  }, [dataCheck]);

  return (
    <div>
      {data.data && data.data.length > 0 ? (
        <>
          <Badge
            badgeContent={
              data.data.filter((item) => item.ewk_judge === "P") ? (
                <>P</>
              ) : (
                <>F</>
              )
            }
            color={
              data.data.filter((item) => item.ewk_judge === "P")
                ? "success"
                : "error"
            }
          >
            <Chip
              label={data.jwpv_job_type}
              onClick={() => handleClickOpen(data.data)}
              sx={{
                maxWidth: "100%",
                fontFamily: "Inter Variable, sans-serif",
                fontWeight: 500,
                bgcolor: data.data.filter((item) => item.ewk_judge === "P")
                  ? "#66BB6A"
                  : "#FFF176",
                "&:hover": {
                  bgcolor: data.data.filter((item) => item.ewk_judge === "P")
                    ? "#43A047"
                    : "#FFEE58",
                },
                color: "#000",
                // fontWeight: "bold",
                borderColor: data.data.filter((item) => item.ewk_judge === "P")
                  ? "#33691E"
                  : "#F57F17",
                borderStyle: "solid",
                borderWidth: "1px",
              }}
            />
          </Badge>
        </>
      ) : (
        // <ChipNotFoundData title={data.jwpv_job_type} message={data.ewk_judge} />
        <Badge
          badgeContent={
            <Typography
              variant="caption"
              sx={{
                borderRadius: "10px",
                padding: "3px",
                fontFamily: "Inter Variable, sans-serif",
                fontWeight: 500,
                marginBottom: "14px",
                backgroundColor: "#757575",
              }}
              // color={"error"}
            >
              {data.ewk_judge}
            </Typography>
          }
          sx={{ marginRight: 2 }}
        >
          <Chip
            label={data.jwpv_job_type}
            color={data.ewk_judge === "P" ? "success" : "error"}
            sx={{
              maxWidth: "100%",
              fontFamily: "Inter Variable, sans-serif",
              fontWeight: 500,
            }}
          />
        </Badge>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={true}
      >
        <DialogTitle id="alert-dialog-title">
          {/* {"FAI Auto Verify"} */}
          {titleselect}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* {dataCheck.map((item, index) => {
              return (
                <Chip
                  key={index}
                  label={item.jwpv_param_value}
                  color={item.ewk_judge === "P" ? "success" : "error"}
                />
              );
            })} */}
            <TableCheck Datas={dataCheck} />
          </Box>
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

export default ChipFAI;
