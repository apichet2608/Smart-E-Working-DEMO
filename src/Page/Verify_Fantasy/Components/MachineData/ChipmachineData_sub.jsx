import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TableCheck from "./Componets/TableData/TableData";
function ChipmachineData_sub(props) {
  const { data, onClick } = props;
  if (data.length === 0) {
    return null;
  }
  const titlename = data.length > 0 ? data[0].condition : "IMPOSIBLE";

  const [open, setOpen] = useState(false);
  const [dataCheck, setDataCheck] = useState(data);
  const [ColumnData, setColumnData] = useState([]); // Added this line
  const [statusChip, setStatusChip] = useState("");

  useEffect(() => {
    if (data.length > 0) {
      setDataCheck(data);
      // map check status by key judgment_record if have P all P else F
      const status = data.map((item) => item.judgment_record);
      console.log(status);
      const hasFailStatus = data.some(
        (item) => item.judgment_record && item.judgment_record.includes("FAIL")
      );
      console.log(hasFailStatus);
      setStatusChip(hasFailStatus ? "F" : "P");
      const column = generateColumns(data, titlename.toUpperCase());
      console.log("titlename", titlename);
      console.log("column", column);
      setColumnData(column);
    }
  }, [data]);

  function generateColumns(dataArray, name) {
    if (name === "ACTV") {
      return [...new Set(dataArray.flatMap(Object.keys))]
        .filter((header) =>
          [
            "parameter_desc",
            "condition",
            "usl",
            "lsl",
            "target",
            "result",
            "set",
            "judgment_record",
          ].includes(header)
        )
        .map((header) => ({
          field: header,
          headerName: header,
          width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
          // renderCell: (params) => {
          //   if (header === "judgment_record") {
          //     // ทำการ render cell ในลักษณะที่ต้องการ
          //     return params.value;
          //   } else {
          //     // ทำการ render cell อื่น ๆ ตามปกติ
          //     return params.value;
          //   }
          // },
        }));
    }
    if (name === "ALM") {
      return [...new Set(dataArray.flatMap(Object.keys))].map((header) => ({
        field: header,
        headerName: header,
        width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
      }));
    }
    if (name === "SET") {
      return [...new Set(dataArray.flatMap(Object.keys))]
        .filter((header) =>
          [
            "parameter_desc",
            "condition",
            "usl",
            "lsl",
            "target",
            "result",
            "set",
            "judgment_record",
          ].includes(header)
        )
        .map((header) => ({
          field: header,
          headerName: header,
          width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
        }));
    }
    if (name === "STATUS") {
      return [...new Set(dataArray.flatMap(Object.keys))]
        .filter(
          (header) =>
            ![
              "server",
              "process",
              "process_id",
              "roll",
              "first_lot",
              "end_lot",
              "id",
            ].includes(header)
        )
        .map((header) => ({
          field: header,
          headerName: header,
          width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
        }));
    }
    if (name === "ALL") {
      return [...new Set(dataArray.flatMap(Object.keys))]
        .filter(
          (header) =>
            ![
              // "machine",
              // "condition",
              // "parameter_desc",
              // "usl",
              // "lsl",
              // "target",
              // "result",
              // "ptime",
              // "set",
              "id",
            ].includes(header)
        )
        .map((header) => ({
          field: header,
          headerName: header,
          width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
        }));
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClick();
  };

  return (
    <>
      <Badge
        badgeContent={statusChip}
        // color={statusChip === "P" ? "primary" : "error"}
        color={statusChip === "P" ? "success" : "error"}
      >
        <Chip
          label={titlename.toUpperCase()}
          onClick={handleClickOpen}
          sx={{
            maxWidth: "100%",
            fontFamily: "Inter Variable, sans-serif",
            fontWeight: "bold",
            bgcolor: statusChip === "P" ? "#66BB6A" : "#FFF176",
            "&:hover": {
              bgcolor: statusChip === "P" ? "#43A047" : "#FFEE58",
            },
            color: "#000",
            borderColor: statusChip === "P" ? "#33691E" : "#F57F17",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
        />
      </Badge>
      <Dialog
        fullScreen={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" component="div">
            {titlename}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TableCheck Datas={dataCheck} columns={ColumnData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ChipmachineData_sub;
