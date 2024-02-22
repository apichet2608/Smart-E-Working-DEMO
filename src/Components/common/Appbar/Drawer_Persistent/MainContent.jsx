import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import RouteComponents from "../../../../Route";

const drawerWidth = 240;

// กำหนดสไตล์สำหรับเนื้อหาหลัก
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "transparent",
    // การเปลี่ยนแปลงเมื่อ drawer เปิด/ปิด
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

// คอมโพเนนท์สำหรับเนื้อหาหลัก
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MainContent({ open }) {
  return (
    <>
      <Main open={open}>
        <DrawerHeader />
        <RouteComponents />
      </Main>
    </>
  );
}
