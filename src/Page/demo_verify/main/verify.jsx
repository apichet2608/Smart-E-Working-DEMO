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
import FaiAutoverifyComponents from "../Components/FaiAutoverify/FaiAutoverifyComponents";
import MachineData from "../Components/MachineData/MachineData";
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

  //! DATA Machine Verify /api/ewk/smart-verdify-report/
  const [groupfaidata_verify, setgroupfaidata_verify] = useState([]); //  data
  const [statusgroupfaidata_verify, setstatusgroupfaidata_verify] =
    useState(""); //  statusapi
  const [Messagegroupfaidata_verify, setMessagegroupfaidata_verify] =
    useState(""); //  message

  //! DATA Machine SCADA /api/ewk/smart-fpc-scada-realtime-center/
  const [selectdatafromship_mcData, setselectdatafromship_mcData] =
    useState(""); //  selectdatafromchip
  const [machineData, setmachineData] = useState([]);
  const [statusMachine, setstatusMachine] = useState(false);
  const [MessageMachine, setMessageMachine] = useState("");
  // Actv
  const [MachineActv, setMachineActv] = useState([]);
  const [columnsactvData, setcolumnsactvData] = useState([]);
  // Alm
  const [MachineAlm, setMachineAlm] = useState([]);
  const [columnsAlmData, setcolumnsAlmData] = useState([]);
  // Set
  const [MachineSet, setMachineSet] = useState([]);
  const [columnsSetData, setcolumnsSetData] = useState([]);
  // Status
  const [MachineStatus, setMachineStatus] = useState([]);
  const [columnsStatusData, setcolumnsStatusData] = useState([]);
  // Badge
  const [badgemachine, setbadgemachine] = useState([]);
  const [MessageAPImachinedata, setMessageAPImachinedata] = useState("");

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
    console.log(selectdatafromchip);
  }, [selectdatafromchip]);

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
        await fetchDataForVerification(extractedData); //! 5.smart-verdify-report
        await fetchStatusMachine(); //! 8.smart-fpc-scada-realtime-center
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

  const handlesearch = async () => {
    setIsLoading(true);
    await requestApiLotSearch();
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
      // setIsLoading(false);
    }
  };

  const requestApi_PM = async () => {
    const data = { mc_code: mcCode, ewk_id: EWK_ID };
    const url = `${import.meta.env.VITE_IP_API_E_WORKING}/api/ewk/smart-pm/`;
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
    const url = `${
      import.meta.env.VITE_IP_API_E_WORKING
    }/api/ewk/smart-cal-monthly-detail/`;
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
    // const response = await getDataVerify(
    //   extractedData.mc_code,
    //   extractedData.proc_grp_name
    // );
    // if (response && response.data) {
    //   setgroupfaidata_verify(response.data.fai_verify_report);
    // }
    const response_data = await PostAPI(data, url);
    if (response_data.status === "OK") {
      console.log(response_data.data.data.fai_verify_report);
      setgroupfaidata_verify(response_data.data.data.fai_verify_report);
      setstatusgroupfaidata_verify("OK");
      setMessagegroupfaidata_verify(response_data.message);
      // showSuccessToast("FAI Auto Verify");
      showSuccessToast("FAI Auto Verify");
    } else if (response_data.status === "ERROR") {
      setgroupfaidata_verify([]);
      setstatusgroupfaidata_verify("ERROR");
      setMessagegroupfaidata_verify(response_data.message);
      showWarningToast("FAI Auto Verify");
    } else {
      setgroupfaidata_verify([]);
      setstatusgroupfaidata_verify("CATCH");
      setMessagegroupfaidata_verify(response_data.message);
      showErrorToast("FAI Auto Verify");
    }
  };

  //? 6 smart-fpc-scada-realtime-center
  //Wait HARD API
  const [isfeatch_mcdata, setisfeatch_mcdata] = useState(false);
  const fetchStatusMachine = async () => {
    setselectdatafromship_mcData("");
    setisfeatch_mcdata(true);
    const inputString = mcCode; // ตรวจสอบให้แน่ใจว่า mcCode ถูกกำหนดค่าไว้อย่างถูกต้อง
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
    const url = `${
      import.meta.env.VITE_IP_API_E_WORKING
    }/api/ewk/smart-fpc-scada-realtime-center/`;
    try {
      const response = await GetAPI(params, url);

      console.log(response.data);
      console.log(response.data.data);
      const datamc = response.data.data.data;
      const data = response.data.data;
      setmachineData(datamc);
      // console.log(data.actv[0].judgment_record);

      if (response.status === "OK") {
        if (response.data.judgment_machine === "PASS") {
          setstatusMachine(true);
        } else {
          setstatusMachine(false);
        }
        setMessageMachine(response.message);
        // Extract data
        const actvData = data.actv;
        const almData = data.alm;
        const setData = data.set;
        const statusData = data.status;

        // Set machine data
        setMachineActv(actvData);
        setMachineAlm(almData);
        setMachineSet(setData);
        setMachineStatus(statusData);

        // Generate columns for Data Grid
        const columnsActvData = actvData
          ? generateColumns(actvData, "Actv")
          : "";
        const columnsAlmData = almData ? generateColumns(almData, "Alm") : "";
        const columnsSetData = setData ? generateColumns(setData, "Set") : "";
        const columnsStatusData = statusData
          ? generateColumns(statusData, "Status")
          : "";

        // Set columns for UI components
        setcolumnsactvData(columnsActvData);
        setcolumnsAlmData(columnsAlmData);
        setcolumnsSetData(columnsSetData);
        setcolumnsStatusData(columnsStatusData);

        // Badge data
        const datas = generateBadgeData(actvData, almData, setData, statusData);
        console.log(datas);
        setbadgemachine(datas);
        setMessageAPImachinedata("OK");
      } else if (response.status === "ERROR") {
        setstatusMachine(false);
        setMessageMachine(response.message);
        setbadgemachine([]);
        setMessageAPImachinedata("ERROR");
      } else {
        console.log("Catch");
        setstatusMachine(false);
        setMessageMachine(response.message);
        setbadgemachine([]);
        setMessageAPImachinedata("Catch");
      }
    } catch (error) {
      console.error("API Error:", error.message);
      setstatusMachine(false);
    } finally {
      setisfeatch_mcdata(false);
    }
  };

  function generateColumns(dataArray, name) {
    if (name === "Actv") {
      return [...new Set(dataArray.flatMap(Object.keys))]
        .filter((header) =>
          [
            "parameter_desc",
            "condition",
            "usl",
            "lsl",
            "target",
            "result",
            "set",
            "judgment_record",
          ].includes(header)
        )
        .map((header) => ({
          field: header,
          headerName: header,
          width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
          // renderCell: (params) => {
          //   if (header === "judgment_record") {
          //     // ทำการ render cell ในลักษณะที่ต้องการ
          //     return params.value;
          //   } else {
          //     // ทำการ render cell อื่น ๆ ตามปกติ
          //     return params.value;
          //   }
          // },
        }));
    }
    if (name === "Alm") {
      return [...new Set(dataArray.flatMap(Object.keys))].map((header) => ({
        field: header,
        headerName: header,
        width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
      }));
    }
    if (name === "Set") {
      return [...new Set(dataArray.flatMap(Object.keys))]
        .filter((header) =>
          [
            "parameter_desc",
            "condition",
            "usl",
            "lsl",
            "target",
            "result",
            "set",
            "judgment_record",
          ].includes(header)
        )
        .map((header) => ({
          field: header,
          headerName: header,
          width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
        }));
    }
    if (name === "Status") {
      return [...new Set(dataArray.flatMap(Object.keys))]
        .filter(
          (header) =>
            ![
              "server",
              "process",
              "process_id",
              "roll",
              "first_lot",
              "end_lot",
              "id",
            ].includes(header)
        )
        .map((header) => ({
          field: header,
          headerName: header,
          width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
        }));
    }
  }

  function generateBadgeData(actvData, almData, setData, statusData) {
    let datas = [];
    if (actvData && actvData.length > 0) {
      const hasFailStatus = actvData.some(
        (item) => item.judgment_record && item.judgment_record.includes("FAIL")
      );
      // fail = false
      datas.push({ name: "actv", status: !hasFailStatus });
    }
    if (almData && almData.length > 0) {
      datas.push({ name: "alm", status: true });
    }
    if (setData && setData.length > 0) {
      const hasFailStatus = setData.some(
        (item) => item.judgment_record && item.judgment_record.includes("FAIL")
      );
      datas.push({ name: "set", status: !hasFailStatus });
    }
    if (statusData && statusData.length > 0) {
      datas.push({ name: "status", status: true });
    }
    return datas;
  }

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
              <div className="flex gap-2">
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
                  datacalibration={calibration}
                  StatusDataCal={StatusDataCal}
                />
              </div>
              <div>
                <FaiAutoverifyComponents
                  title={"FAI Auto Verify"}
                  selectdatafromchip={selectdatafromchip}
                  groupfaidata_verify={groupfaidata_verify}
                  statusgroupfaidata_verify={statusgroupfaidata_verify}
                  Messagegroupfaidata_verify={Messagegroupfaidata_verify}
                  onClick={() => {
                    setselectdatafromchip("Auto Verify Select");
                  }}
                />
                <MachineData
                  title={"Machine Data"}
                  selectdatafromchip={selectdatafromchip}
                  machineData={machineData}
                  statusMachine={statusMachine}
                  MessageMachine={MessageMachine}
                  MachineActv={MachineActv}
                  columnsactvData={columnsactvData}
                  MachineAlm={MachineAlm}
                  columnsAlmData={columnsAlmData}
                  MachineSet={MachineSet}
                  columnsSetData={columnsSetData}
                  MachineStatus={MachineStatus}
                  columnsStatusData={columnsStatusData}
                  badgemachine={badgemachine}
                  MessageAPImachinedata={MessageAPImachinedata}
                  onClick={() => {
                    setselectdatafromchip("Machine Data");
                  }}
                />
              </div>
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
