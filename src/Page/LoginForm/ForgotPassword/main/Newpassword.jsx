import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { setCookie } from "../../../../Services/Cookie/setCookie";
import { getCookie } from "../../../../Services/Cookie/getCookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import ImgLogo from "../../../../../public/Pic/Fuji.png";
const themeColor = "#304FFE"; // Example primary color, you can change this to any color you like

const FormPaper = styled(Paper)({
  padding: "40px", // Increased padding for more whitespace
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)", // Softer shadow for depth, but still minimal
});

const ActionButton = styled(Button)({
  marginTop: "10px",
  marginBottom: "10px",
  padding: "10px 0",
  backgroundColor: themeColor, // Use theme color
  color: "#fff", // White text for contrast
  "&:hover": {
    backgroundColor: themeColor, // Maintain color on hover
  },
});

const FormContainer = styled(Grid)({
  height: "100vh",
});

const Newpassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would put your logic for the password reset
    // For example, you might want to compare the password and confirmPassword
    // and then send them to your backend if they match.
    if (password === confirmPassword) {
      console.log("Passwords match, proceed with the password reset process");
      CheckResetSubmit();
      // Replace with your password reset logic
    } else {
      console.log("Passwords do not match");
      // Handle the error case
    }
  };
  const CheckResetSubmit = async () => {
    const data = getCookie("email_resetpassword");
    console.log(data);
    let body = {
      email: data,
      newpassword: confirmPassword,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_IP_API_LOGIN}/userslogin/reset-password`,
        body
      );
      if (response.status === 200) {
        const data = getCookie("email_resetpassword");
        console.log(data);
        setCookie("email_resetpassword", "", 30); // อัปเดตคุกกี้ด้วยสถานะธีมใหม่
        console.log("Done");
        navigate("/login");
        await Swal.fire({
          title: "OK",
          text: response.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      console.log("Login successful:", response);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      await Swal.fire({
        title: "ERROR",
        text: error.response ? error.response.data.message : error.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  return (
    <FormContainer container justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={8} md={5} lg={4} xl={3}>
        <FormPaper elevation={2} component="form" onSubmit={handleSubmit}>
          <Box component="img" src={ImgLogo} sx={{ height: "80px", mb: 4 }} />
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontFamily: "Inter Variable, sans-serif" }}
          >
            Reset Password
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <ActionButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Reset Password
          </ActionButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                size="small"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Back to Sign In
              </Button>
            </Grid>
          </Grid>
        </FormPaper>
      </Grid>
    </FormContainer>
  );
};

export default Newpassword;
