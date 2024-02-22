import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink, useLocation } from "react-router-dom";
import Navbuttton from "../Button/Navbuttton";
import { sidebarItems_report, getPageTitle } from "../sidebarItems";
import FujiLogo from "../../../../../public/Pic/Fuji.png";

const drawerWidth = 240;

// ส่วนหัวของ Drawer
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// คอมโพเนนท์ Drawer
export default function DrawerComponent({
  open,
  handleDrawerClose,
  isDarkMode,
}) {
  const theme = useTheme();
  const [activeButton, setActiveButton] = React.useState(null);
  const location = useLocation();
  //handle button click
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // const formattedButtonName = buttonName.replace(/ /g, "_");
    // router.push(`/${formattedButtonName}`);
  };

  React.useEffect(() => {
    if (location.pathname) {
      const response = getPageTitle(location.pathname);
      setActiveButton(response);
    }
  }, [location.pathname]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "var(--Drawer-background-color-theme)",
          borderRight: "var(--Drawer-borderRight-color-theme)",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <img
          src={FujiLogo}
          alt="คำอธิบายภาพ"
          style={{
            width: 180,
            height: 45,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            objectFit: "contain",
          }}
        />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Navbuttton
        open={open}
        sidebarItems={sidebarItems_report()}
        handleButtonClick={handleButtonClick}
        activeButton={activeButton}
        isDarkMode={isDarkMode}
        title={"Report"}
      />
    </Drawer>
  );
}
