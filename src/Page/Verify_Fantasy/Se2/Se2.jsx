import React, { useEffect, useState } from "react";
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

  return (
    <div>
      <div>
        {Object.keys(toolingData).length > 0 && (
          <Tooling response_API={toolingData} EWK_ID={EWK_ID} />
          // <>TEST</>
        )}
      </div>
    </div>
  );
}

export default Se2;
