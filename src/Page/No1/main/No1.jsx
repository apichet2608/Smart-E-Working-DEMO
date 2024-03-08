import React from "react";
import Components1 from "../Components/Components1/Components1";
import Grid from "@mui/material/Grid";
import ChecKScreenSize from "../../../Components/common/ChecKScreenSize/ChecKScreenSize";
import Timer from "../Components/Timer/Timer";
import DataGridComponents from "../Components/DataGrid/DataGrid";
function No1() {
  const rows = [
    { id: 1, name: "John Doe", age: 30, email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", age: 25, email: "jane.smith@example.com" },
    {
      id: 3,
      name: "Michael Johnson",
      age: 35,
      email: "michael.johnson@example.com",
    },
    { id: 44, name: "Emily Davis", age: 28, email: "emily.davis@example.com" },
    { id: 5, name: "Chris Wilson", age: 40, email: "chris.wilson@example.com" },
  ];

  return (
    <div className="container mx-auto">
      <Components1 />
      {/* <ChecKScreenSize /> */}
      {/* {"TIME"} */}
      {/* <Timer /> */}
      <DataGridComponents Datas={rows} />
    </div>
  );
}

export default No1;
