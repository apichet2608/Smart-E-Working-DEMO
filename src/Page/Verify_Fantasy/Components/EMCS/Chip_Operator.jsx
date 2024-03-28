import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PostAPI from "../../API/POST/PostAPI";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import Info from "./Components/info";
import TableData from "./Components/TableData/TableData";

function Chip_Operator(props) {
  const { title, data, EWK_ID } = props;
  //   console.log(data);
  // alert(title);
  const [open, setOpen] = React.useState(false);
  const [datacChip, setDataChip] = React.useState({
    p_tools_code: "",
    p_tools_rev: "",
  });
  const [dataCheck, setDataCheck] = React.useState([]);
  const [MessageResponse, setMessageResponse] = useState("");

  const [ResponseMessage, setResponseMessage] = useState([]);

  useEffect(() => {
    console.log(ResponseMessage);
  }, [ResponseMessage]);

  useEffect(() => {
    if (data && dataCheck && dataCheck.length > 0) {
      setDataChip((prevState) => ({
        ...prevState,
        ...data,
      }));
      setOpen(true);
    }
  }, [dataCheck]);

  useEffect(() => {
    console.log(datacChip);
  }, [datacChip]);

  const handleClickOpen = () => {
    setDataCheck([data]);
    //loop change
    const NewMessage = data.ewk_job_record.map((item, index) => {
      return {
        id: index,
        op_id: item.ewk_result,
        status: "OK",
        message: `Record is successful`,
      };
    });
    console.log(NewMessage);
    setResponseMessage(NewMessage);
  };
  const handleClose = () => {
    setOpen(false);
    setDataCheck([]);
  };

  const convertToLowerCase = async () => {
    // const renamedDatacChip = {
    //   p_scan_type: datacChip["p_scan_type"],
    //   p_lot_mos: datacChip["p_lot_mos"], // Rename p_lot_mos to p_lot_roll
    //   p_process: datacChip["p_process"], // Rename p_process to p_proc_id
    //   // p_machine_flg: "Y", // Add p_machine_flg with value "Y"
    //   p_tools_type: datacChip["p_tools_type"],
    //   p_tools_code: datacChip["p_tools_code"],
    //   // p_tools_rev: datacChip["p_tools_rev"],
    //   // p_tools_type_name: datacChip["p_tools_type_name"],
    //   p_machine: datacChip["p_machine"],
    //   p_user: datacChip["p_user"],
    //   p_station: datacChip["p_machine"],
    //   ewk_id: EWK_ID,
    //   ewk_item: datacChip["p_tools_type_name"],
    //   ewk_item_detail: datacChip["p_tools_type_name"],
    //   p_tool_rev: "",
    // };
    // console.log(datacChip);
    // console.log(renamedDatacChip);
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
    try {
      const body = renamedDatacChip;
      const url = `http://10.17.66.242:7010/api/ewk/smart-call-fpc-eworking-set-tooling-code/`;
      const response_data = await PostAPI(body, url);

      if (response_data.status === "OK") {
        console.log(response_data);
        // alert("OK");
        setMessageResponse(response_data.message);
        const newMessage = {
          id: ResponseMessage.length + 1,
          op_id: datacChip["p_tools_code"],
          status: response_data.status,
          message: response_data.message,
        };
        setResponseMessage((prevMessages) => [...prevMessages, newMessage]);
      } else if (response_data.status === "ERROR") {
        console.log(response_data);
        // alert("ERROR");
        setMessageResponse(response_data.message);
        const newMessage = {
          id: ResponseMessage.length + 1,
          op_id: datacChip["p_tools_code"],
          status: response_data.status,
          message: response_data.message,
        };
        setResponseMessage((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.log(response_data);
        setMessageResponse(response_data.message);
        const newMessage = {
          id: ResponseMessage.length + 1,
          op_id: datacChip["p_tools_code"],
          status: response_data.status,
          message: response_data.message,
        };
        setResponseMessage((prevMessages) => [...prevMessages, newMessage]);
        // alert("Server Catch");
      }
    } catch (error) {
      console.error(error);
    } finally {
      //   setisloadingprocess(false);
    }
  };

  return (
    <div>
      <Chip label={title} color="primary" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={true}
      >
        <DialogTitle id="alert-dialog-title">{EWK_ID}</DialogTitle>
        <DialogContent>
          {/* //! fixed THIS FOR EMCS AND TOOLING */}
          <div style={{ display: "grid", gap: "10px" }}>
            <Info datacChip={datacChip} />
            <div className="w-full flex gap-2 Paper_Contents">
              <p className="w-36 text-nowrap m-auto">{title}</p>
              <div className="Paper_Contents w-full flex gap-4">
                <>
                  <QrCodeScannerIcon />
                </>
                <input
                  className="w-full"
                  placeholder={title}
                  value={datacChip.p_tools_code}
                  onChange={(e) =>
                    setDataChip((prevState) => ({
                      ...prevState,
                      p_tools_code: e.target.value.toLowerCase(),
                    }))
                  }
                />
              </div>
            </div>
            <TableData Datas={ResponseMessage} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
          <Button onClick={convertToLowerCase} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Chip_Operator;
