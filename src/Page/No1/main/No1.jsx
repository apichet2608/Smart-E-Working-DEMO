import React from "react";
import Components1 from "../Components/Components1/Components1";
import Grid from "@mui/material/Grid";
import ChecKScreenSize from "../../../Components/common/ChecKScreenSize/ChecKScreenSize";
function No1() {
  return (
    <div className="container mx-auto md:bg-red-500 lg:bg-blue-500">
      <Components1 />
      <ChecKScreenSize />
    </div>
  );
}

export default No1;
