// BadgeComponent.jsx
import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const BadgeComponent = ({ statusautoverify, itemlabel, onClick }) => {
  return (
    <Badge
      badgeContent={
        <Typography
          variant="caption"
          sx={{
            backgroundColor:
              statusautoverify === "FAIL"
                ? "#ECEE81"
                : [
                    "PASS",
                    "pass",
                    "Pass",
                    "ACCEPT",
                    "Accept",
                    "accept",
                    "GOOD",
                    "Good",
                    "good",
                  ].includes(statusautoverify)
                ? "rgba(0, 255, 0, 1)"
                : ["No Data"].includes(statusautoverify)
                ? "#ECEE81"
                : "initial",
            borderRadius: "10px",
            padding: "3px",
            fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
            fontWeight: 500,
            marginBottom: "14px",
          }}
        >
          {statusautoverify}
        </Typography>
      }
      sx={{ marginRight: 2 }}
    >
      <Chip
        label={itemlabel}
        onClick={onClick}
        // onClick={() => fetchApiData(item.label)}
        //get api and show table  setselectdatafromchip(item.label)}
        color={statusautoverify !== "No Data" ? "primary" : undefined}
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
