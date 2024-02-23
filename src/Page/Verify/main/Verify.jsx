import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

//API
import { smart_fpc_eworking } from "../API/POST/smart_fpc_eworking";
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
import Stack from "@mui/material/Stack";
import BadgeComponent_Machine_PM from "../Components/BadgeComponent/BadgeComponent_Machine_PM";
import BadgeComponent_Machine_Cal from "../Components/BadgeComponent/BadgeComponent_Machine_Cal";
import BadgeComponent_Process_Condition from "../Components/BadgeComponent/BadgeComponent_Process_Condition";
import BadgeComponent_dataVerify from "../Components/BadgeComponent/BadgeComponent_dataVerify";
import BadgeComponent_Machine_data from "../Components/BadgeComponent/BadgeComponent_Machine_data";
import BadgeComponent_Machine_data_sub from "../Components/BadgeComponent/BadgeComponent_Machine_data_sub";
import NoDataBadgeWithChip from "../Components/BadgeComponent/NoDataBadgeWithChip";
import MachinePM from "../Components/BadgeSelect/DefaultChip/MachinePM/MachinePM";
import MachineCal from "../Components/BadgeSelect/DefaultChip/MachineCal/MachineCal";
import ProcessCondition from "../Components/BadgeSelect/DefaultChip/ProcessCondition/ProcessCondition";
import AutoVerify from "../Components/BadgeSelect/DefaultChip/AutoVerify/AutoVerify";
import MachineData from "../Components/BadgeSelect/MachineChip/MachineData/MachineData";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Loading from "../../../Components/common/loading/Loading-11/loading";

