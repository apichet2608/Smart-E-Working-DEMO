import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponentsFai_Verify = ({ onClick, groupfaidata_verify }) => {
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
          {groupfaidata_verify && groupfaidata_verify.length > 0
            ? "Check"
            : "-"}
        </Typography>
      }
      color={
        groupfaidata_verify && groupfaidata_verify.length > 0
          ? "success"
          : "error"
      }
    >
      <Chip
        onClick={onClick}
        label="Fai Verify"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
        }}
        color={
          groupfaidata_verify && groupfaidata_verify.length > 0
            ? "primary"
            : undefined
        }
      />
    </Badge>
  );
};

export default BadgeComponentsFai_Verify;
