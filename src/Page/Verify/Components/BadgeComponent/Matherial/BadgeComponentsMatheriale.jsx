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

function BadgeComponentsMatheriale({ status, datas }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    if (datas && datas.length > 0) {
      setData(datas);
    }
  }, [datas]);

  const handleClose = () => {
    setData([]);
    setOpenDialog(!openDialog);
  };

  const handleCheck_qr_code_input = async (id, value) => {
    console.log(id);
    console.log(value);
    //Call API P'Cha
    // Create a new array with modifications
    const newData = data.map((item, index) => {
      if (index === id) {
        return { ...item, verify_status: "TEST" }; // Update the verify_status for the clicked item
      }
      return item; // Return items that haven't changed as is
    });

    // Update the state with the new array
    setData(newData);
  };

  return (
    <>
      <Chip
        label={`Material`}
        onClick={() => {
          // alert(`click`);
          setOpenDialog(true);
        }}
        color={status === "PASS" ? "primary" : undefined}
        sx={{
          maxWidth: "100%",
          fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
          fontWeight: 500,
        }}
        icon={<AdsClickIcon />}
      />
      <>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xl"
          fullWidth={fullWidth}
          className="animate-fade"
        >
          <DialogTitle>Matheriale</DialogTitle>
          <DialogContent>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <div key={index} className="flex gap-2">
                  {/* Render content for each item here */}
                  <p>{item.create_at}</p>
                  <div>|</div>
                  <p>{item.update_date}</p>
                  <div>|</div>

                  <p>{item.scan_categ}</p>
                  <div>|</div>

                  <p>{item.proc_grp_name}</p>
                  <div>|</div>

                  <p>{item.scan_time}</p>
                  <div>|</div>

                  <p>{item.scan_desc}</p>
                  <div>|</div>
                  <p>{item.scan_job_id}</p>
                  <div>|</div>

                  <p
                    onClick={() => {
                      handleCheck_qr_code_input(index, item.qr_code_input);
                    }}
                  >
                    TEST
                    {item.qr_code_input}
                  </p>
                  <div>|</div>

                  <p>{item.verify_status}</p>

                  {/* Example: render the item as a paragraph */}
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
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
      </>
    </>
  );
}

export default BadgeComponentsMatheriale;
