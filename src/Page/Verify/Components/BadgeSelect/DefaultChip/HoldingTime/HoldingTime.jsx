import React from "react";

function HoldingTimeTable(props) {
  const { data } = props;
  return (
    <div className="container mx-auto p-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <p className="text-gray-700 text-sm">
            Lot Number: <span className="font-bold">{item.lot_no}</span>
          </p>
          <p className="text-gray-700 text-sm">
            Product Name: <span className="font-bold">{item.prd_name}</span>
          </p>
          <p className="text-gray-700 text-sm">
            Current Process:{" "}
            <span className="font-bold">{item.current_process}</span>
          </p>
          <p className="text-gray-700 text-sm">
            Condition Description:{" "}
            <span className="font-bold">{item.condition_desc}</span>
          </p>
          <p className="text-gray-700 text-sm">
            Max A2: <span className="font-bold">{item.max_a2}</span>
          </p>
          <p className="text-gray-700 text-sm">
            Hold Time: <span className="font-bold">{item.hold_time}</span>
          </p>
          <p className="text-gray-700 text-sm">
            Lock Holding Time:{" "}
            <span className="font-bold">{item.lock_holding_time}</span>
          </p>
          <p className="text-gray-700 text-sm">
            Status:{" "}
            <span className="font-bold bg-green-400">{item.status}</span>
          </p>
          <hr className="my-4 border-t border-gray-200" />{" "}
          {/* เพิ่มเส้นขั้นระหว่างข้อมูลแต่ละรายการ */}
        </div>
      ))}
    </div>
  );
}

export default HoldingTimeTable;
