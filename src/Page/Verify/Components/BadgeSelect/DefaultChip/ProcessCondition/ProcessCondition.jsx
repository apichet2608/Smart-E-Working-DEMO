import React from "react";
import TableData from "./TableData/TableData";
function ProcessCondition(props) {
  const { data } = props;
  console.log(data);
  return (
    <div>
      <TableData Datas={data} />
    </div>
  );
}

export default ProcessCondition;
