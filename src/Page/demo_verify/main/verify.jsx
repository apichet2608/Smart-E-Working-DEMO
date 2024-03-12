import React, { useState } from "react";
import axios from "axios";
import GetAPI from "../API/GET/GetAPI";
//Components
import TextInputComponents from "../Components/TextInput/TextInput";

//MUI ICON
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Inventory2Icon from "@mui/icons-material/Inventory2";
// import AbcIcon from "@mui/icons-material/Abc";

function verify() {
  const [mcCode, setMcCode] = useState("R2-32-24");
  const [lot, setLot] = useState("804011954");

  const [datainfimation, setdatainfimation] = useState([]);
  const handlesearch = async () => {
    console.log("SEARCH");
    await requestApiLotSearch();
  };

  const requestApiLotSearch = async () => {
    const params = {
      lot: lot,
      is_roll: false,
    };
    const url = `http://10.17.66.242:7010/api/ewk/smart-fpc-lot/`;
    try {
      const response_data = await GetAPI(params, url);
      if (response_data.status === "OK") {
        console.log(response_data);
        setdatainfimation([response_data.data.data]);
      } else if (response_data.status === "ERROR") {
        console.log(response_data);
        setdatainfimation([response_data.data.data]);
      } else {
        setdatainfimation([response_data.data.data]);
        console.log(response_data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* {dataapprove.dld_machine} */}
      <div className="container mx-auto my-1 w-full">
        <div className="flex gap-1 justify-between w-full">
          <TextInputComponents
            values={mcCode}
            onChanges={(e) => setMcCode(e.target.value.toUpperCase())}
            placeholders={"mc code"}
          />
          <TextInputComponents
            values={lot}
            onChanges={(e) => setLot(e.target.value)}
            placeholders={"lot"}
          />
        </div>
        <div className="flex gap-1 justify-between w-full">
          <button
            className="bg-slate-200 rounded-2xl text-black hover:bg-slate-400 Button_Search"
            onClick={() => handlesearch()}
          >
            <ManageSearchIcon />
          </button>
        </div>
      </div>
      <div className="container mx-auto pt-4 ">
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
                <div className="">
                  <Inventory2Icon />
                </div>
              </div>
            ))}
            {datainfimation.map((item) => (
              <div
                key={item.id}
                className="card w-full bg-base-100 shadow-xl Paper_Contents p-0.5"
              >
                <p className=" font-bold text-nowrap">{item.lot}</p>
                <p className="text-nowrap">Lot</p>
              </div>
            ))}
            {datainfimation.map((item) => (
              <div
                key={item.id}
                className="card w-full bg-base-100 shadow-xl Paper_Contents"
              >
                <p className=" font-bold text-nowrap">{item.input_qty}</p>
                <p className="text-nowrap">QTY</p>
              </div>
            ))}
            {datainfimation.map((item) => (
              <div
                key={item.id}
                className="card w-full bg-base-100 shadow-xl Paper_Contents"
              >
                <p className=" font-bold text-nowrap">{item.proc_grp_name}</p>
                <p className="text-nowrap">Product Group Name</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default verify;
