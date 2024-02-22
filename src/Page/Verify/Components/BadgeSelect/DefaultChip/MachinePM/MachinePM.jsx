import React from "react";
import TableData from "./Components/TableData/TableData";

function MachinePM(props) {
  const { data } = props;
  console.log(data);
  return (
    <div>
      <TableData Datas={data} />
    </div>
  );
}

export default MachinePM;
