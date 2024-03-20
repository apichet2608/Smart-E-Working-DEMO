import React from "react";
import { Route, Routes } from "react-router-dom";
// import No1 from "./Page/demo_verify/main/verify";
import No1 from "./Page/No1/main/No1";
import No2 from "./Page/No2/main/No2";
import Login from "./Page/LoginForm/Login/main/Login";
import Register from "./Page/LoginForm/Register/main/Register";
import ForgotPassword from "./Page/LoginForm/ForgotPassword/main/ForgotPassword";
import Newpassword from "./Page/LoginForm/ForgotPassword/main/Newpassword";
import Verify from "./Page/Verify/main/Verify";
import Appbar from "./Components/common/AppbarEworking/AppbarEworking";
import { useLocation } from "react-router-dom";
import Final from "./Page/Verify-FINAL/Verify_Final";
function RouteComponents() {
  const location = useLocation();

  React.useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/forgotpassword" ||
      location.pathname === "/forgotpassword/newpassword" ||
      location.pathname === "/" ? null : (
        // <div className="container mx-auto w-full">
        <Appbar />
        // </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forgotpassword/newpassword" element={<Newpassword />} />
        <Route path="/1" element={<No1 />} />
        <Route path="/2" element={<Final />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </>
  );
}

export default RouteComponents;
