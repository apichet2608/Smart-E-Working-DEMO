import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ToggleThemeButton } from "../../Theme/ToggleThemeButton/ToggleThemeButton";

const drawerWidth = 240;

// กำหนดสไตล์สำหรับ AppBar
const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // ตั้งค่าการเปลี่ยนแปลงสำหรับเมื่อ drawer เปิด/ปิด
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// คอมโพเนนท์ AppBar
export default function AppBarComponent({ open, handleDrawerOpen }) {
  return (
    <AppBarStyled position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Smart Factory
        </Typography>
        <ToggleThemeButton />
      </Toolbar>
    </AppBarStyled>
  );
}
