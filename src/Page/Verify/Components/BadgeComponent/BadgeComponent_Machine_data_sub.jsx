// BadgeComponent.jsx
import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponent = ({ status, label, onClick, selectvalue }) => {
  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            backgroundColor:
              status === false
                ? "#ECEE81"
                : status === true
                ? "rgba(0, 255, 0, 1)"
                : ["No Data"].includes(status)
                ? "#ECEE81"
                : "initial",
            borderRadius: "10px",
            padding: "2px",
            fontSize: "12px", // ปรับขนาดตัวอักษรตามที่คุณต้องการ
            fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
            fontWeight: 500,
          }}
        >
          SCADA
        </Typography>
      }
      sx={{ marginRight: 2 }}
    >
      <Chip
        label={label}
        //   onClick={() => setselectdatafromchipmachinedata(item.name)}
        color="primary"
        variant="outlined"
        sx={{
          maxWidth: "100%",
          fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
          fontWeight: 500,
          backgroundColor: selectvalue === label ? "#a2d2ff" : "initial",
        }}
        onClick={onClick}
      />
    </Badge>
  );
};

export default BadgeComponent;
