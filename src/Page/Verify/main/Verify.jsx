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
import BadgeComponent_Machine_PM from "../Components/BadgeComponent/MachinePM/BadgeComponent_Machine_PM.jsx";
import BadgeComponent_Machine_Cal from "../Components/BadgeComponent/MachineCal/BadgeComponent_Machine_Cal.jsx";
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
function Verify() {
  //user input
  // const [mcCode, setMcCode] = useState("R2-17-13");
  // const [lot, setLot] = useState("904013599");
  // const [mcCode, setMcCode] = useState("R2-03-22");
  // const [lot, setLot] = useState("904025535");
  const [mcCode, setMcCode] = useState("R2-07-11");
  const [lot, setLot] = useState("904025152");
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
  const [pm, setpm] = useState([]);

  //! ##Machine Cal##
  //? STATUS
  const [statuscalibration, setstatuscalibration] = useState("");
  //? DATA
  const [calibration, setcalibration] = useState([]);

  //! ##Process Condition Cal##
  //? STATUS
  const [statusedoc_emcs_detail, setstatusedoc_emcs_detail] = useState("-");
  //? DATA
  const [edoc_emcs_detail, setedoc_emcs_detail] = useState([]);

  //! #Detail Card
  const [groupfaidata_verify, setgroupfaidata_verify] = useState([]);
  // when click get data
  const [dataautoverify, setdataautoverify] = useState([]);

  const [statusMachine, setstatusMachine] = useState("");
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

  useEffect(() => {
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
      const response = await getDataVerify(
        extractedData.mc_code,
        extractedData.proc_grp_name
      );
      if (response && response.data) {
        setgroupfaidata_verify(response.data.fai_verify_report);
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
      };
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
        await requestApprove(); //! 7. smart-lq-approve
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
  }, [dataCardmc_lot_search, mcCode]);

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
        setdataCardmc_lot_search([]);
        setdataResponseFromLotMachineSearch([]);
      } else {
        console.log("Catch");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //? 2 smart-pm
  const requestApi_PM = async () => {
    const params = { mc_code: mcCode };
    const url = `http://10.17.66.242:7010/api/ewk/smart-pm/`;
    try {
      const response_data = await GetAPI(params, url);
      //response.data default

      if (response_data.status === "OK") {
        setpm(response_data.data.data);
      } else if (response_data.status === "ERROR") {
        setpm([]);
      } else {
        console.log("Catch");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //? 3 smart-cal-monthly-detail
  const requestApi_Cal_monthly_detail = async () => {
    const params = { mc_code: mcCode };
    const url = `http://10.17.66.242:7010/api/ewk/smart-cal-monthly-detail/`;
    try {
      const response_data = await GetAPI(params, url);
      if (response_data.status === "OK") {
        if (response_data.data && response_data.data.data.length > 0) {
          // Check if response_data and response_data.data are not null or undefined
          setcalibration(response_data.data.data);
          const calibrationisAllLocked = response_data.data.data.every(
            (item) => {
              const statusFilter = item.status_filter?.toLowerCase(); // Convert to lowercase here
              console.log(statusFilter);
              return (
                statusFilter === "lock" ||
                statusFilter === "locks" ||
                statusFilter === "inactive"
              );
            }
          );

          // กรณีที่ชุดข้อมุลมี lock||locks||inactive === false
          if (!calibrationisAllLocked) {
            setstatuscalibration("In Active"); //lock
          } else {
            setstatuscalibration("Active"); //active
          }
        } else {
          console.log("Response or response data is null or undefined");
          setcalibration([]);
          setstatuscalibration("-");
        }
      } else if (response_data.status === "ERROR") {
        console.log("Response or response data is null or undefined");
        setcalibration([]);
        setstatuscalibration("-");
      } else {
        console.log("Catch");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const requestholdingtime = async () => {
    try {
      console.log("Done");
      const response_data = await getDataholdingtime(lot);
      //response.data default
      console.log(response_data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const requestApprove = async () => {
    try {
      console.log("Done");
      const response_data = await getDataapprove(lot, mcCode, mcCode);
      //response.data default
      console.log(response_data.data);

      if (Object.keys(response_data.data.machine_upd).length === 0) {
        setdataapprove(null);
      } else {
        setdataapprove(response_data.data.machine_upd);
      }
      if (Object.keys(response_data.data.status).length === 0) {
        setdatagr_r(null);
      } else {
        setdatagr_r(response_data.data.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //? 6 smart-fpc-scada-realtime-center
  const [isfeatch_mcdata, setisfeatch_mcdata] = useState(false);
  const fetchStatusMachine = async () => {
    setselectdatafromship_mcData("");
    setisfeatch_mcdata(true);
    const inputString = mcCode; // ตรวจสอบให้แน่ใจว่า mcCode ถูกกำหนดค่าไว้อย่างถูกต้อง
    const requestData = {
      mc_code: inputString,
    };
    console.log(requestData.mc_code);
    const params = { mc_code: inputString };
    const url = `http://10.17.66.242:7010/api/ewk/smart-fpc-scada-realtime-center/`;
    try {
      const response = await GetAPI(params, url);

      console.log(response.data.data);
      const data = response.data.data;
      // console.log(data.actv[0].judgment_record);

      if (response.status === "OK") {
        const allNullTableNames = Object.keys(data).every((key) => {
          const tableName = data[key].table_name;
          return tableName === null;
        });

        if (response.data.judgment_machine === "PASS") {
          setstatusMachine(true); // No Data
        } else {
          setstatusMachine(false); // Active
        }

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
      } else if (response.status === "ERROR") {
        const allNullTableNames = Object.keys(data).every((key) => {
          const tableName = data[key].table_name;
          return tableName === null;
        });

        if (response.data.judgment_machine === "PASS") {
          setstatusMachine(true); // No Data
        } else {
          setstatusMachine(false); // Active
        }

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
      } else {
        console.log("Catch");
        setstatusMachine("No Data");
      }
    } catch (error) {
      console.error("API Error:", error.message);
      setstatusMachine("No Data");
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
  const getDataVerifyTableFromExpress = async (
    jwpv_job_type,
    jwpv_mc_code,
    proc_grp_name
  ) => {
    const params = {
      jwpv_job_type: jwpv_job_type,
      jwpv_mc_code: jwpv_mc_code,
      proc_grp_name: proc_grp_name,
    };

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_IP_API}${
        import.meta.env.VITE_smart_jv_parameter_calling
      }/getdataVerify`,
      headers: {
        "Content-Type": "application/json",
      },
      params: params, // เพิ่ม params เข้าไปใน config
    };

    try {
      const response = await axios.request(config); // ใช้ config ที่กำหนดไว้

      if (response.status === 200) {
        console.log(response);
        console.log(response.data);
        setdataautoverify(response.data);
        setselectdatafromchip("Auto Verify");
      }
      // setdataautoverify(response.data);
    } catch (error) {
      console.error("API Error:", error.message);
    }
  };

  return (
    <div className="gap-6 grid">
      {/* {dataapprove.dld_machine} */}
      <div className="container mx-auto my-1 w-full">
        <div className="flex justify-between">
          <div>Working Verify</div>
        </div>
        <div className="flex gap-1  justify-between w-full">
          <TextFieldInputComponents
            placeholders={"mc code R2-17-14"}
            values={mcCode}
            onChanges={(e) => setMcCode(e.target.value.toUpperCase())}
          />
          <TextFieldInputComponents
            placeholders={"lot"}
            values={lot}
            onChanges={(e) => setLot(e.target.value)}
          />
          {/* <div className="w-full"> */}
          {/* <Op_id_input /> */}
          <TimerV2 />
          {/* </div> */}
        </div>
        <div>
          <button
            className="bg-slate-200 rounded-2xl text-black hover:bg-slate-400 Button_Search"
            onClick={() => handlesearch()}
          >
            <ManageSearchIcon />
          </button>
        </div>
        {IsLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="container mx-auto pt-4 ">
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
            </div>
            <div className="container mx-auto pt-4 ">
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
                    {pm && pm.length > 0 && (
                      <BadgeComponent_Machine_PM
                        data={pm}
                        // statuspm={statuspm}
                        onClick={() => {
                          setselectdatafromchip("Machine PM");
                        }}
                        selectdatafromchip={selectdatafromchip}
                      />
                    )}

                    {calibration && calibration.length > 0 && (
                      <BadgeComponent_Machine_Cal
                        // status={statuscalibration}
                        data={calibration}
                        onClick={() => {
                          setselectdatafromchip("Machine Cal");
                        }}
                        selectdatafromchip={selectdatafromchip}
                      />
                    )}

                    {/* <BadgeComponent_Process_Condition
                      statusedoc_emcs_detail={statusedoc_emcs_detail}
                      onClick={() => {
                        setselectdatafromchip("Process Condition");
                        //   setselectdatafromchipmachinedata("");
                      }}
                    /> */}

                    {groupfaidata_verify && groupfaidata_verify.length ? (
                      <>
                        <BadgeComponentsFai_Verify
                          groupfaidata_verify={groupfaidata_verify}
                          onClick={() => {
                            setselectdatafromchip("Auto Verify Select");
                          }}
                        />
                      </>
                    ) : (
                      <BadgeComponentsFai_Verify
                        groupfaidata_verify={[]}
                        onClick={() => {
                          setselectdatafromchip("");
                        }}
                      />
                    )}

                    <BadgeComponent_Machine_data
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

                    {dataapprove ? (
                      <>
                        <BadgeComponenstApprove
                          label={"LQ Approve"}
                          data={dataapprove}
                          onClick={() => setselectdatafromchip("LQ Approve")}
                        />
                      </>
                    ) : null}
                    {datagr_r ? (
                      <>
                        <BadgeComponenstGR_R
                          label={""}
                          data={datagr_r}
                          onClick={() => setselectdatafromchip("GR R")}
                        />
                      </>
                    ) : null}
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
                    {operatorData && operatorData.length ? (
                      <>
                        <BadgeOperation
                          data={operatorData}
                          onClick={() => setselectdatafromchip("Operation")}
                        />
                      </>
                    ) : (
                      <></>
                    )}
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
                <BadgeDataTooling data={toolingData} />
              )}
              {selectdatafromchip === "EMCS" && (
                <BadgeDataEMCSselect data={emcsData} />
              )}
              {selectdatafromchip === "Operation" && (
                <BadgeDataOperationselect data={operatorData} />
              )}
              {selectdatafromchip === "LQ Approve" && "LQ Approve"}
              {selectdatafromchip === "GR R" && "GR R"}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Verify;
