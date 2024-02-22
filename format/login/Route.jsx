import React from "react";
import { Route, Routes } from "react-router-dom";
import No1 from "./Page/No1/main/No1";
import No2 from "./Page/No2/main/No2";
import Login from "./Page/LoginForm/Login/main/Login";
import Register from "./Page/LoginForm/Register/main/Register";
import ForgotPassword from "./Page/LoginForm/ForgotPassword/main/ForgotPassword";
import Newpassword from "./Page/LoginForm/ForgotPassword/main/Newpassword";

function RouteComponents() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forgotpassword/newpassword" element={<Newpassword />} />
        <Route path="/1" element={<No1 />} />
        <Route path="/2" element={<No2 />} />
      </Routes>
    </>
  );
}

export default RouteComponents;
