import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import ImgLogo from "../../../../../public/Pic/Fuji.png";
const themeColor = "#304FFE"; // Example primary color, you can change this to any color you like

const LoginPaper = styled(Paper)({
  padding: "40px", // Increased padding for more whitespace
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)", // Softer shadow for depth, but still minimal
});

const LoginButton = styled(Button)({
  marginTop: "10px",
  marginBottom: "10px",
  padding: "10px 0",
  backgroundColor: themeColor, // Use theme color
  color: "#fff", // White text for contrast
  "&:hover": {
    backgroundColor: themeColor, // Maintain color on hover
  },
});
const LoginContainer = styled(Grid)({
  height: "100vh",
});

const LoginPage = () => {
  // State for the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Here you would usually handle the login logic, perhaps sending a request to your server
    console.log(email, password);
  };

  // Function to handle changes in the inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <LoginContainer container justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={8} md={5} lg={4} xl={3}>
        <LoginPaper elevation={2} component="form" onSubmit={handleSubmit}>
          <Box
            component="img"
            src={ImgLogo}
            sx={{
              height: "80px",
              mb: 4,
            }}
          />
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            Sign in to your account
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleInputChange}
          />
          <LoginButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Log In
          </LoginButton>
          <Grid container>
            <Grid item xs>
              <Button size="small">Forgot Password?</Button>
            </Grid>
            <Grid item>
              <Button size="small">Create New Account</Button>
            </Grid>
          </Grid>
        </LoginPaper>
      </Grid>
    </LoginContainer>
  );
};

export default LoginPage;
