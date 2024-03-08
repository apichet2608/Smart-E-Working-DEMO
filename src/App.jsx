import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTheme } from "./Contexts/ThemeContext/ThemeContext";
import AppBarComponent from "./Components/common/Appbar/AppBarComponent";
import DrawerComponent from "./Components/common/Appbar/Drawer_mini/DrawerComponent";
import MainContent from "./Components/common/Appbar/Drawer_mini/MainContent";
import "./App.css";
import Box from "@mui/material/Box";
import RouteComponents from "./Route";
import { useAuth } from "./Contexts/AuthContext/AuthContext";
import Grid from "@mui/material/Grid";

// Define the theme configuration outside of the component
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 440, // breakpoint xs
      sm: 640, // breakpoint sm
      md: 1072, // breakpoint md
      lg: 1340, // breakpoint lg
      xl: 1912, // breakpoint xl
    },
  },
  // palette: {
  //   primary: {
  //     main: "#87CEFA",
  //     sub1: "#fff",
  //   },
  // },
});

function App() {
  const { isDarkMode } = useTheme(); // Use isDarkMode from ThemeContext
  const { tokenValid, isVerifyTokenLoading, userData, verifyToken } = useAuth();
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setOpen(matches); // setOpen based on the matches directly
  }, [matches]);

  return (
    <ThemeProvider theme={theme}>
      {/* <Grid container spacing={2}> */}
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}> */}
      {/* <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script> */}
      {/* <iframe src="https://lottie.host/embed/18bf2570-4608-4e24-bef1-54b29880d410/LLkJPbCRS7.json"></iframe> */}
      <RouteComponents />
      {/* </Grid> */}
      {/* </Grid> */}
    </ThemeProvider>
  );
}
export default App;
