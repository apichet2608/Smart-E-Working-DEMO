import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

// Define a function or mapping for background colors to simplify logic
const getStatusColor = (status) => {
  const successStatuses = [
    "PASS",
    "pass",
    "Pass",
    "ACCEPT",
    "Accept",
    "accept",
    "GOOD",
    "Good",
    "good",
  ];
  const warningStatuses = ["FAIL", "No Data"];

  if (successStatuses.includes(status)) return "rgba(0, 255, 0, 1)"; // Success color
  if (warningStatuses.includes(status)) return "#ECEE81"; // Warning color
  return "initial"; // Default color
};

const BadgeComponent = ({ statusautoverify, itemlabel, onClick }) => {
  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            borderRadius: "10px",
            padding: "3px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            marginBottom: "14px",
            backgroundColor: getStatusColor(statusautoverify),
          }}
        >
          {statusautoverify}
        </Typography>
      }
      sx={{ marginRight: 2 }}
    >
      <Chip
        label={itemlabel}
        onClick={onClick}
        color={statusautoverify === "PASS" ? "primary" : undefined}
        sx={{
          maxWidth: "100%",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
        }}
      />
    </Badge>
  );
};

export default BadgeComponent;
