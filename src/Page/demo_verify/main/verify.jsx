import React, { useState, useEffect } from "react";
import axios from "axios";
import GetAPI from "../API/GET/GetAPI";
import PostAPI from "../API/POST/PostAPI";
//Components
import TextInputComponents from "../Components/TextInput/TextInput";
import CardInfo from "../Components/CardInfo/CardInfo";
import LoadingAPI from "../../../Components/common/loading/Loading-08/loading";
import MachineComponents from "../Components/MachinePM/MachinePMComponents";
import MachineCalComponents from "../Components/MachineCal/MachineCalComponents";
//MUI ICON
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

// Alert
import {
  showSuccessToast,
  showWarningToast,
  showErrorToast,
} from "../Components/Toast/Toast";
import { ToastContainer } from "react-toastify";

function verify() {
  const [mcCode, setMcCode] = useState("R2-17-11_A");
  const [lot, setLot] = useState("994035351");

  //! State CardUI API /api/ewk/smart-fpc-lot/
  const [datainfimation, setdatainfimation] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  //! DATA Machine PM /api/ewk/smart-pm/
  const [pm, setpm] = useState([]); //  data
  const [statuspm_api, setstatuspm_api] = useState(""); //  statusapi
  const [Messagepm_api, setMessagepm_api] = useState(""); //  message
  const [StatusDataPM, setStatusDataPM] = useState(""); //  statusdata

  //! DATA Machine Cal /api/ewk/smart-cal-monthly-detail/
  const [calibration, setcalibration] = useState([]); //  data
  const [statuscalibration_API, setstatuscalibration_API] = useState(""); //  statusapi
  const [Messagecalibration, setMessagecalibration] = useState(""); //  message
  const [StatusDataCal, setStatusDataCal] = useState(""); //  statusdata

  const [EWK_ID, setEWK_ID] = useState("");
  const [selectdatafromchip, setselectdatafromchip] = useState("");
  const [checkk, setCheckk] = useState({
    smartfpclot: false,
    smartPM: false,
    smartCalMonthlyDetail: false,
    smartEMCS: false,
    smartVerifyReport: false,
    smartHoldingTime: false,
    smartLQApprove: false,
    smartFPCScadaRealtimeCenter: false,
    smartToolTypeTool: false,
    smartToolTypeEMCS: false,
    smartToolTypeOperator: false,
  });

  useEffect(() => {
    if (datainfimation && datainfimation.length > 0) {
      const ewk_id = lot + "+" + mcCode + "+" + datainfimation[0].proc_id;
      setEWK_ID(ewk_id);
    } else {
      setEWK_ID("");
    }
  }, [datainfimation]);

  useEffect(() => {
    const extractData = () => {
      if (datainfimation && datainfimation.length > 0) {
        const firstItem = datainfimation[0];
        return {
          proc_id: firstItem.proc_id,
          lot_prd_name: firstItem.lot_prd_name,
          lot_prd_name_split: firstItem.lot_prd_name_split,
          mc_code: mcCode, // Assuming mcCode is defined elsewhere
          line: firstItem.line || "null",
          proc_grp_name: firstItem.proc_grp_name,
          scan_job_id: `${lot}_${firstItem.proc_grp_name}_${mcCode}`,
        };
      }
      return null;
    };

    const fetchData = async () => {
      const extractedData = extractData();
      console.log(extractedData);
      if (datainfimation && datainfimation.length > 0 && extractedData !== "") {
        await requestApi_PM(); //! 2.smart-pm
        await requestApi_Cal_monthly_detail(); //! 3.smart-cal-monthly-detail
        // // await fetchDataForEDoc(extractedData); //! 4.smart-emcs
        // await fetchDataForVerification(extractedData); //! 5.smart-verdify-report
        // await requestholdingtime(); //! 6.smart-holding-time
        // await requestApprove(extractedData); //! 7. smart-lq-approve
        // await fetchStatusMachine(); //! 8.smart-fpc-scada-realtime-center
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

  const handlesearch = async () => {
    setIsLoading(true);
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
      // setIsLoading(false);
    }
  };

  const requestApi_PM = async () => {
    const data = { mc_code: mcCode, ewk_id: EWK_ID };
    const url = `http://10.17.66.242:7010/api/ewk/smart-pm/`;
    try {
      const response_data = await PostAPI(data, url);
      //response.data default

      if (response_data.status === "OK") {
        setpm(response_data.data.data);
        setstatuspm_api("OK");
        setStatusDataPM(response_data.data.ewk_judge);
        setMessagepm_api(response_data.message);
        showSuccessToast("Machine PM");
      } else if (response_data.status === "ERROR") {
        setpm([]);
        setstatuspm_api("ERROR");
        setMessagepm_api(response_data.message);
        showWarningToast("Machine PM");
      } else {
        console.log("Catch");
        setstatuspm_api("Catch");
        showErrorToast("Machine PM");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const requestApi_Cal_monthly_detail = async () => {
    const data = { mc_code: mcCode, ewk_id: EWK_ID, ewk_item: "Machine Cal" };
    const url = `http://10.17.66.242:7010/api/ewk/smart-cal-monthly-detail/`;
    try {
      const response_data = await PostAPI(data, url);
      if (response_data.status === "OK") {
        if (response_data.data && response_data.data.data.length > 0) {
          // Check if response_data and response_data.data are not null or undefined
          // const responseData = checkForInactive_MachineCal(response_data);
          // console.log(responseData);
          setcalibration(response_data.data.data);
          setstatuscalibration_API("OK");
          setMessagecalibration(response_data.message);
          setStatusDataCal(response_data.data.ewk_judge);
          showSuccessToast("Machine Cal");
        } else {
          setcalibration([]);
          setstatuscalibration_API("OK");
          setMessagecalibration(response_data.message);
          setStatusDataCal(response_data.data.ewk_judge);
          showSuccessToast("Machine Cal");
        }
      } else if (response_data.status === "ERROR") {
        setcalibration([]);
        setstatuscalibration_API("ERROR");
        setMessagecalibration(response_data.message);
        setStatusDataCal(response_data.data.ewk_judge);
        showSuccessToast("Machine Cal");
      } else {
        setcalibration([]);
        setstatuscalibration_API("Catch");
        setMessagecalibration(response_data.message);
        setStatusDataCal(response_data.data.ewk_judge);
        showSuccessToast("Machine Cal");
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
      {IsLoading ? (
        <>
          <LoadingAPI />
          {/* {checkk.smartfpclot ? <>true</> : <>false</>} */}
        </>
      ) : (
        <>
          <div className="container mx-auto pt-4 ">
            <CardInfo datainfimation={datainfimation} />
          </div>
          {!IsLoading && datainfimation && datainfimation.length > 0 && (
            <div className="container mx-auto pt-4 ">
              {/* <div className="flex gap-2"> */}
              <MachineComponents
                title={"Machine PM"}
                statuspm_api={statuspm_api}
                Messagepm_api={Messagepm_api}
                datapm={pm}
                StatusDataPM={StatusDataPM}
                onClick={() => {
                  setselectdatafromchip("Machine PM");
                }}
                selectdatafromchip={selectdatafromchip}
              />
              <MachineCalComponents
                onClick={() => {
                  setselectdatafromchip("Machine Cal");
                }}
                selectdatafromchip={selectdatafromchip}
                title={"Machine Cal"}
                statuscalibration_API={statuscalibration_API}
                Messagecalibration={Messagecalibration}
                v={calibration}
              />
            </div>
            // </div>
          )}
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default verify;
