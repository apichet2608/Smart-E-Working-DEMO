import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Define constants for colors and status types for better maintainability
const COLORS = {
  f: "#fd5c63",
  p: "#32de84",
  default: "initial",
};

const STATUS_TYPES = {
  lockInactive: ["F"],
  active: ["P"],
};

const BadgeComponent = ({ onClick, data, StatusData, selectdatafromchip }) => {
  const theme = createTheme({
    // primary: {
    //   main: "#87CEFA",
    // },
  });
  // Function to determine badge color based on the status
  const getBadgeColor = (status) => {
    if (STATUS_TYPES.lockInactive.includes(status)) {
      return COLORS.f;
    } else if (STATUS_TYPES.active.includes(status)) {
      return COLORS.p;
    }
    return COLORS.default;
  };

  const bgcolorbadge = getBadgeColor(StatusData);
  const statusbadge = StatusData;

  return (
    <ThemeProvider theme={theme}>
      <Badge
        badgeContent={
          <Typography
            variant="caption"
            sx={{
              backgroundColor: bgcolorbadge,
              borderRadius: "10px",
              padding: "3px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              width: "100%",
              marginBottom: "14px",
            }}
          >
            {statusbadge}
          </Typography>
        }
        sx={{ marginRight: 2 }}
      >
        <Chip
          label="Machine PM"
          onClick={onClick}
          color={"primary"}
          sx={{
            maxWidth: "100%",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
        />
      </Badge>
    </ThemeProvider>
  );
};

export default BadgeComponent;
