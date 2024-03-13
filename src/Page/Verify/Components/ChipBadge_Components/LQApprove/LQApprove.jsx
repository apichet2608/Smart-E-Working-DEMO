import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function LQApprove({ status, onClick, title, data }) {
  if (data.length === 0) {
    return (
      <>
        <Badge
          badgeContent={
            <Typography
              variant="caption"
              sx={{
                borderRadius: "10px",
                padding: "3px",
                fontFamily: "Inter Variable, sans-serif",
                fontWeight: 500,
                marginBottom: "14px",
                backgroundColor: "#757575",
              }}
              // color={"error"}
            >
              {"-"}
            </Typography>
          }
          sx={{ marginRight: 2 }}
        >
          <Chip
            label={title}
            color={undefined}
            sx={{
              maxWidth: "100%",
              fontFamily: "Inter Variable, sans-serif",
              fontWeight: 500,
            }}
          />
        </Badge>
      </>
    );
  }
  return (
    <div>
      <Badge
        badgeContent={
          <Typography
            variant="caption"
            sx={{
              backgroundColor: status === "P" ? "#32de84" : "#fd5c63",
              borderRadius: "10px",
              padding: "3px",
              fontFamily: "Inter Variable, sans-serif",
              fontWeight: 500,
              width: "100%",
              marginBottom: "14px",
            }}
            // color={"primary"}
          >
            {status}
          </Typography>
        }
        sx={{ marginRight: 2 }}
      >
        <Chip
          label={title}
          onClick={onClick}
          color={"primary"}
          sx={{
            maxWidth: "100%",
            fontFamily: "Inter Variable, sans-serif",
            fontWeight: 500,
          }}
        />
      </Badge>
    </div>
  );
}

export default LQApprove;
