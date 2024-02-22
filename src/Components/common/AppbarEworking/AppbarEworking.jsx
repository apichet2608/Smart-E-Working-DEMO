import React from "react";
import ToggleThemeButton from "../ToggleThemeButton/ToggleThemeButton";
import { useAuth } from "../../../Contexts/AuthContext/AuthContext";

function AppbarEworking() {
  const { tokenValid, isVerifyTokenLoading, userData, verifyToken } = useAuth();
  console.log(userData);
  return (
    <div className="flex justify-between p-2">
      <div style={{ fontWeight: 800, fontSize: "24px" }}>Smart E working</div>
      <ToggleThemeButton />
    </div>
  );
}

export default AppbarEworking;
