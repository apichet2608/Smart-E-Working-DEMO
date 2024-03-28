import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Swal from "sweetalert2";
import {
  showSuccessToast,
  showWarningToast,
  showErrorToast,
} from "../Components/Toast/Toast";
import axios from "axios";
import { formatDateTime } from "../../../Utility/formatDate/formatDate";

//icon
import NotStartedTwoToneIcon from "@mui/icons-material/NotStartedTwoTone";
import StopCircleTwoToneIcon from "@mui/icons-material/StopCircleTwoTone";
import RunCircleTwoToneIcon from "@mui/icons-material/RunCircleTwoTone";

function Se3({ lot, mc_code, datainfimation, EWK_ID }) {
  //! State

  const [leader_ID, setLeader_ID] = useState(""); //Leader ID
  // const ewk_id_for_test = "994035352+V2-02-82_L+2369"; //todo: for test
  const [createDateReady, setCreateDateReady] = useState(""); //Ready Date
  const [createDateStart, setCreateDateStart] = useState(""); //Start Date
  const [createDateStop, setCreateDateStop] = useState(""); //Stop Date

  const [isSeqReady, setIsSeqReady] = useState(false);
  const [isSeqStart, setIsSeqStart] = useState(false);
  const [isSeqStop, setIsSeqStop] = useState(false);

  const [itemSeq, setItemSeq] = useState(""); //Item Seq
  const [maxItemSeq, setMaxItemSeq] = useState(""); //Max Item Seq

  //! URL
  const approveBtnUrl = `http://10.17.66.242:7010/api/ewk/smart-ready-leader-approved/`;
  const startBtnUrl = `http://10.17.66.242:7010/api/ewk/smart-start/`;
  const stopBtnUrl = `http://10.17.66.242:7010/api/ewk/smart-stop/`;

  //! Function
  const handleApprove = async () => {
    try {
      const response = await axios.post(approveBtnUrl, {
        ewk_id: EWK_ID,
        leader_id: leader_ID,
      });

      if (response.data.status === "OK") {
        showSuccessToast("Success", response.data.message);
        console.log(response.data);
        setIsSeqReady(true);

        axios
          .get(
            `${
              import.meta.env.VITE_IP_API
            }/smart_ewk_job_record/e_working_verify/smart_eworking/getDataJobRecord?ewk_id=${encodeURIComponent(
              EWK_ID
            )}&ewk_item_seq=6&ewk_item=Ready`
          )
          .then((response) => {
            console.log(response.data);
            const data = response.data;
            const createDateReady = data.map((item) => item.create_at);
            console.log("Create Date Ready: ", createDateReady);
            setCreateDateReady(createDateReady ? createDateReady : "");
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });

        return {
          status: "OK",
          data: response.data,
          message: response.data.message,
        };
      } else {
        showErrorToast("Error", response.data.message);
        console.log(response.data);
        return {
          status: "ERROR",
          data: response.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      showErrorToast("Error", error.message);
      console.error(error);
      return {
        status: "Catch",
        data: [],
        message: error.message,
      };
    }
  };

  const handleStart = async () => {
    try {
      const response = await axios.post(startBtnUrl, {
        //test data parameter
        p_roll_lot: "994035352",
        p_shelf_machine_line: "V2-02-82_L",
        p_man_qty: "0", //?fix
        p_user: "RLAS+",
        p_station: "004", // mc in //?fix
        ewk_id: "994035352+V2-02-82_L+2369",
        create_date: formatDateTime(new Date()), //?now
      });

      if (response.data.status === "OK") {
        showSuccessToast("Success", response.data.message);
        console.log(response.data);
        setIsSeqStart(true);
        setIsSeqReady(false);

        getCreateDateStart();

        return {
          status: "OK",
          data: response.data,
          message: response.data.message,
        };
      } else {
        showErrorToast("Error", response.data.message);
        console.log(response.data);
        return {
          status: "ERROR",
          data: response.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      showErrorToast("Error", error.message);
      console.error(error);
      return {
        status: "Catch",
        data: [],
        message: error.message,
      };
    }
  };

  const handleStop = async () => {
    try {
      const response = await axios.post(stopBtnUrl, {
        //test data parameter
        p_roll_lot: "994035352",
        p_shelf_machine_line: "V2-02-82_L",
        p_man_qty: "0", //?fixed
        p_user: "RLAS+",
        p_station: "008", // mc in //?fixed
        ewk_id: "994035352+V2-02-82_L+2369",
        create_date: formatDateTime(new Date()), //?now
      });

      if (response.data.status === "OK") {
        showSuccessToast("Success", response.data.message);
        console.log(response.data);
        setIsSeqStop(true);
        setIsSeqStart(false);

        getCreateDateStop();

        return {
          status: "OK",
          data: response.data,
          message: response.data.message,
        };
      } else {
        showErrorToast("Error", response.data.message);
        console.log(response.data);
        return {
          status: "ERROR",
          data: response.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      showErrorToast("Error", error.message);
      console.error(error);
      return {
        status: "Catch",
        data: [],
        message: error.message,
      };
    }
  };

  //Get Item Seq to check Start/Stop Button
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_ewk_job_record/e_working_verify/smart_eworking/getDataJobRecord?ewk_id=${encodeURIComponent(
          EWK_ID
        )}`
      )
      .then((response) => {
        console.log(response.data);

        const data = response.data;
        const itemSeq = data.map((item) => item.ewk_item_seq);
        console.log("Item Seq: ", itemSeq);
        const maxItemSeq = Math.max(...itemSeq);
        console.log("Max Item Seq: ", maxItemSeq);

        setItemSeq(itemSeq);

        setMaxItemSeq(maxItemSeq);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [EWK_ID]);

  //get create date for start
  const getCreateDateStart = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_ewk_job_record/e_working_verify/smart_eworking/getDataJobRecord?ewk_id=${encodeURIComponent(
          EWK_ID
        )}&ewk_item_seq=7&ewk_item=Start`
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const createDateStart = data.map((item) => item.create_at);
        console.log("Create Date Start: ", createDateStart);
        setCreateDateStart(createDateStart ? createDateStart : "");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //get create date for stop
  const getCreateDateStop = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_ewk_job_record/e_working_verify/smart_eworking/getDataJobRecord?ewk_id=${encodeURIComponent(
          EWK_ID
        )}&ewk_item_seq=8&ewk_item=Stop`
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const createDateStop = data.map((item) => item.create_at);
        console.log("Create Date Stop: ", createDateStop);
        setCreateDateStop(createDateStop ? createDateStop : "");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  console.log("maxItemSeq", maxItemSeq);

  //effect for show create date
  useEffect(() => {
    getCreateDateStart();
    getCreateDateStop();
    if (maxItemSeq === 6) {
      setIsSeqReady(true);
    } else if (maxItemSeq === 7) {
      setIsSeqStart(true);
    } else if (maxItemSeq === 8) {
      setIsSeqStop(true);
    }
  }, [maxItemSeq, EWK_ID]);

  console.log("createDateReady", createDateReady);
  console.log("createDateStart", createDateStart);
  console.log("createDateStop", createDateStop);

  return (
    <>
      {EWK_ID && (
        <div className="grid grid-cols-1 gap-4 mt-2">
          <div className="grid gap-4 grid-cols-1">
            <div className="flex gap-4">
              <p className="font-bold my-auto text-blue-500 whitespace-nowrap">
                Leader
              </p>
              <Input
                type="text"
                className="drop-shadow"
                placeholder="ID"
                onChange={(e) =>
                  setLeader_ID(e.target.value ? e.target.value : "")
                }
              />
              <Button
                onClick={() => {
                  if (leader_ID === "") {
                    showErrorToast("Error", "Please fill in the Leader ID.");
                    return;
                  } else {
                    handleApprove();
                  }
                }}
                color="primary"
              >
                Approve
              </Button>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-2">
            <>
              <div className="grid">
                <Button
                  onClick={() => {
                    Swal.fire({
                      title: "Start?",
                      text: "Are you sure you want to start?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#18c964",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Start now",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleStart();

                        showSuccessToast(
                          "Started",
                          "Your work has been started."
                        );
                      }
                    });
                  }}
                  color={isSeqReady ? "success" : "default"}
                  isDisabled={isSeqReady ? false : true}
                  className="h-24 text-3xl font-bold text-white w-full shadow-md"
                >
                  Start
                  <NotStartedTwoToneIcon sx={{ fontSize: "32px" }} />
                </Button>
                <p className="font-bold text-green-500 text-center text-xl">
                  {createDateStart.length > 0
                    ? formatDateTime(createDateStart)
                    : ""}
                </p>
              </div>
            </>
            <>
              <div className="grid">
                <Button
                  color={isSeqStart ? "warning" : "default"}
                  isDisabled={isSeqStart ? false : true}
                  className="h-24 text-3xl font-bold text-white w-full shadow-md"
                >
                  <p className="font-bold text-white text-3xl h-full items-center justify-center flex">
                    Ongoing
                    <RunCircleTwoToneIcon sx={{ fontSize: "32px" }} />
                  </p>
                </Button>
              </div>
            </>
            <>
              <div className="grid">
                <Button
                  onClick={() => {
                    Swal.fire({
                      title: "Stop?",
                      text: "Are you sure you want to stop?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#18c964",
                      confirmButtonText: "Stop now",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleStop();
                        showSuccessToast(
                          "Stopped",
                          "Your work has been stopped."
                        );
                      }
                    });
                  }}
                  color={isSeqStart ? "danger" : "default"}
                  isDisabled={isSeqStart ? false : true}
                  className="h-24 text-3xl font-bold text-white w-full shadow-md"
                >
                  Stop
                  <StopCircleTwoToneIcon sx={{ fontSize: "32px" }} />
                </Button>
                <p className="font-bold text-red-500 text-center text-xl">
                  {createDateStop.length > 0
                    ? formatDateTime(createDateStop)
                    : ""}
                </p>
              </div>
            </>
          </div>

          {EWK_ID && (
            <div className="text-center">
              {isSeqStop ? (
                <h1 className="text-5xl text-green-500 font-bold">
                  Work Finished
                </h1>
              ) : isSeqStart ? (
                <h1 className="text-5xl text-yellow-500 font-bold">Working</h1>
              ) : isSeqReady ? (
                <h1 className="text-5xl text-blue-500 font-bold">
                  Waiting Start
                </h1>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Se3;
