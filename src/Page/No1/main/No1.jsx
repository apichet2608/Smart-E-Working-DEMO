import React from "react";
import Components1 from "../Components/Components1/Components1";
import ToggleThemeButton from "../../../Components/common/ToggleThemeButton/ToggleThemeButton";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../Services/Cookie/setCookie";

function No1() {
  const navigate = useNavigate();

  const handlesampleClick = () => {
    console.log("Done");
    alert("Done");
  };

  return (
    <div className="container mx-auto">
      <div className="pt-8">
        <ToggleThemeButton />
        <Components1 handleClick={handlesampleClick} />
        <button
          type="button"
          className="cursor-pointer  bg-blue-200 mt-2 rounded-2xl p-4 hover:bg-blue-400 shadow-md"
          onClick={() => {
            // setCookie("TokenWeb", "", 30); // อัปเดตคุกกี้ด้วยสถานะธีมใหม่
            navigate("/verify");
          }}
        >
          Verify
        </button>
        <button
          type="button"
          className="cursor-pointer  bg-red-200 mt-2 rounded-2xl p-4 hover:bg-red-400 shadow-md"
          onClick={() => {
            setCookie("TokenWeb", "", 30); // อัปเดตคุกกี้ด้วยสถานะธีมใหม่
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default No1;
