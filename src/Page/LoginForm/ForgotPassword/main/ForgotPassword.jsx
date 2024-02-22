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

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(email);
    if (name === "email") setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    CheckResetSubmit();
  };

  const CheckResetSubmit = async () => {
    let body = {
      email: email,
    };
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_IP_API_LOGIN
        }/userslogin/request-reset-password`,
        body
      );
      if (response.status === 200) {
        setCookie("TokenWeb", "", 30); // อัปเดตคุกกี้ด้วยสถานะธีมใหม่
        setCookie("email_resetpassword", email, 30); // อัปเดตคุกกี้ด้วยสถานะธีมใหม่
        console.log("Done");
        // navigate("/login");
        await Swal.fire({
          title: "OK",
          text: response.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/ForgotPassword/Newpassword");
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
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            Reset your password
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 2, fontFamily: "Poppins, sans-serif" }}
          >
            Enter your email address
            {/* and we will send you a link to reset your */}
            {/* password. */}
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
          <ActionButton
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Send Reset Link
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

export default ForgotPasswordPage;
