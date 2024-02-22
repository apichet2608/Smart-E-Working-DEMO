// MainContent.js
import * as React from "react";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import RouteComponents from "../../../../Route";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function MainContent() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <RouteComponents />
    </Box>
  );
}
