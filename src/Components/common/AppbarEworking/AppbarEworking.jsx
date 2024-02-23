import React from "react";
import ToggleThemeButton from "../ToggleThemeButton/ToggleThemeButton";
import { useAuth } from "../../../Contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../../src/Services/Cookie/setCookie";
import ButtonLogout from "../ButtonLogout/ButtonLogout";
function AppbarEworking() {
  const { tokenValid, isVerifyTokenLoading, userData, verifyToken } = useAuth();
  console.log(userData);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-2">
      <div style={{ fontWeight: 800, fontSize: "24px" }}>Smart E working</div>
      <div className="flex gap-2">
        <ToggleThemeButton />
        <ButtonLogout
          onClick={() => {
            navigate("/login");
            setCookie("TokenWeb", "", 30); // อัปเดตคุกกี้ด้วยสถานะธีมใหม่
          }}
        />
      </div>
    </div>
  );
}

export default AppbarEworking;
