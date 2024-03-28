import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function NoDataBadge({ title, message, status, onClick }) {
  return (
    <div>
      {/* {title} */}
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
          >
            {message ? message : status}
          </Typography>
        }
        sx={{
          marginRight: 2,
          //text no warp
          whiteSpace: "nowrap",
        }}
      >
        <Chip
          label={title}
          color={undefined}
          sx={{
            maxWidth: "100%",
            fontFamily: "Inter Variable, sans-serif",
            fontWeight: 500,
            // bgcolor: status === "P" ? "#66BB6A" : "#FFF176",
            color: "#000",
            // fontWeight: "bold",
            borderColor: status === "P" ? "#33691E" : "#F57F17",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
          onClick={onClick}
        />
      </Badge>
    </div>
  );
}

export default NoDataBadge;
