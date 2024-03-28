import React, { useState, useEffect } from "react";
import RealTimeClock from "./Components/RealTime/RealTimeClock";
import TableComponents from "./Components/TableComponents/TableData";
import CardUI from "./Components/CardUI/CardUI";
import { NavLink } from "react-router-dom";
import PostAPI from "./API/POST/PostAPI";
function CheckVerify() {
  const [dataCard, setDataCard] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let url =
      "http://10.17.66.242:7010/api/ewk/smart-get-ewk-job-record-status-detail/";
    let data = {};
    const response = await PostAPI(data, url);
    if (response.status === "OK") {
      console.log(response.data);
      setDataCard(response.data.data.card);
      setDataTable(response.data.data.table);
    } else {
      console.log(response.message);
    }
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="w-full bg-slate-500">Wait Data User ID</div>
      </div>
      <div className="container mx-auto">
        <RealTimeClock />
      </div>
      <div className="container mx-auto">
        {/* <RealTimeClock /> */}
        <CardUI data={dataCard} />
      </div>
      <div className="container mx-auto">
        {/* <RealTimeClock /> */}
        <p className=" font-bold">Planning</p>
        <div>
          <TableComponents data={dataTable} />
        </div>
      </div>
      <footer className="fixed bottom-0 w-full bg-gray-600 ">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          // onClick={handleVerifyClick}
          // use navigate
        >
          <NavLink to="/verify">Add Planning</NavLink>
        </button>
      </footer>
    </>
  );
}

export default CheckVerify;
