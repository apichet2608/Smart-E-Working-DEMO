import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

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

const SubmitButton = styled(Button)({
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

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [op_id, setop_id] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(op_id, username, email, password, confirmPassword);
    RegisterSubmit();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "username") setusername(value);
    if (name === "op_id") setop_id(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const RegisterSubmit = async () => {
    let body = {
      username: username,
      password: password,
      email: email,
      op_id: op_id,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_IP_API_LOGIN}/userslogin/register`,
        body
      );
      if (response.status === 200) {
        // setCookie("TokenWeb", response.data.token, 30); // อัปเดตคุกกี้ด้วยสถานะธีมใหม่
        console.log("Done");

        await Swal.fire({
          title: "OK",
          text: response.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/login");
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
            Create your account
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="op_id"
            label="OP ID"
            name="op_id"
            autoComplete="op_id"
            autoFocus
            value={op_id}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleInputChange}
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
            autoComplete="new-password"
            value={password}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          <SubmitButton
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </SubmitButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                size="small"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </FormPaper>
      </Grid>
    </FormContainer>
  );
};

export default RegisterPage;
