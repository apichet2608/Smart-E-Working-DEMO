import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponent = ({ status, label, onClick, selectvalue }) => {
  // Simplify background color and text logic
  const getBadgeDetails = (status) => {
    if (status === true) {
      return { backgroundColor: "rgba(0, 255, 0, 1)", text: "SCADA" };
    } else if (status === false || ["No Data"].includes(status)) {
      return { backgroundColor: "#ECEE81", text: "FAIL" };
    }
    return { backgroundColor: "initial", text: "FAIL" }; // Default case
  };

  const { backgroundColor, text } = getBadgeDetails(status);

  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            backgroundColor,
            borderRadius: "10px",
            padding: "2px",
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
        >
          {text}
        </Typography>
      }
      sx={{ marginRight: 2 }}
    >
      <Chip
        label={label}
        onClick={onClick}
        color="primary"
        variant="outlined"
        sx={{
          maxWidth: "100%",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          backgroundColor: selectvalue === label ? "#a2d2ff" : "initial",
        }}
      />
    </Badge>
  );
};

export default BadgeComponent;
