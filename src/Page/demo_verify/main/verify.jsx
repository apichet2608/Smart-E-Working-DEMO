import React, { useState } from "react";
import axios from "axios";
import GetAPI from "../API/GET/GetAPI";
//Components
import TextInputComponents from "../Components/TextInput/TextInput";

//MUI ICON
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

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
    const url = `http://10.17.66.242:7011/api/ewk/smart-fpc-lot/`;
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
    </>
  );
}

export default verify;
