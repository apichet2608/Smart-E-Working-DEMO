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
  const ewk_id_for_test = "994035352+V2-02-82_L+2369"; //todo: for test

  console.log("EWK ID: ", ewk_id_for_test);
  console.log("Leader ID: ", leader_ID);

  //! URL
  const approveBtnUrl = `http://10.17.66.242:7010/api/ewk/smart-ready-leader-approved/`;
  //sample body parameter for approveBtnUrl API -- ewk_id : EWK_ID, leader_id : leader_ID

  const startBtnUrl = `http://10.17.66.242:7010/api/ewk/smart-start/`;
  //sample body parameter for startBtnUrl API
  /* //todo: for test
  {
    "p_roll_lot": "994035352",
    "p_shelf_machine_line": "V2-02-82_L",
    "p_man_qty": "0", //?fix
    "p_user": "RLAS+",
    "p_station": "004", // mc in //?fix
    "ewk_id": "994035352+V2-02-82_L+2369",
    "create_date": "2024-03-25 08:43:26.243" //?now
  }
  */

  const stopBtnUrl = `http://10.17.66.242:7010/api/ewk/smart-stop/`;
  //sample body parameter for stopBtnUrl API
  /* //todo: for test
  {
    "p_roll_lot": "994035352",
    "p_shelf_machine_line": "V2-02-82_L",
    "p_man_qty": "0", //?fix
    "p_user": "RLAS+",
    "p_station": "008", // mc out //?fix
    "ewk_id": "994035352+V2-02-82_L+2369",
    "create_date": "2024-03-25 08:43:26.243" //?now
  }
  */

  //State for Leader Approve
  const [isLeaderStart, setIsLeaderStart] = useState(true);
  const [isLeaderStop, setIsLeaderStop] = useState(false);

  //! Function
  const handleApprove = async () => {
    try {
      const response = await axios.post(approveBtnUrl, {
        ewk_id: ewk_id_for_test,
        leader_id: leader_ID,
      });

      if (response.data.status === "OK") {
        showSuccessToast("Success", response.data.message);
        console.log(response.data);
      } else {
        showErrorToast("Error", response.data.message);
        console.log(response.data);
      }
    } catch (error) {
      showErrorToast("Error", error.message);
      console.error(error);
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
        setIsLeaderStart(false);
        setIsLeaderStop(true);
      }
    } catch (error) {
      showErrorToast("Error", error.message);
      console.error(error);
    }
  };

  const handleStop = async () => {
    try {
      const response = await axios.post(stopBtnUrl, {
        //test data parameter
        p_roll_lot: "994035352",
        p_shelf_machine_line: "V2-02-82_L",
        p_man_qty: "0", //?fix
        p_user: "RLAS+",
        p_station: "008", // mc in //?fix
        ewk_id: "994035352+V2-02-82_L+2369",
        create_date: formatDateTime(new Date()), //?now
      });

      if (response.data.status === "OK") {
        showSuccessToast("Success", response.data.message);
        console.log(response.data);
        setIsLeaderStart(true);
        setIsLeaderStop(false);
      }
    } catch (error) {
      showErrorToast("Error", error.message);
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 my-4">
      <div className="grid gap-4 lg:grid-cols-2 grid-cols-1">
        <div className="flex gap-4">
          <p className="font-bold my-auto text-blue-500 whitespace-nowrap">
            Leader
          </p>
          <Input
            type="text"
            className="drop-shadow"
            placeholder="ID"
            onChange={(e) => setLeader_ID(e.target.value ? e.target.value : "")}
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
      <div className="flex gap-4">
        <>
          {isLeaderStart && (
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
                      // setIsLeaderStart(false);
                      // setIsLeaderStop(true);
                      handleStart();

                      showSuccessToast(
                        "Started",
                        "Your work has been started."
                      );
                    }
                  });
                }}
                color="success"
                className="h-32 text-3xl font-bold text-white w-56 shadow-md"
              >
                Start
                <NotStartedTwoToneIcon sx={{ fontSize: "32px" }} />
              </Button>
            </div>
          )}
        </>
        <>
          {!isLeaderStart && (
            <div className="grid">
              <div className="bg-yellow-500 h-32 w-56 rounded-xl">
                <p className="font-bold text-white text-3xl text-center my-11">
                  Ongoing
                  <RunCircleTwoToneIcon sx={{ fontSize: "32px" }} />
                </p>
              </div>
              <p className="font-bold text-green-500 text-center text-xl">
                YYYY-MM-DD HH:MM
              </p>
            </div>
          )}
        </>
        <>
          {isLeaderStop && (
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
                      // setIsLeaderStart(true);
                      // setIsLeaderStop(false);
                      handleStop();

                      showSuccessToast(
                        "Stopped",
                        "Your work has been stopped."
                      );
                    }
                  });
                }}
                color="danger"
                className="h-32 text-3xl font-bold text-white w-56 shadow-md"
              >
                Stop
                <StopCircleTwoToneIcon sx={{ fontSize: "32px" }} />
              </Button>
              <p className="font-bold text-red-500 text-center text-xl">
                Waiting
              </p>
            </div>
          )}
        </>
      </div>

      {/* <h1 className="text-6xl text-green-500 font-bold">Work Finished</h1> */}
    </div>
  );
}

export default Se3;
