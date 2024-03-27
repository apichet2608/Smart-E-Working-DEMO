import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import GetAPI from "../API/GET/GetAPI.jsx";
import PostAPI from "../API/POST/PostAPI.jsx";
//API
// import { smart_fpc_eworking } from "../API/POST/smart_fpc_eworking";
//1
import getDatalotsearch from "../API/GET/smart-fpc-lot";
//2
import getDataPM from "../API/GET/smart-pm";
//3
import getDataCal from "../API/GET/smart-cal-monthly-detail";
//4
import getDataemcs from "../API/GET/smart-emcs";
//5
import getDataVerify from "../API/GET/smart-verdify-report";
//6
// import getDataMachine from "../API/GET/smart_fpc_eworking_sacada";
//7
import getDataholdingtime from "../API/GET/smart-holding-time.jsx";
import getDataapprove from "../API/GET/smart-lq-approve.jsx";
import CheckTooling from "../API/GET/CheckTooling.jsx";
import CheckMateriale from "../API/GET/CheckMateriale.jsx";

import Stack from "@mui/material/Stack";
import BadgeComponent_Machine_PM from "../Components/ChipBadge_Components/MachinePM/BadgeComponent_Machine_PM.jsx";
import BadgeComponent_Machine_Cal from "../Components/ChipBadge_Components/MachineCal/BadgeComponent_Machine_Cal.jsx";
import BadgeComponent_Process_Condition from "../Components/BadgeComponent/ProcessCondition/BadgeComponent_Process_Condition.jsx";
import BadgeComponent_dataVerify from "../Components/BadgeComponent/FaiVerify/BadgeComponent_dataVerify.jsx";
import BadgeComponent_Machine_data from "../Components/BadgeComponent/MachineData/BadgeComponent_Machine_data.jsx";
import BadgeComponent_Machine_data_sub from "../Components/BadgeComponent/MachineData/BadgeComponent_Machine_data_sub.jsx";
import BadgeComponentsFai_Verify from "../Components/BadgeComponent/FaiVerify/BadgeComponentsFai_Verify.jsx";
import MachinePM from "../Components/BadgeSelect/DefaultChip/MachinePM/MachinePM";
import MachineCal from "../Components/BadgeSelect/DefaultChip/MachineCal/MachineCal";
import ProcessCondition from "../Components/BadgeSelect/DefaultChip/ProcessCondition/ProcessCondition";
import AutoVerify from "../Components/BadgeSelect/DefaultChip/AutoVerify/AutoVerify";
import MachineData from "../Components/BadgeSelect/MachineChip/MachineData/MachineData";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Loading from "../../../Components/common/loading/Loading-08/loading";
import BadgeComponenstApprove from "../Components/BadgeComponent/BadgeComponenstApprove.jsx";
import BadgeComponenstGR_R from "../Components/BadgeComponent/BadgeComponenstGR_R.jsx";
import Op_id_input from "../Components/Op_id_input/Op_id_input.jsx";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import TextFieldInputComponents from "../Components/TextInput/TextInput.jsx";
import BadgeComponentsTooling from "../Components/BadgeComponent/Tooling/BadgeComponentsTooling.jsx";
import BadgeComponentsMatheriale from "../Components/BadgeComponent/Matherial/BadgeComponentsMatheriale.jsx";
import Timer from "../Components/Count_Time/Count_Time.jsx";
import BadgeTooling from "../Components/BadgeComponent/Tooling/BadgeTooling.jsx";
import BadgeDataTooling from "../Components/BadgeComponent/Tooling/BadgeToolingSelect.jsx";

import BadgeEMCS from "../Components/BadgeComponent/EMCS/BadgeEMCS.jsx";
import BadgeDataEMCSselect from "../Components/BadgeComponent/EMCS/BadgeEMCSselect.jsx";

import BadgeOperation from "../Components/BadgeComponent/Operation/BadgeOperation.jsx";
import BadgeDataOperationselect from "../Components/BadgeComponent/Operation/BadgeOperationSelect.jsx";
import TimerV2 from "../Components/Timer/Timer.jsx";

import ErrorBadge from "../Components/BadgeComponent/ErrorBadge/ErrorBadge.jsx";
import NoDataBadge from "../Components/BadgeComponent/NoDataBadge/NoDataBadge.jsx";

import BadgeHoldingtime from "../Components/ChipBadge_Components/HoldingTime/HoldingTime.jsx";
import HoldingTimeTable from "../Components/BadgeSelect/DefaultChip/HoldingTime/HoldingTime.jsx";
import LQApprove from "../Components/ChipBadge_Components/LQApprove/LQApprove.jsx";
import LQApproveComponents from "../Components/BadgeSelect/DefaultChip/LQApprove/LQApprove.jsx";

