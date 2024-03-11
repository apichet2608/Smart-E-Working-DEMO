import React from "react";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function BadgeComponenstApprove(props) {
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
              fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
              fontWeight: 500,
              marginBottom: "14px",
              backgroundColor:
                data.status === "Qualify" //p
                  ? "rgba(0, 255, 0, 1)" //p
                  : //other f

                  ["Plan", "Wait NPI", "Wait MGR"].includes(data.status)
                  ? "#ECEE81"
                  : ["No Qualify"].includes(data.status)
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
            fontFamily: "Poppins, sans-serif", // Setting fontFamily to "Poppins
            fontWeight: 500,
          }}
        />
      </Badge>
    </div>
  );
}

export default BadgeComponenstApprove;
