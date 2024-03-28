import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";

function ChipTempHumID(props) {
  const { TempHumIDData, TempHumIDStatus } = props;
  return (
    <div>
      <p>{TempHumIDStatus}</p>
      <div className="flex gap-2">
        <h1>Temp HumIDk</h1>
        {TempHumIDData.map((item, index) => {
          return (
            <div key={index} className="">
              <p className="bg-slate-200">ewk_id {item.ewk_id}</p>
              <p className="bg-slate-200">mc_code {item.mc_code}</p>
              <p className="bg-slate-200">building {item.building}</p>
              <p className="bg-slate-200">area_code {item.area_code}</p>
              <p className="bg-slate-200">area {item.area}</p>
              <p className="bg-slate-200">sensor_type {item.sensor_type}</p>
              <p className="bg-slate-200">temp_pv {item.temp_pv}</p>
              <p className="bg-slate-200">humid_pv {item.humid_pv}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChipTempHumID;
