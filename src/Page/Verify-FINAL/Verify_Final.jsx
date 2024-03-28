import React, { useState, useEffect } from "react";
import CardInfo from "./Components/CardInfo/CardInfo";
import TextInputComponents from "./Components/TextInput/TextInput";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Loading from "../../Components/common/loading/Loading-08/loading";
import GetAPI from "./API/GET/GetAPI";
import PostAPI from "./API/POST/PostAPI";
import MachinePM from "./Components/MachinePM/MachinePM";
import MachineCal from "./Components/MachineCal/MachineCal";
import FaiAutoVerify from "./Components/FaiAutoVerify/FaiAutoVerify";
import MachineData from "./Components/MachineData/MachineData";
// import Tooling from "./Components/Tooling/BadgeTooling";
import Operator from "./Components/Operator/Operator";
import LearderApprove from "./Components/LearderApprove/LearderApprove";
// Alert
import {
  showSuccessToast,
  showWarningToast,
  showErrorToast,
} from "./Components/Toast/Toast";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setstatuslq } from "../../../Redux/Action/lqapprovestatus";

function Verify_Final() {
  const [lot, setLot] = useState("994035355");
  const [mc_code, setMc_code] = useState("R2-17-11_A");
  const [isLoading, setIsLoading] = useState(false);
  const [datainfimation, setdatainfimation] = useState([]);
  const [EWK_ID, setEWK_ID] = useState("");
  const [checkk, setCheckk] = useState({
    smartfpclot: false,
  });
  // R2-07-12;
  // 240353452;
  const [pm, setpm] = useState({});
  const [calibration, setcalibration] = useState([]);
  const [faiAutoVerify, setFaiAutoVerify] = useState([]);
  const [machineData, setmachineData] = useState([]);
  const [operatorData, setoperatorData] = useState([]);
  const [toolingData, settoolingData] = useState([]);
  const [emcsData, setemcsData] = useState([]);
  const handlesearch = async () => {
    setdatainfimation([]);
    setIsLoading(true);
    await requestApiLotSearch();
  };
  const dispatchs = useDispatch();

  const state = useSelector((state) => state.lqapprovestatus);
  useEffect(() => {
    if (datainfimation && datainfimation.length > 0) {
      const ewk_id = lot + "+" + mc_code + "+" + datainfimation[0].proc_id;
      setEWK_ID(ewk_id);
    } else {
      setEWK_ID("");
    }
  }, [datainfimation]);

  const [exdata, setExdata] = useState([]);
  useEffect(() => {
    const extractData = () => {
      if (datainfimation && datainfimation.length > 0) {
        const firstItem = datainfimation[0];
        return {
          proc_id: firstItem.proc_id,
          lot_prd_name: firstItem.lot_prd_name,
          lot_prd_name_split: firstItem.lot_prd_name_split,
          mc_code: mc_code, // Assuming mc_code is defined elsewhere
          line: firstItem.line || "null",
          proc_grp_name: firstItem.proc_grp_name,
          scan_job_id: `${lot}_${firstItem.proc_grp_name}_${mc_code}`,
        };
      }
      return null;
    };

    const fetchData = async () => {
      const extractedData = extractData();
      console.log(extractedData);
      setExdata(extractedData);
      if (datainfimation && datainfimation.length > 0 && extractedData !== "") {
        // check leader approve
        // if pass then fetch data
        // if not pass then show alert
        await checklqapprove(EWK_ID); //! 1.smart-lq-approve
        // if (state.ewk_item_seq === 0) {
        //   alert("0");
        // } else if (state.ewk_item_seq === 1) {
        //   alert("1");
        // }
        // await requestApi_PM(); //! 2.smart-pm
        // await requestApi_Cal_monthly_detail(); //! 3.smart-cal-monthly-detail
        // // // await fetchDataForEDoc(extractedData); //! 4.smart-emcs
        // await fetchDataForVerification(extractedData); //! 5.smart-verdify-report
        // await fetchStatusMachine(); //! 8.smart-fpc-scada-realtime-center
        // await requestholdingtime(); //! 6.smart-holding-time
        // await requestApprove(extractedData); //! 7. smart-lq-approve

        // // await checkToolingData(extractedData);
        // // await checkMaterialeData(extractedData);
        // await featchtoolData(extractedData); //! 9. smart-tool-type-tool
        // await featchemcsData(extractedData); //! 10. smart-tool-type-emcs
        // await featchoperatorData(extractedData); //! 11 smart-tool-type-operator
        setIsLoading(false);
      } else {
        // alert("iheretoo");
      }
    };
    fetchData();
  }, [EWK_ID]);

  useEffect(() => {
    const featchdata = async (exdata) => {
      await requestApi_PM(); //! 2.smart-pm
      await requestApi_Cal_monthly_detail(); //! 3.smart-cal-monthly-detail
      // // await fetchDataForEDoc(extractedData); //! 4.smart-emcs
      await fetchDataForVerification(exdata); //! 5.smart-verdify-report
      await fetchStatusMachine(); //! 8.smart-fpc-scada-realtime-center
      await requestholdingtime(); //! 6.smart-holding-time
      await requestApprove(exdata); //! 7. smart-lq-approve
    };

    if (state.ewk_item_seq === 0) {
      // console.log("exdata", exdata);
      featchdata(exdata);
    } else if (state.ewk_item_seq === 1) {
      console.log("1");
      featchdata(exdata);
    }
    console.log("state", state);
  }, [state]);

  const checklqapprove = async (EWK_ID) => {
    const url = `${
      import.meta.env.VITE_IP_API_E_WORKING
    }/api/ewk/smart-ewk-id-status/`;
    const data = {
      ewk_id: EWK_ID,
    };
    const response_data = await PostAPI(data, url);
    if (response_data.status === "OK") {
      console.log(response_data);
      dispatchs(setstatuslq(response_data.data.data));
      showSuccessToast(
        `Check Sequence ${response_data.data.data.ewk_item_seq}`
      );
    } else if (response_data.status === "ERROR") {
      console.log(response_data);
      showSuccessToast(
        `Check Sequence ${response_data.data.data.ewk_item_seq}`
      );
    } else {
      console.log(response_data);
      showSuccessToast(
        `Check Sequence ${response_data.data.data.ewk_item_seq}`
      );
    }
  };

  const requestApiLotSearch = async () => {
    const params = {
      lot: lot,
      is_roll: false,
    };
    const url = `${
      import.meta.env.VITE_IP_API_E_WORKING
    }/api/ewk/smart-fpc-lot/`;
    try {
      const response_data = await GetAPI(params, url);
      if (response_data.status === "OK") {
        console.log(response_data);
        setdatainfimation([response_data.data.data]);
        setCheckk((prevCheckk) => ({ ...prevCheckk, smartfpclot: true }));
        showSuccessToast("FPC LOT Search");
      } else if (response_data.status === "ERROR") {
        console.log(response_data);
        setdatainfimation([]);
        setCheckk((prevCheckk) => ({ ...prevCheckk, smartfpclot: false }));
        showWarningToast("FPC LOT Search");
      } else {
        setdatainfimation([]);
        setCheckk((prevCheckk) => ({ ...prevCheckk, smartfpclot: false }));
        console.log(response_data);
        showErrorToast("FPC LOT Search");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestApi_PM = async () => {
    const data = { mc_code: mc_code, ewk_id: EWK_ID };
    const url = `${import.meta.env.VITE_IP_API_E_WORKING}/api/ewk/smart-pm/`;
    try {
      const response_data = await PostAPI(data, url);
      //response.data default
      if (response_data.status === "OK") {
        setpm(response_data);
        showSuccessToast("Machine PM");
      } else if (response_data.status === "ERROR") {
        setpm([]);
        showWarningToast("Machine PM");
      } else {
        console.log("Catch");
        setpm([]);
        showErrorToast("Machine PM");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const requestApi_Cal_monthly_detail = async () => {
    const data = { mc_code: mc_code, ewk_id: EWK_ID, ewk_item: "Machine Cal" };
    const url = `${
      import.meta.env.VITE_IP_API_E_WORKING
    }/api/ewk/smart-cal-monthly-detail/`;
    try {
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
    } catch (error) {
      console.error(error);
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
      mc_code: inputString,
      ewk_id: EWK_ID,
      ewk_item: "Machine Data",
    };
    const url = `http://10.17.66.242:7010/api/ewk/smart-fpc-scada-realtime-center/`;
    const response_data = await GetAPI(params, url);

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

  const [holdingTimeData, setHoldingTimeData] = useState([]);

  const requestholdingtime = async () => {
    const data = { lot: lot, ewk_id: EWK_ID, ewk_item: "holding time" };
    const url = `http://10.17.66.242:7010/api/ewk/smart-holding-time/`;
    try {
      console.log("Done");
      const response_data = await PostAPI(data, url);
      console.log(response_data.data);
      if (response_data.status === "OK") {
        setHoldingTimeData(response_data.data.data);
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

  const [LQApproveData, setLQApproveData] = useState([]);

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
        console.log(response_data.data.data);
        setLQApproveData(response_data.data.data);
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

  const featchtoolData = async (extractedData) => {
    console.log(extractedData);
    const data = {
      proc_id: extractedData.proc_id,
      lot: lot,
      mc_code: mc_code,
    };
    console.log(data);
    const url = `http://10.17.66.242:7010/api/ewk/smart-tool-type-tool/`;
    const response_data = await PostAPI(data, url);
    console.log(response_data);
    if (response_data.status === "OK") {
      console.log(response_data);
      settoolingData(response_data);
    } else {
      console.log(response_data);
      settoolingData(response_data);
    }
  };

  const featchoperatorData = async (extractedData) => {
    console.log(extractedData);
    const data = {
      proc_id: extractedData.proc_id,
      lot: lot,
      mc_code: mc_code,
    };
    const url = `http://10.17.66.242:7010/api/ewk/smart-tool-type-operator/`;
    const response_data = await PostAPI(data, url);
    console.log(response_data);
    if (response_data.status === "OK") {
      console.log(response_data);
      setoperatorData(response_data);
    } else {
      console.log(response_data);
      setoperatorData(response_data);
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
    const response_data = await PostAPI(data, url);
    console.log(response_data);
    if (response_data.status === "OK") {
      console.log(response_data);
      setemcsData(response_data);
    } else {
      console.log(response_data);
      setemcsData(response_data);
    }
  };

  return (
    <>
      <div className="container mx-auto my-1 w-full">
        <div className="flex gap-1 justify-between w-full">
          <TextInputComponents
            values={mc_code}
            onChanges={(e) => setMc_code(e.target.value.toUpperCase())}
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
      {isLoading ? (
        <Loading />
      ) : (
        datainfimation &&
        datainfimation.length > 0 && (
          <>
            <div className="container mx-auto pt-4 ">
              <CardInfo datainfimation={datainfimation} />
            </div>
            <div className="container mx-auto pt-4">
              {Object.keys(pm).length > 0 && (
                <MachinePM
                  response_API={pm}
                  state={state}
                  requestApi_PM={() => requestApi_PM()}
                />
              )}
              {Object.keys(calibration).length > 0 && (
                <MachineCal response_API={calibration} />
              )}
              {Object.keys(faiAutoVerify).length > 0 && (
                <FaiAutoVerify response_API={faiAutoVerify} />
              )}
              {Object.keys(machineData).length > 0 && (
                <MachineData
                  fetchStatusMachine={fetchStatusMachine}
                  response_API={machineData}
                />
              )}
              {state === 2 && (
                <>
                  {Object.keys(operatorData).length > 0 && (
                    <Operator response_API={operatorData} EWK_ID={EWK_ID} />
                  )}
                  {/* //! wait desight components lqapprove holdingtime tool emcs*/}
                  <LearderApprove EWK_ID={EWK_ID} />
                </>
              )}
            </div>
          </>
        )
      )}
      <ToastContainer />
    </>
  );
}

export default Verify_Final;
