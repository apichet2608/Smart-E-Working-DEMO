import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponentsFai_Verify = ({ onClick, groupfaidata_verify }) => {
  // Determine if there is data to verify
  const hasData = groupfaidata_verify && groupfaidata_verify.length > 0;

  console.log(groupfaidata_verify); // จะแสดงผลลัพธ์เป็น true เพราะมีอย่างน้อยหนึ่ง object ที่ key data มีค่าเป็นอาร์เรย์ว่าง

  const hasEmptyDataArray = groupfaidata_verify.some(
    (item) => item.data.length === 0
  );

  console.log(hasEmptyDataArray); // จะแสดงผลลัพธ์เป็น true เพราะมีอย่างน้อยหนึ่ง object ที่ key data มีค่าเป็นอาร์เรย์ว่าง

  // const statusbadge =
  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            padding: "3px",
            borderRadius: "10px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
        >
          {!hasEmptyDataArray && hasData ? "Check" : "Fail"}
        </Typography>
      }
      color={!hasEmptyDataArray && hasData ? "success" : "error"} // Use Material-UI's color prop for the badge
    >
      <Chip
        onClick={onClick}
        label="Fai Verify"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
        }}
        color={hasData ? "primary" : undefined}
      />
    </Badge>
  );
};

export default BadgeComponentsFai_Verify;
