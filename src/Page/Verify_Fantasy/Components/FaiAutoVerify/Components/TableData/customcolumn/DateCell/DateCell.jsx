// DateCell.js
import React from "react";
import {
  formatDateOnly,
  formatDateTime,
} from "../../../../../../../../Utility/formatDate/formatDate";

const DateCell = ({ value }) => {
  return (
    <div className="flex items-center justify-center w-full  rounded-3xl font-extrabold p-0.5">
      {formatDateTime(value)}
    </div>
  );
};

export default DateCell;
