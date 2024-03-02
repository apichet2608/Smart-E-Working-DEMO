// BadgeComponent.jsx
import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponent = ({ status, onClick, label }) => {
  return (
    <Badge
      badgeContent={
        status === "-" ? (
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "#757575",
              borderRadius: "10px",
              padding: "3px",
              fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
              fontWeight: 500,
              marginBottom: "14px",
            }}
          >
            -
          </Typography>
        ) : (
          <Typography
            variant="caption"
            sx={{
              backgroundColor: status === "Active" ? "#69ED2A" : "#ED4D2A",
              borderRadius: "10px",
              padding: "3px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              marginBottom: "14px",
            }}
          >
            {status}
          </Typography>
        )
      }
      sx={{ marginRight: 2 }}
    >
      <Chip
        label={label}
        onClick={onClick}
        color={status !== "-" ? "primary" : undefined}
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
