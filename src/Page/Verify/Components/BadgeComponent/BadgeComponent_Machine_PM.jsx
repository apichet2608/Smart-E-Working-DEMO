// BadgeComponent.jsx
import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponent = ({
  label,
  status,
  statuspm,
  onClick,
  selectdatafromchip,
}) => {
  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            backgroundColor: (() => {
              if (statuspm === "Warning") {
                return "#ECEE81";
              } else if (["lock", "Lock / Inactive"].includes(statuspm)) {
                return "red";
              } else if (
                [
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
                ].includes(statuspm)
              ) {
                return "rgba(0, 255, 0, 1)";
              } else {
                return "initial";
              }
            })(),
            borderRadius: "10px",
            padding: "3px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            // minWidth: "100px",
            width: "100%",
            marginBottom: "14px",
          }}
        >
          {status}
        </Typography>
      }
      sx={{ marginRight: 2 }}
    >
      <Chip
        label={label}
        onClick={onClick}
        color="primary"
        sx={{
          maxWidth: "100%",
          fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
          fontWeight: 500,
          // backgroundColor: selectdatafromchip === label ? "#a2d2ff" : "initial",
        }}
      />
    </Badge>
  );
};

export default BadgeComponent;
