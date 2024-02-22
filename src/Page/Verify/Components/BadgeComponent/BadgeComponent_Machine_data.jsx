// BadgeComponent.jsx
import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponent = ({ onClick, statusMachine, label }) => {
  return (
    <Badge
      badgeContent={
        !statusMachine ? (
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "rgba(0, 255, 0, 1)",
              borderRadius: "10px",
              fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
              fontWeight: 500,
              padding: "3px",
              marginBottom: "14px",
            }}
          >
            Active
          </Typography>
        ) : (
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: "10px",
              fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
              fontWeight: 500,
              padding: "3px",
              marginBottom: "14px",
            }}
          >
            In Active
          </Typography>
        )
      }
      sx={{ marginRight: 2 }}
    >
      <Chip
        label={label}
        onClick={onClick}
        color={statusMachine === false ? "primary" : undefined}
        sx={{
          maxWidth: "100%",
          fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
          fontWeight: 500,
        }}
      />
    </Badge>
  );
};

export default BadgeComponent;