function Verify() {
  //user input
  // const [mcCode, setMcCode] = useState("R2-17-13");
  // const [lot, setLot] = useState("904013599");
  // const [mcCode, setMcCode] = useState("R2-03-22");
  // const [lot, setLot] = useState("904025535");
  const [mcCode, setMcCode] = useState("R2-17-11_A");
  const [lot, setLot] = useState("994035355");
  const [IsLoading, setIsLoading] = useState(false);

  const [
    dataResponseFromLotMachineSearch,
    setdataResponseFromLotMachineSearch,
  ] = useState([]);

  //! #Detail Card
  // response_api_1
  const [dataCardmc_lot_search, setdataCardmc_lot_search] = useState([]);

  //! ##Machine PM##
  //? STATUS
  // const [statuspm, setstatuspm] = useState("");
  //? DATA
  const [pm, setpm] = useState([]); //  data
  const [statuspm_api, setstatuspm_api] = useState(""); //  statusapi
  const [Messagepm_api, setMessagepm_api] = useState(""); //  message
  const [StatusDataPM, setStatusDataPM] = useState(""); //  statusdata
  //! ##Machine Cal##
  //? STATUS
  // const [statuscalibration, setstatuscalibration] = useState("");
  // const [Messagecalibration, setMessagecalibration] = useState("");
  //? DATA
  const [calibration, setcalibration] = useState([]); //  data
  const [statuscalibration_API, setstatuscalibration_API] = useState(""); //  statusapi
  const [Messagecalibration, setMessagecalibration] = useState(""); //  message
  const [StatusDataCal, setStatusDataCal] = useState(""); //  statusdata

  //! ##Process Condition Cal##
  //? STATUS
  const [statusedoc_emcs_detail, setstatusedoc_emcs_detail] = useState("-");
  //? DATA
  const [edoc_emcs_detail, setedoc_emcs_detail] = useState([]);

  //! #Detail Card
  const [groupfaidata_verify, setgroupfaidata_verify] = useState([]);
  const [statusgroupfaidata_verify, setstatusgroupfaidata_verify] =
    useState("");
  const [Messagegroupfaidata_verify, setMessagegroupfaidata_verify] =
    useState("");
  // when click get data
  const [dataautoverify, setdataautoverify] = useState([]);

  const [MessageAPImachinedata, setMessageAPImachinedata] = useState("");
  const [machineData, setmachineData] = useState([]);
  const [statusMachine, setstatusMachine] = useState("");
  const [MessageMachine, setMessageMachine] = useState("");
  const [badgemachine, setbadgemachine] = useState([]);
  const [datamachineActv, setMachineActv] = useState([]);
  const [datamachineAlm, setMachineAlm] = useState([]);
  const [datamachineSet, setMachineSet] = useState([]);
  const [datamachineStatus, setMachineStatus] = useState([]);

  const [columnsactvData, setcolumnsactvData] = useState([]);
  const [columnsAlmData, setcolumnsAlmData] = useState([]);
  const [columnsSetData, setcolumnsSetData] = useState([]);
  const [columnsStatusData, setcolumnsStatusData] = useState([]);

  // open value when click chip
  const [selectdatafromchip, setselectdatafromchip] = useState("");
  const [selectdatafromship_mcData, setselectdatafromship_mcData] =
    useState("");

  const [toolingData, settoolingData] = useState([]); //! main

  const [dataapprove, setdataapprove] = useState();
  const [datagr_r, setdatagr_r] = useState();
  const [StatustoolingData, setStatustoolingData] = useState("");
  const [MaterialeData, setMaterialeData] = useState([]);
  const [StatusMaterialeData, setStatusMaterialeData] = useState("");
  const [apistatus, setapistatus] = useState([
    {
      api: "smart-fpc-lot",
      message: "",
      status: "",
    },
    {
      api: "smart-pm",
      message: "",
      status: "",
    },
  ]);
  const [emcsData, setemcsData] = useState([]); //! main
  const [operatorData, setoperatorData] = useState([]); //! main

  const handlesearch = async () => {
    setIsLoading(true);
    await requestApiLotSearch(); //! 1. smart-fpc-lot

    // await requestApiemcs();
  };
  const [EWK_ID, setEWK_ID] = useState("");
  useEffect(() => {
    if (dataCardmc_lot_search && dataCardmc_lot_search.length > 0) {
      const ewk_id =
        lot + "+" + mcCode + "+" + dataCardmc_lot_search[0].proc_id;
      setEWK_ID(ewk_id);
    }
  }, [dataCardmc_lot_search]);

  useEffect(() => {
    // This function will run after the first render and whenever the value of `count` changes
    const extractData = () => {
      if (dataCardmc_lot_search && dataCardmc_lot_search.length > 0) {
        const firstItem = dataCardmc_lot_search[0];
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

    const fetchDataForEDoc = async (extractedData) => {
      const response = await getDataemcs(
        extractedData.proc_id,
        extractedData.lot_prd_name,
        extractedData.lot_prd_name_split,
        extractedData.mc_code,
        extractedData.line
      );
      if (response && response.data && response.data.length !== 0) {
        setstatusedoc_emcs_detail("Active");
        setedoc_emcs_detail(response.data.detail);
      } else {
        setstatusedoc_emcs_detail("-");
      }
    };

    const fetchDataForVerification = async (extractedData) => {
      const url = `http://10.17.66.242:7010/api/ewk/smart-verdify-report/`;
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
      } else if (response_data.status === "ERROR") {
        setgroupfaidata_verify([]);
        setstatusgroupfaidata_verify("ERROR");
        setMessagegroupfaidata_verify(response_data.message);
      } else {
        setgroupfaidata_verify([]);
        setstatusgroupfaidata_verify("CATCH");
        setMessagegroupfaidata_verify(response_data.message);
      }
    };

    const checkToolingData = async (extractedData) => {
      const response = await CheckTooling(
        extractedData.proc_grp_name,
        extractedData.scan_job_id
      );
      if (response && response.data.length !== 0) {
        const modifiedData = response.data.map((item) => ({
          ...item,
          scan_job_id: extractedData.scan_job_id,
          qr_code_input: "",
          verify_status: "",
        }));
        settoolingData(modifiedData);
        setStatustoolingData(response.toolingStatus);
      } else {
        settoolingData([]);
        setStatustoolingData(response.toolingStatus);
      }
    };

    const checkMaterialeData = async (extractedData) => {
      const response = await CheckMateriale(
        extractedData.proc_grp_name,
        extractedData.scan_job_id
      );
      if (response && response.data.length !== 0) {
        setMaterialeData(response.data);
        setStatusMaterialeData(response.materialeStatus);
      } else {
        setMaterialeData([]);
        setStatusMaterialeData(response.materialeStatus);
      }
    };

    const featchtoolData = async (extractedData) => {
      console.log(extractedData);
      const data = {
        proc_id: extractedData.proc_id,
        lot: lot,
        mc_code: mcCode,
      };
      console.log(data);
      const url = `http://10.17.66.242:7010/api/ewk/smart-tool-type-tool/`;
      const response = await PostAPI(data, url);
      console.log(response);
      if (response.status === "OK") {
        console.log(response.data.data);
        settoolingData(response.data.data);
        //
      } else if (response.status === "ERROR") {
        //
      } else {
        //
      }
    };
    const featchemcsData = async (extractedData) => {
      console.log(extractedData);
      const data = {
        proc_id: extractedData.proc_id,
        lot: lot,
        mc_code: mcCode,
      };
      const url = `http://10.17.66.242:7010/api/ewk/smart-tool-type-emcs/`;
      const response = await PostAPI(data, url);
      console.log(response);
      if (response.status === "OK") {
        console.log(response.data.data);
        setemcsData([response.data.data]);
        //
      } else if (response.status === "ERROR") {
        //
      } else {
        //
      }
    };

    const featchoperatorData = async (extractedData) => {
      console.log(extractedData);
      const data = {
        proc_id: extractedData.proc_id,
        lot: lot,
        mc_code: mcCode,
      };
      const url = `http://10.17.66.242:7010/api/ewk/smart-tool-type-operator/`;
      const response = await PostAPI(data, url);
      console.log(response);
      if (response.status === "OK") {
        console.log(response.data.data);
        setoperatorData([response.data.data]);
        //
      } else if (response.status === "ERROR") {
        //
      } else {
        //
      }
    };

    const fetchData = async () => {
      const extractedData = extractData();
      if (extractedData) {
        await requestApi_PM(); //! 2.smart-pm
        await requestApi_Cal_monthly_detail(); //! 3.smart-cal-monthly-detail
        // await fetchDataForEDoc(extractedData); //! 4.smart-emcs
        await fetchDataForVerification(extractedData); //! 5.smart-verdify-report
        await requestholdingtime(); //! 6.smart-holding-time
        await requestApprove(extractedData); //! 7. smart-lq-approve
        await fetchStatusMachine(); //! 8.smart-fpc-scada-realtime-center
        // await checkToolingData(extractedData);
        // await checkMaterialeData(extractedData);
        await featchtoolData(extractedData); //! 9. smart-tool-type-tool
        await featchemcsData(extractedData); //! 10. smart-tool-type-emcs
        await featchoperatorData(extractedData); //! 11 smart-tool-type-operator
        setIsLoading(false);
      }
    };

    fetchData();
  }, [EWK_ID]); // Only re-run the effect if `count` changes

  //? 1.smart-fpc-lot
  const requestApiLotSearch = async () => {
    const params = {
      lot: lot,
      is_roll: false,
    };
    const url = `http://10.17.66.242:7010/api/ewk/smart-fpc-lot/`;
    try {
      const response_data = await GetAPI(params, url);
      if (response_data.status === "OK") {
        setdataCardmc_lot_search([response_data.data.data]);
        setdataResponseFromLotMachineSearch([response_data.data.data]);
      } else if (response_data.status === "ERROR") {
        alert("API ERROR");
        setIsLoading(false);
        setdataCardmc_lot_search([]);
        setdataResponseFromLotMachineSearch([]);
      } else {
        console.log("Catch");
        alert("SERVER CATCH");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //#region
  //? 2 smart-pm
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
      } else if (response_data.status === "ERROR") {
        setpm([]);
        setstatuspm_api("ERROR");
        setMessagepm_api(response_data.message);
      } else {
        console.log("Catch");
        setstatuspm_api("Catch");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //#endregion

  //? 3 smart-cal-monthly-detail
  // function checkForInactive_MachineCal(responseData) {
  //   // ตรวจสอบว่า responseData.data.data มีค่า
  //   if (responseData.data && responseData.data.data.length > 0) {
  //     // วนลูปเช็คทุกข้อมูลใน responseData.data.data
  //     for (const item of responseData.data.data) {
  //       // แปลงข้อความเป็นพิมพ์เล็กก่อนที่จะเช็ค
  //       const statusFilterLower = item.status_filter.toLowerCase();

  //       // เช็คว่ามี key "statusFilter" และมีค่าเป็น "lock", "locks" หรือ "inactive" หรือไม่
  //       if (
  //         statusFilterLower === "lock" ||
  //         statusFilterLower === "locks" ||
  //         statusFilterLower === "inactive"
  //       ) {
  //         // ถ้าเป็นเงื่อนไขดังกล่าวให้ส่ง "In Active" ออกไป
  //         return "In Active";
  //       }
  //     }
  //   }
  //   // หากไม่พบเงื่อนไขที่ต้องการให้คืนค่าเป็น null หรืออย่างอื่นตามที่คุณต้องการ
  //   return "Active";
  // }

  //#region
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
        } else {
          setcalibration([]);
          setstatuscalibration_API("OK");
          setMessagecalibration(response_data.message);
          setStatusDataCal(response_data.data.ewk_judge);
        }
      } else if (response_data.status === "ERROR") {
        setcalibration([]);
        setstatuscalibration_API("ERROR");
        setMessagecalibration(response_data.message);
        setStatusDataCal(response_data.data.ewk_judge);
      } else {
        setcalibration([]);
        setstatuscalibration_API("Catch");
        setMessagecalibration(response_data.message);
        setStatusDataCal(response_data.data.ewk_judge);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //#endregion

  const [holdingTimeData, setHoldingTimeData] = useState([]);
  const [holdingTimeStatus, setHoldingTimeStatus] = useState([]);
  const [holdingTimeApiStatus, setHoldingTimeApiStatus] = useState([]);
  const [holdingTimeMessage, setHoldingTimeMessage] = useState([]);

  const requestholdingtime = async () => {
    const data = { lot: lot, ewk_id: EWK_ID, ewk_item: "holding time" };
    const url = `http://10.17.66.242:7010/api/ewk/smart-holding-time/`;
    try {
      console.log("Done");
      const response_data = await PostAPI(data, url);
      console.log(response_data.data);
      if (response_data.status === "OK") {
        setHoldingTimeData(response_data.data.data);
        setHoldingTimeApiStatus(response_data.status);
        setHoldingTimeMessage(response_data.message);
      } else if (response_data.status === "ERROR") {
        setHoldingTimeData([]);
        setHoldingTimeApiStatus(response_data.status);
        setHoldingTimeMessage(response_data.message);
      } else {
        setHoldingTimeData([]);
        setHoldingTimeApiStatus(response_data.status);
        setHoldingTimeMessage(response_data.message);
      }
      //response.data default
    } catch (error) {
      console.error(error);
    }
  };

  const [LQApproveData, setLQApproveData] = useState([]);
  const [LQApproveStatus, setLQApproveStatus] = useState([]);
  const [LQApproveApiStatus, setLQApproveApiStatus] = useState([]);
  const [LQApproveMessage, setLQApproveMessage] = useState([]);

  const requestApprove = async (extractedData) => {
    // try {
    //   console.log("Done");
    //   const response_data = await getDataapprove(lot, mcCode, mcCode);
    //   //response.data default
    //   console.log(response_data.data);

    //   if (Object.keys(response_data.data.machine_upd).length === 0) {
    //     setdataapprove(null);
    //   } else {
    //     setdataapprove(response_data.data.machine_upd);
    //   }
    //   if (Object.keys(response_data.data.status).length === 0) {
    //     setdatagr_r(null);
    //   } else {
    //     setdatagr_r(response_data.data.status);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    const data = {
      // lot: lot,
      mc_code: mcCode,
      dld_product: extractedData.lot_prd_name,
      dld_machine: mcCode,
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
        setLQApproveApiStatus(response_data.status);
        setLQApproveMessage(response_data.message);
      } else if (response_data.status === "ERROR") {
        setLQApproveData([]);
        setLQApproveApiStatus(response_data.status);
        setLQApproveMessage(response_data.message);
      } else {
        setLQApproveData([]);
        setLQApproveApiStatus(response_data.status);
        setLQApproveMessage(response_data.message);
      }
      //response.data default
    } catch (error) {
      console.error(error);
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
    const url = `http://10.17.66.242:7010/api/ewk/smart-fpc-scada-realtime-center/`;
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
  //? 6 smart-fpc-scada-realtime-center

  // ยกเลิกใช้
  // const getDataVerifyTableFromExpress = async (
  //   jwpv_job_type,
  //   jwpv_mc_code,
  //   proc_grp_name
  // ) => {
  //   const params = {
  //     jwpv_job_type: jwpv_job_type,
  //     jwpv_mc_code: jwpv_mc_code,
  //     proc_grp_name: proc_grp_name,
  //   };

  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: `${import.meta.env.VITE_IP_API}${
  //       import.meta.env.VITE_smart_jv_parameter_calling
  //     }/getdataVerify`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     params: params, // เพิ่ม params เข้าไปใน config
  //   };

  //   try {
  //     const response = await axios.request(config); // ใช้ config ที่กำหนดไว้

  //     if (response.status === 200) {
  //       console.log(response);
  //       console.log(response.data);
  //       setdataautoverify(response.data);
  //       setselectdatafromchip("Auto Verify");
  //     }
  //     // setdataautoverify(response.data);
  //   } catch (error) {
  //     console.error("API Error:", error.message);
  //   }
  // };

  return (
    <div className="gap-6 grid">
      {/* {dataapprove.dld_machine} */}
      <div className="container mx-auto my-1 w-full">
        <div className="flex justify-between">
          <p className=" text-nowarp">Working Verify</p>
        </div>
        <div className="flex gap-1  justify-between w-full">
          <TextFieldInputComponents
            placeholders={"mc code"}
            values={mcCode}
            onChanges={(e) => setMcCode(e.target.value.toUpperCase())}
          />
          <TextFieldInputComponents
            placeholders={"lot"}
            values={lot}
            onChanges={(e) => setLot(e.target.value)}
          />
          <TimerV2 />
          {/* <div className="w-full"> */}
          {/* <Op_id_input /> */}
          {/* </div> */}
        </div>
        <div className="container mx-auto pt-0.5 ">
          {dataCardmc_lot_search && dataCardmc_lot_search.length > 0 ? (
            <div className="lg:flex lg:gap-2 lg:justify-start md:grid md:grid-cols-2 md:gap-2">
              {dataCardmc_lot_search.map((item) => (
                <div
                  key={item.id}
                  className=" w-full bg-base-100 shadow-xl Paper_Contents flex gap-2"
                >
                  <div>
                    <p className="font-bold text-nowrap">{item.lot_prd_name}</p>
                    <p className="text-nowrap">Product Name</p>
                  </div>
                  <div className="">{/* <Inventory2Icon /> */}</div>
                </div>
              ))}
              {dataCardmc_lot_search.map((item) => (
                <div
                  key={item.id}
                  className="card w-full bg-base-100 shadow-xl Paper_Contents p-0.5"
                >
                  <p className=" font-bold text-nowrap">{item.lot}</p>
                  <p className="text-nowrap">Lot</p>
                </div>
              ))}
              {dataCardmc_lot_search.map((item) => (
                <div
                  key={item.id}
                  className="card w-full bg-base-100 shadow-xl Paper_Contents"
                >
                  <p className=" font-bold text-nowrap">{item.input_qty}</p>
                  <p className="text-nowrap">QTY</p>
                </div>
              ))}
              {dataCardmc_lot_search.map((item) => (
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
        {/* <div>
          <TimerV2 />
        </div> */}
        <div>
          <button
            className="bg-slate-200 rounded-2xl text-black hover:bg-slate-400 Button_Search"
            onClick={() => handlesearch()}
          >
            <ManageSearchIcon />
          </button>
          {!IsLoading && operatorData && operatorData.length ? (
            <div className="pt-0.5">
              <BadgeOperation
                data={operatorData}
                onClick={() => setselectdatafromchip("Operation")}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        {IsLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            {/* <div className="container mx-auto pt-4 ">
              {dataCardmc_lot_search && dataCardmc_lot_search.length > 0 ? (
                <div className="flex gap-2 justify-start">
                  {dataCardmc_lot_search.map((item) => (
                    <div
                      key={item.id}
                      className="card w-96 bg-base-100 shadow-xl Paper_Contents"
                    >
                      <h3>Product : {item.lot_prd_name}</h3>
                    </div>
                  ))}
                  {dataCardmc_lot_search.map((item) => (
                    <div
                      key={item.id}
                      className="card w-96 bg-base-100 shadow-xl Paper_Contents"
                    >
                      <p>Lot: {item.lot}</p>
                    </div>
                  ))}
                  {dataCardmc_lot_search.map((item) => (
                    <div
                      key={item.id}
                      className="card w-96 bg-base-100 shadow-xl Paper_Contents"
                    >
                      <p>Input Qty: {item.input_qty}</p>
                    </div>
                  ))}
                  {dataCardmc_lot_search.map((item) => (
                    <div
                      key={item.id}
                      className="card w-96 bg-base-100 shadow-xl Paper_Contents"
                    >
                      <p>Proc Grp : {item.proc_grp_name}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div> */}
            <div className="container mx-auto pt-4 ">
              {/* {statuscalibration_API} */}
              {dataResponseFromLotMachineSearch &&
                dataResponseFromLotMachineSearch.length > 0 && (
                  <Stack
                    direction="row"
                    spacing={2}
                    useFlexGap
                    flexWrap="wrap"
                    // className="animate__animated animate__fadeIn"
                    className="mt-8"
                  >
                    {statuspm_api === "CATCH" || statuspm_api === "ERROR" ? (
                      <>
                        <ErrorBadge
                          title={"Machine PM"}
                          message={Messagepm_api}
                        />
                      </>
                    ) : (
                      <>
                        {pm && pm.length > 0 ? (
                          <BadgeComponent_Machine_PM
                            data={pm}
                            StatusData={StatusDataPM}
                            onClick={() => {
                              setselectdatafromchip("Machine PM");
                            }}
                            selectdatafromchip={selectdatafromchip}
                          />
                        ) : (
                          // <ErrorBadge title={"Machine PM"} />
                          <>
                            <NoDataBadge
                              title={"Machine PM"}
                              message={Messagepm_api}
                            />
                          </>
                        )}
                      </>
                    )}
                    {/* {pm && pm.length > 0 && (
                      <BadgeComponent_Machine_PM
                        data={pm}
                        // statuspm={statuspm}
                        onClick={() => {
                          setselectdatafromchip("Machine PM");
                        }}
                        selectdatafromchip={selectdatafromchip}
                      />
                      // <ErrorBadge title={"Machine PM"} />
                    )} */}
                    {statuscalibration_API === "CATCH" ||
                    statuscalibration_API === "ERROR" ? (
                      <>
                        <ErrorBadge
                          title={"Machine Cal"}
                          message={Messagecalibration}
                        />
                      </>
                    ) : (
                      <>
                        {calibration && calibration.length > 0 ? (
                          <BadgeComponent_Machine_Cal
                            data={calibration}
                            StatusData={StatusDataCal}
                            onClick={() => {
                              setselectdatafromchip("Machine Cal");
                            }}
                            selectdatafromchip={selectdatafromchip}
                          />
                        ) : (
                          // <ErrorBadge title={"Machine PM"} />
                          <>
                            <NoDataBadge
                              title={"Machine Cal"}
                              message={Messagecalibration}
                            />
                          </>
                        )}
                      </>
                    )}
                    {/* <BadgeComponent_Process_Condition
                      statusedoc_emcs_detail={statusedoc_emcs_detail}
                      onClick={() => {
                        setselectdatafromchip("Process Condition");
                        //   setselectdatafromchipmachinedata("");
                      }}
                    /> */}
                    {statusgroupfaidata_verify === "CATCH" ||
                    statusgroupfaidata_verify === "ERROR" ? (
                      <>
                        <ErrorBadge
                          title={"Fai Verify"}
                          message={Messagegroupfaidata_verify}
                        />
                      </>
                    ) : (
                      <>
                        {groupfaidata_verify &&
                        groupfaidata_verify.length > 0 ? (
                          <BadgeComponentsFai_Verify
                            groupfaidata_verify={groupfaidata_verify}
                            onClick={() => {
                              setselectdatafromchip("Auto Verify Select");
                            }}
                            selectdatafromchip={selectdatafromchip}
                            Message={Messagegroupfaidata_verify}
                          />
                        ) : (
                          // <ErrorBadge title={"Machine PM"} />
                          <>
                            <NoDataBadge
                              title={"Fai Verify"}
                              message={Messagegroupfaidata_verify}
                            />
                          </>
                        )}
                      </>
                    )}
                    {/* {groupfaidata_verify && groupfaidata_verify.length ? (
                      <>
                        <BadgeComponentsFai_Verify
                          groupfaidata_verify={groupfaidata_verify}
                          onClick={() => {
                            setselectdatafromchip("Auto Verify Select");
                          }}
                          nodata={false}
                        />
                      </>
                    ) : (
                      <BadgeComponentsFai_Verify
                        groupfaidata_verify={[]}
                        onClick={() => {
                          setselectdatafromchip("");
                        }}
                        nodata={true}
                      />
                    )} */}
                    {MessageAPImachinedata === "CATCH" ||
                    MessageAPImachinedata === "ERROR" ? (
                      <>
                        <ErrorBadge
                          title={"Machine Data"}
                          message={MessageMachine}
                        />
                      </>
                    ) : (
                      <>
                        {machineData && machineData.length > 0 ? (
                          <BadgeComponent_Machine_data
                            machineData={machineData}
                            statusMachine={statusMachine}
                            label={"Machine Data"}
                            // onClick={
                            //   (() => fetchStatusMachine(),
                            //   setselectdatafromchip("Machine Data"))
                            // }
                            onClick={() => {
                              fetchStatusMachine();
                              setselectdatafromchip("Machine Data");
                            }}
                          />
                        ) : (
                          // <ErrorBadge title={"Machine PM"} />
                          <>
                            <NoDataBadge
                              title={"Machine Data"}
                              message={MessageMachine}
                            />
                          </>
                        )}
                      </>
                    )}
                    {/* {selectdatafromchip} */}
                    {holdingTimeApiStatus === "CATCH" ||
                    holdingTimeApiStatus === "ERROR" ? (
                      <>
                        <ErrorBadge
                          title={"Holding Time"}
                          message={holdingTimeMessage}
                        />
                      </>
                    ) : (
                      <>
                        {holdingTimeData && holdingTimeData.length > 0 ? (
                          <>
                            <BadgeHoldingtime
                              // data={holdingTimeData}
                              status={holdingTimeStatus}
                              message={holdingTimeMessage}
                              onClick={() => {
                                setselectdatafromchip("Holding Time");
                              }}
                            />
                          </>
                        ) : (
                          // <ErrorBadge title={"Machine PM"} />
                          <>
                            <NoDataBadge
                              title={"Holding Time"}
                              message={holdingTimeMessage}
                            />
                          </>
                        )}
                      </>
                    )}
                    {LQApproveApiStatus === "CATCH" ||
                    LQApproveApiStatus === "ERROR" ? (
                      <>
                        <ErrorBadge
                          title={"LQ Approve"}
                          message={LQApproveMessage}
                        />
                      </>
                    ) : (
                      <>
                        {LQApproveData && LQApproveData.length > 0 ? (
                          <>
                            {LQApproveData.map((item, index) => {
                              return (
                                <React.Fragment key={index}>
                                  {/* Your JSX code here */}
                                  <LQApprove
                                    // data={holdingTimeData}
                                    title={item.title.toUpperCase()}
                                    status={item.ewk_judge}
                                    data={item.data}
                                    // message={LQApproveMessage}
                                    onClick={() => {
                                      setselectdatafromchip(item.title);
                                    }}
                                  />
                                </React.Fragment>
                              );
                            })}
                          </>
                        ) : (
                          // <ErrorBadge title={"Machine PM"} />
                          <>
                            <NoDataBadge
                              title={"LQ Approve"}
                              message={LQApproveMessage}
                            />
                          </>
                        )}
                      </>
                    )}
                    {/* {dataapprove ? (
                      <>
                        <BadgeComponenstApprove
                          label={"LQ Approve"}
                          data={dataapprove}
                          onClick={() => setselectdatafromchip("LQ Approve")}
                        />
                      </>
                    ) : null} */}
                    {/* {datagr_r ? (
                      <>
                        <BadgeComponenstGR_R
                          label={""}
                          data={datagr_r}
                          onClick={() => setselectdatafromchip("GR R")}
                        />
                      </>
                    ) : null} */}
                    {/* <BadgeComponentsTooling
                      status={StatustoolingData}
                      datas={toolingData}
                    />
                    <BadgeComponentsMatheriale
                      status={StatusMaterialeData}
                      datas={MaterialeData}
                    /> */}
                    {toolingData && toolingData.length ? (
                      <>
                        <BadgeTooling
                          data={toolingData}
                          onClick={() => setselectdatafromchip("Tooling")}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    {emcsData && emcsData.length ? (
                      <>
                        <BadgeEMCS
                          data={emcsData}
                          onClick={() => setselectdatafromchip("EMCS")}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    <Chip label={"Manual Input"} />
                    {/* {operatorData && operatorData.length ? (
                      <>
                        <BadgeOperation
                          data={operatorData}
                          onClick={() => setselectdatafromchip("Operation")}
                        />
                      </>
                    ) : (
                      <></>
                    )} */}
                  </Stack>
                )}
            </div>
            <div className="container mx-auto mt-6">
              {selectdatafromchip === "Machine PM" && <MachinePM data={pm} />}
              {selectdatafromchip === "Machine Cal" && (
                <MachineCal data={calibration} />
              )}
              {/* {selectdatafromchip === "Process Condition" && (
                <ProcessCondition data={edoc_emcs_detail} />
              )} */}
              {selectdatafromchip === "Auto Verify Select" && (
                <>
                  {groupfaidata_verify.map((item, index) => (
                    <BadgeComponent_dataVerify
                      key={index} // Assuming `item.jwpv_job_type` + `item.jwpv_mc_code` combination is unique, you might use `${item.jwpv_job_type}-${item.jwpv_mc_code}` as a key instead of the index if preferred.
                      statusautoverify={item.jwpv_param_tvalue}
                      itemlabel={item.jwpv_job_type}
                      onClick={() => {
                        // getDataVerifyTableFromExpress(
                        //   item.jwpv_job_type,
                        //   item.jwpv_mc_code,
                        //   dataCardmc_lot_search[0].proc_grp_name
                        // );
                        // setselectdatafromchip(item.jwpv_job_type);
                        setdataautoverify(item.data);
                        // setselectdatafromchip("Auto Verify");
                      }}
                    />
                  ))}
                  <AutoVerify data={dataautoverify} />
                </>
              )}
              <div className="bg-blue-100 w-fit rounded-xl p-2">
                (leader approve) : user id check all data if p-all show button
                starttime
              </div>
              {selectdatafromchip === "Machine Data" && (
                <>
                  {isfeatch_mcdata ? (
                    <Loading />
                  ) : (
                    <>
                      <div>
                        {badgemachine.map((item, index) => (
                          <BadgeComponent_Machine_data_sub
                            key={index}
                            status={item.status}
                            label={item.name}
                            onClick={() =>
                              setselectdatafromship_mcData(item.name)
                            }
                            selectvalue={selectdatafromship_mcData}
                          />
                        ))}
                      </div>
                      <div>
                        <MachineData
                          selectdatafromship_mcData={selectdatafromship_mcData}
                          datamachineActv={datamachineActv}
                          datamachineAlm={datamachineAlm}
                          datamachineSet={datamachineSet}
                          datamachineStatus={datamachineStatus}
                          columnsactvData={columnsactvData}
                          columnsAlmData={columnsAlmData}
                          columnsSetData={columnsSetData}
                          columnsStatusData={columnsStatusData}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              {selectdatafromchip === "Tooling" && (
                <BadgeDataTooling data={toolingData} EWK_ID={EWK_ID} />
              )}
              {selectdatafromchip === "EMCS" && (
                <BadgeDataEMCSselect data={emcsData} EWK_ID={EWK_ID} />
              )}
              {selectdatafromchip === "Operation" && (
                <BadgeDataOperationselect data={operatorData} EWK_ID={EWK_ID} />
              )}
              {selectdatafromchip === "Holding Time" && (
                <HoldingTimeTable data={holdingTimeData} />
              )}
              {selectdatafromchip === "lq approve" && (
                <>
                  {LQApproveData.map((item, index) => {
                    if (item.title === "lq approve") {
                      return (
                        <React.Fragment key={index}>
                          <LQApproveComponents data={item.data} />
                        </React.Fragment>
                      );
                    }
                    return null; // Skip rendering if status doesn't match
                  })}
                </>
              )}
              {selectdatafromchip === "gr&r" && (
                <>
                  {LQApproveData.map((item, index) => {
                    if (item.title === "gr&r") {
                      return (
                        <React.Fragment key={index}>
                          <LQApproveComponents data={item.data} />
                        </React.Fragment>
                      );
                    }
                    return null; // Skip rendering if status doesn't match
                  })}
                </>
              )}

              {/* {selectdatafromchip === "gr&r" && (
                // <LQApproveComponents data={LQApproveData} />
                <>gr&r</>
              )} */}
              {selectdatafromchip === "GR R" && "GR R"}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Verify;