function Verify() {
  //user input
  const [mcCode, setMcCode] = useState("R2-17-13");
  const [lot, setLot] = useState("904013599");
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
  const [statuspm, setstatuspm] = useState("");
  //? DATA
  const [pm, setpm] = useState([]);

  //! ##Machine Cal##
  //? STATUS
  const [statuscalibration, setstatuscalibration] = useState(false);
  //? DATA
  const [calibration, setcalibration] = useState([]);

  //! ##Process Condition Cal##
  //? STATUS
  const [statusedoc_emcs_detail, setstatusedoc_emcs_detail] = useState("-");
  //? DATA
  const [edoc_emcs_detail, setedoc_emcs_detail] = useState([]);

  //! #Detail Card
  const [groupdata_verify, setgroupdata_verify] = useState([]);
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

  const handlesearch = async () => {
    await requestApiLotSearch();
    await requestApi_PM();
    await requestApi_Cal_monthly_detail();
    await fetchStatusMachine();
    // await requestApiemcs();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (dataCardmc_lot_search && dataCardmc_lot_search.length > 0) {
        const proc_id = dataCardmc_lot_search[0].proc_id;
        const lot_prd_name = dataCardmc_lot_search[0].lot_prd_name;
        const lot_prd_name_split = dataCardmc_lot_search[0].lot_prd_name_split;
        const mc_code = mcCode; // Assuming mcCode is defined elsewhere
        const line = dataCardmc_lot_search[0].line || "null";
        const proc_grp_name = dataCardmc_lot_search[0].proc_grp_name;

        console.log(proc_id);
        console.log(lot_prd_name);
        console.log(lot_prd_name_split);
        console.log(mc_code);
        console.log(line);
        console.log(proc_grp_name);

        // Call your API function with the extracted parameters
        const response = await getDataemcs(
          proc_id,
          lot_prd_name,
          lot_prd_name_split,
          mc_code,
          line
        );
        if (response && response.data && response.data.length !== 0) {
          setstatusedoc_emcs_detail("Active");
          setedoc_emcs_detail(response.data);
        } else {
          setstatusedoc_emcs_detail("-");
        }

        const response2 = await getDataVerify(mc_code, proc_grp_name);
        if (response2 && response2.data) {
          console.log(response2.data);
          console.log(response2.data.verdify_report);
          const verdify_report = response2.data.verdify_report;
          setgroupdata_verify(verdify_report);
        }
      }
    };

    fetchData();
  }, [dataCardmc_lot_search]); // Empty dependency array means this effect runs only once after the component mounts

  //1
  const requestApiLotSearch = async () => {
    try {
      console.log("Done");
      const response_data = await getDatalotsearch(lot, false);
      //response.data default
      console.log(response_data.data);
      setdataCardmc_lot_search([response_data.data]);
      setdataResponseFromLotMachineSearch([response_data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  //2
  const requestApi_PM = async () => {
    try {
      console.log("Done");
      const response_data = await getDataPM(mcCode);
      //response.data default
      console.log(response_data.data);
      console.log(response_data.data[0].stats_mc);
      setstatuspm(response_data.data[0].stats_mc);
      setpm(response_data.data);
    } catch (error) {
      console.error(error);
    }
  };

  //3
  const requestApi_Cal_monthly_detail = async () => {
    try {
      console.log("Done");
      const response_data = await getDataCal(mcCode);
      if (response_data && response_data.data) {
        // Check if response_data and response_data.data are not null or undefined
        console.log(response_data.data);
        setcalibration(response_data.data);

        const calibrationisAllLocked = [response_data.data].every((item) => {
          const statusFilter = item.status_filter?.toLowerCase();
          console.log(statusFilter);
          return (
            statusFilter === "lock" ||
            statusFilter === "locks" ||
            statusFilter === "in active"
          ); //ตรงเงื่อนไข return true
        });
        console.log(calibrationisAllLocked);
        if (!calibrationisAllLocked) {
          setstatuscalibration(true); //active
        } else {
          setstatuscalibration(false); //lock
        }
      } else {
        console.log("Response or response data is null or undefined");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //4
  // const requestApiemcs = async () => {
  //   try {
  //     console.log("Done");
  //     const response_data = await getDataemcs(
  //       proc_id,
  //       lot_prd_name,
  //       lot_prd_name_split,
  //       mc_code,
  //       line
  //     );
  //     //response.data default
  //     console.log(response_data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const requestApiLotSearch = async (value, machineCode) => {
  //   setIsLoading(true); // Start showing "Loading" screen

  //   const requestData = {
  //     lot: value,
  //     is_roll: false, // LOT
  //     mc_code: machineCode,
  //   };

  //   console.log(value, requestData.is_roll, requestData.mc_code);

  //   try {
  //     const response = await smart_fpc_eworking(requestData);
  //     const StatusAPI = JSON.stringify(response.data.status, null, 2); // Format response.data.status as a formatted string
  //     const MessageAPI = JSON.stringify(response.data.message, null, 2); // Format response.data.message as a formatted string
  //     if (StatusAPI === '"OK"') {
  //       Swal.fire(StatusAPI, MessageAPI, "success");
  //       setdataResponseFromLotMachineSearch([response.data]);
  //       setdataCardmc_lot_search([response.data.data.lot_search]);
  //     } else if (StatusAPI === '"ERROR"') {
  //       Swal.fire(StatusAPI, MessageAPI, "error");
  //       setdataResponseFromLotMachineSearch([]);
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error.message);
  //     const ErrorMsg = JSON.stringify(error.message, null, 2); // Format error.message as a formatted string
  //     Swal.fire("ERROR", ErrorMsg, "error");
  //     setdataResponseFromLotMachineSearch([]);
  //   } finally {
  //     setIsLoading(false); // Stop showing "Loading" screen
  //   }
  // };

  // useEffect(() => {
  //   console.log(dataResponseFromLotMachineSearch);
  //   if (
  //     dataResponseFromLotMachineSearch &&
  //     dataResponseFromLotMachineSearch.length > 0
  //   ) {
  //     const calibration = dataResponseFromLotMachineSearch[0].data.calibration;
  //     const edoc_emcs_detail =
  //       dataResponseFromLotMachineSearch[0].data.edoc_emcs_detail;
  //     //   const emcs = dataResponseFromLotMachineSearch[0].data.emcs;
  //     //   const lot_search = dataResponseFromLotMachineSearch[0].data.lot_search;
  //     const pm = dataResponseFromLotMachineSearch[0].data.pm;
  // const verdify_report =
  //   dataResponseFromLotMachineSearch[0].data.verdify_report;
  //     console.log("pm:", pm);
  //     console.log("calibration:", calibration);
  //     console.log("edoc_emcs_detail:", edoc_emcs_detail);
  //     //   console.log("emcs:", emcs);
  //     //   console.log("lot_search:", lot_search);
  //     setstatuspm(dataResponseFromLotMachineSearch[0].data.pm[0].stats_mc);
  //     setpm(pm);

  // const calibrationisAllLocked = calibration.every((item) => {
  //   const statusFilter = item.status_filter?.toLowerCase();
  //   console.log(statusFilter);
  //   return (
  //     statusFilter === "lock" ||
  //     statusFilter === "locks" ||
  //     statusFilter === "in active"
  //   ); //ตรงเงื่อนไข return true
  // });
  // console.log(calibrationisAllLocked);
  // if (!calibrationisAllLocked) {
  //   setstatuscalibration(true); //active
  // } else {
  //   setstatuscalibration(false); //lock
  // }
  // setcalibration(calibration);

  // if (edoc_emcs_detail.length !== 0) {
  //   // const dataInput = edoc_emcs_detail[0].eemd_emcs_no;
  //   // const extractedData = dataInput.split("-").slice(2).join("-");
  //   // setstatusedoc_emcs_detail(extractedData);
  //   setstatusedoc_emcs_detail("Active");
  // } else {
  //   setstatusedoc_emcs_detail("-");
  // }
  // setedoc_emcs_detail(edoc_emcs_detail);
  //     setgroupdata_verify(verdify_report);
  //     // fetchStatusAutoVerify();
  //     fetchStatusMachine();
  //   }
  // }, [dataResponseFromLotMachineSearch]);

  const fetchStatusMachine = async () => {
    const inputString = mcCode; // ตรวจสอบให้แน่ใจว่า mcCode ถูกกำหนดค่าไว้อย่างถูกต้อง
    const requestData = {
      mc_code: inputString,
    };
    console.log(requestData.mc_code);

    try {
      const response = await axios.post(
        `http://10.17.66.242:7010/api/smart_fpc_eworking_sacada/`,
        requestData
      );

      console.log(response.data.data);
      const data = response.data.data;
      console.log(data.actv.parameter_result);

      const allNullTableNames = Object.keys(data).every((key) => {
        const tableName = data[key].table_name;
        return tableName === null;
      });

      if (allNullTableNames) {
        setstatusMachine(true); // No Data
      } else {
        setstatusMachine(false); // Active
      }

      // Extract data
      const actvData = data.actv.parameter_result;
      const almData = data.alm.parameter_result;
      const setData = data.set.parameter_result;
      const statusData = data.status.parameter_result;

      // Set machine data
      setMachineActv(actvData);
      setMachineAlm(almData);
      setMachineSet(setData);
      setMachineStatus(statusData);

      // Generate columns for Data Grid
      const columnsActvData = generateColumns(actvData, "Actv");
      const columnsAlmData = generateColumns(almData, "Alm");
      const columnsSetData = generateColumns(setData, "Set");
      const columnsStatusData = generateColumns(statusData, "Status");

      // Set columns for UI components
      setcolumnsactvData(columnsActvData);
      setcolumnsAlmData(columnsAlmData);
      setcolumnsSetData(columnsSetData);
      setcolumnsStatusData(columnsStatusData);

      // Badge data
      const datas = generateBadgeData(actvData, almData, setData, statusData);
      console.log(datas);
      setbadgemachine(datas);
    } catch (error) {
      console.error("API Error:", error.message);
      setstatusMachine("No Data");
    }
  };

  // // Helper functions used for generating columns and badge data
  function generateColumns(dataArray, name) {
    if (name === "Actv") {
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
    if (name === "Alm") {
      return [...new Set(dataArray.flatMap(Object.keys))].map((header) => ({
        field: header,
        headerName: header,
        width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
      }));
    }
    if (name === "Set") {
      return [...new Set(dataArray.flatMap(Object.keys))].map((header) => ({
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
    if (actvData.length > 0) {
      datas.push({ name: "actv", status: true });
    }
    if (almData.length > 0) {
      datas.push({ name: "alm", status: true });
    }
    if (setData.length > 0) {
      datas.push({ name: "set", status: true });
    }
    if (statusData.length > 0) {
      datas.push({ name: "status", status: true });
    }
    return datas;
  }

  const getDataVerifyTableFromExpress = async (jwpv_job_type, jwpv_mc_code) => {
    const params = {
      jwpv_job_type: jwpv_job_type,
      jwpv_mc_code: jwpv_mc_code,
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
      <div className="container mx-auto my-1">
        <div className="flex justify-between">
          <div>Working Verify</div>
        </div>
        <div className="flex gap-1 ">
          <input
            placeholder="mc code R2-17-14"
            value={mcCode}
            onChange={(e) => setMcCode(e.target.value.toUpperCase())}
            className="Paper_Contents"
          />
          <input
            placeholder="lot"
            value={lot}
            onChange={(e) => setLot(e.target.value)}
            className="Paper_Contents"
          />
        </div>
        <div>
          <button
            className="bg-slate-200 p-2 m-1 rounded-2xl text-black hover:bg-slate-400"
            onClick={() => handlesearch()}
          >
            Search
          </button>
        </div>
        {IsLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>{statusedoc_emcs_detail}</>
        )}

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
      <div className="container mx-auto ">
        {dataResponseFromLotMachineSearch &&
          dataResponseFromLotMachineSearch.length > 0 && (
            <Stack
              direction="row"
              spacing={2}
              // className="animate__animated animate__fadeIn"
            >
              <BadgeComponent_Machine_PM
                label="Machine PM"
                status={statuspm}
                statuspm={statuspm}
                onClick={() => {
                  setselectdatafromchip("Machine PM");
                }}
                selectdatafromchip={selectdatafromchip}
              />
              <BadgeComponent_Machine_Cal
                label={"Machine Cal"}
                status={statuscalibration}
                onClick={() => {
                  setselectdatafromchip("Machine Cal");
                }}
              />
              <BadgeComponent_Process_Condition
                label={"Process Condition"}
                statusedoc_emcs_detail={statusedoc_emcs_detail}
                onClick={() => {
                  setselectdatafromchip("Process Condition");
                  //   setselectdatafromchipmachinedata("");
                }}
              />

              {groupdata_verify && groupdata_verify.length ? (
                <>
                  {groupdata_verify.map((item, index) => (
                    <BadgeComponent_dataVerify
                      key={index} // Assuming `item.jwpv_job_type` + `item.jwpv_mc_code` combination is unique, you might use `${item.jwpv_job_type}-${item.jwpv_mc_code}` as a key instead of the index if preferred.
                      statusautoverify={item.jwpv_param_tvalue}
                      itemlabel={item.jwpv_job_type}
                      onClick={() => {
                        getDataVerifyTableFromExpress(
                          item.jwpv_job_type,
                          item.jwpv_mc_code
                        );
                        // setselectdatafromchip(item.jwpv_job_type);
                      }}
                    />
                  ))}
                </>
              ) : (
                <NoDataBadgeWithChip />
              )}

              <BadgeComponent_Machine_data
                statusMachine={statusMachine}
                label={"Machine Data"}
                onClick={() => setselectdatafromchip("Machine Data")}
              />
            </Stack>
          )}
      </div>
      <div className="container mx-auto">
        {selectdatafromchip === "Machine PM" && <MachinePM data={pm} />}
        {selectdatafromchip === "Machine Cal" && (
          <MachineCal data={calibration} />
        )}
        {selectdatafromchip === "Process Condition" && (
          <ProcessCondition data={edoc_emcs_detail} />
        )}
        {selectdatafromchip === "Auto Verify" && (
          <AutoVerify data={dataautoverify} />
        )}
        {selectdatafromchip === "Machine Data" && (
          <>
            <div>
              {badgemachine.map((item, index) => (
                <BadgeComponent_Machine_data_sub
                  key={index}
                  status={item.status}
                  label={item.name}
                  onClick={() => setselectdatafromship_mcData(item.name)}
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
      </div>
    </div>
  );
}

export default Verify;