import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
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

const BadgeComponent = ({
  onClick,
  data,
  StatusData,
  selectdatafromchip,
  message,
}) => {
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
      <Tooltip title={message}>
        <Badge
          badgeContent={
            <Typography
              variant="caption"
              sx={{
                backgroundColor: bgcolorbadge,
                borderRadius: "10px",
                padding: "3px",
                fontFamily: "Inter Variable, sans-serif",
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
              fontFamily: "Inter Variable, sans-serif",
              fontWeight: 500,
            }}
          />
        </Badge>
      </Tooltip>
    </ThemeProvider>
  );
};

export default BadgeComponent;
