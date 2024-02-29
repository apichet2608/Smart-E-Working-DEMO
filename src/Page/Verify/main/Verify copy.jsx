import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
import Loading from "../../../Components/common/loading/Loading-08/loading";
import BadgeComponenstApprove from "../Components/BadgeComponent/BadgeComponenstApprove.jsx";
import BadgeComponenstGR_R from "../Components/BadgeComponent/BadgeComponenstGR_R.jsx";
import Op_id_input from "../Components/Op_id_input/Op_id_input.jsx";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import TextFieldInputComponents from "../Components/TextInput/TextInput.jsx";
function Verify() {
  //user input
  // const [mcCode, setMcCode] = useState("R2-17-13");
  // const [lot, setLot] = useState("904013599");
  // const [mcCode, setMcCode] = useState("R2-03-22");
  // const [lot, setLot] = useState("904025535");
  const [mcCode, setMcCode] = useState("R2-07-11_A");
  const [lot, setLot] = useState("240237269");
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

  const [dataapprove, setdataapprove] = useState();
  const [datagr_r, setdatagr_r] = useState();
  const handlesearch = async () => {
    setIsLoading(true);
    await requestApiLotSearch();
    await requestApi_PM();
    await requestApi_Cal_monthly_detail();
    await fetchStatusMachine();
    await requestholdingtime();
    await requestApprove();
    setIsLoading(false);

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
          setedoc_emcs_detail(response.data.detail);
        } else {
          setstatusedoc_emcs_detail("-");
        }

        const response2 = await getDataVerify(mc_code, proc_grp_name);
        if (response2 && response2.data) {
          console.log(response2.data);
          console.log(response2.data.fai_verify_report);
          const fai_verify_report = response2.data.fai_verify_report;
          setgroupfaidata_verify(fai_verify_report);
        }
      }
    };
    //4 ,5
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

  //1
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
  // getDataapprove;
  //6
  const fetchStatusMachine = async () => {
    const inputString = mcCode; // ตรวจสอบให้แน่ใจว่า mcCode ถูกกำหนดค่าไว้อย่างถูกต้อง
    const requestData = {
      mc_code: inputString,
    };
    console.log(requestData.mc_code);

    try {
      const response = await axios.get(
        `http://10.17.66.242:7010/api/ewk/smart-fpc-scada-realtime-center/?mc_code=${inputString}`
        // { requestData }
      );

      console.log(response.data.data);
      const data = response.data.data;
      // console.log(data.actv[0].judgment_record);

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
      const columnsActvData = actvData ? generateColumns(actvData, "Actv") : "";
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
    } catch (error) {
      console.error("API Error:", error.message);
      setstatusMachine("No Data");
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

  // function generateBadgeData(actvData, almData, setData, statusData) {
  //   let datas = [];
  //   if (actvData.length > 0) {
  //     datas.push({ name: "actv", status: true });
  //   }
  //   if (almData.length > 0) {
  //     datas.push({ name: "alm", status: true });
  //   }
  //   if (setData.length > 0) {
  //     datas.push({ name: "set", status: true });
  //   }
  //   if (statusData.length > 0) {
  //     datas.push({ name: "status", status: true });
  //   }
  //   return datas;
  // }
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
        <div className="flex gap-1 w-full">
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
          <Op_id_input />
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
            <div className="container mx-auto pt-4">
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
              {dataResponseFromLotMachineSearch &&
                dataResponseFromLotMachineSearch.length > 0 && (
                  <Stack
                    direction="row"
                    spacing={2}
                    // className="animate__animated animate__fadeIn"
                    className="mt-8"
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

                    {groupfaidata_verify && groupfaidata_verify.length ? (
                      <>
                        {groupfaidata_verify.map((item, index) => (
                          <BadgeComponent_dataVerify
                            key={index} // Assuming `item.jwpv_job_type` + `item.jwpv_mc_code` combination is unique, you might use `${item.jwpv_job_type}-${item.jwpv_mc_code}` as a key instead of the index if preferred.
                            statusautoverify={item.jwpv_param_tvalue}
                            itemlabel={item.jwpv_job_type}
                            onClick={() => {
                              getDataVerifyTableFromExpress(
                                item.jwpv_job_type,
                                item.jwpv_mc_code,
                                dataCardmc_lot_search[0].proc_grp_name
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
                  </Stack>
                )}
            </div>
            <div className="container mx-auto mt-6">
              {selectdatafromchip === "Machine PM" && <MachinePM data={pm} />}
              {selectdatafromchip === "Machine Cal" && (
                <MachineCal data={calibration} />
              )}
              {selectdatafromchip === "Process Condition" && (
                <ProcessCondition data={edoc_emcs_detail} />
              )}
              {selectdatafromchip === "Auto Verify" && (
                <AutoVerify data={dataautoverify} GR R />
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
