import React from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";

const ChipDataCheck = (props) => {
  const { title, data, status } = props;

  if (data && data.length === 0) {
    return (
      <div>
        <Badge badgeContent={status}>
          <Chip label={title} />
        </Badge>
      </div>
    );
  }

  return (
    <div>
      <Badge badgeContent={status}>
        <Chip label={title} color="primary" />
      </Badge>
    </div>
  );
};

export default ChipDataCheck;
