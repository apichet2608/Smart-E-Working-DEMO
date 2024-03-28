import React, { useState, useEffect } from "react";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import GetAPI from "./API/GET/GetAPI";
import PostAPI from "./API/POST/PostAPI";
// Alert
import {
  showSuccessToast,
  showWarningToast,
  showErrorToast,
} from "./Components/Toast/Toast";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setstatuslq } from "../../../Redux/Action/lqapprovestatus";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextInputComponents from "./Components/TextInput/TextInput";
import Se1 from "./Se1/Se1";
import Se2 from "./Se2/Se2";
import Se3 from "./Se3/Se3";
import CardInfo from "./Components/CardInfo/CardInfo";
import Operator from "./Components/Operator/Operator";
import CountTime from "./Components/Count_Time/Count_Time";
function Verify_Fantasy() {
  // const [lot, setLot] = useState("994035355");
  // const [mc_code, setMc_code] = useState("R2-17-11_A");
  const [lot, setLot] = useState("994035352");
  const [mc_code, setMc_code] = useState("V2-02-82_L");
  const [datainfimation, setdatainfimation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatchs = useDispatch();
  const state = useSelector((state) => state.lqapprovestatus);
  const [valueTab, setvalueTab] = React.useState("one");
  const [EWK_ID, setEWK_ID] = useState("");
  const [operatorData, setoperatorData] = useState([]);

  const handleChange = (event, newValue) => {
    setvalueTab(newValue);
  };

  useEffect(() => {
    // requestApiLotSearch();
  }, []);

  const handlesearch = async () => {
    setdatainfimation([]);
    setEWK_ID("");
    await requestApiLotSearch();
  };

  const requestApiLotSearch = async () => {
    const params = {
      lot: lot,
      is_roll: false,
      mc_code: mc_code,
    };
    const url = `${
      import.meta.env.VITE_IP_API_E_WORKING
    }/api/ewk/smart-fpc-lot/`;
    try {
      const response_data = await GetAPI(params, url);
      if (response_data.status === "OK") {
        console.log(response_data);
        setdatainfimation([response_data.data.data]);
        showSuccessToast("FPC LOT Search");
      } else if (response_data.status === "ERROR") {
        console.log(response_data);
        setdatainfimation([]);
        showWarningToast(`FPC LOT Search  ${response_data.data.message}`);
      } else {
        setdatainfimation([]);
        console.log(response_data);
        showErrorToast("FPC LOT Search");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (datainfimation && datainfimation.length > 0) {
      const ewk_id = lot + "+" + mc_code + "+" + datainfimation[0].proc_id;
      setEWK_ID(ewk_id);
      // featchoperatorData(datainfimation[0]);
    } else {
      setEWK_ID("");
    }
  }, [datainfimation]);

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

  return (
    <div>
      <div className="container mx-auto">
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
          <div>
            {EWK_ID && (
              <CountTime
                EWK_ID={EWK_ID}
                datainfimation={datainfimation}
                mc_code={mc_code}
              />
            )}
          </div>
          {Object.keys(operatorData).length > 0 && (
            <Operator response_API={operatorData} EWK_ID={EWK_ID} />
            // <>TEST</>
          )}
        </div>
        <div className="container mx-auto pt-4 ">
          <CardInfo datainfimation={datainfimation} />
        </div>
        <div className="container mx-auto pt-4 ">
          <p className="text-black text-lg font-bold">EWK ID : {EWK_ID}</p>
        </div>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Seq One" />
          <Tab value="two" label="OP" />
          <Tab value="three" label="Work Status" />
        </Tabs>
      </div>
      <div className="container mx-auto">
        {valueTab === "one" ? (
          <Se1
            lot={lot}
            mc_code={mc_code}
            EWK_ID={EWK_ID}
            datainfimation={datainfimation}
          />
        ) : null}
        {valueTab === "two" ? (
          <Se2
            lot={lot}
            mc_code={mc_code}
            EWK_ID={EWK_ID}
            datainfimation={datainfimation}
            valueTab={valueTab}
          />
        ) : null}
        {valueTab === "three" ? (
          <Se3
            lot={lot}
            mc_code={mc_code}
            EWK_ID={EWK_ID}
            datainfimation={datainfimation}
          />
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Verify_Fantasy;
