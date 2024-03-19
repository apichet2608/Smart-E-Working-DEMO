import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function Chip_FAI(props) {
  const { datacheck, title, message } = props;
  const [hasData, setHasData] = useState(false);
  const [hasEmptyDataArray, setHasEmptyDataArray] = useState(false);

  //   Determine if there is data to verify
  //   const hasData = datacheck && datacheck.length > 0;
  //   console.log(datacheck); // จะแสดงผลลัพธ์เป็น true เพราะมีอย่างน้อยหนึ่ง object ที่ key data มีค่าเป็นอาร์เรย์ว่าง
  //   const hasEmptyDataArray = datacheck.some((item) => item.data.length === 0);
  //   console.log(hasEmptyDataArray); // จะแสดงผลลัพธ์เป็น true เพราะมีอย่างน้อยหนึ่ง object ที่ key data มีค่าเป็นอาร์เรย์ว่าง
  //   console.log(hasData); // จะแสดงผลลัพธ์เป็น true เพราะมีอย่างน้อยหนึ่ง object ที่ key data มีค่าเป็นอาร์เรย์ว่าง
  useEffect(() => {
    if (datacheck && datacheck.length > 0) {
      setHasData(true);
      setHasEmptyDataArray(datacheck.some((item) => item.data.length === 0));
    }
  }, [datacheck]);

  return (
    <div>
      <Badge
        badgeContent={!hasEmptyDataArray && hasData ? "P" : "F"}
        color="primary" // This is the color of the badge
      >
        <Chip
          label={title}
          sx={{
            maxWidth: "100%",
            fontFamily: "Inter Variable, sans-serif",
            fontWeight: 500,
          }}
          //   color={!hasEmptyDataArray && hasData ? "primary" : "primary"}
        />
      </Badge>
    </div>
  );
}

export default Chip_FAI;
