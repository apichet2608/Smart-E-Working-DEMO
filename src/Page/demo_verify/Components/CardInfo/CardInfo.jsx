import React from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
function CardInfo({ datainfimation }) {
  return (
    <div>
      {" "}
      {datainfimation && datainfimation.length > 0 ? (
        <div className="lg:flex lg:gap-2 lg:justify-start md:grid md:grid-cols-2 md:gap-2">
          {datainfimation.map((item) => (
            <div
              key={item.id}
              className=" w-full bg-base-100 shadow-xl Paper_Contents flex gap-2"
            >
              <div>
                <p className="font-bold text-nowrap">{item.lot_prd_name}</p>
                <p className="text-nowrap">Product Name</p>
              </div>
              {/* <div className="">
                <Inventory2Icon />
              </div> */}
            </div>
          ))}
          {datainfimation.map((item) => (
            <div
              key={item.id}
              className=" w-full bg-base-100 shadow-xl Paper_Contents p-0.5"
            >
              <p className=" font-bold text-nowrap">{item.lot}</p>
              <p className="text-nowrap">Lot</p>
            </div>
          ))}
          {datainfimation.map((item) => (
            <div
              key={item.id}
              className=" w-full bg-base-100 shadow-xl Paper_Contents"
            >
              <p className=" font-bold text-nowrap">{item.input_qty}</p>
              <p className="text-nowrap">QTY</p>
            </div>
          ))}
          {datainfimation.map((item) => (
            <div
              key={item.id}
              className=" w-full bg-base-100 shadow-xl Paper_Contents"
            >
              <p className=" font-bold text-nowrap">{item.proc_grp_name}</p>
              <p className="text-nowrap">Product Group Name</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default CardInfo;
