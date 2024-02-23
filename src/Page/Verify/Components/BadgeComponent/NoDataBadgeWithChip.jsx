import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const NoDataBadgeWithChip = () => {
  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            padding: "3px",
            borderRadius: "10px",
            // color: "#000",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            // marginBottom: "14px",
          }}
        >
          No Data
        </Typography>
      }
      color="error"
    >
      <Chip
        label="Auto Verify"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
        }}
      />
    </Badge>
  );
};

export default NoDataBadgeWithChip;
