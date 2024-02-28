import React from "react";
import ToggleThemeButton from "../ToggleThemeButton/ToggleThemeButton";
import { useAuth } from "../../../Contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../../src/Services/Cookie/setCookie";
import ButtonLogout from "../ButtonLogout/ButtonLogout";
import AvatarUser from "./Components/AvatarUser/AvatarUser";
function AppbarEworking() {
  const { tokenValid, isVerifyTokenLoading, userData, verifyToken } = useAuth();
  console.log(userData.user);
  const navigate = useNavigate();

  if (userData && userData.user && Object.keys(userData.user).length) {
    console.log("มีข้อมูล");
  } else {
    console.log("ไม่มีข้อมูล");
  }

  return (
    // <div className="flex justify-between p-2 ">
    <div
      className="flex justify-between p-2"
      // style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <div style={{ fontWeight: 800, fontSize: "24px" }}>Smart E working</div>
      <div className="flex gap-2">
        <ToggleThemeButton />
        {/* <ButtonLogout
          onClick={() => {
            navigate("/login");
            setCookie("TokenWeb", "", 30); // อัปเดตคุกกี้ด้วยสถานะธีมใหม่
          }}
        /> */}
        <div>
          {userData && userData.user && Object.keys(userData.user).length ? (
            <>
              <AvatarUser />
            </>
          ) : null}
        </div>
      </div>
      {/* <div>{userData && userData.user && Object.keys(userData.user).length ? <>TEST</> : null}</div> */}
    </div>
  );
}

export default AppbarEworking;
