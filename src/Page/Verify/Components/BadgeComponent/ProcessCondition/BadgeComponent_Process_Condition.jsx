import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

// Constants for color values enhance readability and maintainability
const COLORS = {
  default: "rgba(0, 255, 0, 1)", // Default color (green)
  inactive: "rgba(255, 0, 0, 1)", // Inactive color (red)
};

const BadgeComponent = ({ statusedoc_emcs_detail, onClick }) => {
  // Dynamically setting background color based on the status
  const backgroundColor =
    statusedoc_emcs_detail === "-" ? COLORS.inactive : COLORS.default;

  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            backgroundColor: backgroundColor,
            borderRadius: "10px",
            padding: "3px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            marginBottom: "14px",
          }}
        >
          {statusedoc_emcs_detail}
        </Typography>
      }
      sx={{ marginRight: 4 }}
    >
      <Chip
        label="Process Condition"
        onClick={onClick}
        color={statusedoc_emcs_detail !== "-" ? "primary" : undefined}
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
