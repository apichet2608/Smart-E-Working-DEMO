import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function ErrorBadge({ title, message, onClick }) {
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
              backgroundColor: "red",
              whiteSpace: "nowrap",
            }}
          >
            {message}
          </Typography>
        }
        sx={{ marginRight: 2 }}
      >
        <Chip
          label={title}
          color={"error"}
          sx={{
            maxWidth: "100%",
            fontFamily: "Inter Variable, sans-serif",
            fontWeight: 500,
          }}
          onClick={onClick}
        />
      </Badge>
    </div>
  );
}

export default ErrorBadge;
