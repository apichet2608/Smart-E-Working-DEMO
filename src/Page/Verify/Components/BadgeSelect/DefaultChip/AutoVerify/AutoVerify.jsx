import React from "react";
import TableData from "./TableData/TableData";
function AutoVerify(props) {
  const { data } = props;
  return (
    <div>
      <TableData Datas={data} />
    </div>
  );
}

export default AutoVerify;
