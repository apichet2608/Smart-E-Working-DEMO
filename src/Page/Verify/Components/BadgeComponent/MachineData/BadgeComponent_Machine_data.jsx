import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponent = ({ onClick, statusMachine, label }) => {
  // Define styles outside of the return statement for clarity and performance
  const typographyStyles = {
    borderRadius: "10px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    padding: "3px",
    marginBottom: "14px",
  };

  // Dynamically set the background color based on statusMachine
  const backgroundColor = statusMachine ? "rgba(0, 255, 0, 1)" : "#f0f0f0";
  const badgeContent = statusMachine ? "PASS" : "-";

  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            ...typographyStyles,
            backgroundColor, // Apply the dynamic background color
          }}
        >
          {badgeContent}
        </Typography>
      }
      sx={{ marginRight: 2 }}
    >
      <Chip
        label={label}
        onClick={onClick}
        color={statusMachine ? "primary" : undefined}
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
