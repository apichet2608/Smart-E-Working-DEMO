import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

// Define constants for colors and status types for better maintainability
const COLORS = {
  warning: "#ECEE81",
  lockInactive: "red",
  active: "rgba(0, 255, 0, 1)",
  default: "initial",
};

const STATUS_TYPES = {
  warning: ["Warning"],
  lockInactive: ["lock", "Lock / Inactive"],
  active: [
    "On Plan",
    "on plan",
    "ON PLAN",
    "Active",
    "PASS",
    "pass",
    "Pass",
    "ACCEPT",
    "Accept",
    "accept",
    "GOOD",
    "Good",
    "good",
  ],
};

const BadgeComponent = ({ onClick, data }) => {
  // Function to determine badge color based on the status
  const getBadgeColor = (status) => {
    if (STATUS_TYPES.warning.includes(status)) {
      return COLORS.warning;
    } else if (STATUS_TYPES.lockInactive.includes(status)) {
      return COLORS.lockInactive;
    } else if (STATUS_TYPES.active.includes(status)) {
      return COLORS.active;
    }
    return COLORS.default;
  };

  const status_pm = data[0].stats_mc || "";
  console.log(data[0].stats_mc);
  const bgcolorbadge = getBadgeColor(status_pm);
  const statusbadge = status_pm === "Lock / Inactive" ? "Lock" : status_pm;

  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            backgroundColor: bgcolorbadge,
            borderRadius: "10px",
            padding: "3px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            width: "100%",
            marginBottom: "14px",
          }}
        >
          {statusbadge}
        </Typography>
      }
      sx={{ marginRight: 2 }}
    >
      <Chip
        label="Machine PM"
        onClick={onClick}
        color={data.length > 0 ? "primary" : undefined}
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
