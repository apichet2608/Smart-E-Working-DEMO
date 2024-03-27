import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  showSuccessToast,
  showWarningToast,
  showErrorToast,
} from "../Components/Toast/Toast";
import PostAPI from "../API/POST/PostAPI";
import GetAPI from "../API/GET/GetAPI";
import MachinePM from "../Components/MachinePM/MachinePM";
import MachineCal from "../Components/MachineCal/MachineCal";
import FaiAutoVerify from "../Components/FaiAutoVerify/FaiAutoVerify";
import MachineData from "../Components/MachineData/MachineData";
import LQApprove from "../Components/SQ1/LQApprove/LQApprove";
import HoldingTime from "../Components/SQ1/HoldingTime/HoldingTime";
import EMCS from "../Components/EMCS/Operator";
import LeaderApprove from "../Components/LeaderApprove/LeaderApprove";
import DailyCheck from "../Components/DailyCheck/DailyCheck";
import TempHumID from "../Components/SQ1/TempHumID/TempHumID";
function Se1(props) {
  const dispatchs = useDispatch();
  const state = useSelector((state) => state.lqapprovestatus);
  const { lot, mc_code, EWK_ID, datainfimation } = props;
  const [pm, setpm] = useState({});
  const [calibration, setcalibration] = useState([]);
  const [faiAutoVerify, setFaiAutoVerify] = useState([]);
  const [machineData, setmachineData] = useState([]);
  const [holdingTimeData, setHoldingTimeData] = useState([]);
  const [LQApproveData, setLQApproveData] = useState([]);
  const [emcsData, setemcsData] = useState([]);
  const [toolingData, settoolingData] = useState([]);
  const [DailyCheckData, setDailyCheckData] = useState([]);
  const [TempHumIDData, setTempHumIDData] = useState([]);
  useEffect(() => {
    if (
      state.ewk_item_seq <= 1 &&
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
  }, [EWK_ID]);

  const GetAsyncAPI = async () => {
    await requestApi_PM();
    // await requestApi_Cal_monthly_detail();
    await fetchDataForVerification(datainfimation[0]);
    await fetchStatusMachine();
    await requestholdingtime();
    await requestApprove(datainfimation[0]);
    await featchemcsData(datainfimation[0]);
    await featchtoolData(datainfimation[0]);
    await featchDailyCheck();
    await featchTempHumID();
    // lq approver and Gr&R
    // total = 7
  };

  const requestApi_PM = async () => {
    const data = { mc_code: mc_code, ewk_id: EWK_ID };
    const url = `${import.meta.env.VITE_IP_API_E_WORKING}/api/ewk/smart-pm/`;

    const response_data = await PostAPI(data, url);
    if (response_data.status === "OK") {
      console.log(response_data);
      setpm(response_data);
      showSuccessToast("Machine PM");
    } else if (response_data.status === "ERROR") {
      setpm([]);
      showWarningToast("API ERROR Machine PM");
    } else {
      console.log("Catch");
      setpm([]);
      showErrorToast("Server Catch Machine PM");
    }
  };

  const requestApi_Cal_monthly_detail = async () => {
    const data = { mc_code: mc_code, ewk_id: EWK_ID, ewk_item: "Machine Cal" };
    const url = `${
      import.meta.env.VITE_IP_API_E_WORKING
    }/api/ewk/smart-cal-monthly-detail/`;

    const response_data = await PostAPI(data, url);
    if (response_data.status === "OK") {
      setcalibration(response_data);
      console.log(response_data);
      showSuccessToast("Machine Cal");
    } else if (response_data.status === "ERROR") {
      setcalibration([]);
      showSuccessToast("Machine Cal");
    } else {
      setcalibration([]);
      showSuccessToast("Machine Cal");
    }
  };

  const fetchDataForVerification = async (extractedData) => {
    const url = `${
      import.meta.env.VITE_IP_API_E_WORKING
    }/api/ewk/smart-verdify-report/`;
    const data = {
      mc_code: extractedData.mc_code,
      proc_grp_name: extractedData.proc_grp_name,
      ewk_id: EWK_ID,
      ewk_item: "FAI Auto Verify",
    };

    const response_data = await PostAPI(data, url);
    if (response_data.status === "OK") {
      console.log(response_data);
      setFaiAutoVerify(response_data);
      showSuccessToast("FAI Auto Verify");
    } else if (response_data.status === "ERROR") {
      setFaiAutoVerify([]);
      showWarningToast("FAI Auto Verify");
    } else {
      setFaiAutoVerify([]);
      showErrorToast("FAI Auto Verify");
    }
  };

  const fetchStatusMachine = async () => {
    const inputString = mc_code; // ตรวจสอบให้แน่ใจว่า mcCode ถูกกำหนดค่าไว้อย่างถูกต้อง
    const requestData = {
      mc_code: inputString,
      ewk_id: EWK_ID,
      ewk_item: "Machine Data",
    };
    console.log(requestData.mc_code);
    const params = {
      // mc_code: inputString,
      ewk_id: EWK_ID,
      // ewk_item: "Machine Data",
    };
    const url = `http://10.17.66.242:7010/api/ewk/smart-machine-data-scada-realtime-center/`;
    const response_data = await PostAPI(params, url);

    if (response_data.status === "OK") {
      setmachineData(response_data);
      showSuccessToast("Machine Data");
    } else if (response_data.status === "ERROR") {
      setmachineData([]);
      showSuccessToast("Machine Data");
    } else {
      setmachineData([]);
      showSuccessToast("Machine Data");
    }
  };

  const requestholdingtime = async () => {
    const data = { lot: lot, ewk_id: EWK_ID, ewk_item: "holding time" };
    const url = `http://10.17.66.242:7010/api/ewk/smart-holding-time/`;
    try {
      console.log("Done");
      const response_data = await PostAPI(data, url);
      console.log(response_data);
      if (response_data.status === "OK") {
        setHoldingTimeData(response_data);
        showSuccessToast("Holding Time");
      } else if (response_data.status === "ERROR") {
        setHoldingTimeData([]);
      } else {
        setHoldingTimeData([]);
      }
      //response.data default
    } catch (error) {
      console.error(error);
    }
  };

  const requestApprove = async (extractedData) => {
    const data = {
      // lot: lot,
      mc_code: mc_code,
      dld_product: extractedData.lot_prd_name,
      dld_machine: mc_code,
      ewk_id: EWK_ID,
      ewk_item: "LQ Approve",
      ewk_grr_id: EWK_ID,
      ewk_grr_item: "GR&R",
    };
    const url = `http://10.17.66.242:7010/api/ewk/smart-lq-approve/`;
    try {
      console.log("Done");
      const response_data = await PostAPI(data, url);
      console.log(response_data.data);
      if (response_data.status === "OK") {
        console.log(response_data);
        setLQApproveData(response_data);
        showSuccessToast("LQ Approve");
      } else if (response_data.status === "ERROR") {
        setLQApproveData([]);
      } else {
        setLQApproveData([]);
      }
      //response.data default
    } catch (error) {
      console.error(error);
    }
  };

  const featchemcsData = async (extractedData) => {
    console.log(extractedData);
    const data = {
      proc_id: extractedData.proc_id,
      lot: lot,
      mc_code: mc_code,
    };
    const url = `http://10.17.66.242:7010/api/ewk/smart-tool-type-emcs/`;
    const response = await PostAPI(data, url);
    console.log(response);
    if (response.status === "OK") {
      setemcsData(response);
      showSuccessToast("EMCS");
    } else if (response.status === "ERROR") {
      setemcsData([]);
    } else {
      setemcsData([]);
    }
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

  const featchDailyCheck = async () => {
    const data = {
      ewk_id: EWK_ID,
    };
    console.log(data);
    const url = `http://10.17.66.242:7010/api/ewk/smart-ewk-daily-record/`;
    const response = await PostAPI(data, url);
    console.log(response);
    if (response.status === "OK") {
      setDailyCheckData(response);
      showSuccessToast("daily-record");
    } else if (response.status === "ERROR") {
      setDailyCheckData([]);
    } else {
      setDailyCheckData([]);
    }
  };

  const featchTempHumID = async () => {
    const data = {
      ewk_id: EWK_ID,
    };
    console.log(data);
    const url = `http://10.17.66.242:7010/api/ewk/smart-temp-hum-data/`;
    const response = await PostAPI(data, url);
    console.log(response);
    if (response.status === "OK") {
      setTempHumIDData(response);
      showSuccessToast("temp-hum");
    } else if (response.status === "ERROR") {
      setTempHumIDData([]);
    } else {
      setTempHumIDData([]);
    }
  };

  return (
    <div>
      {EWK_ID !== "" && (
        <>
          <div className=" container mx-auto mt-4">
            {Object.keys(pm).length > 0 && (
              <MachinePM
                response_API={pm}
                state={state}
                requestApi_PM={() => requestApi_PM()}
              />
            )}
            <div className="mt-6"></div>
            {Object.keys(calibration).length > 0 && (
              <MachineCal
                response_API={calibration}
                state={state}
                requestApi_Cal_monthly_detail={() =>
                  requestApi_Cal_monthly_detail()
                }
              />
            )}

            <div className="mt-6"></div>
            {Object.keys(faiAutoVerify).length > 0 && (
              <FaiAutoVerify
                response_API={faiAutoVerify}
                state={state}
                fetchDataForVerification={() =>
                  fetchDataForVerification(datainfimation[0])
                }
              />
            )}

            <div className="mt-6"></div>
            {Object.keys(machineData).length > 0 && (
              <MachineData
                state={state}
                fetchStatusMachine={fetchStatusMachine}
                response_API={machineData}
              />
            )}
            <div className="mt-6"></div>
            {Object.keys(holdingTimeData).length > 0 && (
              <>
                <HoldingTime response_API={holdingTimeData} />
              </>
            )}
            <div className="mt-6"></div>
            {Object.keys(LQApproveData).length > 0 && (
              <>
                <LQApprove response_API={LQApproveData} />
              </>
            )}
            <div className="mt-6"></div>
            <div>
              {Object.keys(emcsData).length > 0 && (
                <EMCS response_API={emcsData} EWK_ID={EWK_ID} />
                // <>TEST</>
              )}
            </div>
            <div className="mt-6"></div>
            {/* <div>
              {Object.keys(toolingData).length > 0 && (
                <EMCS response_API={toolingData} EWK_ID={EWK_ID} />
                // <>TEST</>
              )}
            </div> */}
            <div className="mt-6"></div>
            {Object.keys(DailyCheckData).length > 0 && (
              <DailyCheck response_API={DailyCheckData} />
            )}
            <div className="mt-6"></div>
            {Object.keys(TempHumIDData).length > 0 && (
              <TempHumID response_API={TempHumIDData} />
            )}
            <LeaderApprove EWK_ID={EWK_ID} />
          </div>
        </>
      )}
    </div>
  );
}

export default Se1;