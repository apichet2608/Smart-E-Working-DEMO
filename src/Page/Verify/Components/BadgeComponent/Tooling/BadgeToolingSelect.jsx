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
import PostAPI from "../../../API/POST/PostAPI";
import Loading from "../../../../../Components/common/loading/Loading-08/loading";

function BadgeToolingSelect({ data }) {
  const [selectchip, setselectchip] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [datacChip, setDataChip] = React.useState({
    p_tools_code: "",
    p_tools_rev: "",
  });

  const onClickChipselect = (tool_haed, tool_detile) => {
    setOpenDialog(true);
    console.log(tool_haed);
    console.log(tool_detile);
    setDataChip((prevState) => ({
      ...prevState,
      ...tool_detile,
    }));
  };

  const handleClose = () => {
    setOpenDialog(!openDialog);
  };

  useEffect(() => {
    console.log(datacChip);
  }, [datacChip]);

  // สร้างฟังก์ชันเพื่อแปลงค่าทั้งหมดใน datacChip เป็น lowercase
  const [isloadingprocess, setisloadingprocess] = useState(false);
  const convertToLowerCase = async () => {
    // const newDatacChip = {};
    // for (const key in datacChip) {
    //   if (Object.hasOwnProperty.call(datacChip, key)) {
    //     newDatacChip[key] = datacChip[key].toLowerCase();
    //   }
    // }
    // setDataChip(newDatacChip);
    console.log(datacChip);
    setisloadingprocess(true);
    try {
      const body = datacChip;
      const url = `http://10.17.66.242:7011/api/ewk/smart-call-fpc-tooling-pm-schedule-v2/`;
      const response_data = await PostAPI(body, url);

      if (response_data.status === "OK") {
        console.log(response_data);
        alert("OK");
      } else if (response_data.status === "ERROR") {
        console.log(response_data);
        alert("ERROR");
      } else {
        console.log(response_data);
        alert("Server Catch");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisloadingprocess(false);
    }
  };

  return (
    <div>
      {selectchip}
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
        <DialogTitle>{datacChip.p_tools_type}</DialogTitle>
        {isloadingprocess ? (
          <DialogContent>
            <Loading />
          </DialogContent>
        ) : (
          <>
            <DialogContent>
              <div style={{ display: "grid", gap: "4px" }}>
                papop response
                <p1 className="Paper_Contents">
                  P_SCAN_TYPE : {datacChip.p_scan_type}
                </p1>
                <p1 className="Paper_Contents">
                  P_LOT_MOS : {datacChip.p_lot_mos}
                </p1>
                <p1 className="Paper_Contents">
                  P_PROCESS : {datacChip.p_process}
                </p1>
                <p1 className="Paper_Contents">
                  P_TOOLS_TYPE : {datacChip.p_tools_type}
                </p1>
                <p1 className="Paper_Contents">
                  P_MACHINE :{datacChip.p_machine}
                </p1>
                <p1 className="Paper_Contents">P_USER : {datacChip.p_user}</p1>
                user input :
                <input
                  className="Paper_Contents"
                  placeholder="P_TOOLS_CODE"
                  value={datacChip.p_tools_code}
                  onChange={(e) =>
                    setDataChip((prevState) => ({
                      ...prevState,
                      p_tools_code: e.target.value.toLowerCase(),
                    }))
                  }
                />
                {/* <input
              className="Paper_Contents"
              placeholder="P_TOOLS_REV"
              disabled
            /> */}
              </div>
            </DialogContent>
            <DialogActions>
              <button
                className="bg-blue-50 p-4 rounded-xl hover:bg-blue-200"
                onClick={convertToLowerCase}
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
          </>
        )}
      </Dialog>
    </div>
  );
}

export default BadgeToolingSelect;
