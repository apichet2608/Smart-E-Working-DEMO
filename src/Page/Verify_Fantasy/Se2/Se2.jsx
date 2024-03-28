import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

import { useSelector, useDispatch } from "react-redux";
import {
  showSuccessToast,
  showWarningToast,
  showErrorToast,
} from "../Components/Toast/Toast";
import PostAPI from "../API/POST/PostAPI";
import GetAPI from "../API/GET/GetAPI";
import Tooling from "../Components/Tooling/Operator";
function Se2(props) {
  const dispatchs = useDispatch();
  const state = useSelector((state) => state.lqapprovestatus);
  const { lot, mc_code, EWK_ID, datainfimation, valueTab } = props;
  const [toolingData, settoolingData] = useState([]);

  useEffect(() => {
    if (
      state.ewk_item_seq === 0 &&
      EWK_ID !== "" &&
      datainfimation &&
      datainfimation.length > 0
    ) {
      console.log("EWK", EWK_ID);
      GetAsyncAPI();
    } else {
      console.log("EWK2", EWK_ID);
      GetAsyncAPI();
    }
  }, [EWK_ID, valueTab]);

  const GetAsyncAPI = async () => {
    //   await requestApi_PM();
    //   await requestApi_Cal_monthly_detail();
    //   await fetchDataForVerification(datainfimation[0]);
    //   await fetchStatusMachine();
    //   await requestholdingtime();
    //   await requestApprove(datainfimation[0]);
    console.log("GetAsyncAPI");
    await featchtoolData(datainfimation[0]);
  };

  const featchtoolData = async (extractedData) => {
    console.log(extractedData);
    const data = {
      proc_id: extractedData.proc_id,
      lot: lot,
      mc_code: mc_code,
    };
    console.log(data);
    const url = `http://10.17.66.242:7010/api/ewk/smart-tool-type-tool/`;
    const response = await PostAPI(data, url);
    console.log(response);
    if (response.status === "OK") {
      settoolingData(response);
      showSuccessToast("Tooling");
    } else if (response.status === "ERROR") {
      settoolingData([]);
    } else {
      settoolingData([]);
    }
  };

  // const opSubmitBtnUrl = `http://10.17.66.242:7010/api/ewk/smart-call-fpc-eworking-set-tooling-code/`;
  /*Sample body parameter for opSubmitBtnUrl API
  for op
  {
    "p_scan_type": "POS",        // scan type
    "p_lot_mos": "994035355",   // lot
    "p_process": "2033",        // process id
    "p_tools_type": "005",         // tools type //?Fixed
    "p_tools_code": "5053387",         // tools code
    "p_machine": "R2-17-11_A",            // mc code
    "p_user": "A-RCSC",               // employee code
    "p_station": "R2-17-11_A",             //
    "ewk_id": "",
    "ewk_item": "",
    "ewk_item_detail": ""
  }
  for dcc
  {
    "p_scan_type": "POS",        // scan type
    "p_lot_mos": "994035350",   // lot
    "p_process": "2033",        // process id
    "p_tools_type": "003",         // tools type //?Fixed
    "p_tools_code": "EMCS-A1-ECF-21-0361+3",         // tools code
    "p_machine": "R2-17-11_A",            // mc code
    "p_user": "A-RCSC",               // employee code
    "p_station": "R2-17-11_A",             //
    "ewk_id": "",
    "ewk_item": "",
    "ewk_item_detail": ""
  }
  */

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        {Object.keys(toolingData).length > 0 && (
          <Tooling response_API={toolingData} EWK_ID={EWK_ID} />
          // <>TEST</>
        )}
      </div>
      <div className="grid gap-4">
        <Button color="primary" className="w-full">
          Scan OP
        </Button>
        <Button color="primary" className="w-full">
          DCC
        </Button>
      </div>
    </div>
  );
}

export default Se2;
