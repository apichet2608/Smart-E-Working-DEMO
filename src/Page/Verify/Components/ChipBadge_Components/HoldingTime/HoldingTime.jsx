import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function HoldingTime({ status, message, onClick }) {
  return (
    <div>
      <Badge
        badgeContent={
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "#32de84",
              borderRadius: "10px",
              padding: "3px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              width: "100%",
              marginBottom: "14px",
            }}
            // color={"primary"}
          >
            {message}
          </Typography>
        }
        sx={{ marginRight: 2 }}
      >
        <Chip
          label="Holding Time"
          onClick={onClick}
          color={"primary"}
          sx={{
            maxWidth: "100%",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
        />
      </Badge>
    </div>
  );
}

export default HoldingTime;
