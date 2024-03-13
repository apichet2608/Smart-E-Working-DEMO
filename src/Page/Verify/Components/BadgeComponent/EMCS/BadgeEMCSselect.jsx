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
import { ToastContainer, toast } from "react-toastify";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import Info from "./Components/info";
function BadgeToolingSelect({ data, EWK_ID }) {
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
  const [MessageResponse, setMessageResponse] = useState("");
  // const convertToLowerCase = async () => {
  //   setisloadingprocess(true);
  //   // const newDatacChip = {};
  //   // for (const key in datacChip) {
  //   //   if (Object.hasOwnProperty.call(datacChip, key)) {
  //   //     newDatacChip[key] = datacChip[key].toLowerCase();
  //   //   }
  //   // }
  //   // setDataChip(newDatacChip);
  //   console.log(datacChip);

  //   const renamedDatacChip = {
  //     p_scan_type: datacChip["p_scan_type"],
  //     p_lot_roll: datacChip["p_lot_mos"], // Rename p_lot_mos to p_lot_roll
  //     p_proc_id: datacChip["p_process"], // Rename p_process to p_proc_id
  //     p_machine_flg: "Y", // Add p_machine_flg with value "Y"
  //     p_tools_type: datacChip["p_tools_type"],
  //     p_tools_code: datacChip["p_tools_code"],
  //     p_tools_rev: datacChip["p_tools_rev"],
  //     p_tools_type_name: datacChip["p_tools_type_name"],
  //     p_machine: datacChip["p_machine"],
  //     p_user: datacChip["p_user"],
  //     ewk_id: EWK_ID,
  //     ewk_item: datacChip["p_tools_type_name"],
  //   };
  //   // const response = await toast.promise(fetch("A_URL"), {
  //   //   pending: "Promise is pending",
  //   //   success: "Promise resolved 👌",
  //   //   error: "Promise rejected 🤯",
  //   // });
  //   // console.log(response);
  //   try {
  //     const body = renamedDatacChip;
  //     const url = `http://10.17.66.242:7011/api/ewk/smart-call-fpc-tooling-code-by-product/`;
  //     const response_data = await PostAPI(body, url);

  //     if (response_data.status === "OK") {
  //       console.log(response_data);
  //       // alert("OK");
  //       setMessageResponse(response_data.message);
  //     } else if (response_data.status === "ERROR") {
  //       console.log(response_data);
  //       // alert("ERROR");
  //       setMessageResponse(response_data.message);
  //     } else {
  //       console.log(response_data);
  //       setMessageResponse(response_data.message);
  //       // alert("Server Catch");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setisloadingprocess(false);
  //   }
  // };
  const convertToLowerCase = async () => {
    setisloadingprocess(true);
    setisloadingprocess(false);

    // const newDatacChip = {};
    // for (const key in datacChip) {
    //   if (Object.hasOwnProperty.call(datacChip, key)) {
    //     newDatacChip[key] = datacChip[key].toLowerCase();
    //   }
    // }
    // setDataChip(newDatacChip);
    const output = datacChip["p_tools_code"].includes("+")
      ? datacChip["p_tools_code"].split("+")[1]
      : "";

    const renamedDatacChip = {
      p_scan_type: datacChip["p_scan_type"],
      p_lot_mos: datacChip["p_lot_mos"], // Rename p_lot_mos to p_lot_roll
      p_process: datacChip["p_process"], // Rename p_process to p_proc_id
      // p_machine_flg: "Y", // Add p_machine_flg with value "Y"
      p_tools_type: datacChip["p_tools_type"],
      p_tools_code: datacChip["p_tools_code"],
      // p_tools_rev: datacChip["p_tools_rev"],
      // p_tools_type_name: datacChip["p_tools_type_name"],
      p_machine: datacChip["p_machine"],
      p_user: datacChip["p_user"],
      p_station: datacChip["p_machine"],
      ewk_id: EWK_ID,
      ewk_item: datacChip["p_tools_type_name"],
      ewk_item_detail: datacChip["p_tools_type_name"],
      p_tool_rev: output,
    };
    console.log(datacChip);
    console.log(renamedDatacChip);

    // const response = await toast.promise(fetch("A_URL"), {
    //   pending: "Promise is pending",
    //   success: "Promise resolved 👌",
    //   error: "Promise rejected 🤯",
    // });
    // console.log(response);
    try {
      const body = renamedDatacChip;
      const url = `http://10.17.66.242:7011/api/ewk/smart-call-fpc-eworking-set-tooling-code/`;
      const response_data = await PostAPI(body, url);

      if (response_data.status === "OK") {
        console.log(response_data);
        // alert("OK");
        setMessageResponse(response_data.message);
      } else if (response_data.status === "ERROR") {
        console.log(response_data);
        // alert("ERROR");
        setMessageResponse(response_data.message);
      } else {
        console.log(response_data);
        setMessageResponse(response_data.message);
        // alert("Server Catch");
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
        // maxWidth="xl"
        // fullWidth={fullWidth}
        fullScreen
        // className="animate__animated animate__slideInUp"
      >
        <DialogTitle>
          <div className=" flex gap-2">
            <p>OPERATOR : {EWK_ID}</p>
            <div
              className={`bg-yellow-400 p-0.5 rounded-2xl px-6 ${
                MessageResponse === `P` ? `bg-green-500` : ``
              }`}
            >
              {MessageResponse}
            </div>
          </div>
        </DialogTitle>
        {isloadingprocess ? (
          <DialogContent>
            <div className="p-4">
              <Loading />
            </div>
          </DialogContent>
        ) : (
          <>
            <DialogContent>
              <div style={{ display: "grid", gap: "10px" }}>
                <Info datacChip={datacChip} />
                <div className="w-full flex gap-2 Paper_Contents">
                  <p className="w-36 text-nowrap m-auto">EMCS NO :</p>
                  <div className="Paper_Contents w-full flex gap-4">
                    <>
                      <QrCodeScannerIcon />
                    </>
                    <input
                      className="w-full"
                      placeholder="EMCS NO"
                      value={datacChip.p_tools_code}
                      onChange={(e) =>
                        setDataChip((prevState) => ({
                          ...prevState,
                          p_tools_code: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                className="bg-blue-50 p-4 rounded-xl hover:bg-blue-200"
                onClick={convertToLowerCase}
              >
                Check
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
