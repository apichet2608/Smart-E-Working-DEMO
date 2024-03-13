import React from "react";

function LQApprove(props) {
  const { data } = props;
  console.log(data);
  return (
    <div className="container mx-auto p-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {Object.keys(item).map((key, i) => (
            <p key={i} className="text-gray-700 text-sm">
              {key}: <span className="font-bold">{item[key]}</span>
            </p>
          ))}
          <hr className="my-4 border-t border-gray-200" />{" "}
        </div>
      ))}
    </div>
  );
}

export default LQApprove;
