import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function NoDataBadge({ title, message }) {
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
              fontFamily: "Poppins, sans-serif",
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
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
        />
      </Badge>
    </div>
  );
}

export default NoDataBadge;
