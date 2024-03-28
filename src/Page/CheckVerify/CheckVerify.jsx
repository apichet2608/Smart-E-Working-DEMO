import React, { useState, useEffect } from "react";
import RealTimeClock from "./Components/RealTime/RealTimeClock";
import TableComponents from "./Components/TableComponents/TableData";
import CardUI from "./Components/CardUI/CardUI";
import { NavLink } from "react-router-dom";
function CheckVerify() {
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
        <CardUI
          data={[
            { name: "Total", value: 5 },
            { name: "Finish", value: 5 },
            { name: "Ongoing", value: 5 },
          ]}
        />
      </div>
      <div className="container mx-auto">
        {/* <RealTimeClock /> */}
        <p className=" font-bold">Planning</p>
        <div>
          <TableComponents data={[]} />
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
