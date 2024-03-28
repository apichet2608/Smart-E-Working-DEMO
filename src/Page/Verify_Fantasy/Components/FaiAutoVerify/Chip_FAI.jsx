import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function Chip_FAI(props) {
  const { datacheck, title, Status, state, fetchDataForVerification } = props;

  //   Determine if there is data to verify
  //   const hasData = datacheck && datacheck.length > 0;
  //   console.log(datacheck); // จะแสดงผลลัพธ์เป็น true เพราะมีอย่างน้อยหนึ่ง object ที่ key data มีค่าเป็นอาร์เรย์ว่าง
  //   const hasEmptyDataArray = datacheck.some((item) => item.data.length === 0);
  //   console.log(hasEmptyDataArray); // จะแสดงผลลัพธ์เป็น true เพราะมีอย่างน้อยหนึ่ง object ที่ key data มีค่าเป็นอาร์เรย์ว่าง
  //   console.log(hasData); // จะแสดงผลลัพธ์เป็น true เพราะมีอย่างน้อยหนึ่ง object ที่ key data มีค่าเป็นอาร์เรย์ว่าง

  const handleClicked = async () => {
    if (state.ewk_item_seq <= 1) {
      await fetchDataForVerification();
    }
  };

  return (
    <div>
      <Badge
        badgeContent={Status === "P" ? "P" : "F"}
        color={Status === "P" ? "success" : "error"}
      >
        <Chip
          label={title}
          sx={{
            maxWidth: "100%",
            fontFamily: "Inter Variable, sans-serif",
            fontWeight: 500,
            bgcolor: Status === "P" ? "#66BB6A" : "#FFF176",
            "&:hover": {
              bgcolor: Status === "P" ? "#43A047" : "#FFEE58",
            },
            color: "#000",
            borderColor: Status === "P" ? "#33691E" : "#F57F17",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
          onClick={handleClicked}
        />
      </Badge>
    </div>
  );
}

export default Chip_FAI;
