// DrawerComponent.js
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink, useLocation } from "react-router-dom";
import Navbuttton from "../Button/Navbuttton";
import { sidebarItems_report, getPageTitle } from "../sidebarItems";
import FujiLogo from "../../../../../public/Pic/Fuji.png";

const drawerWidth = 240;

// Mixins for opened and closed states
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, isDarkMode }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
          backgroundColor: "var(--Drawer-background-color-theme)",
          borderRight: "var(--Drawer-borderRight-color-theme)",
        },
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
          backgroundColor: "var(--Drawer-background-color-theme)",
          borderRight: "var(--Drawer-borderRight-color-theme)",
        },
      }),
}));

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
    <div>
      <Drawer
        isDarkMode={isDarkMode}
        variant="permanent"
        open={open}
        theme={theme}
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
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
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
    </div>
  );
}
