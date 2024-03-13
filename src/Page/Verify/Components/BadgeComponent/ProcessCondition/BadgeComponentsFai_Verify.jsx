import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponentsFai_Verify = ({ onClick, groupfaidata_verify }) => {
  // Determine if there is data to verify
  const hasData = groupfaidata_verify && groupfaidata_verify.length > 0;

  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            padding: "3px",
            borderRadius: "10px",
            fontFamily: "Inter Variable, sans-serif",
            fontWeight: 500,
          }}
        >
          {hasData ? "Check" : "-"}
        </Typography>
      }
      color={hasData ? "success" : "error"} // Use Material-UI's color prop for the badge
    >
      <Chip
        onClick={onClick}
        label="Fai Verify"
        sx={{
          fontFamily: "Inter Variable, sans-serif",
          fontWeight: 500,
        }}
        color={hasData ? "primary" : undefined}
      />
    </Badge>
  );
};

export default BadgeComponentsFai_Verify;
