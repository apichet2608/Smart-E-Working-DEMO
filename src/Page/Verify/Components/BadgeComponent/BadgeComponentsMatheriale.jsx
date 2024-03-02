import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import AdsClickIcon from "@mui/icons-material/AdsClick";
function BadgeComponentsMatheriale({ status }) {
  return (
    <>
      <Chip
        label={`Matheriale`}
        onClick={() => {
          alert(`click`);
        }}
        color={status === "PASS" ? "primary" : undefined}
        sx={{
          maxWidth: "100%",
          fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
          fontWeight: 500,
        }}
        icon={<AdsClickIcon />}
      />
      {/* <AdsClickIcon /> */}
    </>
  );
}

export default BadgeComponentsMatheriale;
