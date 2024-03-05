import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

// Define constants for colors to improve readability and maintainability
const STATUS_COLORS = {
  active: "#69ED2A", // Active status color
  inactive: "#ED4D2A", // Inactive or other statuses color
  none: "#757575", // No status color
};

const BadgeComponent = ({ onClick, data }) => {
  let status = "";
  console.log(data);
  const calibrationisAllLocked = data.every((item) => {
    const statusFilter = item.status_filter?.toLowerCase(); // Convert to lowercase here
    console.log(statusFilter);
    return (
      statusFilter === "lock" ||
      statusFilter === "locks" ||
      statusFilter === "inactive"
    );
  });

  // กรณีที่ชุดข้อมุลมี lock||locks||inactive === false
  if (!calibrationisAllLocked) {
    status = "In Active"; //lock
  } else {
    status = "Active"; //active
  }

  // Function to determine the background color based on the status
  const getBackgroundColor = (status) => {
    if (status === "-") {
      return STATUS_COLORS.none;
    }
    return status === "Active" ? STATUS_COLORS.active : STATUS_COLORS.inactive;
  };

  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            backgroundColor: getBackgroundColor(status),
            borderRadius: "10px",
            padding: "3px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            marginBottom: "14px",
          }}
        >
          {status}
        </Typography>
      }
      sx={{ marginRight: 2 }}
    >
      <Chip
        label="Machine Cal"
        onClick={onClick}
        color={status !== "-" ? "primary" : undefined}
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
