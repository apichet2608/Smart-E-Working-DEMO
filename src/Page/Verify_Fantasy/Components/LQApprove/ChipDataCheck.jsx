import React from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import ChipNotFoundData from "../Chip_Nodata/NoDataBadge";
const ChipDataCheck = (props) => {
  const { title, data, status, requestApprove } = props;

  if (data && data.length === 0) {
    return (
      <div>
        <Badge badgeContent={status}>
          <ChipNotFoundData
            title={title}
            message={"-"}
            onClick={requestApprove}
          />
        </Badge>
      </div>
    );
  }

  return (
    <div>
      <Badge
        badgeContent={<p>{status}</p>}
        color={status === "P" ? "success" : "error"}
      >
        <Chip
          label={title}
          color="primary"
          sx={{
            bgcolor: status === "P" ? "#66BB6A" : "#FFF176",
            "&:hover": {
              bgcolor: status === "P" ? "#43A047" : "#FFEE58",
            },
            color: "#000",
            fontWeight: "bold",
            borderColor: status === "P" ? "#33691E" : "#F57F17",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
          onClick={requestApprove}
        />
      </Badge>
    </div>
  );
};

export default ChipDataCheck;
