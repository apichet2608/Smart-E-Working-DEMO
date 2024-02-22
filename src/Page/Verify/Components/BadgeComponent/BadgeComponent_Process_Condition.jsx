// BadgeComponent.jsx
import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponent = ({ statusedoc_emcs_detail, onClick, label }) => {
  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            backgroundColor:
              statusedoc_emcs_detail === "-"
                ? "rgba(255, 0, 0, 1)"
                : "rgba(0, 255, 0, 1)", // สีพื้นหลังเริ่มต้น (ไม่เปลี่ยนสี) หากไม่ตรงกับเงื่อนไขด้านบน
            borderRadius: "10px",
            padding: "3px",
            fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
            fontWeight: 500,
            marginBottom: "14px",
          }}
        >
          {statusedoc_emcs_detail}
        </Typography>
      }
      sx={{ marginRight: 4 }}
    >
      <Chip
        label={label}
        onClick={onClick}
        color="primary"
        sx={{
          maxWidth: "100%",
          fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
          fontWeight: 500,
        }}
      />
    </Badge>
  );
};

export default BadgeComponent;
