import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
const BadgeComponentsFai_Verify = ({
  onClick,
  groupfaidata_verify,
  Message,
}) => {
  // Determine if there is data to verify
  const hasData = groupfaidata_verify && groupfaidata_verify.length > 0;
  console.log(groupfaidata_verify); // จะแสดงผลลัพธ์เป็น true เพราะมีอย่างน้อยหนึ่ง object ที่ key data มีค่าเป็นอาร์เรย์ว่าง
  const hasEmptyDataArray = groupfaidata_verify.some(
    (item) => item.data.length === 0
  );
  console.log(hasEmptyDataArray); // จะแสดงผลลัพธ์เป็น true เพราะมีอย่างน้อยหนึ่ง object ที่ key data มีค่าเป็นอาร์เรย์ว่าง

  return (
    <Tooltip title={Message}>
      <Badge
        badgeContent={
          <Typography
            variant="caption"
            sx={{
              padding: "3px",
              borderRadius: "10px",
              fontFamily: "Inter Variable, sans-serif",
              fontWeight: 500,
              backgroundColor:
                !hasEmptyDataArray && hasData ? "#32de84" : "#fd5c63", // Corrected syntax
              marginBottom: "14px",
            }}
          >
            {!hasEmptyDataArray && hasData ? "P" : "F"}
          </Typography>
        }
        // color={!hasEmptyDataArray && hasData ? "#32de84" : "#fd5c63"} // Use Material-UI's color prop for the badge
      >
        <Chip
          onClick={onClick}
          label="FAI Auto Verify"
          sx={{
            maxWidth: "100%",
            fontFamily: "Inter Variable, sans-serif",
            fontWeight: 500,
          }}
          color={hasData ? "primary" : undefined}
        />
      </Badge>
    </Tooltip>
  );
};

export default BadgeComponentsFai_Verify;
