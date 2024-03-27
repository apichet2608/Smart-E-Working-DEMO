import React, { useState, useEffect } from "react";

function HoldingTime(props) {
  const { response_API } = props;
  return (
    <div className="Paper_Contents">
      <div>HoldingTime : </div>
      <div>{response_API.data.message}</div>
    </div>
  );
}

export default HoldingTime;
