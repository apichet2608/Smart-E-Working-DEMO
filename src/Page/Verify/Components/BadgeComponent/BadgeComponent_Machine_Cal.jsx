// BadgeComponent.jsx
import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponent = ({ status, onClick, label }) => {
  return (
    <Badge
      badgeContent={
        status ? (
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "rgba(0, 255, 0, 1)",
              borderRadius: "10px",
              padding: "3px",
              fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
              fontWeight: 500,
              marginBottom: "14px",
            }}
          >
            Active
          </Typography>
        ) : (
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "rgba(255, 0, 0, 1)",
              borderRadius: "10px",
              padding: "3px",
              fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
              fontWeight: 500,
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
        color={status ? "primary" : undefined}
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
