import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function BadgeComponenstGR_R(props) {
  const { data, onClick, label } = props;
  console.log(data);
  return (
    <div onClick={onClick}>
      <Badge
        badgeContent={
          <Typography
            variant="caption"
            sx={{
              borderRadius: "10px",
              padding: "3px",
              fontFamily: "Inter Variable, sans-serif", // Setting fontFamily to "Poppins
              fontWeight: 500,
              marginBottom: "14px",
              backgroundColor:
                data.status === "PASS"
                  ? "rgba(0, 255, 0, 1)"
                  : ["ON GOING", "NO GRR"].includes(data.status)
                  ? "#ECEE81"
                  : ["FAIL"].includes(data.status)
                  ? "red"
                  : "initial",
            }}
          >
            {data.status}
          </Typography>
        }
        sx={{ marginRight: 2 }}
      >
        <Chip
          label={label}
          onClick={onClick}
          // onClick={() => fetchApiData(item.label)}
          //get api and show table  setselectdatafromchip(item.label)}
          color={[data].length > 0 ? "primary" : undefined}
          sx={{
            maxWidth: "100%",
            fontFamily: "Inter Variable, sans-serif", // Setting fontFamily to "Poppins
            fontWeight: 500,
          }}
        />
      </Badge>
    </div>
  );
}

export default BadgeComponenstGR_R;
